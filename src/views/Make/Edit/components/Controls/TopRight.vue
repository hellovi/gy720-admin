<template>
  <div class="edit-control__top-right">
    <el-button type="primary" @click="openModal('setting')">设置</el-button>
    <el-button type="primary" @click="openModal('material')">素材库</el-button>
    <div class="edit-control__views">
      <el-button type="primary">视角</el-button>
      <ul class="list">
        <li
          v-for="view in views"
          :key="view.name"
          :class="{active: view.value === currentView}"
          @click="changeView(view.value)"
        >{{ view.name }}</li>
      </ul>
    </div>
    <el-button type="primary">皮肤</el-button>
  </div>
</template>

<script>
/**
 * 高级编辑 - 设置/素材库/视角/皮肤
 * @author luminghuai
 * @version 2017-08-29
 */

import modal from '../../mixins/modal'

export default {
  name: 'edit-right-middle',

  mixins: [modal],

  data() {
    return {
      currentView: 'normal',
      views: [
        { name: '普通视角', value: 'normal' },
        { name: '小 行 星', value: 'littleplanet' },
        { name: '鱼眼视图', value: 'fisheye' },
      ],
    }
  },

  methods: {
    /**
     * 切换视角
     * @param {string} val = 视角类型
     */
    changeView(val) {
      this.currentView = val
      // eslint-disable-next-line
      window.__krpano.call(`ac_${val}_view()`)
    },
  },
}
</script>

<style lang="postcss">
@import "vars";

:root {
  --margin: 20px;
  --radius: 3px;
}

.edit-control__views {
  position: relative;
  display: inline-block;
  margin: 0 var(--margin);
  font-size: 14px;

  & > .list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    border-radius: var(--radius);
    background-color: var(--color-primary);
    visibility: hidden;
    opacity: 0;
    transition: 0.4s;

    & > li {
      text-align: center;
      line-height: 34px;
      cursor: pointer;

      &:first-child {
        border-top-left-radius: var(--radius);
        border-top-right-radius: var(--radius);
      }

      &:last-child {
        border-bottom-left-radius: var(--radius);
        border-bottom-right-radius: var(--radius);
      }

      &.active,
      &:hover {
        background-color: var(--color-warning);
      }
    }
  }

  &:hover {
    & > .list {
      visibility: visible;
      opacity: 1;
    }
  }
}

.edit-control__top-right {
  position: absolute;
  top: 10px;
  right: 10px;

  .el-button {
    width: 80px;

    & + .el-button {
      margin-left: var(--margin);
    }
  }
}
</style>
