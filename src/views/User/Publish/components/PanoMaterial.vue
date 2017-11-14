<template>
  <div class="pano-material" v-loading="loading">
    <el-row>
      <el-col class="pano-material__left" :span="4">
        <dl class="pano-material__menu">
          <dt>全景相册</dt>
          <a class="hover-primary pano-material__menu-add" @click="createCate">+创建新相册</a>
          <dd
            v-for="(cate, index) in cates"
            :key="index"
            placement="right"
            popper-class="edit-tip"
            :disabled="index <= 0"
            :class="{active: cate.id === currentCateId, first: index === 0}"
            @click="selectCate(cate.id)"
          >
            <span class="pano-material__menu-left">
              <i role="button" class="iconfont pano-material__menu-edit" title="编辑" @click.stop="createCate(cate)">&#xe608;</i>
              <i role="button" class="iconfont pano-material__menu-remove" title="删除" @click.stop="removeCate(cate)">&#xe615;</i>
            </span>
            <span class="pano-material__menu-right">
              {{ cate.name }}
            </span>
          </dd>
        </dl>
      </el-col>

      <el-col class="pano-material__right" :span="20">
        <el-row class="pano-material__header">
          <el-col :span="2">
            <el-checkbox :value="allChecked" @change="selectAllPanos">全选</el-checkbox>
          </el-col>
          <el-col :span="4">
            <el-button
              :disabled="!(checked.length && !invoked)"
              size="small"
              type="info"
              @click="moveToCate"
            >移动到其他相册</el-button>
          </el-col>
          <el-col :span="4">
            <el-button
              :disabled="!(checked.length && !invoked)"
              size="small"
              type="danger"
              @click="removeChecked"
            >删除选中的素材</el-button>
          </el-col>
          <el-col class="text-right" :span="8">
            <div class="pano-material__header__count">
              已选择<span class="text-primary">{{ checked.length }}</span>个场景
            </div>
          </el-col>
          <el-col :span="6">
            <el-input
              size="small"
              placeholder="请输入场景名称"
              icon="search"
              v-model="keyword"
              :on-icon-click="searchPanos"
            ></el-input>
          </el-col>
        </el-row>

        <div class="pano-material__content">
          <el-row :gutter="20">
            <el-col
              class="pano-material__item"
              v-for="pano in sceneList.data"
              :key="pano.id"
              :span="6"
              @click.native="selectPano(pano)"
              :class="{disabled: disabledId.includes(pano.id)}"
            >
              <publish-item :file="pano">
                <el-checkbox
                  slot="checkbox"
                  :disabled="disabledId.includes(pano.id)"
                  :value="disabledId.includes(pano.id) || checked.includes(pano.id)"
                  :checked="disabledId.includes(pano.id) || checked.includes(pano.id)"
                  @change="selectPano(pano, $event.target.checked)"
                >
                </el-checkbox>
                <img
                  v-show="pano.preview || pano.preview_image"
                  slot="preview"
                  :src="pano.preview || (pano.preview_image ? $url.static(`${pano.preview_image}?imageView2/2/w/268`) : '')"
                  :alt="pano.name">
                <template slot="tools">
                  <i role="button" v-show="!invoked" class="iconfont hover-warning" @click.stop="editScene(pano)">&#xe608;</i>
                  <i role="button" v-show="!invoked" class="iconfont hover-warning" @click.stop="removeScene(pano)">&#xe615;</i>
                </template>
              </publish-item>
            </el-col>
          </el-row>
        </div>

        <el-pagination
          :small="isSmallScreen"
          v-if="sceneList.last_page > 1"
          :page-size="sceneList.per_page"
          :total="sceneList.total"
          :current-page="currentPage"
          @current-change="pageChange"
          layout="prev, pager, next"
        ></el-pagination>
      </el-col>
    </el-row>

    <slot name="footer" v-if="invoked" :checked="checkedPanos"></slot>

    <!--移动到其他相册弹窗-->
    <el-dialog
      :visible.sync="moveDialog"
      title="移动到其他相册"
      size="tiny"
      :modal="false"
      :close-on-click-modal="false"
      custom-class="pano-material__move"
    >
      <el-form label-width="110px">
        <el-form-item label="移动到">
          <el-select v-model="selectCateId">
            <el-option
              v-for="list in cates"
              :key="list.id"
              :label="list.name"
              :value="list.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="moveCateSub">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 场景素材列表
 * @author luminghuai | chenliangshan
 * @version 2017-08-23
 */

