<template>
  <div class="publish-item" :class="{'has-layer': file.vtour !== undefined && !file.vtour}">
    <slot name="checkbox"></slot>

    <slot name="preview">
      <img v-if="file.preview" :src="file.preview" :alt="file.name">
    </slot>

    <el-progress
      :text-inside="true"
      :stroke-width="14"
      :percentage="file.percent"
      v-if="uploadStarted && !uploaded"
    ></el-progress>

    <div class="publish-item__message" v-if="!uploadStarted || (uploaded && !file.vtour)">
      {{ file.message }}
    </div>

    <el-row class="publish-item__footer">
      <el-col :span="19">
        <span class="ellipsis" v-show="file.name">{{ file.name }}</span>
        <span v-show="!file.name">&nbsp;</span>
      </el-col>
      <el-col :span="5" class="publish-item__footer-tools">
        <slot name="tools">
          <i v-if="file.vtour" role="button" class="iconfont" @click="$emit('remove-pano', file.id)">&#xe615;</i>
        </slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/**
 * 待发布场景
 * @author luminghuai
 * @version 2017-08-23
 */

export default {
  name: 'publish-item',

  props: {
    file: {
      type: Object,
      required: true,
    },
  },

  computed: {
    uploaded() {
      return this.file.percent >= 100
    },

    uploadStarted() {
      return this.file.percent > 0
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";
.publish-item {
  position: relative;
  margin-bottom: 10px;
  background-color: #bfbfbf;
  background-origin: content-box;
  overflow: hidden;

  &::before {
    content: "";
    float: left;
    margin-bottom: 50%;
  }

  &.has-layer::after {
    content: "";
    position: absolute;
    top: 0;
    z-index: 10;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & > .el-progress {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 12;
    width: 100%;
    transform: translateY(-50%);

    .el-progress-bar__innerText {
      margin-top: -8px;
    }
  }

  &__message {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 12;
    transform: translateY(-50%);
    width: 100%;
    font-size: 14px;
    color: #fff;
    text-align: center;
  }

  &__footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 24px;
    padding: 0 0.3em;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 12px;
    line-height: 24px;

    &-tools{
      display: none;
      text-align: right;
      .iconfont {
        cursor: pointer;
      }
    }
  }

  &:hover {
    .publish-item__footer {
      &-tools {
        display: block;
      }
    }
  }
}
</style>
