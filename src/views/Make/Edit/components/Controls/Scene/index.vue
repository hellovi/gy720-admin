<template>
  <div class="edit-control__scene">
    <scene-list
      :scene-list="scenelist"
      @select="selectScene"
      @delete="preDeleteScene"
      @edit="openSceneConfig"
      @drag-end="resortScenes"
    ></scene-list>

    <!-- 场景设置弹框 -->
    <el-dialog
      :visible.sync="configModal.active"
      title="场景设置"
      size="large"
      :before-close="closeSceneConfig"
    >
      <!-- 标签切换 -->
      <nav class="edit-setting__nav">
        <ul class="list clearfix">
          <li
            :class="{
              active: configModal.tabType === index
            }"
            v-for="(tab, index) in tabs" :key="tab"
            @click="configModal.tabType = index"
          >{{ tab }}</li>
        </ul>
      </nav>
      <!-- 表单主体 -->
      <el-form class="edit-setting__form">
        <app-form-alert :contents="errorReasons"></app-form-alert>
        <v-basic
          v-show="configModal.tabType === 0"
          :data="sceneInfo"
          :public="publicInfo"
        ></v-basic>
        <v-special-effect
          v-show="configModal.tabType === 1"
          :data="sceneInfo"
          :public="publicInfo"
        ></v-special-effect>
        <v-supplement
          v-show="configModal.tabType === 2"
          :data="sceneInfo"
          :public="publicInfo"
        ></v-supplement>
        <v-narrate
          v-show="configModal.tabType === 3"
          :data="sceneInfo"
          :public="publicInfo"
        ></v-narrate>
      </el-form>
      <!-- 控制按钮 -->
      <div slot="footer" class="edit-setting__footer">
        <el-button
          type="primary"
          :loading="configModal.confirmLoading"
          @click="editConfig"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * @desc 高级编辑 - 场景设置，弹框共用Setting模块的样式
 *
 * @author luminghuai | huojinzhao
 */


import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import deleteItem from '@/mixins/deleteItem'
import Ajax from './modules/ajax'
import modal from '../../../mixins/modal'
import SceneList from './components/SceneList'
import vBasic from './components/Basic'
import vSpecialEffect from './components/SpecialEffect'
import vSupplement from './components/Supplement'
import vNarrate from './components/Narrate'

export default {
  name: 'edit-scene',

  mixins: [modal, deleteItem],

  components: {
    SceneList,
    vBasic,
    vSpecialEffect,
    vSupplement,
    vNarrate,
  },

  props: {
    scenes: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    tabs: ['基本信息', '场景特效', '补天补地', '语音解说'],

    sceneInfo: {},

    publicInfo: {},

    configModal: {
      active: false,
      confirmLoading: false,
      tabType: 0,
    },

    errorReasons: {},
  }),

  computed: {
    activeSceneId() {
      return this.$store.getters.activeScene.id
    },
    ...mapState({
      scenelist: state => state.edit.scene.list,
      public: state => state.edit.scene.public,
    }),
  },

  methods: {
    /* ----- Initialization ------ */

    switchKrpanoScene(sceneId) {
      // eslint-disable-next-line
      const krpano = window.__krpano
      krpano.call(`ac_gotoscene(${sceneId})`)
      // 清空所有热点
      Object.keys(krpano.hotspots)
        .forEach((hotid) => {
          krpano.removehotspot(`hotspot_${hotid}`)
          krpano.removelayer(`hotspot_txt_${hotid}`)
        })
    },

    // 更新场景激活信息
    activateScene(sceneId) {
      this.$store.commit(
        EDIT.SCENE.UPDATE,
        {
          id: sceneId,
          update: { active: true },
        },
      )
    },

    selectScene(sceneId) {
      this.activateScene(sceneId)
      // 切换krpano场景
      this.switchKrpanoScene(sceneId)
      // 加载热点
      this.$store.dispatch(
        EDIT.HOTSPOTS.INIT.SPOTS,
        {
          pano_id: Ajax.defaultPanoId,
          scene_id: sceneId,
        },
      )
    },

    /* ------ Assitance ------ */

    /* --- config --- */

    openSceneConfig(scene) {
      this.sceneInfo = { ...scene }
      this.publicInfo = { ...this.public }
      this.configModal.active = true
    },

    closeSceneConfig() {
      this.configModal = {
        active: false,
        confirmLoading: false,
        tabType: 0,
      }
      this.errorReasons = {}
    },

    /* ------ Application ------ */

    /* --- deletion --- */

    preDeleteScene(sceneId) {
      if (sceneId === this.activeSceneId) {
        this.$message({
          type: 'error',
          message: '当前选中场景不能删除',
        })
      } else {
        this.onDeleteItem({
          title: '删除场景',
          message: '此操作将永久删除该分类，是否继续？',
          itemId: sceneId,
          ajax: this.deleteScene,
          success: this.sceneDeletionSucceed,
        })
      }
    },

    deleteScene(sceneId) {
      return Ajax.removeScene(sceneId)
    },

    sceneDeletionSucceed(sceneId) {
      this.$store.commit(EDIT.SCENE.DELETE, sceneId)
    },

    /* --- edition --- */

    editConfig() {
      this.configModal.confirmLoading = true
      Ajax.replaceScene({
        ...this.sceneInfo,
        ...this.publicInfo,
      })
        .then(() => this.editConfigSucceed())
        .catch((errors) => {
          this.configModal.confirmLoading = false
          this.errorReasons = errors
        })
    },

    editConfigSucceed() {
      // 重新请求列表
      Ajax.readScenelist()
        // 更新store和公共设置状态
        .then(list => this.$store.dispatch(EDIT.SCENE.UPDATE_LIST, list))
      // 关闭编辑
      this.closeSceneConfig()
      // 结果提示
      this.$message({
        type: 'success',
        message: '设置成功',
      })
    },

    /* --- order --- */

    resortScenes() {
      const ids = this.scenelist
        .map(({ id }) => ({ id }))
      Ajax.replaceScenesOrder({ sort: ids })
        .then(() => {
          this.$message.success('操作成功')
        })
    },
  },

  created() {
    Ajax.defaultPanoId = this.$route.query.pano_id
  },
}
</script>

<style lang="postcss">
.edit-control__scene {
  position: absolute;
  bottom: 110px;
  left: 0;
  width: 100%;
  height: 70px;
}
</style>
