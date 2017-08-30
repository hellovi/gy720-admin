<template>
   <div class="edit-functions__material__wrap">
     <el-row :gutter="10" class="edit-functions__material__data"  v-loading="loading">
        <el-col :span="4" v-for="(item, index) in dataList" :key="item.id">
          <el-card v-if="item.file_ext !== 'mp3'" :body-style="{ padding: '0px' }">
            <img :src="$url.static(item.file_path)" class="edit-functions__material__image"/>
            <div>
              <div class="bottom clearfix">
                 <h6>{{ item.title }}</h6>
                <el-button
                  type="text" class="button"
                  v-show="selectStatus"
                  @click="selectMater(item.id, item.file_path)">
                  选择
                </el-button>
              </div>
            </div>
          </el-card>
          <!--音频格式的-->
          <el-card v-else :body-style="{ padding: '0px' }">
            <el-button type="text" @click="">试听</el-button>
            <el-dialog>
              <audio controls="controls">
                Your browser does not support the <code>audio</code> element.
               <source :src="$url.static(item.file_path)" type="audio/mp3">
            </audio>
            </el-dialog>

            <div>
              <div class="bottom clearfix">
                <h6>{{ item.title }}</h6>
                <el-button
                  type="text" class="button"
                  v-show="selectStatus"
                  @click="selectMater(item.id, item.file_path)"
                >选择
                </el-button>
              </div>
            </div>
          </el-card>

        </el-col>

        <div v-if="isEmpty" class="empty">
          <div>还没有上传素材哦……</div>
        </div>

     </el-row>

     <section class="edit-functions__material__upload">
      <app-file-upload
        v-model="src"
        ref="fileUpload"
        accept="jpg,jpeg,png,gif,mp3"
        @file-uploaded="addMaterial"
      >
          <el-button type="primary" size="small">上传新素材</el-button>
       </app-file-upload>
       <span>支持的文件格式：jpg,jpeg,png,gif,mp3 文件大小：15M以内</span>
     </section>
   </div>
</template>

<script>
/**
 * 高级编辑 - 图片素材
 * @version 2017-08-21
 */
import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
// import AppFileUpload from '@/components/AppFileUpload'
// import AppUploadProgress from '@/components/AppUploadProgress'

// 异步加载
const AppFileUpload = () => import('@/components/AppFileUpload')

export default {
  name: 'edit-functions__material--images',

  components: { AppFileUpload },

  props: {
    currentId: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      src: '',
      loading: false,
    }
  },

  computed: {
    ...mapState({
      type: state => state.edit.material.type,
      selectStatus: state => state.edit.material.selectStatus,
    }),

    dataList() {
      return this.$store.state.edit.material.materialData[this.type].data
    },

    params() {
      return `?tag_id=${this.currentId}`
    },

    isEmpty() {
      return !this.loading && (!this.dataList || !this.dataList.length)
    },
  },

  methods: {
    selectMater(id, url) {
      // 微信设置以及导览图
      this.$store.commit(EDIT.MATERIAL.SELECT, { id, url })
      this.$store.commit(EDIT.MODAL.CLOSE, 'material')
    },

    addMaterial(up, file) {
      const data = {
        title: file.name,
        tag_id: this.currentId,
        qiniu_key: this.src,
        file_size: file.size,
      }
      this.$store.dispatch(EDIT.MATERIAL.ADD, data)
    },

    initMaterial(page) {
      this.loading = true
      const params = page ? `${this.params}&page=${page}` : this.params
      this.$store.dispatch(EDIT.MATERIAL.INIT.NORMALS, { params })
        .then(() => {
          this.loading = false
        })
    },
  },

  created() {
    this.initMaterial(1)
  },

}
</script>

<style lang="postcss">


</style>
