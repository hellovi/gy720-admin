<template>
  <footer class="material-footer">
    <el-button type="primary" v-if="activeType === 'infos'" @click="openImageTextAdd">添加图文信息</el-button>

    <el-button type="primary" v-else-if="activeType === 'objects'" @click="openObjectManage">管理物品3D</el-button>

    <div v-else>
      <div class="material-progress" v-if="percent > 0 && percent < 100">
        <el-progress :percentage="percent"></el-progress>
      </div>
      <app-file-upload
        v-model="fileSrc"
        ref="fileUpload"
        :accept="acceptMimeTypes"
        :auto-start="false"
        @files-added="filesAdded"
        @upload-progress="uploadProgress"
        @file-uploaded="fileUploaded"
      >
        <el-button type="primary">上传新素材</el-button>
      </app-file-upload>
      <span v-if="filename">{{ filename }}</span>
      <ul v-else class="material-footer__desc list">
        <li>支持的文件格式：{{ acceptMimeTypes }}</li>
        <li>文件大小：15M以内</li>
      </ul>
    </div>
  </footer>
</template>

<script>
import { EDIT } from '@/store/mutationTypes'
import modal from '../../../../mixins/modal'

const AppFileUpload = () => import('@/components/AppFileUpload')

const requiredRatios = {
  hotspots: [1],
  icons: [1],
  ads: [1],
  thumbs: [1],
}

export default {
  mixins: [modal],

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
      fileSrc: '',
      filename: '',
      percent: 0,
      acceptMimeTypes: 'jpg,jpeg,png,gif,mp3',
    }
  },

  methods: {
    openObjectManage() {
      this.openModal('object3d')
      this.$store.dispatch(EDIT.OBJECT.CATE.INIT)
    },

    openImageTextAdd() {
      this.openModal('imageTextEdit')
    },

    filesAdded(up, files) {
      this.filename = files[0].name
      const image = new Image()
      image.style.display = 'none'
      image.addEventListener('load', () => {
        const ratios = requiredRatios[this.activeType]
        const { width, height } = image
        const currentRatio = width / height
        const isValidRatio = !ratios || ratios.some(ratio => currentRatio === ratio)

        if (isValidRatio) {
          this.percent = 1
          up.start()
        } else {
          this.$message.error(`图片比例必须为${ratios[0]}`)
        }
      })
      image.src = URL.createObjectURL(files[0].getNative())
    },

    uploadProgress(up, file) {
      this.percent = file.percent
    },

    fileUploaded(up, file, res) {
      const { key } = JSON.parse(res.response)

      const data = {
        title: this.filename,
        tag_id: this.activeId,
        qiniu_key: key,
        file_size: file.size,
      }

      this.$store.dispatch(EDIT.MATERIAL.ADD, data)
        .then(() => { this.filename = '' })
    },

    // 要处理上传错误的情况
  },
}
</script>

<style lang="postcss">
.material-footer {
  margin-top: 10px;

  .el-button {
    padding: 8px 12px;
  }

  &__desc {
    display: inline-block;
    margin-left: 0.6em;
    color: var(--gray);
    font-size: 14px;

    & > li {
      display: inline-block;
    }
  }
}

.material-progress {
  margin-bottom: 10px;
}
</style>
