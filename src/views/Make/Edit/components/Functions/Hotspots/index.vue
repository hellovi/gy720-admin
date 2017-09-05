<template>
  <div>
    <el-dialog
    :title="`${title}热点`"
    :visible="active.hotspots"
    :before-close="() => closeModal('hotspots')"
    @close="closeModalAfter"
    class="edit-functions__hotspots-modal"
    >

      <component
        :is="currentView"
        @switch-step="switchStep"
        :type="type"
        :fir-info="firInfo"
        :sec-info="secInfo"
        :edit-info="editInfo"
        :type-config="typeConfig"
        @open-modal="openModalInner"
      >
      </component>

    </el-dialog>

    <!-- 热点图标弹窗 -->
    <el-dialog
      title="热点图标库"
      :visible.sync="modal.icon"
      size="large"
      :modal="false"
    >
      <icon-hotspots v-model="modal.icon"></icon-hotspots>
    </el-dialog>

  </div>
</template>

<script>
/**
 * 高级编辑 - hotspots
 * @author yj
 * @version 2017-09-01
 */
import { mapState, mapGetters } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import hotspot from './mixins/hotspot'
import modal from '../../../mixins/modal'
import AddSpotFir from './components/AddSpotFir'
import AddSpotSec from './components/AddSpotSec'
import IconHotspots from './components/IconHotspots'

const TYPECONFIG = {
  SCENE: 1,
  ARTICLE: 6,
  LINK: 3,
  ROTATE: 5,
  AUDIO: 8,
  OTHER: 7,
}

export default {
  name: 'edit-functions-hotspots',

  mixins: [modal, hotspot],

  components: {
    AddSpotFir,
    AddSpotSec,
    IconHotspots,
  },

  data() {
    return {
      currentView: AddSpotFir,
      type: TYPECONFIG.SCENE,
      typeConfig: TYPECONFIG,
      cateType: [
        { icon: 'icon-yanjing', key: TYPECONFIG.SCENE, text: '场景漫游', label: '链接场景' },
        { icon: 'icon-wendang', key: TYPECONFIG.ARTICLE, text: '图文信息', label: '图文信息' },
        { icon: 'icon-liulanqidakailianjie', key: TYPECONFIG.LINK, text: '超链接', label: '超链接' },
        { icon: 'icon-3d1', key: TYPECONFIG.ROTATE, text: '物品3D', label: '物品3D' },
        { icon: 'icon-shexiang', key: TYPECONFIG.AUDIO, text: '多媒体', label: '多媒体' },
        { icon: 'icon-danxuankuang', key: TYPECONFIG.OTHER, text: '无', label: '' },
      ],
      modal: {
        icon: false,
      },
      title: '添加',
      editInfo: {},
    }
  },

  computed: {
    ...mapState({
      panoId: state => state.edit.panoInfo.hash_pano_id,
      spotsList: state => state.edit.hotspots.spotsList,
    }),

    ...mapGetters(['activeScene']),

    firInfo() {
      return this.cateType.map(({ icon, key, text }) => ({ icon, key, text }))
    },

    secInfo() {
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
      // 重置选中的热点图标
      this.$store.commit(EDIT.HOTSPOTS.RESET.ICON)
      this.editInfo = {}
      this.title = '添加'
    },

    openModalInner(type) {
      this.modal[type] = true
    },
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
