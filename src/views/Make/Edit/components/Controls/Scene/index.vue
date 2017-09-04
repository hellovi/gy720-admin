<template>
  <div class="edit-control__scene">
    <div class="edit-scene clearfix">
      <!-- 左侧：滚动 -->
      <div
        class="edit-scene__left-arrow iconfont"
        @click="scrollToLeft"
      >&#xe651;</div>
      <!-- 中间：场景列表 -->
      <draggable
        :list="scenelist"
        @end="resortScenes"
      >
        <transition-group
          class="list clearfix"
          tag="ul" ref="list" style="left: 0px;"
        >
          <!-- 场景项 -->
          <li
            :class="{
              'edit-scene__item': true,
              'edit-scene__item--active': scene.id === activeSceneId
            }"
            v-for="scene in scenelist" :key="scene.id"
          >
            <div
              class="edit-scene__item__wrapper"
              @click="selectScene(scene.id)"
            >
              <img
                class="edit-scene__item__image"
                :src="$url.static(scene.thumb)"
                :alt="scene.name"
              >
              <span class="edit-scene__item__title">{{ scene.name }}</span>
            </div>
            <!-- 设置、删除icon -->
            <edit-tools
              dir="top"
              @delete="preDeleteScene(scene.id)"
              @edit="openSceneConfig(scene)"
            ></edit-tools>
          </li>
        </transition-group>
      </draggable>
      <!-- 右侧：滚动 -->
      <div
        class="edit-scene__right-arrow iconfont"
        @click="scrollToRight"
      >&#xe7a2;</div>
    </div>
    <!-- 右侧：添加场景 -->
    <div class="edit-scene-upload tip tip--top" data-tip="上传场景">
      <div role="button" class="btn-add dash-box">+</div>
    </div>

    <!-- 场景设置弹框 -->
    <el-dialog
      :visible.sync="configModal.active"
      title="场景设置"
      size="large"
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
        ></v-basic>
        <v-special-effect
          v-show="configModal.tabType === 1"
          :data="sceneInfo"
        ></v-special-effect>
        <v-supplement
          v-show="configModal.tabType === 2"
          :data="sceneInfo"
        ></v-supplement>
        <v-narrate
          v-show="configModal.tabType === 3"
          :data="sceneInfo"
        ></v-narrate>
      </el-form>
      <!-- 控制按钮 -->
      <div slot="footer" class="edit-setting__footer">
        <el-button
          type="primary"
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

import Draggable from 'vuedraggable'
import { EDIT } from '@/store/mutationTypes'
import deleteItem from '@/mixins/deleteItem'
import Ajax from './modules/ajax'
import modal from '../../../mixins/modal'
import EditTools from '../EditTools'
import vBasic from './components/Basic'
import vSpecialEffect from './components/SpecialEffect'
import vSupplement from './components/Supplement'
import vNarrate from './components/Narrate'

