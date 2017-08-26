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
    <app-cropper
      v-if="cropper && cropShow"
      :src="previemImg"
      :visible.sync="cropShow"
      :container-id="config.container"
      @crop="crop"
    ></app-cropper>
  </div>
</template>

<script>
/**
 * 文件上传组件
 * @author  chenliangshan | luminghuai
 * @version 2017/08/26
 */

import 'qiniu-js'

const AppCropper = () => import('@/components/AppCropper')
const domain = 'http://l-statics.gy720.com/'

export default {
  name: 'app-file-upload',

  components: {
    AppCropper,
  },

  props: {
    value: [String, Array],
    options: {
      type: Object,
      default() {
        return { }
      },
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    // 这里的默认值有问题
    staticUrl: {
      type: String,
      default: 'data/avatar/20170101/',
    },
    autoStart: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: 'gif',
    },
    size: {
      type: String,
      default: '4mb',
    },
    cropper: {
      type: Boolean,
      default: false,
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
      // 下面这两个是什么意思？？？
      singleFileSrc: !this.multiple && this.value && typeof this.value === 'string' ? this.value : null,
      multiFileSrc: this.multiple && this.value.length && typeof this.value !== 'string' ? this.value : [],
    }
  },

  watch: {
    previemImg(val) {
      this.$emit('preview', val)
    },
  },

  methods: {
    init() {
      const { container, browse_button } = this.config

      const options = {
        multi_selection: this.multiple,
        disable_statistics_report: true,
        runtimes: 'html5,flash,html4',
        container,
        browse_button,
        uptoken_func: () => this.getUpToken(),
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
        auto_start: this.autoStart,

        init: {
          /**
           * 文件添加进队列后,处理相关的事情
           * 检查每个文件的大小是否超出限制，超出则报错，并移除文件
           * 通过检查则为每个文件创建本地预览图片
           */
          FilesAdded: (up, files) => {
            files.forEach((file) => {
              this.getPreview(file, (dataUrl) => {
                this.previemImg = dataUrl
                this.cropShow = true
              })
            })
            this.$emit('files-added', up, files)
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

            if (this.multiple) {
              // 多文件
              this.multiFileSrc.push(src)

              // 更新value字段
              this.$emit('input', this.multiFileSrc)
            } else {
              let val = src

              if (this.cropper) {
                // 提交七牛裁剪
                val = window.Qiniu.imageMogr2({
                  crop: this.cropInfo,
                }, src)

                // 去除域名截取链接
                val = val.replace(domain, '')
              }

              // 单文件
              this.singleFileSrc = val

              // 更新value字段
              this.$emit('input', val)
            }
            this.$emit('file-uploaded', up, file, info)
          },

          /**
           * 上传出错时,处理相关的事情
           */
          Error: (up, err, errTip) => {
            // 这里的错误信息需要处理成中文
            this.$message.error(err.message)
            this.$emit('error', up, err, errTip)
          },

          /**
           * 队列文件处理完毕后,处理相关的事情
           */
          UploadComplete: () => {
            this.$emit('upload-complete')
          },

          /**
           * 若想在前端对每个文件的key进行个性化处理，可以配置该函数
           * 该配置必须要在 unique_names: false , save_key: false 时才生效
           * @author  hjz | chenliangshan
           */
          Key: (up, file) => {
            const random = Math.random().toString().slice(2)
            const pre = Date.now()
            const key = file.name.replace(/[^.]+/, pre)
            return `${this.staticUrl}${random}${key}`
          },
        },
      }

      this.uploader = window.Qiniu.uploader({ ...options, ...this.config })
    },

    /**
     * 确认剪裁后，存储剪裁信息，并触发上传
     */
    crop({ width, height, x, y }) {
      this.cropInfo = `!${width}x${height}a${x}a${y}`
      this.uploader.start()
    },

    /**
     * 生成预览图片
     * @param {File} file
     * @param {Function} callback
     */
    // eslint-disable-next-line
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
     * 若距离请求上一个uptoken已超过10分钟，就重新请求，否则使用缓存下来的uptoken
     */
    getUpToken() {
      const { uptoken, timestamp } = JSON.parse(localStorage.getItem('qiniu-uptoken')) || {}
      if (!uptoken || (Date.now() - timestamp) > 600000) {
        return this.ajaxUptoken()
      }
      return uptoken
    },

    /**
     * 请求uptoken
     * 这个请求是同步的，有问题，需要和良珊沟通
     */
    ajaxUptoken() {
      const ie = window.Qiniu.detectIEVersion()
      let uptoken = ''
      let ajax

      if (ie && ie <= 9) {
        ajax = new window.moxie.xhr.XMLHttpRequest()
      } else {
        ajax = window.Qiniu.createAjax()
      }

      ajax.open('GET', `/user/uptoken?${Date.now()}`, false)
      ajax.setRequestHeader('Content-Type', 'application/json')
      ajax.setRequestHeader('Accept', 'application/json')
      ajax.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
      const onreadystatechange = () => {
        if (ajax.readyState === 4 && ajax.status === 200) {
          const { status, result } = JSON.parse(ajax.responseText)
          if (status.code === 1 && result.uptoken) {
            uptoken = result.uptoken
            window.localStorage.setItem('qiniu-uptoken', JSON.stringify({
              uptoken,
              timestamp: Date.now(),
            }))
          }
        }
      }

      if (ie && ie <= 9) {
        ajax.bind('readystatechange', onreadystatechange)
      } else {
        ajax.onreadystatechange = onreadystatechange
      }

      ajax.send()

      return uptoken
    },
  },

  mounted() {
    this.init()
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
