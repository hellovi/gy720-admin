<template>
  <div>
    <el-dialog
    title="添加热点"
    :visible="active.hotspots"
    :before-close="() => closeModal('hotspots')"
    @close="closeModalAfter "
    class="edit-functions__hotspots-modal"
    >

    <keep-alive>
      <component
        :is="currentView"
        @switchStep="switchStep"
        :type="type"
        :typeFir="typeFir"
        :typeSec="typeSec"
        @open-modal="openModal"
      >
      </component>
    </keep-alive>

    </el-dialog>

    <!-- 热点图标弹窗 -->
    <icon-hotspots v-model="modal.icon"></icon-hotspots>

  </div>
</template>

<script>
/**
 * 高级编辑 - hotspots
 * @author yj
 * @version 2017-08-14
 */

import modal from '../../../mixins/modal'
import AddSpotFir from './components/AddSpotFir'
import AddSpotSec from './components/AddSpotSec'
import IconHotspots from './components/IconHotspots'

export default {
  name: 'edit-functions-hotspots',

  mixins: [modal],

  components: {
    AddSpotFir,
    AddSpotSec,
    IconHotspots,
  },

  data() {
    return {
      currentView: AddSpotFir,
      type: 1,
      cateType: [
        { icon: 'icon-yanjing', key: 1, text: '场景漫游', label: '链接场景' },
        { icon: 'icon-wendang', key: 6, text: '图文信息', label: '图文信息' },
        { icon: 'icon-liulanqidakailianjie', key: 3, text: '超链接', label: '超链接' },
        { icon: 'icon-3d1', key: 5, text: '物品3D', label: '物品3D' },
        { icon: 'icon-shexiang', key: 8, text: '多媒体', label: '多媒体' },
        { icon: 'icon-danxuankuang', key: 7, text: '无' },
      ],
      modal: {
        icon: false,
      },
    }
  },

  computed: {
    typeFir() {
      return this.cateType.map(({ icon, key, text }) => ({ icon, key, text }))
    },

    typeSec() {
      return this.cateType.find(item => (item.key === this.type)).label
    },
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

    openModal(type) {
      this.modal[type] = true
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
