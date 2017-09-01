<template>
  <el-dialog
    title="管理3D物品"
    custom-class="object-manage"
    :visible.sync="active.object3d"
    @before-close="close"
  >
    <!-- 侧边栏 -->
    <object-aside
      @open-object-dialog="objectDialog = true"
    ></object-aside>

    <!-- 主列表 -->
    <object-list
      :dialog="objectDialog"
      @open-object-dialog="objectDialog = true"
      @close-object-dialog="objectDialog = false"
    ></object-list>
  </el-dialog>
</template>

<script>
/**
 * 高级编辑 - 素材库管理3D物品
 * @author yangjun | luminghuai
 * @version 2017-08-31
 */

import modal from '../../../mixins/modal'
import ObjectAside from './components/ObjectAside'
import ObjectList from './components/ObjectList'

export default {
  name: 'edit-object-manager',

  mixins: [modal],

  components: {
    ObjectAside,
    ObjectList,
  },

  data() {
    return {
      objectDialog: false,
    }
  },

  methods: {
    close() {
      this.closeModal('object3d')
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.object-manage {
  width: 1000px;

  &__aside {
    float: left;
    width: 120px;
    font-size: 14px;

    &__catelist{
      margin-top: 20px;
      text-align: right;

      &__item {
        display: block;
        padding: 10px 12px 10px 16px;
        border-bottom: 1px dotted var(--border-color-split);
        line-height: 19px;
        cursor: pointer;
      }
    }
  }
}
</style>
