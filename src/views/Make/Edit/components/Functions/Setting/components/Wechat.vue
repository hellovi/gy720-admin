<template>
  <el-row>
    <el-col :span="8">
      <div class="setting-img">
        <h5 class="setting-img__title">朋友圈小图标</h5>
        <img class="setting-img__img" :src="iconUrl" alt="朋友圈小图标">
        <div class="setting-img__button">
          <el-button
            type="primary"
            size="small"
            @click="openMaterModal({ type: 'icons', source: 'wechat' })"
          >选择</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="16">
      <el-form-item label="分享标题" label-width="6em">
        <el-input placeholder="微信分享单独设置的标题"></el-input>
      </el-form-item>
      <el-form-item label="分享标题" label-width="6em">
        <el-input type="textarea" :rows="4" placeholder="微信分享单独设置的简介"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import modal from '../../../../mixins/modal'

const defaultIcon = require('@/assets/wx_friend_icon.jpg')

export default {
  name: 'edit-setting-wechat',

  mixins: [modal],

  computed: {
    ...mapState({
      icon: state => state.edit.material.materialExport.wechat,
    }),

    iconUrl() {
      if (this.icon.url) {
        return this.$url.static(this.icon.url)
      }
      return defaultIcon
    },
  },
}
</script>
