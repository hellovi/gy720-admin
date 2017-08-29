<template>
  <div role="button" class="edit-control__bottom-left">
    <div class="btn-circle">
      <i class="iconfont" style="line-height: 40px;">&#xe626;</i>
      <span>场景</span>
    </div>

    <div role="button" class="btn-circle" @click="openModal('share')">
      <i class="iconfont" style="line-height: 32px;">&#xe635;</i>
      <span>分享</span>
    </div>

    <div class="edit-control__bottom-menu-wrapper">
      <draggable element="span"
        :list="menulist"
        @end="onResortMenulist"
      >
        <transition-group
          tag="ul"
          class="edit-control__button-menu list"
        >
          <li class="dash-box"
            v-for="item in menulist" :key="item.id"
          >
            <span>{{ item.title }}</span>
            <edit-tools
              dir="top"
              @edit="openMenuEdition(item)"
              @delete="onDeleteMenu(item.id)"
            ></edit-tools>
          </li>
        </transition-group>
      </draggable>
      <div
        class="btn-add dash-box dash-box--cubic tip tip--right"
        role="button"
        v-show="menulist.length < 3"
        data-tip="添加底部菜单"
        @click="openMenuEdition()"
      >+</div>
    </div>
  </div>
</template>

<script>
/**
 * 高级编辑 - 场景/分享/底部菜单
 *
 * @author luminghuai | huojinzhao
 */

import Draggable from 'vuedraggable'
import modal from '../../mixins/modal'
import menu from './mixins/menu'
import EditTools from './EditTools'

export default {
  name: 'edit-bottom-left',

  mixins: [modal, menu],

  components: {
    Draggable,
    EditTools,
  },

  created() {
    this.menuLocation = 'bottom_menu'
  },
}
</script>


<style lang="postcss">
.edit-control__bottom-left {
  position: absolute;
  bottom: 30px;
  left: 15px;
  height: 40px;

  & > * {
    vertical-align: top;
  }
}

.edit-control__bottom-menu-wrapper {
  display: inline-block;

  & > .btn-add {
    margin-left: 10px;
  }
}

.edit-control__button-menu {
  display: inline-block;
  vertical-align: top;

  & > .dash-box {
    position: relative;
    float: left;
    width: 66px;
    height: 40px;
    margin-left: 10px;
    line-height: 38px;
    cursor: pointer;
    font-size: 14px;

    &:hover > .edit-tools {
      visibility: visible;
    }
  }
}
</style>
