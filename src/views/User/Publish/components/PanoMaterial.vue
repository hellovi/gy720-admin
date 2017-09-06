<template>
  <div class="pano-material">
    <el-row>
      <el-col class="pano-material__left" :span="3">
        <dl class="pano-material__menu">
          <dt>全景相册</dt>
          <a class="hover-primary pano-material__menu-add" @click="createCate">+创建新分类</a>
          <el-tooltip
            v-for="(cate, index) in cates"
            :key="index"
            placement="right"
            popper-class="edit-tip"
            :disabled="index <= 0"
          >
            <dd
              :class="{active: cate.id === currentCateId}"
              @click="selectCate(cate.id)"
            >
                {{ cate.name }}
            </dd>
            <template slot="content">
              <i role="button" class="iconfont pano-material__menu-edit" @click.stop="createCate(cate)">&#xe608;</i>
              <i role="button" class="iconfont pano-material__menu-remove" @click.stop="removeCate(cate)">&#xe615;</i>
            </template>
          </el-tooltip>
        </dl>
      </el-col>

      <el-col class="pano-material__right" :span="21" v-loading="loading">
        <el-row class="pano-material__header">
          <el-col :span="4">
            <el-checkbox v-model="allChecked" @change="selectAllPanos">全选</el-checkbox>
          </el-col>
          <el-col class="text-right" :span="14">
            <div class="pano-material__header__count">
              已选择<span class="text-primary">{{ checked.length }}</span>个场景
            </div>
          </el-col>
          <el-col :span="6">
            <el-input size="small" placeholder="请输入场景名称" icon="search" v-model="keyword"></el-input>
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
                  @change="selectPano(pano, $event.target.checked)"
                >
                </el-checkbox>
                <img
                  slot="preview"
                  :src="pano.vtour === undefined || pano.vtour ? $url.host(pano.preview_image) : pano.preview"
                  :alt="pano.name">
                <template slot="tools">
                  <i role="button" class="iconfont hover-warning" @click.stop="editScene(pano)">&#xe608;</i>
                  <i role="button" class="iconfont hover-warning" @click.stop="removeScene(pano)">&#xe615;</i>
                </template>
              </publish-item>
            </el-col>
          </el-row>
        </div>

        <el-pagination
          v-if="sceneList.last_page > 1"
          :page-size="sceneList.per_page"
          :total="sceneList.total"
          :current-page="sceneList.current_page"
          @current-change="pageChange"
          layout="prev, pager, next"
        ></el-pagination>
      </el-col>
    </el-row>

    <slot name="footer" v-if="invoked" :checked="checkedPanos"></slot>
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
import errorHandle from '@/mixins/errorHandle'
import PublishItem from './PublishItem'

export default {
  name: 'pano-material',

  mixins: [errorHandle],

  components: { PublishItem },

  props: {
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
      cates: [], // 场景素材分类
      currentCateId: 1, // 当权选中的分类
      checked: [], // 存放选中项的id
      keyword: '',
      loading: false,
    }
  },

  computed: {
    ...mapState({
      list: state => state.edit.material.materialData.scene,
      invoked: state => state.edit.material.invoked,
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
      return `?source_scene_category_id=${this.currentCateId}&per_page=12`
    },

    // 添加新增上传图片
    sceneList() {
      const data = this.addFiles.concat(this.list.data)
      const len = this.addFiles.length
      const list = { ...this.list, data: data.slice(0, data.length - len) }
      return { ...list }
    },
  },

  methods: {
    getPanos(page) {
      this.loading = true
      const params = page ? `${this.params}&page=${page}` : this.params
      this.$store.dispatch(EDIT.MATERIAL.INIT, { url: '/user/sourcescene', params })
        .then(() => {
          this.loading = false
        })
    },

    /**
     * 选择不同的分类后，重新获取列表并清空选中项
     */
    selectCate(id) {
      if (id !== this.currentCateId) {
        this.currentCateId = id
        this.getPanos()
        this.checked = []
      }
    },

    pageChange(page) {
      this.getPanos(page)
    },

    selectPano({ id, vtour }, checked) {
      if (!this.disabledId.includes(id) && (vtour === undefined || vtour)) {
        if (checked || this.checked.includes(id)) {
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
    },

    // 移除场景素材图
    removeScene({ id }) {
      this.$confirm('确认删除该素材？', '提示', { type: 'warning' })
        .then(() => {
          this.$http.delete(`/user/sourcescene/${id}`)
            .then(() => {
              this.$message.success('删除成功!')

              // 重新请求当前列表
              let page = this.sceneList.current_page
              if (this.sceneList.data.length <= 1) {
                page -= 1
              }
              this.getPanos(page)
            })
            .catch((errors) => {
              this.errorHandler(errors)
            })
        })
    },

    createCate({ name = null, id = '' }) {
      const inputValidator = val => !!val
      let dialogTitle = '创建新分类'
      let type = 'post'

      if (id) {
        dialogTitle = '编辑分类'
        type = 'put'
      }
      this.$prompt('请输入分类名', dialogTitle, {
        closeOnPressEscape: false,
        closeOnClickModal: false,
        inputValue: name,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator,
        inputErrorMessage: '分类名不能为空',
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
    },

    // 删除场景素材分类
    removeCate({ id }) {
      this.$confirm('确认删除该分类？', '提示', { type: 'warning' })
        .then(() => {
          this.$http.delete(`/user/sourcescenecategory/${id}`)
            .then(() => {
              // 删除成功过滤列表数组
              this.cates = this.cates.filter(item => item.id !== id)
              this.$message.success('删除成功!')
            })
            .catch((errors) => {
              this.errorHandler(errors)
            })
        })
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

  .el-pagination {
    margin-top: 0;
    padding-bottom: 20px;
  }

  &__right {
    padding: 0 20px;
    border-left: var(--border);
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
    left: 10px;
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

.material-panos__submit {
  &--select {
    position: absolute;
    right: 0;
    bottom: -56px;
  }
}
</style>
