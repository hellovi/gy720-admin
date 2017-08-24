<template>
  <div class="edit-functions__tour-scene">
    <img :src="scene.thumb">
    <span>已添加</span>
  </div>
</template>

<script>
/**
 * 高级编辑 - 导览 - 场景项
 *
 * @author huojinzhao
 */

export default {
  name: 'edit-functions-tour-scene',

  props: {
    scene: {
      type: Object,
      // require: true,
      default: () => ({
        thumb: 'http://www.gy720.com/data/pano/3510/9647/34192/200_34eaf9e175468.jpg',
      }),
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
