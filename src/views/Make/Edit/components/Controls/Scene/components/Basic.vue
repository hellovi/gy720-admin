<template>
  <el-row>
    <el-col :span="8">
      <div class="setting-img">
        <h5 class="setting-img__title">场景缩略图</h5>
        <img class="setting-img__img" src="#" alt="场景缩略图">
        <div class="setting-img__button">
          <app-file-upload
            v-model="src"
            cropper
            accept="jpg,jpeg,png"
            class="user-avatar__file"
          >
            <el-button type="primary" size="small">更换</el-button>
          </app-file-upload>
        </div>
      </div>
    </el-col>

    <el-col :span="14" :offset="2">
      <el-form-item label="场景名称" label-width="5em">
          <el-input placeholder="请输入场景名称"></el-input>
      </el-form-item>
      <el-form-item label="场景介绍" label-width="5em">
        <el-input type="textarea" :rows="6" placeholder="请输入场景介绍"></el-input>
        <div class="edit-setting__tip">免费版功能，可对该场景添加相关的文字介绍，添加后文字介绍出现在左侧的菜单中，与场景切换实时同步</div>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
/**
 * 场景设置 - 基本信息
 * @author luminghuai
 * @version 2017-08-30
 */

const AppFileUpload = () => import('@/components/AppFileUpload')

export default {
  name: 'edit-scene-setting-basic',

  components: {
    AppFileUpload,
  },
}
</script>
