<template>
  <div
    class="edit-functions__tour-scene"
   :class="{
      'forbidden': scene.is_used,
    }"
    @click="onChooseScene"
  >
    <img v-qiniu-src="scene.thumb">
    <span>{{ scene.name }}</span>
  </div>
</template>

<script>
/**
 * 高级编辑 - 导览 - 场景选择场景项
 *
 * @author huojinzhao
 */

export default {
  name: 'edit-functions__tour-scene',

  props: {
    scene: {
      type: Object,
      require: true,
    },
  },

  methods: {
    onChooseScene() {
      if (this.scene.is_used) {
        this.$message({
          type: 'error',
          message: '该场景已添加，不能重复添加',
        })
      } else {
        this.$message({
          type: 'info',
          message: '选择场景成功',
        })
        this.$emit('choose', this.scene)
      }
    },
  },
}
</script>

<style lang="postcss">
@import 'vars.css';

.edit-functions__tour-scene {
  position: relative;
  margin: 0 6px 6px 4px;
  padding: 2px;
  border: 1px solid var(--gray-light);
  height: 86px;
  width: 86px;
  text-align: center;
  cursor: pointer;

  &:first-child {
    margin-left: 7px;
  }

  &.forbidden {
    cursor: not-allowed;
    &:after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: rgba(255, 255, 255, 0.5);
      top: 0;
      left: 0;
      z-index: 2;
    }
    & > span {
      background: none;
    }
  }

  & img {
    width: 100%;
  }

  & > span {
    font-size: 12px;
    color: #fff;
    width: 100%;
    text-align: center;
    line-height: 20px;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 3;
  }
}
</style>
