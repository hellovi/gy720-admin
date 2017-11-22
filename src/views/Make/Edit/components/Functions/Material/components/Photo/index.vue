<template>
  <div class="photo-material" v-loading="loading">
    <el-row>
      <el-col class="photo-material__right">
        <el-row class="photo-material__header">
          <el-col :span="2">
            <el-checkbox v-model="allChecked" @change="selectAllPhotos">全选</el-checkbox>
          </el-col>
          <el-col class="text-right" :span="16">
            <div class="photo-material__header__count">
              已选择<span class="text-primary">{{ checked.length }}</span>个素材
            </div>
          </el-col>
          <el-col :span="6">
            <!--TODO 相册素材搜索字段-->
            <el-input
              size="small"
              placeholder="请输入素材名称"
              icon="search"
              v-model="keyword"
              :on-icon-click="searchPhotos"
            ></el-input>
          </el-col>
        </el-row>

        <div class="photo-material__content">
          <el-row :gutter="10">
            <el-col
              class="photo-material__item"
              v-for="photo in list.data"
              :key="photo.id"
              :span="6"
              @click.native="selectPhoto(photo)"
              :class="{disabled: disabledId.includes(photo.id)}"
            >
              <div class="photo-material__item-list">
                <el-checkbox
                  :disabled="disabledId.includes(photo.id)"
                  :value="disabledId.includes(photo.id) || checked.includes(photo.id)"
                  @change="selectPhoto(photo, $event.target.checked)"
                >
                </el-checkbox>
                <img
                  :src="$url.static(photo.file_path)"
                  :alt="photo.title">
                <el-row class="photo-material__item-footer">
                  <el-col :span="19">
                    <span class="ellipsis" v-show="photo.title">{{ photo.title }}</span>
                    <span v-show="!photo.title">&nbsp;</span>
                  </el-col>
                  <el-col :span="5" class="photo-material__item-tools">
                    <i role="button" v-show="!invoked" class="iconfont hover-warning" @click.stop="editItem(photo)">&#xe608;</i>
                    <i role="button" v-show="!invoked" class="iconfont hover-warning" @click.stop="removePhoto(photo)">&#xe615;</i>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>

        <el-pagination
          :small="isSmallScreen"
          v-if="list.last_page > 1"
          :page-size="list.per_page"
          :total="list.total"
          :current-page="list.current_page"
          @current-change="pageChange"
          layout="prev, pager, next"
        ></el-pagination>
      </el-col>
    </el-row>

    <slot name="footer" v-if="invoked" :checked="checkedphotos"></slot>

    <!-- 编辑素材弹框 -->
    <el-dialog title="编辑素材" :visible.sync="dialog.edit" v-append-to-body size="tiny">
      <el-form :model="form" :rules="rules" label-width="6em" ref="form">
        <el-form-item label="素材名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="素材类型" v-if="canMove">
          <el-select v-model="form.tag_id">
            <el-option
              v-for="option in options"
              :key="option.id"
              :label="option.name"
              :value="option.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 相册素材列表
 * @author chenliangshan
 * @version 2017-09-08
 */

import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import errorHandle from '@/mixins/errorHandle'
import material from '../../mixins/material'

export default {
  name: 'photo-material',

  mixins: [errorHandle, material],

  props: {
    activeId: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      checked: [], // 存放选中项的id
      keyword: '',
      loading: false,
      selectCateId: null,
    }
  },

  computed: {
    ...mapState({
      list: state => state.edit.material.materialData.photo,
      invoked: state => state.edit.material.invoked,
      isSmallScreen: state => state.edit.material.isSmallScreen,
    }),

    selected() {
      return this.$store.state.edit.material.selectedItems
    },

    // 过滤不可选择的全景图
    disabledId() {
      if (this.invoked) {
        // TODO 判断标识问题
        return this.selected.map(item => item.id)
      }
      return []
    },

    // 计算是否全选
    allChecked() {
      return this.checked.length && this.checked.length === this.list.data.length
    },

    // 计算选中的相册素材
    checkedphotos() {
      return this.list.data.filter(item => this.checked.includes(item.id))
    },

    params() {
      return `?tag_id=${this.activeId}&per_page=12&title=${this.keyword}`
    },
  },

  methods: {
    // 获取素材列表
    getPhotos(page) {
      this.loading = true
      const params = page ? `${this.params}&page=${page}` : this.params
      this.$store.dispatch(EDIT.MATERIAL.INIT, { url: '/user/source', params })
        .then(() => {
          this.loading = false
        })
    },

    // 搜索素材
    searchPhotos() {
      this.getPhotos()
    },

    // 分页请求
    pageChange(page) {
      this.getPhotos(page)
    },

    // 选择素材
    selectPhoto({ id }, checked) {
      if (!this.disabledId.includes(id)) {
        if (checked || this.checked.includes(id)) {
          this.checked = this.checked.filter(item => item !== id)
        } else {
          this.checked.push(id)
        }
      }
    },

    // 全选素材
    selectAllPhotos() {
      if (this.allChecked) {
        this.checked = []
      } else {
        this.checked = this.list.data.map(item => item.id)
      }
    },

    // 移除相册素材图
    removePhoto({ id }) {
      this.$confirm('确定要删除该项目么？删除后不可以恢复。', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$store.dispatch(EDIT.MATERIAL.REMOVE, id)
            .then(() => this.$message.success('删除成功'))
        })
    },
  },

  created() {
    this.getPhotos()
  },
}
</script>


<style lang="postcss">
@import "vars.css";

:root {
  --border: 1px solid var(--gray-extra-light);
}

.photo-material {
  border-bottom: var(--border);
  position: relative;

  > .el-row {
    height: 100%;
  }

  .el-pagination {
    width: 100%;
    position: absolute;
    margin: 0;
    bottom: -4px;
  }

  &__right {
    height: 100%;
    padding: 0;
  }

  &__header {
    padding: 8px 0;
    border-bottom: var(--border);
    line-height: 30px;

    &__count {
      margin-right: 1em;
    }
    .el-button {
      padding: 8px 0;
    }
  }

  &__content {
    max-height: 384px;
    overflow-x: hidden;
    overflow-y: auto;
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

.photo-material__menu {
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

.photo-material__item {
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;
  transition: 0.2s;

  &-list {
    position: relative;
    background-color: #bfbfbf;
    background-origin: content-box;
    overflow: hidden;
    &:before {
      content: "";
      float: left;
      margin-bottom: 50%;
    }
    > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
    }
  }

  &:hover {
    opacity: 0.9;
  }

  .el-checkbox {
    position: absolute;
    top: 6px;
    left: 6px;
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

  &-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 24px;
    padding: 0 0.3em;
    background-color: rgba(0, 0, 0, .3);
    color: #fff;
    font-size: 12px;
    line-height: 24px;
  }

  &-tools {
    display: none;
    text-align: right;
  }

  &:hover &-tools {
    display: block;
  }
}

.material-photos__submit {
  &--select {
    position: absolute;
    right: 0;
    bottom: -56px;
  }
}

/* 兼容小分辨率屏幕 */
@media screen and (max-height: 760px) {
  .photo-material {
    .el-pagination {
      bottom: 6px;
    }

    &__content {
      max-height: 320px;
    }
  }
}
</style>
