<template>
  <div class="user-avatar">
    <app-file-upload v-model="src"
                     ref="fileUpload"
                     accept="jpg,jpeg,png"
                     size="1mb"
                     @preview="getPreview"
                     v-bind:style="{backgroundImage: !getStatic(src) ? `url(${require('../assets/avatar-bg.jpg')})` : 'none'}"
                     class="user-avatar__file">
      <img :src="getStatic(src)">
      <app-upload-progress slot="progress"
                           :src="uploadSrc"
                           :progress="progress"
                           v-if="progress"></app-upload-progress>
    </app-file-upload>
    <div class="user-avatar__remark">
      <p>大小不超过1M</p>
      <p>像素不低于200*200</p>
      <p>支持格式：jpg,jpeg,png</p>
    </div>
  </div>
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
        return path && this.$url.static(path)
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
  .user-avatar {
    & > div {
      vertical-align: middle;
    }
    &__file {
      width: 90px;
      height: 90px;
      cursor: pointer;
      overflow: hidden;
      border: 1px solid #bfbfbf;
      background-repeat: no-repeat;
      background-position: center center;
      & img {
        width: 100%;
      }
    }
    &__remark {
      font-size: 12px;
      color: #999;
      padding-left: 10px;
      line-height: 14px;
      display: inline-block;
    }
  }

</style>