import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import { errorHandle, emitter } from '@/mixins'

const PublishItem = () => import('./PublishItem')

export default {
  name: 'pano-material',

  mixins: [errorHandle, emitter],

  components: { PublishItem },

  props: {
    // 限制显示个数
    showNum: {
      type: Number,
      default: 12,
    },
    selected: {
      type: Array,
      default: () => [],
    },
    addFiles: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      cates: [], // 场景素材相册
      currentCateId: 1, // 当权选中的相册
      checked: [], // 存放选中项的id
      keyword: '',
      loading: false,
      moveDialog: false,
      selectCateId: null,
      currentPage: 1,
    }
  },

  computed: {
    ...mapState({
      list: state => state.edit.material.materialData.scene,
      invoked: state => state.edit.material.invoked,
      isSmallScreen: state => state.edit.material.isSmallScreen,
      uploading: state => state.edit.material.uploading,
    }),

    // 过滤不可选择的全景图
    disabledId() {
      if (this.invoked) {
        return this.selected.map(item => item.source_scene_id)
      }
      return []
    },

    // 计算是否全选
    allChecked() {
      return this.checked.length && this.checked.length === this.sceneList.data.length
    },

    // 计算选中的场景素材
    checkedPanos() {
      return this.sceneList.data.filter(item => this.checked.includes(item.id))
    },

    params() {
      return `?source_scene_category_id=${this.currentCateId}&per_page=12&name=${this.keyword}`
    },

    // 添加新增上传图片
    sceneList() {
      const data = this.addFiles.concat(this.list.data)
      const len = this.addFiles.length
      const uploadingArr = this.addFiles.filter(({ percent, vtour }) => percent > 0 && !vtour)
      if (!uploadingArr.length) {
        this.$store.commit(EDIT.MATERIAL.UPLOADING, false)
      } else {
        this.$store.commit(EDIT.MATERIAL.UPLOADING, true)
      }
      if (len) {
        const list = {
          ...this.list,
          data: data.length > this.showNum ? data.slice(0, 12) : data,
          total: this.list.total + len,
          last_page: this.list.total + len > 12 ? this.list.last_page + 1 : this.list.last_page,
        }
        return { ...list }
      }
      return this.list
    },
  },

  methods: {
    // 判断是否正在上传图片
    uploadedPic() {
      if (this.uploading && this.addFiles.length) {
        if (this.currentPage !== this.list.current_page) {
          this.$confirm('正在上传图片，请勿操作！', '提示', { type: 'warning' })
            .then(() => {
              // 恢复页码
              this.currentPage = this.list.current_page
            })
            .catch(() => {
              // 恢复页码
              this.currentPage = this.list.current_page
            })
        }
        return false
      }
      return true
    },
    getFetchPanos(params) {
      this.$store.dispatch(EDIT.MATERIAL.INIT, { url: '/user/sourcescene', params })
        .then(() => {
          this.loading = false
        })
    },

    getPanos(page = 1) {
      this.currentPage = page
      if (this.uploadedPic()) {
        this.loading = true
        // 清除上传临时文件数组
        this.dispatch('edit-functions-material', 'on-reset-files')

        const params = page ? `${this.params}&page=${page}` : this.params
        this.getFetchPanos(params)
      }
    },

    // 搜索素材
    searchPanos() {
      this.getPanos()
    },

    /**
     * 选择不同的相册后，重新获取列表并清空选中项
     */
    selectCate(id) {
      if (id !== this.currentCateId && this.uploadedPic()) {
        this.currentCateId = id
        this.getPanos()
        this.checked = []

        // 更新所在分类id （适用素材库）
        this.dispatch('edit-functions-material', 'on-update-scene-cateid', id)
      }
    },

    pageChange(page) {
      this.getPanos(page)
    },

    selectPano({ id, vtour }, checked) {
      if (!this.disabledId.includes(id) && (vtour === undefined || vtour)) {
        if ((checked !== undefined && !checked) || this.checked.includes(id)) {
          this.checked = this.checked.filter(item => item !== id)
        } else {
          this.checked.push(id)
        }
      }
    },

    selectAllPanos() {
      if (this.allChecked) {
        this.checked = []
      } else {
        this.checked = this.sceneList.data.map(item => item.id)
      }
    },

    // 编辑场景素材名称
    editScene({ id, name }) {
      if (this.uploadedPic()) {
        const inputValidator = val => !!val
        const dialogTitle = '编辑全景图'

        this.$prompt('请输入全景图名称', dialogTitle, {
          closeOnPressEscape: false,
          closeOnClickModal: false,
          inputValue: name,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator,
          inputErrorMessage: '全景图名称不能为空',
        }).then(({ value }) => {
          this.$http.put(`/user/sourcescene/${id}`, { id, name: value })
            .then(() => {
              this.$message.success('编辑成功!')
              // 更新列表信息
              this.getPanos(this.sceneList.current_page)
            })
            .catch((errors) => {
              this.errorHandler(errors)
            })
        })
      }
    },

    // 移除场景素材图
    removeScene({ id }) {
      if (this.uploadedPic()) {
        this.$confirm('确认删除该素材？', '提示', { type: 'warning' })
          .then(() => {
            this.$http.delete(`/user/sourcescene/${id}`)
              .then(() => {
                this.$message.success('删除成功!')
                this.resetGetPanos(1)
              })
              .catch((errors) => {
                this.errorHandler(errors)
              })
          })
      }
    },

    createCate({ name = null, id = '' }) {
      if (this.uploadedPic()) {
        const inputValidator = val => !!val
        let dialogTitle = '创建新相册'
        let type = 'post'

        if (id) {
          dialogTitle = '编辑相册'
          type = 'put'
        }
        this.$prompt('请输入相册名', dialogTitle, {
          closeOnPressEscape: false,
          closeOnClickModal: false,
          inputValue: name,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator,
          inputErrorMessage: '相册名不能为空',
        }).then(({ value }) => {
          this.$http[type](`/user/sourcescenecategory/${id}`, { name: value })
            .then(({ result: { deleted_at, created_at, updated_at, ...other } }) => {
              if (id) {
                // 编辑列表内容
                this.cates = this.cates.map((item) => {
                  let data = { ...item }
                  if (item.id === id) {
                    data = { ...item, name: value }
                  }
                  return data
                })
              } else {
                // 添加成功新增列表数组
                this.cates.push({ ...other })
              }

              this.$message.success(`${dialogTitle}成功!`)
            })
            .catch((errors) => {
              this.errorHandler(errors)
            })
        })
      }
    },

    // 删除场景素材相册
    removeCate({ id }) {
      if (this.uploadedPic()) {
        this.$confirm('确认删除该相册？', '提示', { type: 'warning' })
          .then(() => {
            this.$http.delete(`/user/sourcescenecategory/${id}`)
              .then(() => {
                // 删除成功过滤列表数组
                this.cates = this.cates.filter(item => item.id !== id)
                this.$message.success('删除成功!')
                // 选中默认分类
                this.selectCate(1)
              })
              .catch((errors) => {
                this.errorHandler(errors)
              })
          })
      }
    },

    // 打开移动到其他相册窗口
    moveToCate() {
      if (this.checked.length) {
        this.selectCateId = this.currentCateId
        this.moveDialog = true
      } else {
        this.errorHandler('请先选择要移动的素材!')
      }
    },

    // 移动到其他相册
    moveCateSub() {
      if (this.uploadedPic()) {
        if (this.selectCateId !== this.currentCateId) {
          this.$http.put('/user/sourcescene/updatecategory', {
            ids: this.checked,
            source_scene_category_id: this.selectCateId,
          })
            .then(() => {
              this.$message.success('移动成功!')
              this.currentCateId = this.selectCateId
              this.moveDialog = false
              this.checked = []
              this.getPanos()
            })
            .catch((errors) => {
              this.errorHandler(errors)
            })
        } else {
          this.errorHandler('请选择其他相册!')
        }
      }
    },

    // 批量删除选中的素材
    removeChecked() {
      if (this.uploadedPic()) {
        if (this.checked.length) {
          this.$confirm(`确认删除所选 ${this.checked.length} 张素材？`, '提示', { type: 'warning' })
            .then(() => {
              this.$http.post('/user/sourcescene/batchdelete', {
                ids: this.checked,
              })
                .then(() => {
                  this.$message.success('删除成功!')
                  this.resetGetPanos(this.checked.length)
                  this.checked = []
                })
                .catch((errors) => {
                  this.errorHandler(errors)
                })
            })
            .catch(() => {

            })
        } else {
          this.errorHandler('请先选择要删除的素材!')
        }
      }
    },

    // 重新请求当前列表
    resetGetPanos(len) {
      if (this.uploadedPic()) {
        let page = this.sceneList.current_page
        if (this.sceneList.data.length <= len) {
          page -= 1
        }
        this.getPanos(page)
      }
    },
  },

  created() {
    this.$http.get('/user/sourcescenecategory')
      .then(({ result }) => {
        this.cates = result
      })
    this.getPanos()
  },
}
</script>


