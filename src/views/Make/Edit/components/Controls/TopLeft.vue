<template>
  <div class="edit-control__top-left">
    <div class="edit-logo">
      <img v-if="true" class="edit-logo__image" :src="require('@/assets/logo-edit.png')" alt="logo">
      <div v-else role="button" class="btn-add dash-box" @click="openModal('logo')">+</div>
      <edit-tools dir="right"></edit-tools>
    </div>

    <div class="edit-author tip tip--right" data-tip="隐藏作者 VIP" @click="openModal('author')">作者：某某某</div>
  </div>
</template>

<script>

/**
 * 高级编辑 - Logo/作者
 * @author luminghuai
 * @version 2017-08-11
 */

import modal from '../../mixins/modal'
import EditTools from './EditTools'

export default {
  name: 'edit-top-left',

  mixins: [modal],

  components: {
    EditTools,
  },
}
</script>

<style lang="postcss">
.edit-control__top-left {
  position: absolute;
  top: 10px;
  left: 10px;
}

.edit-logo {
  cursor: pointer;

  &:hover > .edit-tools {
    visibility: visible;
  }

  &__image {
    display: block;
    height: 30px;
  }
}

.edit-author {
  margin-top: 10px;
  font-size: 14px;
  line-height: 26px;
  cursor: pointer;
}
</style>
