<template>
  <div class="edit-control__right-top">
    <div
      role="button"
      class="btn-add dash-box tip tip--left"
      data-tip="添加右侧菜单"
      @click="openModal('rightMenu')"
    >+</div>
    <draggable :list="items">
      <transition-group tag="ul" class="edit-control__right-menu list">
        <li class="dash-box" v-for="item in items" :key="item">
          <span>{{ item }}</span>
          <edit-tools dir="left"></edit-tools>
        </li>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
/**
 * 高级编辑 - 右侧菜单
 * @author luminghuai
 * @version 2017-08-11
 */

import { Draggable } from '@/components'
import EditTools from './EditTools'
import modal from '../../mixins/modal'

export default {
  name: 'edit-right-top',

  mixins: [modal],

  components: {
    Draggable,
    EditTools,
  },

  data() {
    return {
      items: [1, 2, 3, 4, 5],
    }
  },
}
</script>


<style lang="postcss">
.edit-control__right-top {
  position: absolute;
  top: 60px;
  right: 10px;
}

.edit-control__right-menu {
  & > li {
    position: relative;
    margin-top: 15px;
    font-size: 12px;
    cursor: pointer;

    &:hover > .edit-tools {
      visibility: visible;
    }
  }
}
</style>
