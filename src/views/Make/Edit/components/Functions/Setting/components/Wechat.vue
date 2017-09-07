<template>
  <el-row>
    <el-col :span="8">
      <div class="setting-img">
        <h5 class="setting-img__title tip-wrapper">朋友圈小图标
          <span class="tip-mark" data-tip="发送作品给微信好友、分享到朋友圈时显示的方形小缩略图">?</span>
        </h5>
        <img class="setting-img__img" :src="wxIconSrc" alt="朋友圈小图标">
        <div class="setting-img__button">
          <el-button type="primary" size="small" @click="selectIcon">更换</el-button>
          <el-button v-show="form.wx_friend_icon" type="danger" size="small" @click="removeIcon">删除</el-button>
        </div>
      </div>
    </el-col>

    <el-col :span="15" :offset="1">
      <el-form-item class="tip-wrapper" label="分享标题" label-width="6em">
        <el-input v-model="form.wx_share_title" placeholder="请输入分享标题"></el-input>
        <span class="tip-mark" data-tip="发送作品给微信好友、分享到朋友圈时显示的作品标题">?</span>
      </el-form-item>

      <el-form-item class="tip-wrapper" label="分享简介" label-width="6em">
        <el-input
          v-model="form.wx_share_remark"
          type="textarea"
          :rows="5"
          placeholder="请输入分享简介"
        ></el-input>
        <span class="tip-mark" data-tip="发送作品给微信好友、分享到朋友圈时显示的作品简介">?</span>
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

import defaultWxicon from '@/assets/wx_friend_icon.jpg'
import { EDIT } from '@/store/mutationTypes'

export default {
  name: 'edit-setting-wechat',

  props: {
    form: {
      type: Object,
      required: true,
    },
  },

  computed: {
    wxIconSrc() {
      const { wx_friend_icon } = this.form
      return wx_friend_icon ? this.$url.static(wx_friend_icon) : defaultWxicon
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
