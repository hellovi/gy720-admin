<template>
  <el-form
    class="edit-functions__tour-edition"
    label-width="80px"
    ref="tourEditionForm"
    :model="editionInfo"
    :rules="tourEditionRules"
  >
    <!-- 后端错误回显 -->
    <app-form-alert
      :contents="errorReasons"
    ></app-form-alert>

    <!-- 表单项 -->
    <el-form-item
      class="edition__name"
      label="导览名称"
      prop="name"
    >
      <el-input
        v-model="editionInfo.name"
        placeholder="请输入地图名称，例如一楼、二楼、单元一等（输入4个字符以内）"
      >
      </el-input>
    </el-form-item>
    <el-form-item
      class="edition__material"
      label="导览地图"
      prop="image"
    >
      <img
        v-if="editionInfo.image.length"
        class="edition__material__display"
        :src="$url.static(editionInfo.image)">
      <el-button
        :disabled="type === 'update'"
        @click="onChooseMaterial"
      >选择素材</el-button>
      <el-button
        v-show="type === 'create'
          &&editionInfo.image.length > 0
        "
        @click="resetEditionImage"
      >删除</el-button>
      <span class="edition__material__note">
        选择平面地图，500px分辨率以上
      </span>
    </el-form-item>
    <!-- 控制按钮 -->
    <div
      class="edition__control"
    >
      <el-button type="primary"
        :loading="confirmLoading"
        @click="preSubmit"
      >提交</el-button>
      <el-button
        @click="cancel"
      >取消</el-button>
    </div>
  </el-form>
</template>

<script>
/**
 * 高级编辑 - 导览 - 编辑导览信息
 *
 * @author huojinzhao
 */

import { EDIT } from '@/store/mutationTypes'
import modal from '@/views/Make/Edit/mixins/modal'
import Ajax from './modules/Ajax'

export default {
  name: 'edit-functions__tour-edition',

  mixins: [modal],

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    tourInfo: {
      type: Object,
    },
  },

  data: () => ({
    editionOriginInfo: {
      name: '',
      image: '',
    },

    editionInfo: null,

    confirmLoading: false,

    editionImageRef: null,

    tourEditionRules: {
      name: [
        {
          required: true,
          message: '请输入地图名称',
          trigger: 'blur',
        },
        {
          pattern: /^\S{1,4}$/,
          message: '请输入4个字符以内',
          trigger: 'blur',
        },
      ],
      image: [
        {
          required: true,
          message: '请选择地图素材',
          trigger: 'change',
        },
      ],
    },

    errorReasons: {},
  }),

  watch: {
    visible(val) {
      if (val) this.checkEditionInfo()
    },
  },

  methods: {
    /* ------ initialization ------ */

    checkEditionInfo() {
      this.$refs.tourEditionForm.resetFields()
      this.editionInfo = {
        ...this.editionOriginInfo,
        ...this.tourInfo,
      }
    },

    /* ------ application ------ */

    /* --- control --- */

    onChooseMaterial() {
      this.$store.dispatch(EDIT.MATERIAL.INVOKE, 'map')
        .then((item) => {
          this.resetEditionImage()
          this.editionInfo.image = item.file_path
        })
    },

    resetEditionImage() {
      this.editionImageRef.resetField()
    },

    cancel() {
      this.$emit('cancel')
      this.errorReasons = {}
      this.confirmLoading = false
    },

    /* --- submit --- */

    preSubmit() {
      this.$refs.tourEditionForm
        .validate((valid) => {
          if (valid) {
            this.submit()
              .then(() => this.cancel())
              .catch((error) => {
                this.confirmLoading = false
                this.errorReasons = error
              })
          }
        })
    },

    submit() {
      this.confirmLoading = true
      if (this.type === 'create') {
        return this.createTourInfo()
      }
      // update
      return this.patchTourInfo()
    },

    createTourInfo() {
      return Ajax.insertTourInfo(this.editionInfo)
        .then((res) => {
          this.$emit('create', res)
          this.$message({
            message: '创建成功',
            type: 'success',
          })
        })
    },

    patchTourInfo() {
      const tourInfo = { ...this.editionInfo }
      return Ajax.updateTourInfo(tourInfo)
        .then(() => {
          this.$emit('update', tourInfo)
          this.$message({
            message: '更新成功',
            type: 'success',
          })
        })
    },
  },

  created() {
    this.editionInfo = { ...this.editionOriginInfo }
  },

  mounted() {
    this.checkEditionInfo()

    this.$refs.tourEditionForm.fields
      .forEach((item) => {
        if (item.prop === 'image') {
          this.editionImageRef = item
        }
      })
  },
}
</script>

<style lang="postcss">
@import 'vars.css';

.edit-functions__tour-edition {

  & .edition {

    &__material {

      &__display {
        float: left;
        margin-right: 10px;
        height: 35px;
      }

      &__note {
        float: right;

        &::before {
          content: '\e621';
          color: var(--disabled-color-base);
          font-family: 'iconfont';
        }
      }
    }

    &__control {
      margin-top: 35px;
      text-align: right;
    }
  }
}
</style>
