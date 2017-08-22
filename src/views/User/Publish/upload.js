/**
 * @typedef {Object} File
 * @property {string} id - 用作上传时的upload_id
 * @property {string} name - 场景名称
 * @property {number} percent - 上传进度
 * @property {number} [source_scene_id] - 上传成功后分配的场景id
 * @property {string} [preview] - 预览，可能是base64字符串，或src地址
 * @property {boolean} [vtour] - 是否已切图
 */

const config = {
  runtimes: 'html5,flash,html4',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    Accept: 'application/json',
  },
}

export default {
  data() {
    return {
      files: [], /** @type {File[]} */
      fisheye_gid: null,
    }
  },

  computed: {
    /**
     * 筛选出已上传完毕（此时具有source_scene_id）但还未完成切图（vtour不为true）的file
     * 返回这些file对象的source_scene_id所组成的数组
     * 用于查询切图状态
     */
    source_scene_ids() {
      return this.files
        .map(file => !file.vtour && file.source_scene_id)
        .filter(source_scene_id => source_scene_id)
    },
  },

  methods: {
    /**
     * 更新files数组中的某个对象
     * @param {string} id - 需要更新的file对象的id
     * @param {Object} update - 需要更新的数据
     */
    updateFile(id, update) {
      const index = this.files.findIndex(file => file.id === id)
      this.files = [
        ...this.files.slice(0, index),
        { ...this.files[index], ...update },
        ...this.files.slice(index + 1),
      ]
    },

    initNormalUpload(browse_button) {
      const uploader = new window.plupload.Uploader({
        ...config,
        browse_button,
        url: '/user/sourcescene/uploadnormal',

        init: {
          FilesAdded: (up, files) => {
            [...files].forEach((file) => {
              // 为每个文件生成一个file对象，推入files数组
              const { id, name, percent } = file
              this.files.push({
                id,
                name: name.replace(/\.[^.]+$/, ''),
                percent,
              })

              // 为每个文件生成缩略图，并更新到对应的file对象
              if ('FileReader' in window) {
                const reader = new FileReader()
                reader.addEventListener('load', (event) => {
                  const preview = event.target.result
                  this.updateFile(id, { preview })
                })
                reader.readAsDataURL(file.getNative())
              } else {
                const preloader = new window.mOxie.Image()
                preloader.onload = () => {
                  preloader.downsize({
                    width: 100,
                    height: 100,
                  })
                  preloader.crop(100)
                  const preview = preloader.getAsDataURL('image/jpeg', 80)
                  this.updateFile(id, { preview })
                  preloader.destroy()
                }
                preloader.load(file.getSource())
              }
            })

            // 自动开始上传
            up.start()
          },

          BeforeUpload: (up, file) => {
            uploader.setOption('multipart_params', {
              upload_id: file.id,
            })
          },

          UploadProgress: (up, file) => {
            const { id, percent } = file
            this.updateFile(id, {
              percent: percent - 1,
            })
          },

          FileUploaded: (up, file, res) => {
            const { result: { source_scene_id } } = JSON.parse(res.response)
            this.updateFile(file.id, {
              percent: 100,
              source_scene_id,
            })
          },
        },
      })

      uploader.init()
    },

    initFisheyeUpload(browse_button) {
      const uploader = new window.plupload.Uploader({
        ...config,
        browse_button,
        url: '/user/sourcescene/uploadfisheye',

        init: {
          FilesAdded: (up, files) => {
            // 检查选择的文件个数，不为4时报错并移除所选择的文件
            if (files.length !== 4) {
              this.$message.error('鱼眼图上传，请一次选择4张图片')
              files.forEach(file => up.removeFile(file))
            } else {
              // 使用第一张图片的信息作为整个场景的信息，生成一个file对象，推入files数组
              const { id, name, percent } = files[0]
              this.files.push({
                id,
                name: name.replace(/\.[^.]+$/, ''),
                percent,
              });

              // 为每个文件添加`group`字段用于标识组别，其值设为该组第一张图片的`id`
              // eslint-disable-next-line
              [...files].forEach((file) => { file.group = id })

              // 自动开始上传
              up.start()
            }
          },

          BeforeUpload: (up, file) => {
            uploader.setOption('multipart_params', {
              fisheye_nums: up.files.length,
              fisheye_item_id: file.id,
              upload_id: file.id,
              // 第一张图片上传完毕后接口将返回fisheye_gid，
              // 后续的图片上传时需要带上这个参数
              ...(this.fisheye_gid ? { fisheye_gid: this.fisheye_gid } : {}),
            })
          },

          UploadProgress: (up, file) => {
            const { group, percent } = file
            this.updateFile(group, {
              percent: percent - 1,
            })
          },

          FileUploaded: (up, file, res) => {
            // 后端返回的response前会多出一串“stitching successfully ”，必须手动处理掉
            const response = res.response.replace(/[^{]*(?=\{)/, '')
            const { result: { fisheye_gid, preview_image, source_scene_id } } = JSON.parse(response)

            this.fisheye_gid = fisheye_gid

            if (preview_image) {
              this.updateFile(file.group, {
                percent: 100,
                source_scene_id,
                preview: this.$url.host(preview_image),
              })
            }
          },

          UploadComplete: () => {
            this.fisheye_gid = null
          },
        },
      })

      uploader.init()
    },
  },

  mounted() {
    this.initNormalUpload('normal')
    this.initFisheyeUpload('fisheye')

    this.timer = setInterval(() => {
      if (this.source_scene_ids.length) {
        this.$http.post('/user/sourcescene/vtourprocess', {
          source_scene_ids: this.source_scene_ids,
        })
      }
    }, 5000)
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },
}
