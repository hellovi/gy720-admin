<template>
  <el-dialog
    title="管理3D物品"
    custom-class="rotate-manage"
    :visible.sync="active.object3d"
    top="10%"
    @before-close="close"
  >
    <!-- 侧边栏 -->
    <rotate-aside @create-rotate="createRotate"></rotate-aside>

    <!-- 主内容-->
    <rotate-content @update-rotate="updateRotate"></rotate-content>

    <!-- 创建物品3D弹窗 -->
    <el-dialog
      title="创建物品3D"
      :visible.sync="dialog"
      :modal="false"
      size="tiny"
    >
      <rotate-form
        :active="dialog"
        :item="item"
        @done="dialog = false"
      ></rotate-form>
    </el-dialog>
  </el-dialog>
</template>

<script>
/**
 * 高级编辑 - 素材库管理3D物品
 * @author yangjun | luminghuai
 * @version 2017-08-31
 */

import modal from '../../../mixins/modal'
import RotateAside from './components/RotateAside'
import RotateContent from './components/RotateContent'
import RotateForm from './components/RotateForm'


export default {
  name: 'edit-rotate-manager',

  mixins: [modal],

  components: {
    RotateAside,
    RotateContent,
    RotateForm,
  },

  data() {
    return {
      dialog: false,
      item: {},
    }
  },

  methods: {
    createRotate() {
      this.dialog = true
      this.item = {}
    },

    updateRotate(item) {
      this.dialog = true
      this.item = item
    },

    close() {
      this.closeModal('object3d')
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.rotate-manage {
  width: 1200px;
  margin-left: -600px;
  transform: none;

  &__aside {
    float: left;
    width: 140px;
    font-size: 14px;
    text-align: right;

    & > .el-button {
      margin-right: 10px;
    }

    &__catelist{
      margin-top: 20px;

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

/* 兼容小分辨率屏幕 */
@media screen and (max-height: 760px) {
  .rotate-manage {
    top: 5% !important;
    .rotate-content, .rotate-list {
      height: 480px;
    }
  }
  .rotate-view {
    width: 770px;
    top: 4% !important;
    .rotateView-box {
      width: 740px;
      height: 500px;
    }
  }
}
</style>
