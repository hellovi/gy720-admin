<template>
  <div role="button" class="edit-control__bottom-left">
    <div class="btn-circle">
      <i class="iconfont" style="line-height: 40px;">&#xe626;</i>
      <span>场景</span>
    </div>

    <div role="button" class="btn-circle">
      <i class="iconfont"  style="line-height: 32px;">&#xe635;</i>
      <span>分享</span>
    </div>

    <div class="edit-control__bottom-menu-wrapper">
      <draggable :list="items" element="span">
        <transition-group tag="ul" class="edit-control__button-menu list">
          <li class="dash-box" v-for="item in items" :key="item">
            <span>{{ item }}</span>
            <edit-tools dir="top"></edit-tools>
          </li>
        </transition-group>
      </draggable>
      <div role="button" class="btn-add dash-box dash-box--cubic tip tip--right" data-tip="添加底部菜单">+</div>
    </div>
  </div>
</template>

<script>
/**
 * 高级编辑 - 场景/分享/底部菜单
 * @author luminghuai
 * @version 2017-08-11
 */

import { Draggable } from '@/components'
import EditTools from './EditTools'

export default {
  name: 'edit-bottom-left',

  components: {
    Draggable,
    EditTools,
  },

  data() {
    return {
      items: [0, 2, 3, 4, 5],
    }
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
