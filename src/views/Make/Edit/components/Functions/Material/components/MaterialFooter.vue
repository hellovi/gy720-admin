<template>
  <footer class="material-footer">
    <span v-if="activeType === 'scene'">
      <div class="el-button btn-primary" id="normal">上传2:1全景图</div>
      <div class="el-button btn-primary" id="fisheye">上传4张鱼眼图</div>
    </span>
    <el-button type="primary" v-if="activeType === 'article'" @click="openImageTextAdd">添加图文信息</el-button>
    <el-button type="primary" v-if="activeType === 'rotate'" @click="openObjectManage">管理物品3D</el-button>

    <div v-if="activeType && !['scene', 'article', 'rotate'].find(item => item === activeType)">
      <div class="material-progress" v-if="currentFile && currentFile.percent > 0 && currentFile.percent < 100">
        <el-progress :percentage="currentFile.percent"></el-progress>
      </div>
      <!-- 使用key以保证每次素材类型改变后，都会重新生成一个上传实例 ，以便应用新的accpet、size等限制 -->
      <app-file-upload
        :key="this.activeType"
        ref="fileUpload"
        multiple
        :accept="limit.mimeTypes"
        :size="limit.size"
        :static-url="uploadPath"
        :auto-start="false"
        @init="init"
        @files-added="filesAdded"
        @upload-progress="uploadProgress"
        @file-uploaded="fileUploaded"
      >
        <el-button type="primary">上传新素材</el-button>
      </app-file-upload>
      <span v-if="currentFile">{{ currentFile.name }}</span>
      <ul v-else class="material-footer__desc list">
        <li>支持的文件格式：{{ limit.mimeTypes }}</li>
        <li>文件大小：{{ limit.size }}以内</li>
        <li v-if="limit.dimensionTip">文件尺寸：{{ limit.dimensionTip }}</li>
        <li v-if="limit.ratio">文件比例：{{ limit.ratio.join(':') }}</li>
      </ul>
    </div>
  </footer>
</template>

<script>
/**
 * 素材 - 底部操作栏
 * @author luminghuai
 * @version 2017-09-01
 */

import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import upload from '@/views/User/Publish/mixins/upload'
import modal from '../../../../mixins/modal'
import fileValid from '../../../../mixins/fileValid'
import uploadLimits from './uploadLimits'

const AppFileUpload = () => import('@/components/AppFileUpload')

export default {
  name: 'edit-material-footer',

  mixins: [modal, upload, fileValid],

  components: {
    AppFileUpload,
  },

  props: {
    activeType: {
      type: String,
      required: true,
    },
    activeId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      uploader: null,
      files: [], // 上传队列
    }
  },

  computed: {
    ...mapState({
      userId: state => state.edit.panoInfo.hash_user_id,
    }),

    limit() {
      return uploadLimits[this.activeType]
    },

    uploadPath() {
      return `data/source/${this.activeType}/${this.userId}/`
    },

    // 当前上传队列的第一个文件
    currentFile() {
      return this.files[0]
    },
  },

  watch: {
    files: {
      handler(val) {
        // 全景图上传
        this.$emit('file-upload', val)
      },
      deep: true,
    },

    activeType(val) {
      if (val === 'scene') {
        // 重新实例全景图上传控件
        this.$nextTick(() => {
          this.initNormalUpload('normal')
          this.initFisheyeUpload('fisheye')
        })
      }
    },
  },

  methods: {
    openObjectManage() {
      this.openModal('object3d')
      this.$store.dispatch(EDIT.ROTATE.CATE.INIT)
    },

    openImageTextAdd() {
      this.openModal('imageTextEdit')
    },

    /**
     * 初始化上传组件
     */
    init(uploader) {
      this.uploader = uploader
    },

    /**
     * 添加文件
     * 对于每个添加的文件，往上传队列中push一个对应的对象
     * 如果是图片，要做额外的比例检查，检查不通过移除该文件
     */
    filesAdded(up, files) {
      files.forEach((file) => {
        const fileObj = {
          id: file.id,
          name: file.name,
          percent: 0,
        }
        this.files.push(file)

        if (file.type.includes('image/')) {
          const image = new Image()
          image.style.display = 'none'
          image.addEventListener('load', () => {
            const isValid = this.isFileValid(this.limit, image)
            if (isValid) {
              fileObj.percent = 1
              up.start()
            } else {
              this.files.pop()
              this.uploader.removeFile(file)
            }
          })

          // 这行代码谁写的，可能存在兼容性问题
          image.src = URL.createObjectURL(file.getNative())
        } else {
          fileObj.percent = 1
          up.start()
        }
      })
    },

    uploadProgress(up, { id, percent }) {
      this.files.find(file => file.id === id).percent = percent
    },

    /**
     * 上传成功后，从上传队列里移除对应的对象
     */
    fileUploaded(up, file, res) {
      const { key } = JSON.parse(res.response)

      const data = {
        title: this.files[0].name,
        tag_id: this.activeId,
        qiniu_key: key,
        file_size: file.size,
      }
      this.files.shift()

      this.$store.dispatch(EDIT.MATERIAL.CREATE, data)
    },

    // 要处理上传错误的情况
  },

  created() {
    this.$on('on-reset-files', () => {
      this.files = []
    })
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.material-footer {
  margin-top: 20px;

  .el-button {
    padding: 8px 12px;
  }

  &__desc {
    display: inline-block;
    margin-left: 0.6em;
    color: var(--gray);
    font-size: 13px;

    & > li {
      display: inline-block;
      margin-right: 1em;
    }
  }
}

.material-progress {
  margin-bottom: 10px;
}
</style>
