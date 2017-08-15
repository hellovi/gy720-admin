<template>
  <app-file-upload v-model="src" ref="fileUpload" @preview="getPreview" class="avatar-file">
    <img :src="getStatic(src)">
    <app-upload-progress slot="right"
                         :src="uploadSrc"
                         :progress="progress"
                         v-if="progress"></app-upload-progress>
  </app-file-upload>
</template>

<script>
  /**
   * 上传头像图片
   * @author  chenliangshan
   * @version 2017/08/14
   */

  import AppFileUpload from '@/components/AppFileUpload'
  import AppUploadProgress from '@/components/AppUploadProgress'

  export default {
    name: 'account-avatar',
    components: { AppFileUpload, AppUploadProgress },
    props: {
      value: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        src: this.value,
        progress: 0,
        uploadSrc: null,
      }
    },
    methods: {
      init() {
        const self = this
        const uploader = this.$refs.fileUpload.uploader

        // 监听上传前处理
        uploader.bind('BeforeUpload', () => {
          self.progress = 0
        })

        // 监听上传进度
        uploader.bind('UploadProgress', (up, file) => {
          self.progress = parseInt(file.percent, 10)
        })

        // 监听上传完成
        uploader.bind('UploadComplete', () => {
          setTimeout(() => {
            self.progress = 0
          }, 800)
        })
      },
      // 构建完整
      getStatic(path) {
        return this.$url.static(path)
      },
      // 获取预览图
      getPreview(src) {
        this.uploadSrc = src
      },
    },
    mounted() {
      this.init()
    },
    watch: {
      value(val) {
        this.src = val
      },
      src(val) {
        this.$emit('input', val)
      },
    },
  }
</script>

<style lang="postcss">
  .avatar-file {
    width: 90px;
    height: 90px;
    overflow: hidden;
    & img {
      width: 100%;
    }
  }
</style>