<style lang="postcss">
@import "vars.css";

:root {
  --border: 1px solid var(--gray-extra-light);
}

.pano-material {
  border-bottom: var(--border);
  position: relative;

  > .el-row {
    height: 100%;
  }

  .el-pagination {
    width: 100%;
    position: absolute;
    margin: 0;
    bottom: 0;
  }

  &__right {
    height: 100%;
    padding: 0 20px;
    border-left: var(--border);
    position: relative;
  }

  &__header {
    padding: 8px 0;
    border-bottom: var(--border);
    line-height: 30px;

    &__count {
      margin-right: 1em;
    }
  }

  &__content {
    padding: 20px 0 0;
    .disabled {
      cursor: not-allowed;
    }
  }
  &__move {
    .el-form-item {
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-button {
      min-width: 80px;
    }
  }
}

.pano-material__menu {
  margin: 0;
  text-align: right;

  &-add {
    display: block;
    margin-top: 20px;
    position: relative;
    height: 40px;
    padding: 0 10px 0 20px;
    border-bottom: 1px solid #eee;
    line-height: 39px;
    text-align: right;
    cursor: pointer;
  }

  &-left {
    width: 26%;
    float: left;
    text-align: left;
    overflow: hidden;
    opacity: 0;
    transition: 0.3s;
  }

  &-right {
    width: 74%;
  }

  &-edit, &-remove {
    color: var(--color-warning);
    cursor: pointer;
  }

  & > dt,
  & > dd {
    padding-right: 14px;
  }

  & > dt {
    border-bottom: var(--border);
    margin: 5px 0;
    font-size: 16px;
    font-weight: 700;
    line-height: 40px;
  }

  & > dd {
    position: relative;
    border-bottom: var(--border);
    margin: 0;
    line-height: 40px;
    cursor: pointer;

    &.active::before {
      content: "";
      position: absolute;
      left: 5px;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--color-primary);
    }

    &:hover.active::before {
      display: none;
    }

    &:hover {
      .pano-material__menu-left {
        overflow: visible;
        opacity: 1;
      }
    }

    &.first:hover {
      &.active::before {
        display: inline-block;
      }
      .pano-material__menu-left {
        display: none;
        opacity: 0;
      }
    }
  }
}

.pano-material__item {
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.9;
  }

  .el-checkbox {
    position: absolute;
    top: 6px;
    left: 6px;
  }

  & > img {
    width: 100%;
    height: 100%;
  }

  & > h4 {
    position: absolute;
    bottom: 0;
    left: 10px;
    width: calc(100% - 20px);
    padding-left: 0.6em;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-weight: normal;
    line-height: 22px;
  }
}

/* 兼容小分辨率屏幕 */
@media screen and (max-height: 760px) {
  .pano-material {
    &__menu {
      &-add {
        margin-top: 10px;
      }
    }

    &__right {
      padding: 0 10px;
      height: calc(100% - 10px);
    }

    &__content {
      padding-top: 10px;
      min-height: 320px !important;

      > .el-row {
        margin-right: 0 !important;
      }
    }

    &__item {
      margin-bottom: 0;
      padding-right: 0 !important;
    }
  }
}
</style>
