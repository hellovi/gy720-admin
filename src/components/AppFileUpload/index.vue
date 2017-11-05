<template>
  <div :id="config.container" class="app-file-upload">
    <slot name="left"></slot>
    <div :id="config.browse_button" class="app-file-upload__button">
      <slot>
        <el-button>选择文件</el-button>
      </slot>
    </div>
    <slot name="right"></slot>
    <slot name="progress"></slot>
    <el-dialog
      v-if="cropper"
      :title="cropTitle"
      :visible.sync="cropShow"
      :size="$attrs['dialog-size']"
      :close-on-click-modal="$attrs['close-on-click-modal']"
      :close-on-press-escape="$attrs['close-on-press-escape']"
      :modal="$attrs.modal"
    >
      <app-cropper
        :options="$attrs['crop-options']"
        :src="previemImg"
        :crop-width="$attrs['crop-width']"
        :crop-height="$attrs['crop-height']"
        :container-id="config.container"
        @crop="crop"
      ></app-cropper>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 文件上传组件
 * @author  chenliangshan | luminghuai
 * @version 2017/08/26
 */

import 'qiniu-js'
import yearMonthStr from '@/utils/yearMonthStr'
import { Url } from '@/utils'

// 上传错误信息提示-自定义
import customMessage from './customMessage'

const AppCropper = () => import('@/components/AppCropper')

const domain = `${Url.configHost.cdn}`

