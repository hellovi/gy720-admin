<template>
  <el-row>
    <el-col :span="8">
      <div class="setting-img">
        <h5 class="setting-img__title">朋友圈小图标</h5>
        <img class="setting-img__img" :src="require('@/assets/wx_friend_icon.jpg')" alt="朋友圈小图标">
        <div class="setting-img__button">
          <el-button
            type="primary"
            size="small"
            @click="invokeMaterials"
          >选择</el-button>
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
    invokeMaterials() {
      this.$store.dispatch(EDIT.MATERIAL.INVOKE, 'icons')
    },
  },
}
</script>
