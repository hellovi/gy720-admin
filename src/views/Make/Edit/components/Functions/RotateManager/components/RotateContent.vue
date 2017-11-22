<template>
  <div class="rotate-content" v-loading="loading">
    <ul class="rotate-list list clearfix">
      <rotate-item
        v-for="item in itemData.data"
        :key="item.id"
        :item="item"
        @open-upload="openUpload"
        @open-manage="openImages"
        @update="update"
        @viewer="viewerDialog"
        @remove="removeObject"
      ></rotate-item>

      <app-empty-body v-if="isEmpty">
        该分类下还未上传任何素材
      </app-empty-body>
    </ul>

    <el-pagination
      v-if="itemData.last_page > 1"
      :page-size="itemData.per_page"
      :total="itemData.total"
      :current-page="itemData.current_page"
      @current-change="pageChange"
      layout="prev, pager, next"
    ></el-pagination>

    <el-dialog
      title="上传物品3D图片"
      :visible.sync="dialog.upload"
      :close-on-click-modal="false"
      custom-class="rotate-upload-dialog"
      v-append-to-body
    >
      <rotate-upload v-if="dialog.upload" :id="activeItemId" @close="dialog.upload = false"></rotate-upload>
    </el-dialog>

    <el-dialog
      title="管理图片"
      :visible.sync="dialog.images"
      :close-on-click-modal="false"
      custom-class="rotate-image-dialog"
      v-append-to-body
    >
      <rotate-images v-if="dialog.images" :id="activeItemId"></rotate-images>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 管理3D物品 - 列表
 * @author yangjun | luminghuai | chenliangshan
 * @version 2017-08-31
 */

import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import RotateItem from './RotateItem'
import RotateForm from './RotateForm'
import RotateUpload from './RotateUpload'
import RotateImages from './RotateImages'
import modal from '../../../../mixins/modal'

const RotateView = () => import('./RotateView')

export default {
  name: 'rotate-content',

  mixins: [modal],

  components: {
    RotateItem,
    RotateForm,
    RotateUpload,
    RotateImages,
    RotateView,
  },

  props: {
    updatecate: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      dialog: {
        upload: false,
        images: false,
      },
      loading: false,
      activeItemId: '',
      rotateViewId: null,
      itemData: {},
      editItem: {},
    }
  },

  computed: {
    ...mapState({
      cates: state => state.edit.material.rotateCates,
      activeCateId: state => state.edit.material.activeRotateCateId,
      list: state => state.edit.material.materialData.rotate,
    }),

    isEmpty() {
      return !this.loading && (!this.itemData.data || !this.itemData.data.length)
    },
  },

  watch: {
    /**
     * 分类更改时，应根据分类重新获取列表
     */
    activeCateId(val) {
      this.getList(1, val)
    },

    updatecate(val) {
      if (val) {
        // 过滤移动分类
        this.itemData.data = this.itemData.data.filter(({ id }) => id !== this.editItem.id)
        this.editItem = {}
        this.$emit('update:updatecate', false)
      }
    },
  },

  methods: {
    /**
     * 获取物品3D列表
     * @param {number} page - 页数
     * @param {number} cateId - 分类id
     */
    getList(page = 1, cateId = this.activeCateId) {
      this.loading = true
      this.$http.get(`/user/sourcerotate?source_rotate_category_id=${cateId}&page=${page}`)
        .then(({ result }) => {
          this.itemData = result
          this.loading = false
        })
    },

    pageChange(page) {
      this.getList(page)
    },

    /**
     * 预览
     */
    viewerDialog({ id, title }) {
      this.openModal('object3dView')
      this.$store.commit(EDIT.MATERIAL.SELECT_OBJECT3D, { id, title })
    },

    /**
     * 询问是否删除
     */
    removeObject(id) {
      this.$confirm('确定要删除该项目么？删除后不可以恢复。', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => this.remove(id))
    },

    /**
     * 删除某项物品3D
     * @param {number} id - 删除项的id
     */
    remove(id) {
      this.$store.dispatch(EDIT.ROTATE.REMOVE, id)
        .then(() => {
          this.itemData.data = this.itemData.data.filter(item => item.id !== id)
          this.$message.success('操作成功')
        })
        .catch(({ status: { reason } }) => {
          this.$message.error(reason)
        })
    },

    /**
     * 打开修改窗口，填充修改项的数据
     */
    update(list) {
      this.editItem = list
      const data = this.itemData.data.find(item => item.id === list.id)
      this.$emit('update-rotate', data)
    },

    /** 打开上传图片窗口 */
    openUpload(id) {
      this.activeItemId = id
      this.dialog.upload = true
    },

    /** 打开图片管理窗口 */
    openImages(id) {
      this.activeItemId = id
      this.dialog.images = true
    },
  },

  created() {
    // 刷新当前分类
    this.$on('on-refresh-list', () => {
      this.getList()
    })

    // 更新编辑信息
    this.$on('on-update-list', (val) => {
      this.itemData.data = this.itemData.data
        .map((item) => {
          if (item.id === val.id) {
            return val
          }
          return item
        })
    })
  },
}
</script>

<style lang="postcss">
@import "vars.css";

:root {
  --item-count: 4;
  --item-gut: 10px;
  --total-item-gut: calc((var(--item-count) - 1) * var(--item-gut));

  --btn-width: 65px;
  --cover-width: calc(100% - var(--btn-width));
}

.rotate-content {
  height: 620px;
  overflow: hidden;
}
.rotate-list {
  height: 540px;
  padding: 0 10px;
  border-left: 1px solid var(--gray-extra-light);
}

.rotate-item {
  float: left;
  width: calc((100% - var(--total-item-gut)) / var(--item-count));
  padding: 5px;
  border: 1px solid var(--gray-extra-light);
  margin-bottom: var(--item-gut);

  &:not(:nth-child(4n + 1)) {
    margin-left: var(--item-gut);
  }

  &__img {
    float: left;
    width: var(--cover-width);
    height: 160px;
    max-width: var(--cover-width);
  }

  &__btns {
    float: right;
    width: var(--btn-width);
    padding-left: 5px;

    & > li {
      & + li {
        margin-top: 5px;
      }
    }

    .el-button {
      width: 100%;
    }
  }

  &__name {
    text-align: center;
    line-height: 2;
  }
}
</style>
