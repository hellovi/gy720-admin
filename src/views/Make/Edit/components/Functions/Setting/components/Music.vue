<template>
  <div>
    <el-form-item label="电脑版背景音乐默认开启" label-width="12em">
      <el-switch :on-value="1" :off-value="0" v-model="form.pc_bg_music"></el-switch>
    </el-form-item>

    <el-form-item label="手机版背景音乐默认开启" label-width="12em">
      <el-switch :on-value="1" :off-value="0" v-model="form.mobile_bg_music"></el-switch>
    </el-form-item>

    <el-form-item label="上传背景音乐" label-width="12em">
      <el-input readonly v-model="form.bg_music_src"></el-input>
    </el-form-item>

    <el-form-item label-width="12em">
      <el-button type="primary">选择素材</el-button>
      <el-button type="danger">删除</el-button>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'edit-setting-music',

  props: {
    form: {
      type: Object,
      required: true,
    },
  },
}
</script>
