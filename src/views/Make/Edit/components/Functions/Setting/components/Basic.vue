<template>
  <el-row class="edit-setting-basic">
    <el-col :span="8">
      <div class="setting-img">
        <h5 class="setting-img__title">作品封面</h5>
        <img class="setting-img__img" src="#" alt="作品封面">
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

      <div class="setting-img">
        <h5 class="setting-img__title edit-setting__vip">开场提示</h5>
        <img class="setting-img__img" :src="require('@/assets/help.png')" alt="开场提示">
        <div class="setting-img__desc">商业功能，可自定义更换图片，支持JPG、PNG格式上传</div>
        <div class="setting-img__button">
          <el-button type="primary" size="small">选择</el-button>
        </div>
      </div>
    </el-col>

    <el-col :span="14" :offset="2">
      <el-form-item label="作品名称" label-width="5em">
        <el-input placeholder="作品名称"></el-input>
      </el-form-item>
      <el-form-item label="密码访问" label-width="5em">
        <el-select>
          <el-option label="公开"></el-option>
          <el-option label="加密"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否发布" label-width="5em">
        <el-select>
          <el-option label="公开"></el-option>
          <el-option label="隐私"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作品名称" label-width="5em">
        <el-input type="textarea" :rows="3" placeholder="作品简介（1000个字符以内）"></el-input>
        <div class="edit-setting__tip">商业版功能，可自定义添加文字，文字将在界面顶部从右向左轮播出现</div>
      </el-form-item>
      <el-form-item label="滚动文字" label-width="5em">
        <el-input class="edit-setting__vip" type="textarea" :rows="3" placeholder="滚动文字（500个字符以内）"></el-input>
        <div class="edit-setting__tip">商业版功能，可自定义添加文字，文字将在界面顶部从右向左轮播出现</div>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
const AppFileUpload = () => import('@/components/AppFileUpload')

export default {
  name: 'edit-setting-basic',

  components: {
    AppFileUpload,
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
