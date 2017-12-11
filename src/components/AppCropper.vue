<template>
  <div class="app-cropper-wrap">
    <div class="app-cropper-img" :style="{width: cropWidth, height: cropHeight}">
      <img :src="src" alt="图像" ref="preview">
    </div>
    <div class="app-cropper-btns">
      <label role="button" class="el-button el-button--info" :for="inputId">换一张</label>
      <el-button type="success" @click="confirm">上传所选区域</el-button>
    </div>
  </div>
</template>

<script>
/**
 * 图片截图组件 | 依赖 element-ui
 * @author  chenliangshan | luminghuai
 * @version 2017/08/26
 */

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  name: 'app-cropper',

  props: {
    src: {
      type: String,
      default: '',
    },
    containerId: {
      type: String,
      required: true,
    },
    aspectRatio: {
      type: Number,
      default: 1,
    },
    cropWidth: {
      type: String,
      default: '100%',
    },
    cropHeight: {
      type: String,
      default: '350px',
    },
    options: {
      type: Object,
      default() {
        return {}
      },
    },
  },

  data() {
    return {
      cropper: null,
      cropInfo: {},
      inputId: '',
    }
  },

  watch: {
    // 重新选择图片后（触发src更新），应根据新的图片重建cropper实例
    src() {
      this.cropper.destroy()
      this.$nextTick(() => this.init())
    },
  },

  methods: {
    init() {
      this.cropper = new Cropper(this.$refs.preview, {
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: this.aspectRatio,
        autoCropArea: 0.8,
        crop: (event) => {
          this.cropInfo = Object.keys(event.detail).reduce((result, key) => ({
            ...result,
            [key]: Math.round(event.detail[key]),
          }), {
            maxWidth: event.target.width,
            maxHeight: event.target.height,
          })

          this.$emit('crop-view', event)
        },
        ...this.options,
      })
    },

    /**
     * 确认裁剪
     */
    confirm() {
      // 生成裁剪后的图片
      const srcUrl = this.cropper.getCroppedCanvas().toDataURL('image/png')
      this.$emit('crop', { ...this.cropInfo, preview: srcUrl, cropper: this.cropper })
    },
  },

  // 根据传入的containerId获取上传控件的id，供“换一张”按钮使用
  created() {
    this.inputId = document.getElementById(this.containerId).querySelector('input').id
  },

  mounted() {
    this.$nextTick(() => this.init())
  },

  beforeDestroy() {
    this.cropper.destroy()
  },
}
</script>

<style lang="postcss">
.app-cropper-img {
  width: 100%;
  height: 350px;
}

.app-cropper-btns {
  padding-top: 20px;
  text-align: center;

  .el-button {
    margin: 0 20px;
  }
}
</style>