export default {
  name: 'app-file-upload',

  components: {
    AppCropper,
  },

  props: {
    value: [String, Array],
    options: {
      type: Object,
      default: () => ({}),
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    staticUrl: {
      type: String,
      default: 'data/avatar/',
    },
    customUrl: {
      type: String,
      default: '',
    },
    autoStart: {
      type: Boolean,
      default: true,
    },
    accept: {
      type: String,
      default: 'jpg,jpeg,gif,png',
    },
    size: {
      type: String,
      default: '4mb',
    },
    cropper: {
      type: Boolean,
      default: false,
    },
    cropTitle: {
      type: String,
      default: '裁剪图片',
    },
    cropQuery: {
      type: String,
      default: '',
    },
  },

  data() {
    const random = Math.random().toString(36).substring(3, 8)
    return {
      config: {
        container: `container--${random}`,
        browse_button: `picker--${random}`,
        ...this.options,
      },
      uploader: null,
      cropInfo: '',
      cropShow: false,
      previemImg: '',
      multiFileSrc: [],
      uploadStatus: false,
      fileInfo: {},
    }
  },

  computed: {
    isAutoStart() {
      if (this.cropper) {
        return false
      }
      return this.autoStart
    },
  },

  methods: {
    init(uptoken) {
      const { container, browse_button } = this.config

      const options = {
        multi_selection: this.multiple,
        disable_statistics_report: true,
        runtimes: 'html5,flash,html4',
        container,
        browse_button,
        uptoken,
        get_new_uptoken: false,
        domain,
        max_file_size: this.size,
        filters: {
          mime_types: [
            { title: 'Image files', extensions: this.accept },
          ],
        },
        flash_swf_url: '/assets/3.0.1/lib/plupload-2.1.4/js/Moxie.swf',
        max_retries: 3,
        dragdrop: true,
        drop_element: container,
        auto_start: this.isAutoStart,

        init: {
          /**
           * 文件添加进队列后,处理相关的事情
           * 检查每个文件的大小是否超出限制，超出则报错，并移除文件
           * 通过检查则为每个文件创建本地预览图片
           */
          FilesAdded: (up, files) => {
            files.forEach((file) => {
              this.getPreview(file, (dataUrl) => {
                // 卢 2017-09-02
                this.$emit('file-preview', {
                  ...file,
                  preview: dataUrl,
                })

                this.previemImg = dataUrl
                if (!this.uploadStatus && this.cropper) {
                  this.cropShow = true
                  this.fileInfo = file
                  // 删除原图阵列并把裁剪后图片添加到阵列
                  this.uploader.removeFile(file)
                }
              })
            })
            this.$emit('files-added', up, files)
          },

          /**
           * 文件删除回调处理相关事情
           */
          FilesRemoved: (up, files) => {
            this.$emit('files-removed', up, files)
          },

          /**
           * 每个文件上传前,处理相关的事情
           * 可用于动态地添加表单参数等
           */
          BeforeUpload: (up, file) => {
            this.$emit('before-upload', up, file)
          },

          /**
           * 每个文件上传时,处理相关的事情
           */
          UploadProgress: (up, file) => {
            this.$emit('upload-progress', up, file)
          },

          /**
           * 每个文件上传成功后,处理相关的事情
           * 服务端返回的json格式为`{"hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98","key": "gogopher.jpg"}`
           * 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
           * @param {Object} info
           * @param {string} info.response - 服务端返回的json字符串，
           */
          FileUploaded: (up, file, info) => {
            const res = JSON.parse(info.response)
            // 文件路径
            const src = res.key
            let val = src

            if (this.cropper) {
              // 提交七牛裁剪
              val = window.Qiniu.imageMogr2({
                crop: this.cropInfo,
              }, src)
              /**
               * 去除域名截取链接
               * 七牛图片处理参数
               */
              const cropQuery = this.cropQuery ? `${this.cropQuery}` : ''
              val = `${val.replace(domain, '')}${cropQuery}`
            }

            // 更新value字段
            if (!this.multiple) {
              this.$emit('input', val)
            }
            this.multiFileSrc.push(val)
            this.$emit('file-uploaded', up, file, info)
          },

          /**
           * 上传出错时,处理相关的事情
           */
          Error: (up, err, errTip) => {
            this.uploadStatus = false
            this.$message.error(customMessage({ up, err, errTip }))
            this.$emit('error', up, err, errTip)
          },

          /**
           * 队列文件处理完毕后,处理相关的事情
           */
          UploadComplete: () => {
            this.uploadStatus = false
            if (this.multiple) {
              this.$emit('input', this.multiFileSrc)
            }
            this.multiFileSrc = []
            this.$emit('upload-complete')
          },

          /**
           * 若想在前端对每个文件的key进行个性化处理，可以配置该函数
           * 该配置必须要在 unique_names: false , save_key: false 时才生效
           * @author  hjz | chenliangshan
           */
          Key: (up, file) => {
            const random = Math.random().toString().slice(2, 7)
            const pre = Date.now()
            const getFileSuffix = (name) => {
              const arr = name.split('.')
              return `.${arr[arr.length - 1]}`
            }
            const key = `${pre}${getFileSuffix(file.name)}`
            const srcUrl = this.customUrl || `${this.staticUrl}${yearMonthStr()}`
            return `${srcUrl}/${random}${key}`
          },
        },
      }

      this.uploader = window.Qiniu.uploader({ ...options, ...this.config })
      this.$emit('init', this.uploader)
    },

    /**
     * 确认裁剪后，存储裁剪信息，并触发上传
     */
    crop(data) {
      this.cropShow = false
      this.uploadStatus = true
      // this.cropInfo = `!${data.width}x${data.height}a${data.x}a${data.y}`
      this.cropInfo = `!${data.width}x${data.height}a0a0`
      if (this.autoStart) {
        // 添加裁剪后图片文件到上传阵列
        this.uploader.addFile(this.convertBase64UrlToBlob(data.preview), this.fileInfo.name)
        // 手动开始上传
        this.uploader.start()
      }
      this.$emit('crop-success', data, this.uploader)
    },

    // 将base64格式图片转换为文件形式
    convertBase64UrlToBlob(urlData) {
      // 去掉url的头，并转换为byte
      const bytes = window.atob(urlData.split(',')[1])
      // 处理异常,将ascii码小于0的转换为大于0
      const ab = new ArrayBuffer(bytes.length)
      const ia = new Uint8Array(ab)

      for (let i = 0; i < bytes.length; i += 1) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: this.fileInfo.type })
    },

    /**
     * 生成预览图片
     * @param {File} file
     * @param {Function} callback
     */
    getPreview(file, callback) {
      if (file && /image\//.test(file.type)) {
        const hasNative = 'FileReader' in window
        const reader = hasNative ? new FileReader() : new window.mOxie.FileReader()
        const fileData = hasNative ? file.getNative() : file.getSource()

        reader.onload = () => {
          callback(reader.result)
          if (reader.destroy) reader.destroy()
        }
        reader.readAsDataURL(fileData)
      }
    },

    /**
     * 获取uptoken
     * 若距离请求上一个uptoken已超过50分钟，就重新请求，否则使用缓存下来的uptoken
     */
    getUpToken() {
      const { uptoken, timestamp } = JSON.parse(localStorage.getItem('qiniu-uptoken')) || {}
      if (!uptoken || (Date.now() - timestamp) > 600000 * 5) {
        return false
      }
      return uptoken
    },

    /**
     * 请求uptoken
     */
    ajaxUptoken() {
      let uptoken = ''
      this.$http.get(`/user/uptoken?${Date.now()}`)
        .then((res) => {
          const { status, result } = res
          if (status.code === 1 && result.uptoken) {
            uptoken = result.uptoken
            // 实例Qiniu
            this.init(uptoken)
            // 设置|更新-本地存储
            window.localStorage.setItem('qiniu-uptoken', JSON.stringify({
              uptoken,
              timestamp: Date.now(),
            }))
          }
        })
    },
  },

  mounted() {
    const upToken = this.getUpToken()
    if (upToken) {
      this.init(upToken)
    } else {
      this.ajaxUptoken()
    }
  },
}
</script>

<style lang="postcss">
.app-file-upload{
  display: inline-block;
  line-height: 0;

  &__button {
    width: 100%;
    height: 100%;
    display: inline-block;
  }
}
</style>
