<template>
  <div
   :class="{
      'edit-functions__tour-scene': true,
      'forbidden': scene.is_used,
    }"
    @click="onChooseScene"
  >
    <img :src="scene.thumb">
    <span v-if="scene.is_used">已添加</span>
    <span v-else>选择</span>
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
        this.$emit('choose', this.scene.id)
      }
    },
  },
}
</script>

<style lang="postcss">
@import 'vars.css';

.edit-functions__tour-scene {
  position: relative;
  margin: 0 11px 10px 11px;
  padding: 3px;
  border: 1px solid var(--gray-light);
  height: 70px;
  width: 100px;
  text-align: center;
  cursor: pointer;

  &.forbidden {
    cursor: not-allowed;
  }

  & img {
    width: 100%;
  }

  & > span {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
}
</style>
