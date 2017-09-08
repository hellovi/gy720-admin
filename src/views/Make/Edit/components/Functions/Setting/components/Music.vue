<template>
  <div>
    <el-form-item label="电脑版背景音乐默认开启" label-width="12em">
      <el-switch :on-value="20" :off-value="10" v-model="form.pc_bg_music"></el-switch>
    </el-form-item>

    <el-form-item label="手机版背景音乐默认开启" label-width="12em">
      <el-switch :on-value="20" :off-value="10" v-model="form.mobile_bg_music"></el-switch>
    </el-form-item>

    <el-form-item class="edit-setting-music" label="上传背景音乐" label-width="12em">
      <el-input v-model="form.bg_music_name" readonly placeholder="未选择"></el-input>
      <el-button type="danger" @click="removeMusic" v-show="form.bg_music_src">删除</el-button>
      <el-button type="primary" @click="selectMusic">{{ form.bg_music_src ? '更换' : '选择素材' }}</el-button>
    </el-form-item>
  </div>
</template>

<script>
/**
 * 高级编辑 - 设置 - 背景音乐
 * @author luminghuai
 * @version 2017-09-05
 */

import { EDIT } from '@/store/mutationTypes'

export default {
  name: 'edit-setting-music',

  props: {
    form: {
      type: Object,
      required: true,
    },
  },

  methods: {
    selectMusic() {
      this.$store.dispatch(EDIT.MATERIAL.INVOKE, 'audio')
        .then(({ title, file_path }) => {
          this.form.bg_music_name = title
          this.form.bg_music_src = file_path
        })
    },

    removeMusic() {
      this.form.bg_music_name = ''
      this.form.bg_music_src = null
    },
  },
}
</script>
