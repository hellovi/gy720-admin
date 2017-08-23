<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="title"
    :visible.sync="show"
    @close="closeCropper"
  >
    <div class="app-cropper">
      <div class="app-cropper__left">
        <img
          :src="src"
          alt="图像"
          ref="preview"
        >
      </div>
      <el-row class="app-cropper__sub">
        <div
          :is="fileUploadCom"
          :accept="fileUpload.$props.accept"
          :size="fileUpload.$props.size"
          :options="fileUploadConfig"
          @preview="getPreview"
        >
          <el-button type="info">换一张</el-button>
        </div>
        <el-button type="success" @click="subCropper">上传所选区域</el-button>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
  /**
   * 图片截图组件 | 依赖 element-ui
   * @author  chenliangshan
   * @version 2017/08/22
   */

  import AppFileUpload from '@/components/AppFileUpload'
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.css'
  import '@/utils/base64'

  export default {
    name: 'app-cropper',
    props: {
      src: {
        type: String,
        default: '',
      },
      visible: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: '上传图片',
      },
      aspectRatio: {
        type: Number,
        default: 1,
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
        fileUploadCom: AppFileUpload,
        show: this.visible,
        cropper: null,
        cropInfo: {},
      }
    },
    computed: {
      fileUpload() {
        let parent = this.$parent
        while (parent.$options.name !== 'app-file-upload') {
          parent = parent.$parent
        }
        return parent
      },
      fileUploadConfig() {
        const fileUpload = this.fileUpload.$props
        return {
          ...fileUpload.options,
          browse_button: `${fileUpload.options.browse_button}-corp`,
          container: `${fileUpload.options.container}-corp`,
        }
      },
    },
    watch: {
      visible(val) {
        this.show = val
      },
      show(val) {
        this.$emit('update:visible', val)
      },
    },
    methods: {
      init() {
        this.$nextTick(() => {
          this.cropper = new Cropper(this.$refs.preview, {
            viewMode: 1,
            dragMode: 'move',
            aspectRatio: this.aspectRatio,
            autoCropArea: 0.8,
            crop: (data) => {
              const detail = {}
              Object.keys(data.detail).forEach((v) => {
                detail[v] = +Math.round(data.detail[v])
              })

              this.cropInfo = {
                ...detail,
                maxWidth: data.srcElement.width,
                maxHeight: data.srcElement.height,
              }
            },
            ...this.options,
          })
        })
      },
      // 换一张更新父级组件字段
      getPreview(src) {
        this.cropper.destroy()
        this.init()
        this.$emit('update:src', src)
      },
      // 关闭截图窗口回调函数
      closeCropper(data) {
        this.$emit('close', data)
      },
      // 确认裁剪
      subCropper() {
        const { width, height, x, y } = this.cropInfo
        this.crop = `!${width}x${height}a${x}a${y}`
        this.$emit('cropView', { crop: this.crop, options: this.cropInfo })

        // 生成裁剪后的图片
        const srcUrl = this.cropper.getCroppedCanvas({
          fillColor: '#fff',
        }).toDataURL('image/jpeg')
        this.$emit('update:src', srcUrl)
      },
    },
    mounted() {
      this.init()
    },
  }
</script>

<style lang="postcss">
  .app-cropper{
    &__left {
      max-height: 350px;
    }
    &__sub {
      padding-top: 20px;
      text-align: center;
      .el-button + .el-button {
        margin-left: 40px;
      }
    }
  }
</style>
