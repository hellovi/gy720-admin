<template>
  <figure class="material-figure" @click="selectItem(item)">
    <img :src="$url.static(item.file_path)" :alt="item.title" />
    <figcaption>{{ item.title }}</figcaption>
  </figure>
</template>

<script>
/**
 * @description 能够选择需要做调用来源判断
 */

import { EDIT } from '@/store/mutationTypes'

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  methods: {
    /**
     * 其它模块调用素材组件时，选择某个素材
     * @param {Object} item - 选中的素材对象
     */
    selectItem({ title, id, file_path: url }) {
      this.$store.commit(EDIT.MATERIAL.SELECT, { title, id, url })
      this.$store.commit(EDIT.MODAL.CLOSE, 'material')
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.material-figure {
  padding: 10px 15px;
  border-radius: 2px;
  margin: 0;
  background-color: var(--gray-extra-light);
  cursor: pointer;

  &:hover {
    outline: 2px solid var(--color-primary);
  }

  & > img {
    width: 100%;
    height: 150px;
  }

  & > figcaption {
    text-align: center;
  }
}
</style>
