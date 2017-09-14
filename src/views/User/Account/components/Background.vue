<template>
  <el-tooltip placement="right">

    <div slot="content" class="background-upload__remark">
      <p>大小不超过 1M</p>
      <p>推荐像素 1920 * 500</p>
      <p>支持格式：jpg、jpeg、png</p>
    </div>

    <div class="background-upload">
      <app-file-upload
        v-model="src"
        cropper
        accept="jpg,jpeg,png"
        size="1MB"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @crop-success="getPreview"
        @before-upload="beforeUpload"
        @upload-progress="uploadProgress"
        @upload-complete="uploadComplete"
        @error="uploadError"
        :crop-options="{aspectRatio: 3.9}"
        class="background-upload__file"
        v-bind:style="{backgroundImage: !getStatic(src) ? `url(${require('../assets/background-bg.jpg')})` : 'none',}"
      >
        <img :src="getStatic(src)" v-show="!progress && src">
        <app-upload-progress
          slot="progress"
          :src="uploadSrc"
          :progress="progress"
          v-if="progress"
        ></app-upload-progress>
      </app-file-upload>
    </div>

  </el-tooltip>
</template>

<script>
  /**
   * 上传主页背景图片
   * @author  zhoumenglin
   * @version 2017/09/08
   */

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
        this.uploadSrc = preview
      },

    },

  }
</script>

<style lang="postcss">
.background-upload {
  &>div {
    vertical-align: middle;
  }
  &__file {
    width: 365px;
    height: 94px;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    img {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
    }
  }

  &__remark {
    font-size: 12px;
    line-height: 2;
    padding: 0 6px;
    display: inline-block;

    p {
      margin: 0;
    }
  }
}
</style>
