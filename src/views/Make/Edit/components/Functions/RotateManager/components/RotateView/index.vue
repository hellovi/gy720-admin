<template>
  <el-dialog
    custom-class="rotate-view"
    :title="viewer.title"
    :visible.sync="active.object3dView"
    size="large"
    @close="rotateColse"
    :close-on-click-modal="false"
    v-append-to-body
  >
    <rotate-view-3d :id="viewer.id"></rotate-view-3d>
  </el-dialog>
</template>

<script>
  /**
   * 物品3D-弹窗预览
   * @author chenliangshan
   * @version 2017/10/10
   */

  import { mapState } from 'vuex'
  import { EDIT } from '@/store/mutationTypes'
  import { emitter } from '@/mixins'
  import RotateView3d from './RotateView3d'
  import modal from '../../../../../mixins/modal'

  const { MATERIAL } = EDIT

  export default {
    name: 'rotate-view',

    mixins: [emitter, modal],

    components: {
      RotateView3d,
    },

    computed: {
      ...mapState({
        viewer: state => state.edit.material.object3dItem,
      }),
    },

    methods: {
      rotateColse() {
        this.$store.commit(MATERIAL.SELECT_OBJECT3D, {})
        this.broadcast('rotate-view-3d', 'on-reset')
      },
    },
  }
</script>
