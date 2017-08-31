<template>
  <div>
    <ul class="material-list clearfix list">
      <li
        v-for="item in list.data"
        :key="item.id"
        class="material-list__item"
      >
        <audio-item v-if="item.file_ext === 'mp3'" :item="item"></audio-item>
        <image-item v-else :item="item"></image-item>
      </li>
    </ul>

      <div v-if="isEmpty" class="empty">
        <div>还没有上传素材哦……</div>
      </div>

      <el-pagination
        v-if="list.last_page > 1"
        :page-size="list.per_page"
        :total="list.total"
        :current-page="list.current_page"
        @current-change="pageChange"
        layout="prev, pager, next"
      ></el-pagination>
   </div>
</template>

<script>
/**
 * 高级编辑 - 图片素材
 * @version 2017-08-21
 */
import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import AppUploadProgress from '@/components/AppUploadProgress'
import ImageItem from './ImageItem'
import AudioItem from './AudioItem'

// 异步加载
const AppFileUpload = () => import('@/components/AppFileUpload')

export default {
  name: 'edit-functions__material--images',

  components: {
    AppFileUpload,
    AppUploadProgress,
    ImageItem,
    AudioItem,
  },

  props: {
    activeId: {
      type: Number,
      required: true,
    },
    activeType: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
    }
  },

  computed: {
    ...mapState({
      selectStatus: state => state.edit.material.selectStatus, // 待调整
    }),

    list() {
      return this.$store.state.edit.material.materialData[this.activeType]
    },

    isEmpty() {
      return !this.loading && (!this.list.data || !this.list.data.length)
    },
  },

  methods: {
    addMaterial(up, file) {
      const data = {
        title: file.name,
        tag_id: this.currentId,
        qiniu_key: this.src,
        file_size: file.size,
      }
      this.$store.dispatch(EDIT.MATERIAL.ADD, data)
    },

    /**
     * 获取列表数据
     * 物品3D与其它类型接口不一样，需要做判断
     * @param {number} page
     */
    getMaterials(page = 1) {
      this.loading = true

      const url = this.activeType === 'objects'
        ? '/user/sourcerotate'
        : '/user/source'
      const params = `?tag_id=${this.activeId}&page=${page}`

      // 这里需要做接口错误处理
      this.$store.dispatch(EDIT.MATERIAL.INIT.NORMALS, { url, params })
        .then(() => {
          this.loading = false
        })
    },

    pageChange(page) {
      this.getMaterials(page)
    },
  },

  created() {
    this.getMaterials()
  },

}
</script>

<style lang="postcss">
:root {
  --row-count: 5;
  --gut-count: calc(var(--row-count) - 1);
  --gut-width: 15px;
  --total-gut-width: var(--gut-count) * var(--gut-width);
}

.material-list {
  padding-bottom: 20px;
  &__item {
    float: left;
    width: calc((100% - var(--total-gut-width)) / var(--row-count));
    margin-bottom: var(--gut-width);

    &:not(:nth-child(5n + 1)) {
      margin-left: var(--gut-width);
    }
  }
}
</style>
