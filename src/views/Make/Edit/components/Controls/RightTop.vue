<template>
  <div class="edit-control__right-top">
    <div
      class="btn-add dash-box tip tip--left"
      role="button"
      v-show="menulist.length < 5"
      data-tip="添加右侧菜单"
      @click="openMenuEdition()"
    >+</div>
    <draggable :list="menulist" @end="onResortMenulist">
      <transition-group
        tag="ul"
        class="edit-control__right-menu list"
      >
        <li class="dash-box"
          v-for="item in menulist" :key="item.id"
        >
          <span>{{ item.title }}</span>
          <edit-tools
            dir="left"
            @edit="openMenuEdition(item)"
            @delete="onDeleteMenu(item.id)"
          ></edit-tools>
        </li>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
/**
 * 高级编辑 - 右侧菜单
 *
 * @author luminghuai | huojinzhao
 */

import Draggable from 'vuedraggable'
import EditTools from './EditTools'
import modal from '../../mixins/modal'
import menu from './mixins/menu'

export default {
  name: 'edit-right-top',

  mixins: [modal, menu],

  components: {
    Draggable,
    EditTools,
  },

  created() {
    this.menuLocation = 'right_menu'
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