export default {
  name: 'edit-scene',

  mixins: [modal, deleteItem],

  components: {
    Draggable,
    EditTools,
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
    scenelist: [],

    tabs: ['基本信息', '场景特效', '补天补地', '语音解说'],

    sceneInfo: {},

    configModal: {
      active: false,
      tabType: 0,
    },

    errorReasons: {},
  }),

  computed: {
    activeSceneId() {
      return this.$store.getters.activeScene.id
    },
  },

  watch: {
    '$store.state.edit.scenes.length': 'getScenelist',
  },

  methods: {
    /* ----- Initialization ------ */

    getScenelist(length) {
      if (length) {
        this.scenelist = [
          ...this.$store.state.edit.scenes,
        ]
      }
    },

    switchKrpanoScene(sceneId) {
      // eslint-disable-next-line
      const krpano = window.__krpano
      krpano.call(`ac_gotoscene(${sceneId})`)
      // - 清空所有热点
      Object.keys(krpano.hotspots)
        .forEach((hotid) => {
          krpano.removehotspot(`hotspot_${hotid}`)
          krpano.removelayer(`hotspot_txt_${hotid}`)
        })
    },

    selectScene(sceneId) {
      // 更新场景激活信息
      this.$store.commit(
        EDIT.SCENE.UPDATE,
        {
          id: sceneId,
          update: { active: true },
        },
      )
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

    /* scene scroll */

    // 125是每个场景图的宽度 + 5px margin
    scrollToLeft() {
      const $list = this.$refs.list
      const left = parseInt($list.style.left, 10)

      if (Math.abs(left) <= 125) {
        $list.style.left = '0px'
      } else {
        $list.style.left = `${left + 125}px`
      }
    },

    scrollToRight() {
      const $list = this.$refs.list

      const { innerWidth } = window
      const scrollWidth = $list.scrollWidth
      const left = parseInt($list.style.left, 10)

      if ((scrollWidth + left) - 120 < innerWidth) {
        $list.style.left = `${-(scrollWidth - innerWidth) - 120}px`
      } else {
        $list.style.left = `${left - 125}px`
      }
    },

    /* config */

    openSceneConfig(scene) {
      this.sceneInfo = { ...scene }
      this.configModal.active = true
    },

    closeSceneConfig() {
      this.configModal.active = false
    },

    /* ------ Application ------ */

    /* deletion */

    preDeleteScene(sceneId) {
      this.onDeleteItem({
        title: '删除场景',
        message: '此操作将永久删除该分类，是否继续？',
        itemId: sceneId,
        ajax: this.deleteScene,
        success: this.sceneDeletionSucceed,
      })
    },

    deleteScene(sceneId) {
      return Ajax.removeScene(sceneId)
    },

    sceneDeletionSucceed(sceneId) {
      this.scenelist = this.scenelist
        .filter(scene => scene.id !== sceneId)
    },

    /* edition */

    editConfig() {
      Ajax.replaceScene(this.sceneInfo)
        .then(() => {
          this.$message({
            type: 'success',
            message: '设置成功',
          })
          this.editConfigSucceed(this.sceneInfo)
        })
        .catch((errors) => {
          this.errorReasons = errors
        })
    },

    editConfigSucceed(sceneInfo) {
      const index = this.scenelist
        .findIndex(scene => scene.id === sceneInfo.id)
      if (index > -1) {
        this.$set(this.scenelist, index, sceneInfo)
      }
      this.closeSceneConfig()
    },

    /* order */

    resortScenes() {
      const ids = this.scenelist
        .map(({ id }) => ({ id }))
      Ajax.replaceScenesOrder({ sort: ids })
    },
  },

  created() {
    Ajax.defaultPanoId = this.$route.query.pano_id
  },
}
</script>

<style lang="postcss">
:root {
  --scene-size: 60px;
}

.edit-control__scene {
  position: absolute;
  bottom: 80px;
  left: 0;
  width: 100%;
  height: 70px;
  padding-right: 120px;


  & .edit-scene-upload {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.7);

    & > .dash-box {
      width: 106px;
      height: 56px;
      margin: 7px;
      border-width: 2px;
      font-size: 36px;
      line-height: 45px;
    }
  }
}

.edit-scene {
  position: relative;
  padding: 5px 0;
  background-color: rgba(0, 0, 0, 0.4);

  &__left-arrow,
  &__right-arrow {
    position: absolute;
    top: 0;
    z-index: 5;
    width: 30px;
    height: 70px;
    font-size: 22px;
    text-align: center;
    line-height: 70px;
    cursor: pointer;
    transition: 1s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }

  &__left-arrow {
    left: 0;
  }

  &__right-arrow {
    right: 0;
  }

  .list {
    position: relative;
    height: var(--scene-size);
    padding: 0 5px;
    text-align: center;
    white-space: nowrap;
    transition: 1s;
  }

  &__item {
    position: relative;
    display: inline-block;
    width: var(--scene-size);
    height: var(--scene-size);
    cursor: pointer;
    transition: transform 1s;

    &:hover > .edit-tools {
      visibility: visible;
    }

    &--active {
     box-shadow: 0 0 0 2px #ffc000;
    }

    & + li {
      margin-left: 5px;
    }

    &__wrapper {
      position: relative;
      z-index: 10;
    }

    &__image {
      display: block;
      width: var(--scene-size);
      height: var(--scene-size);
    }

    &__title {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      font-size: 12px;
      text-align: center;
      line-height: 22px;
    }
  }
}
</style>
