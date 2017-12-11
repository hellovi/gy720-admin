<template>
  <el-row class="edit-setting-basic">
    <el-col :span="8">
      <div class="setting-img">
        <h5 class="setting-img__title tip-wrapper">作品封面
          <span class="tip-mark" data-tip="作品在列表页面展示时显示的封面">?</span>
        </h5>
        <img class="setting-img__img" :src="avatarSrc" alt="作品封面">
        <div class="setting-img__button">
          <app-file-upload
            v-model="avatar"
            cropper
            :custom-url="worksCover"
            @crop-success="cropSuccess"
            @before-upload="loading = true"
            @file-uploaded="avatarUploaded"
          ><el-button type="primary" size="small" :loading="loading">更换</el-button></app-file-upload>
        </div>
      </div>

      <div class="setting-img">
        <h5 class="setting-img__title tip-wrapper tip-wrapper--vip">开场提示
          <span class="tip-mark" data-tip="作品加载首个场景时显示的开场图">?</span>
        </h5>
        <img class="setting-img__img" :src="startImgSrc" alt="开场提示图片">
        <div class="setting-img__button">
          <el-button type="primary" size="small" @click="selectStartImg">更换</el-button>
          <el-button v-show="form.start_img" type="danger" size="small" @click="removeStartImg">删除</el-button>
        </div>
      </div>
    </el-col>

    <el-col :span="15" :offset="1">
      <el-form-item label="作品名称" label-width="6em" prop="name">
        <el-input placeholder="请输入作品名称" v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item class="tip-wrapper tip-wrapper--vip" label="密码访问" label-width="6em">
        <el-select v-model="form.privacy" :disabled="!isVip" @click.native="privacyChange">
          <el-option label="公开" :value="10"></el-option>
          <el-option label="加密" :value="20"></el-option>
        </el-select>
        <span class="tip-mark" data-tip="设置为加密并输入作品密码后，他人需输入密码才能查看该作品">?</span>
      </el-form-item>

      <el-form-item label="作品密码" label-width="6em" v-show="form.privacy === 20" :readonly="!isVip" prop="password" :required="form.privacy === 20">
        <el-input placeholder="请输入作品密码" v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item class="tip-wrapper" label="是否发布" label-width="6em">
        <el-select v-model="form.is_show">
          <el-option label="公开" :value="20"></el-option>
          <el-option label="隐私" :value="10"></el-option>
        </el-select>
        <span class="tip-mark" data-tip="设置为否，该作品将不会再官网的公共展示页面（首页推荐、720°全景列表等）中显示">?</span>
      </el-form-item>

      <el-form-item class="tip-wrapper tip-wrapper--vip" label="加载提示" label-width="6em">
        <el-input
          :readonly="!isVip"
          v-model="form.loading_text"
          placeholder="GY720.COM..."
          @focus="$emit('focus-on-vip-field')"
        ></el-input>
        <span class="tip-mark" data-tip="切换场景显示的Loading提示文字">?</span>
      </el-form-item>

      <el-form-item class="tip-wrapper tip-wrapper--vip" label="滚动文字" label-width="6em">
        <el-input
          v-model="form.scroll_text"
          :readonly="!isVip"
          type="textarea"
          :rows="6"
          :maxlength="500"
          placeholder="请输入滚动文字（500个字符以内）"
          @focus="$emit('focus-on-vip-field')"
        ></el-input>
        <span class="tip-mark" data-tip="商业版功能，可自定义添加文字，文字将在界面顶部从右向左轮播出现">?</span>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
/**
 * 高级编辑 - 设置 - 基本
 * @author luminghuai | chenliangshan
 * @version 2017-09-05
 */

import { EDIT } from '@/store/mutationTypes'
import defaultStartImg from '@/assets/help.png'

const AppFileUpload = () => import('@/components/AppFileUpload')

export default {
  name: 'edit-setting-basic',

  components: {
    AppFileUpload,
  },

  props: {
    form: {
      type: Object,
      required: true,
    },
    isVip: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      avatar: '',
      avatarPreview: '',
      loading: false,
    }
  },

  computed: {
    avatarSrc() {
      return this.avatarPreview || this.$url.static(this.form.thumb)
    },

    startImgSrc() {
      const { start_img } = this.form
      return start_img ? this.$url.static(start_img) : defaultStartImg
    },

    worksCover() {
      const panoId = this.$store.state.edit.panoInfo.hash_pano_id
      const userId = this.$store.state.edit.panoInfo.hash_user_id
      return `data/pano/${userId}/${panoId}`
    },
  },

  methods: {
    cropSuccess({ preview }) {
      this.avatarPreview = preview
    },

    /**
     * 更换封面
     * 封面上传成功后，应把新的地址更新到总表单（this.form）上
     */
    avatarUploaded() {
      this.$http.put('/user/pano/thumb', {
        id: this.$route.query.pano_id,
        thumb: this.avatar,
        old_thumb: this.form.thumb,
      })
        .then(() => {
          this.form.thumb = this.avatar
          this.$message.success('操作成功')
        })
        .catch(({ status: { reason } }) => this.$message.error(reason))
        .then(() => {
          this.avatarPreview = null
          this.loading = false
        })
    },

    /**
     * 选择开场提示
     */
    selectStartImg() {
      if (!this.isVip) {
        this.$emit('focus-on-vip-field')
      } else {
        this.$store.dispatch(EDIT.MATERIAL.INVOKE, 'other')
          .then(({ file_path }) => {
            this.form.start_img = file_path
          })
      }
    },

    removeStartImg() {
      if (!this.isVip) {
        this.$emit('focus-on-vip-field')
      } else {
        this.form.start_img = null
      }
    },

    /**
     * 非会员选择加密时，重置为公开，并弹出购买弹窗
     */
    privacyChange() {
      if (!this.isVip) {
        this.$emit('focus-on-vip-field')
      }
    },
  },
}
</script>

<style lang="postcss">
.edit-setting-basic {
  .el-select {
    width: 100%;
  }
  .el-dialog {
    position: inherit;
  }
}
</style>
