<template>
  <div class="user-avatar">
    <app-file-upload
      v-model="src"
      cropper
      accept="jpg,jpeg,png"
      size="1mb"
      @preview="getPreview"
      @before-upload="beforeUpload"
      @upload-progress="uploadProgress"
      @upload-complete="uploadComplete"
      v-bind:style="{backgroundImage: !getStatic(src) ? `url(${require('../assets/avatar-bg.jpg')})` : 'none'}"
      class="user-avatar__file"
    >
      <img :src="getStatic(src)">
      <app-upload-progress
        slot="progress"
        :src="uploadSrc"
        :progress="progress"
        v-if="progress"
      ></app-upload-progress>
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

  import AppUploadProgress from '@/components/AppUploadProgress'

  // 异步加载
  const AppFileUpload = () => import('@/components/AppFileUpload')

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
        previewStyle: {},
      }
    },
    watch: {
      value(val) {
        this.src = val
      },
      src(val) {
        this.$emit('input', val)
      },
    },
    methods: {
      // 监听上传前处理
      beforeUpload() {
        this.progress = 0
      },

      // 监听上传进度
      uploadProgress(up, file) {
        this.progress = parseInt(file.percent, 10)
      },

      // 监听上传完成
      uploadComplete() {
        setTimeout(() => {
          this.progress = 0
        }, 800)
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
      border: 1px solid #bfbfbf;
      background-repeat: no-repeat;
      background-position: center center;
      img {
        width: 100%;
        max-width: 100%;
        max-height: 100%;
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
