<template>
  <div class="edit-control__top-right">
    <el-button type="primary" @click="openModal('setting')">设置</el-button>
    <el-button type="primary" @click="openModal('material')">素材库</el-button>
    <el-dropdown
      @command="gView"
      menu-align="start"
    >
      <el-button type="primary">视角</el-button>
      <el-dropdown-menu
        slot="dropdown"
        class="gview-list"
      >
        <el-dropdown-item
          v-for="(item,index) in gviewList"
          :key="index"
          :command="item.value"
          :class="{'gview-list__active': gviewActive(item.value)}"
        >{{ item.name }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button type="primary">皮肤</el-button>
  </div>
</template>

<script>
/**
 * 高级编辑 - 设置/素材库/视角/皮肤
 * @author luminghuai
 * @version 2017-08-11
 */

import modal from '../../mixins/modal'

export default {
  name: 'edit-right-middle',

  mixins: [modal],

  data: () => ({
    currentGview: 'normal',
    gviewList: [
      { name: '普通视角', value: 'normal' },
      { name: '小 行 星', value: 'littleplanet' },
      { name: '鱼眼视图', value: 'fisheye' },
    ],
  }),

  methods: {
    gView(action) {
      this.currentGview = action
      /* eslint no-underscore-dangle: 0 */
      window.__krpano.call(`ac_${action}_view()`)
    },
    gviewActive(action) {
      return this.currentGview === action
    },
  },
}
</script>

<style lang="postcss">
.edit-control__top-right {
  position: absolute;
  top: 10px;
  right: 10px;

  .el-button {
    width: 80px;

    & + .el-button {
      margin-left: 20px;
    }
  }
}

.gview-list {
  min-width: auto;
  text-align: center;

  &__active {
    background-color: rgba(255, 136, 83, .8);
    color: #fff;
  }
}
</style>
