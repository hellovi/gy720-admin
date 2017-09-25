<template>
  <transition name="fade">
    <div class="edit-control__scene" v-show="active.sceneList">
      <scene-list
        :scene-list="scenelist"
        @select="selectScene"
        @delete="preDeleteScene"
        @edit="openSceneConfig"
        @drag-end="resortScenes"
      ></scene-list>

      <!-- 场景设置弹框 -->
      <edit-dialog
        :visible.sync="editDialog"
        :scene="editScene"
      ></edit-dialog>
    </div>
  </transition>
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
import modal from '@/views/Make/Edit/mixins/modal'
import SceneList from './components/SceneList'
import EditDialog from './components/EditDialog'

export default {
  name: 'edit-scene',

  mixins: [deleteItem, modal],

  components: {
    SceneList,
    EditDialog,
  },

  props: {
    scenes: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      panoId: null,
      editDialog: false,
      editScene: {}, // 编辑中的场景
    }
  },

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
          pano_id: this.$route.query.pano_id,
          scene_id: sceneId,
        },
      )
    },

    /**
     * 打开场景编辑弹框
     * 同时设置当前编辑的弹框的信息
     */
    openSceneConfig(scene) {
      this.editScene = scene
      this.editDialog = true
    },

    /**
     * 确认删除场景
     * 不允许删除最后一个场景
     */
    preDeleteScene(sceneId) {
      if (this.scenelist.length === 1) {
        this.$notify.error('场景不能为空')
      } else {
        this.onDeleteItem({
          title: '删除场景',
          message: '此操作将永久删除该场景，是否继续？',
          itemId: sceneId,
          ajax: this.deleteScene,
        })
      }
    },
    /**
     * 删除场景
     */
    deleteScene(sceneId) {
      return this.$http.delete(`/user/scene/${sceneId}?pano_id=${this.panoId}`)
        .then(() => {
          if (sceneId === this.activeSceneId) {
            // 删除当前场景时切换其他场景
            const sceneList = this.scenelist.filter(({ id }) => sceneId !== id)
            this.selectScene(sceneList[0].id)
          }
          this.$store.commit(EDIT.SCENE.DELETE, sceneId)
        })
    },

    /**
     * 场景排序
     */
    resortScenes() {
      const sort = this.scenelist.map(({ id }) => ({ id }))
      this.$http.post(`/user/scene/sort?pano_id=${this.panoId}`, { sort })
        .then(() => this.$message.success('操作成功'))
    },
  },

  created() {
    this.panoId = this.$route.query.pano_id
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
