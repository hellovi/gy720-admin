<template>
  <el-row>
    <el-col :span="8">
      <div class="setting-img">
        <h5 class="setting-img__title">朋友圈小图标</h5>
        <img
          class="setting-img__img"
          :src="form.wx_friend_icon ? $url.static(form.wx_friend_icon) : require('@/assets/wx_friend_icon.jpg')"
          alt="朋友圈小图标"
        >
        <div class="setting-img__button">
          <el-button
            type="primary"
            size="small"
            @click="selectIcon"
          >选择</el-button>
          <el-button
            v-show="form.wx_friend_icon"
            type="danger"
            size="small"
            @click="removeIcon"
          >删除</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="16">
      <el-form-item label="分享标题" label-width="6em">
        <el-input
          placeholder="微信分享单独设置的标题"
          v-model="form.wx_share_title"
        ></el-input>
      </el-form-item>
      <el-form-item label="分享标题" label-width="6em">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="微信分享单独设置的简介"
          v-model="form.wx_share_remark"
        ></el-input>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
/**
 * 高级编辑 - 设置 - 微信
 * @author luminghuai
 * @version 2017-09-05
 */

import { EDIT } from '@/store/mutationTypes'

export default {
  name: 'edit-setting-wechat',

  props: {
    form: {
      type: Object,
      required: true,
    },
  },

  methods: {
    selectIcon() {
      this.$store.dispatch(EDIT.MATERIAL.INVOKE, 'wxicon')
        .then(({ file_path }) => {
          this.form.wx_friend_icon = file_path
        })
    },

    removeIcon() {
      this.form.wx_friend_icon = null
    },
  },
}
</script>
