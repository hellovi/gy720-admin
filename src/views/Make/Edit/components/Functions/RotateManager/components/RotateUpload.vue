<template>
  <div class="rotate-upload">
    <div class="rotate-upload__desc clearfix">
      <dl class="float-left">
        <dt>物品3D图片要求</dt>
        <dd>1. 图片比例推荐为1:1，（例如:1200*1200像素）</dd>
        <dd>2. 为了保证图片的清晰度，图片像素控制在1200*1200以上</dd>
        <dd>3. 图片大小控制在3M以下，格式目前只支持jpg、jpeg、png</dd>
        <dd>4. 物品3D单个项目目前最多支持上传不同角度的 72张 图片 </dd>
      </dl>
      <dl class="float-right">
        <dt>操作帮助</dt>
        <dd>1. 上传图片前，推荐先在本地将不同角度的图片按照01.jpg、02.jpg ~ 36.jpg这种规则命名好，方便后期管理及排序</dd>
        <dd>2. 点击选择您本地的物品3D图片，可多选（一次最多支持72张）</dd>
        <dd>3. 选好图片后，点击开始上传按钮开始上传</dd>
        <dd>4. 上传完成后，点击右下角的完成按钮，系统将会自动开始生成物品3D效果 </dd>
      </dl>
    </div>

    <div class="rotate-upload__files">
      <ul class="list clearfix" v-show="files.length">
        <li class="float-left" v-for="(file, i) in files" :key="i">
          <figure class="rotate-upload-fig">
            <img :src="file.preview" :alt="file.name">
            <el-progress :percentage="file.percent || 0" :status="file.result" :show-text="!!file.result"></el-progress>
            <figcaption class="ellipsis">{{ file.name }}</figcaption>
          </figure>
        </li>
      </ul>
      <app-file-upload
        v-show="!files.length"
        multiple
        :auto-start="false"
        @init="init"
        @file-preview="filePreview"
        @upload-progress="uploadProgress"
        @file-uploaded="fileUploaded"
        @upload-complete="uploadComplete"
      >
        <el-button type="primary">选择图片</el-button>
      </app-file-upload>
    </div>

    <div class="rotate-upload__footer clearfix" v-show="files.length">
      <div class="float-left">
        选中{{ files.length }}张图片，共{{ totalSize }}。
        <span v-if="uploadedCount > 0">已上传{{ uploadedCount }}张</span>
      </div>
      <div class="float-right">
        <label class="el-button el-button--primary" :for="uploadInputId">继续添加</label>
        <el-button :loading="loading" @click="upload">开始上传</el-button>
        <el-button type="success" @click="$emit('close')" v-show="files.find(({ result }) => result === 'success')">完成</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

const AppFileUpload = () => import('@/components/AppFileUpload')

export default {
  components: {
    AppFileUpload,
  },

  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      uploader: null,
      uploadInputId: null,
      files: [],
      loading: false,
    }
  },

  computed: {
    totalSize() {
      const size = this.files.reduce((result, file) => result + file.size, 0)
      const kbSize = size / 1024
      if (kbSize > 1024) {
        return `${(kbSize / 1024).toFixed(2)}MB`
      }
      return `${kbSize.toFixed(2)}KB`
    },

    uploadedCount() {
      return this.files.reduce((result, item) => {
        if (item.result === 'success') {
          return result + 1
        }
        return result
      }, 0)
    },
  },

  methods: {
    init(uploader) {
      this.uploader = uploader
    },

    filePreview(file) {
      if (!this.uploadInputId) {
        this.uploadInputId = document.querySelector('input[type="file"]').id
      }
      this.files.push(file)
    },

    upload() {
      this.loading = true
      this.uploader.start()
    },

    uploadProgress(up, { name, percent }) {
      const target = this.files.find(file => file.name === name)
      target.percent = percent
    },

    // 尚未做图片上传失败处理
    fileUploaded(up, { name }, info) {
      const { key } = JSON.parse(info.response)
      this.$http.post('/user/sourcerotateimage', {
        title: name,
        source_rotate_id: this.id,
        qiniu_key: key,
        list_order: 72,
      })
        .then(() => {
          const target = this.files.find(file => file.name === name)
          Vue.set(target, 'result', 'success')
        })
    },

    uploadComplete() {
      this.loading = false
      this.$message.success('上传完成，请点击预览查看')
    },

    // 删除文件
    removeFile(file) {
      // TODO 删除文件
      this.uploader.removeFile(file)
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.rotate-upload-dialog {
  width: 1100px;
}

.rotate-upload {
  &__desc {
    padding: 0 15px;
    border-bottom: 1px dashed var(--border-color);
    color: var(--gray);
    font-size: 12px;
    line-height: 2;

    & > dl {
      margin-top: -10px;
    }

    dt {
      font-weight: 700;
    }

    dd {
      margin-left: 0.6em;
    }
  }

  &__files {
    min-height: 160px;
    max-height: 220px;
    padding: 20px 0;
    text-align: center;
    overflow-x: hidden;
    overflow-y: auto;

    .app-file-upload {
      margin-top: 40px;
    }

    li {
      margin: 0 5px;
    }
  }

  &__footer {
    padding-top: 20px;
    border-top: var(--border);

    .float-left {
      line-height: 36px;
    }
  }
}

.rotate-upload-fig {
  margin: 0;

  & > img {
    width: 100px;
    height: 100px;
  }

  & > figcaption {
    max-width: 130px;
    margin-top: 5px;
    font-size: 12px;
    height: 16px;
    text-align: center;
  }
}
</style>
