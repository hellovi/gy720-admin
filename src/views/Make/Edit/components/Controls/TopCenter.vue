<template>
  <div class="edit-control__top-center">
    <el-button class="tip tip--bottom" data-tip="个人中心" type="primary" @click="$router.push('/user-client/center/')">
      <i class="iconfont">&#xe629;</i>
    </el-button>
    <el-button class="tip tip--bottom" data-tip="限制视角" type="primary" @click="openRestrictView">
      <i class="iconfont">&#xe627;</i>
    </el-button>
    <el-button class="tip tip--bottom" data-tip="初始画面" type="primary" @click="openInitialviewView">
      <i class="iconfont">&#xe628;</i>
    </el-button>
    <el-button class="tip tip--bottom" data-tip="场景分组" type="primary" @click="openModal('group')">
      <i class="iconfont">&#xe647;</i>
    </el-button>
  </div>
</template>

<script>
/**
 * 高级编辑 - 限制视角/初始画面/场景分组
 * @author luminghuai
 * @version 2017-08-11
 */

import modal from '../../mixins/modal'

export default {
  name: 'edit-right-middle',

  mixins: [modal],

  methods: {
    openRestrictView() {
      this.closeModal('control')
      this.openModal('restrictView')
    },

    openInitialviewView() {
      this.closeModal('control')
      this.openModal('initialview')
    },
  },
}
</script>

<style lang="postcss">
.edit-control__top-center {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);

  .el-button {
    width: 32px;
    padding: 0;
  }
}
</style>
