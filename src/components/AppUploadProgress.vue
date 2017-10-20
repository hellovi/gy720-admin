<template>
  <div class="avatar-progress">
    <img :src="src" class="avatar-progress__preview">
    <div class="avatar-progress__shade"></div>
    <div class="avatar-progress__bar" :style="{width: `${progress}%`}"></div>
  </div>
</template>

<script>
  /**
   * 上传进度遮罩层
   * @author  chenliangshan
   * @version 2017/08/15
   */

  export default {
    name: 'app-upload-progress',
    props: {
      src: {
        type: String,
        default: '',
      },
      progress: {
        type: Number,
        default: 0,
      },
    },
  }
</script>

<style lang="postcss">
  .avatar-progress {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    &__preview {
      width: 100%;
      height: 100%;
    }
    &__shade {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.3);
    }
    &__bar {
      position: absolute;
      top: 50%;
      left: 0;
      z-index: 3;
      width: 100%;
      height: 8px;
      border-radius: 4px;
      margin-top: -6px;
      background: #1483d8 url(../assets/progress.png);
      animation: progress 2s linear infinite;
    }
  }
</style>
