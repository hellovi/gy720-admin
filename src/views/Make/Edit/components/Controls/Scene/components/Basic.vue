<template>
  <el-row>
    <el-col :span="8">
      <div class="setting-img edit-control__scene-setting">
        <el-button
          class="basic-img__choose"
          type="primary" size="small"
          @click="openMaterialThumb"
        >更换缩略图</el-button>
        <p class="basic-img__title">场景缩略图</p>
        <img
          class="basic-img__img"
          :src="$url.static(data.thumb)">
      </div>
    </el-col>

    <el-col :span="14" :offset="2">
      <el-form-item label="场景名称" label-width="5em">
        <el-input
          placeholder="请输入场景名称"
          v-model="data.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="场景介绍" label-width="5em">
        <el-input
          type="textarea" :rows="6"
          placeholder="请输入场景介绍"
          v-model="data.remark"
        ></el-input>
        <div class="edit-setting__tip">
          免费版功能，可对该场景添加相关的文字介绍，添加后文字介绍出现在左侧的菜单中，与场景切换实时同步
        </div>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
/**
 * 场景设置 - 基本信息
 *
 * @author luminghuai | huojinzhao
 */

import { EDIT } from '@/store/mutationTypes'

export default {
  name: 'edit-scene-setting-basic',

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  methods: {
    openMaterialThumb() {
      this.$store.dispatch(EDIT.MATERIAL.INVOKE, 'thumb')
        .then(({ file_path }) => {
          this.data.thumb = file_path
        })
    },
  },
}
</script>

<style lang="postcss">
.edit-control__scene-setting {

  & .basic-img {

    &__title {
      margin: 0 0 10px 0;
      line-height: 30px;
      font-size: 14px;
    }

    &__choose {
      float: right;
    }

    &__img {
      margin-bottom: 10px;
      width: 100%;
      background-color: gray;
    }
  }
}
</style>
