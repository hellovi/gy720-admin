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
  </div>
</template>

<script>
  /**
   * 文件上传组件
   * @author  chenliangshan
   * @version 2017/08/14
   */

  import 'qiniu-js'

  // 生成一个随机字符串
  const uid = Math.random().toString(36).substring(3, 8)
  // 默认配置
  const defConfig = {
    container: `app-file-upload-container__${uid}`,
    browse_button: `app-file-upload-pickfiles__${uid}`,
    auto_start: true,
  }

  export default {
    name: 'app-file-upload',
    props: {
      value: [String, Array],
      options: {
        type: Object,
        default() {
          return {
            ...defConfig,
          }
        },
      },
      multiple: {
        type: Boolean,
        default: false,
      },
      staticUrl: {
        type: String,
        default: 'data/avatar/20170101/',
      },
      accept: {
        type: String,
        default: 'jpg, jpeg, gif, png',
      },
      size: {
        type: String,
        default: '4mb',
      },
    },
    data() {
      return {
        config: { ...defConfig, ...this.options },
        uploader: {},
        singleFileSrc: !this.multiple && this.value && typeof this.value === 'string' ? this.value : null,
        multiFileSrc: this.multiple && this.value.length && typeof this.value !== 'string' ? this.value : [],
      }
    },
    methods: {
      init() {
        /*eslint-disable*/
        const self = this
        const defOptions = {
          multi_selection: this.multiple,                   // 是否可选择多个文件
          disable_statistics_report: true,                  // 禁止自动发送上传统计信息到七牛，默认允许发送
          runtimes: 'html5,flash,html4',                    // 上传模式,依次退化
          browse_button: self.config.browse_button,         // 上传选择的点选按钮，**必需**
          // 在初始化时，uptoken, uptoken_url, uptoken_func 三个参数中必须有一个被设置
          // 切如果提供了多个，其优先级为 uptoken > uptoken_url > uptoken_func
          // 其中 uptoken 是直接提供上传凭证，uptoken_url 是提供了获取上传凭证的地址，如果需要定制获取 uptoken 的过程则可以设置 uptoken_func
          // uptoken : '<Your upload token>',               // uptoken 是上传凭证，由其他程序生成
          uptoken_url: '/api/qiniu/uptoken',                // Ajax 请求 uptoken 的 Url，**强烈建议设置**（服务端提供）
          // uptoken_func: function(file){                  // 在需要获取 uptoken 时，该方法会被调用
          //    // do something
          //    return uptoken;
          // },
          get_new_uptoken: false,                           // 设置上传文件的时候是否每次都重新获取新的 uptoken
          // downtoken_url: '/downtoken',
          // Ajax请求downToken的Url，私有空间时使用,JS-SDK 将向该地址POST文件的key和domain,服务端返回的JSON必须包含`url`字段，`url`值为该文件的下载地址
          // unique_names: true,                            // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
          // save_key: true,                                // 默认 false。若在服务端生成 uptoken 的上传策略中指定了 `save_key`，则开启，SDK在前端将不对key进行任何处理
          domain: self.$url.static(),                       // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
          container: self.config.container,                 // 上传区域 DOM ID，默认是 browser_button 的父元素，
          max_file_size: '10mb',                            // 最大文件体积限制
          filters: {
            mime_types: [
              { extensions : self.accept },                 // 上传文件格式
            ]
          },
          flash_swf_url: 'path/of/plupload/Moxie.swf',      // 引入 flash,相对路径
          max_retries: 3,                                   // 上传失败最大重试次数
          dragdrop: true,                                   // 开启可拖曳上传
          drop_element: self.config.container,              // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
          chunk_size: self.chunkSize(self.size),            // 分块上传时，每块的体积
          auto_start: self.config.auto_start,               // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
          //x_vars : {
          //    自定义变量，参考http://developer.qiniu.com/docs/v6/api/overview/up/response/vars.html
          //    'time' : function(up,file) {
          //        var time = (new Date()).getTime();
          // do something with 'time'
          //        return time;
          //    },
          //    'size' : function(up,file) {
          //        var size = file.size;
          // do something with 'size'
          //        return size;
          //    }
          //},
          init: {
            FilesAdded(up, files) {
              plupload.each(files, function(file) {
                // 文件添加进队列后,处理相关的事情
                if (file.size > self.getSize(options.chunk_size)) {
                  self.$message.error('文件大小超出限制')
                  return false
                }
                // 获取预览图片
                self.previewImage(file, (imgSrc) => {
                  self.$emit('preview', imgSrc)
                })
              });
            },
            BeforeUpload(up, file) {
              // 每个文件上传前,处理相关的事情
            },
            UploadProgress(up, file) {
              // 每个文件上传时,处理相关的事情
            },
            FileUploaded(up, file, info) {
              // 每个文件上传成功后,处理相关的事情
              // 其中 info.response 是文件上传成功后，服务端返回的json，形式如
              // {
              //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
              //    "key": "gogopher.jpg"
              //  }
              // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

              // var domain = up.getOption('domain');
              // var res = parseJSON(info.response);
              // var sourceLink = domain + res.key; 获取上传成功后的文件的Url

              const res = JSON.parse(info.response)

              // 文件路径
              const src = res.key

              if (self.multiple) {
                // 多文件
                self.multiFileSrc.push(src)

                // 更新value字段
                self.$emit('input', self.multiFileSrc)
              } else {
                // 单文件
                self.singleFileSrc = src

                // 更新value字段
                self.$emit('input', src)
              }
            },
            Error(up, err, errTip) {
              //上传出错时,处理相关的事情
              const type = err.file.type
              const filterType = options.filters.mime_types
              let t = []

              // 文件类型错误
              filterType.forEach((val) => {
                val.extensions.split(',').forEach((v) => {
                  t.push(v)
                })
              })

              if (!/\.(t.join('|'))$/.test(type)) {
                self.$message.error(`文件类型必须是${t.join(',')}中的一种`)
              }

              window.console.error(errTip)
            },
            UploadComplete() {
              //队列文件处理完毕后,处理相关的事情
            },
            Key(up, file) {
              // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
              // 该配置必须要在 unique_names: false , save_key: false 时才生效

              // @author  hjz | chenliangshan
              const ran = Number.parseInt(Math.random() * 100000, 10)
              const pre = Date.now()
              const key = file.name.replace(/[^.]+/, pre)
              return `${self.staticUrl}${ran}${key}`
            },
          },
        }

        const options = { ...defOptions, ...self.config }
        const uploader = Qiniu.uploader({ ...options })

        self.uploader = uploader
      },
      getNumber(maxSize) {
        return parseFloat(maxSize.match(/\d+(\.\d+)?/g).join(''))
      },
      getUnit(maxSize) {
        return maxSize.match(/[^\d\.]/g).join('').toLowerCase()
      },
      getSize(maxSize) {
        const size = this.getNumber(maxSize)
        const unit = this.getUnit(maxSize) || 'kb'
        switch (unit) {
          case 'kb':
            return size * 1024
            break
          case 'mb':
            return size * 1024 * 1024
            break
          case 'gb':
            return size * 1024 * 1024 * 1024
            break
          default:
            return size
        }
      },
      chunkSize(maxSize) {
        return this.getUnit(maxSize) ? maxSize : `${maxSize}kb`
      },
      previewImage(file, callback) {
        // file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
        if (!file || !/image\//.test(file.type)){ // 确保文件是图片
          return false
        }
        if (file.type === 'image/gif') { // gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
          let fr = new mOxie.FileReader();
          fr.onload = function () {
            callback(fr.result);
            fr.destroy();
            fr = null;
          }
          fr.readAsDataURL(file.getSource());
        } else {
          let preloader = new mOxie.Image();
          preloader.onload = function () {
            // preloader.downsize(300, 300);//先压缩一下要预览的图片,宽300，高300
            const imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL();
            // 得到图片src,实质为一个base64编码的数据
            callback && callback(imgsrc); // callback传入的参数为预览图片的url
            preloader.destroy();
            preloader = null;
          };
          preloader.load(file.getSource());
        }
      }
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
