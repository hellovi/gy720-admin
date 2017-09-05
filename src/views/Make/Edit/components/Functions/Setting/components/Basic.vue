<template>
  <el-row class="edit-setting-basic">
    <el-col :span="8">
      <!-- 作品封面 -->
      <div class="setting-img">
        <h5 class="setting-img__title">作品封面</h5>
        <img class="setting-img__img" :src="avatarPreview || $url.static(form.thumb)" alt="作品封面">
        <div class="setting-img__button">
          <app-file-upload
            v-model="avatar"
            cropper
            class="user-avatar__file"
            @crop-success="cropSuccess"
            @before-upload="loading = true"
            @file-uploaded="avatarUploaded"
          >
            <el-button type="primary" size="small" :loading="loading">更换</el-button>
          </app-file-upload>
        </div>
      </div>

      <!-- 开场提示 -->
      <div class="setting-img">
        <h5 class="setting-img__title edit-setting__vip">开场提示</h5>
        <img
          class="setting-img__img"
          :src="form.start_img ? $url.static(form.start_img) : require('@/assets/help.png')"
          alt="开场提示"
        >
        <div class="setting-img__desc">商业功能，可自定义更换图片，支持JPG、PNG格式上传</div>
        <div class="setting-img__button">
          <el-button type="primary" size="small" @click="selectStartImg">选择</el-button>
          <el-button v-show="form.start_img" type="danger" size="small" @click="removeStartImg">删除</el-button>
        </div>
      </div>
    </el-col>

    <!-- 其它字段 -->
    <el-col :span="14" :offset="2">
      <el-form-item label="作品名称" label-width="6em" prop="name">
        <el-input placeholder="作品名称" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码访问" label-width="6em">
        <el-select v-model="form.privacy">
          <el-option label="公开" :value="1"></el-option>
          <el-option label="加密" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作品密码" label-width="6em" v-show="form.privacy === 2" prop="password">
        <el-input placeholder="作品密码（1~8个字符）" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="是否发布" label-width="6em">
        <el-select v-model="form.is_show">
          <el-option label="公开" :value="10"></el-option>
          <el-option label="隐私" :value="20"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作品简介" label-width="6em">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="作品简介（1000个字符以内）"
          v-model="form.pano_remark"
        ></el-input>
        <div class="edit-setting__tip">免费版功能，可对整个全景作品添加介绍信息，非单个场景的简介</div>
      </el-form-item>
      <el-form-item label="滚动文字" label-width="6em">
        <el-input
          class="edit-setting__vip"
          type="textarea"
          :rows="3"
          placeholder="滚动文字（500个字符以内）"
          :readonly="!isVip"
          @focus="$emit('focus-on-vip-field')"
          v-model="form.scroll_text"
        ></el-input>
        <div class="edit-setting__tip">商业版功能，可自定义添加文字，文字将在界面顶部从右向左轮播出现</div>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
/**
 * 高级编辑 - 设置 - 基本
 * @author luminghuai
 * @version 2017-09-05
 */

import { EDIT } from '@/store/mutationTypes'

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
      this.form.start_img = null
    },
  },
}
</script>

<style lang="postcss">
.edit-setting-basic {
  .el-select {
    width: 100%;
  }
}
</style>
