<template>
  <div class="cert-upload">
    <app-file-upload
      v-model="src"
      cropper
      accept="jpg,jpeg,png"
      size="1mb"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @crop-success="getPreview"
      @before-upload="beforeUpload"
      @upload-progress="uploadProgress"
      @upload-complete="uploadComplete"
      @error="uploadError"
      :crop-options="{aspectRatio: scale}"
      class="cert-upload__file"
      v-bind:style="{width:width +'px',height:(width/scale) +'px'}"
    >
      <img v-qiniu-src="src" :data-src="`${require(`../assets/${background}`)}`" v-show="!progress">
      <app-upload-progress
        slot="progress"
        :src="uploadSrc"
        :progress="progress"
        v-show="progress > 0 && progress <= 100"
      ></app-upload-progress>
    </app-file-upload>
  </div>
</template>

<script>

  import AppUploadProgress from '@/components/AppUploadProgress'
  // 异步加载
  const AppFileUpload = () => import('@/components/AppFileUpload')

  export default {
    name: 'cert-upload',
    components: {
      AppFileUpload,
      AppUploadProgress,
    },

    props: {
      value: {
        type: String,
        default: '',
      },
      width: {
        type: Number,
        default: 156,
      },
      scale: {
        type: Number,
        default: 1,
      },
      background: {
        type: String,
        default: 'front.jpg',
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
        }, 300)
      },

      // 监听上传出错
      uploadError() {
        this.progress = 0
      },

      // 构建完整
      getStatic(path) {
        return path ? this.$url.static(path) : ''
      },

      // 获取预览图
      getPreview({ preview }) {
        this.progress = 10
        this.uploadSrc = preview
      },

    },

  }
</script>

<style lang="postcss">
.cert-upload {
  display: inline-block;
  margin-right: 20px;
  & > div {
    vertical-align: middle;
  }
  &__file {
    cursor: pointer;
    border: 1px solid #bfcbd9;
    background-repeat: no-repeat;
    background-position: center center;
    background-size:100% 100%;
    img {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
    }
  }
}

</style>
