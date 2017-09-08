<template>
  <el-row>
    <el-col :span="8">
      <div class="setting-img">
        <h5 class="setting-img__title tip-wrapper">场景缩略图</h5>
        <img class="setting-img__img" :src="$url.static(form.thumb)">
        <div class="setting-img__button">
          <el-button
            class="basic-img__choose"
            type="primary" size="small"
            @click="openMaterialThumb"
          >更换</el-button>
        </div>
      </div>
    </el-col>

    <el-col :span="14" :offset="2">
      <el-form-item label="场景名称" label-width="5em">
        <el-input v-model="form.name" placeholder="请输入场景名称"></el-input>
      </el-form-item>

      <el-form-item class="tip-wrapper" label="场景介绍" label-width="5em">
        <el-input
          v-model="form.remark"
          type="textarea"
          :rows="6"
          placeholder="请输入场景介绍"
        ></el-input>
        <span class="tip-mark" data-tip="对该场景添加文字介绍，文字介绍将显示在左侧菜单内">?</span>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
/**
 * 场景设置 - 基本信息
 *
 * @author luminghuai | huojinzhao
 * @version 2017-09-08
 */

import { EDIT } from '@/store/mutationTypes'

export default {
  name: 'edit-scene-setting-basic',

  props: {
    form: {
      type: Object,
      required: true,
    },
  },

  methods: {
    openMaterialThumb() {
      this.$store.dispatch(EDIT.MATERIAL.INVOKE, 'thumb')
        .then(({ file_path }) => {
          this.form.thumb = file_path
        })
    },
  },
}
</script>
