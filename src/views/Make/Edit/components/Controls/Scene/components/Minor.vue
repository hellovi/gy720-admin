<template>
  <div>
    <section>
      <h4>播放设置</h4>
      <el-form-item label="电脑版语音解说默认开启">
        <el-switch on-text="开启" off-text="关闭"></el-switch>
      </el-form-item>
      <el-form-item label="手机版语音解说默认开启">
        <el-switch on-text="开启" off-text="关闭"></el-switch>
      </el-form-item>
    </section>

    <section>
      <h4>选择语音解说</h4>

      <app-file-upload
        v-model="src"
        cropper
        accept="jpg,jpeg,png"
        class="user-avatar__file"
      >
        <el-button type="primary" size="small">选择</el-button>
        <slot name="right">文件大小不超过15M，支持格式：MP3</slot>
      </app-file-upload>
      <el-form-item label="应用到其它场景" label-width="8em">
        <el-checkbox-group>
          <el-checkbox label="当前场景组" name="type"></el-checkbox>
          <el-checkbox label="所有场景" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="播放状态" label-width="8em">
        <el-checkbox label="播放时关闭背景音乐" ></el-checkbox>
      </el-form-item>
    </section>
  </div>
</template>

<script>
/**
 * 场景设置 - 功能微调
 * @author luminghuai
 * @version 2017-08-30
 */

const AppFileUpload = () => import('@/components/AppFileUpload')

export default {
  name: 'edit-scene-setting-minor',

  components: {
    AppFileUpload,
  },
}
</script>

