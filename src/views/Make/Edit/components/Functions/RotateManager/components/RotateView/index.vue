<template>
  <el-dialog
    :title="viewer.title"
    :visible.sync="active.object3dView"
    :modal="false"
    size="large"
    :close-on-click-modal="false"
  >
    <rotate-view-3d :id="viewer.id"></rotate-view-3d>
  </el-dialog>
</template>

<script>
  /**
   * 物品3D-弹窗预览
   * @author chenliangshan
   * @version 2017/09/12
   */

  import { mapState } from 'vuex'
  import RotateView3d from './RotateView3d'
  import modal from '../../../../../mixins/modal'

  export default {
    name: 'rotate-view',

    mixins: [modal],

    components: {
      RotateView3d,
    },

    computed: {
      ...mapState({
        viewer: state => state.edit.material.object3dItem,
      }),
    },
  }
</script>
