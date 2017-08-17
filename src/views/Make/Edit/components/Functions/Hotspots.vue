<template>
   <el-dialog
    title="添加热点"
    :visible="active.hotspots"
    :before-close="() => closeModal('hotspots')"
    @close="closeModalAfter "
    class="edit-functions__hotspots-modal"
  >

      <keep-alive>
        <component :is="currentView"
          @switchStep="switchStep"
          :type = "type"
        >
        </component>
      </keep-alive>

  </el-dialog>
</template>

<script>
/**
 * 高级编辑 - hotspots
 * @author yj
 * @version 2017-08-14
 */

import modal from '../../mixins/modal'
import AddSpotFir from './components/AddSpotFir'
import AddSpotSec from './components/AddSpotSec'

export default {
  name: 'edit-functions__hotspots',

  mixins: [modal],

  components: {
    AddSpotFir,
    AddSpotSec,
  },

  data() {
    return {
      currentView: AddSpotFir,
      type: 1,
    }
  },

  methods: {
    switchStep(step, type) {
      if (step !== 1) {
        this.type = type
        this.currentView = AddSpotSec
      } else {
        this.currentView = AddSpotFir
      }
    },

    closeModalAfter() {
      // 点击上一步，关闭都要重置
      this.currentView = AddSpotFir
    },
  },

  created() {

  },
}
</script>

<style lang="postcss">
.edit-functions__hotspots-modal {
  & .el-dialog{
    width: 700px;
  }
}
</style>
