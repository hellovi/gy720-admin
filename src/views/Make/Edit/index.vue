<template>
  <div class="edit-wrapper">

    <!--全景层-->
    <div id="pano-editor"></div>

    <!--UI层-->
    <transition name="edit-control-fade">
      <div class="edit-control" v-show="active.control">
        <top-left></top-left>
        <top-center></top-center>
        <top-right></top-right>
        <right-top></right-top>
        <right-middle></right-middle>
        <hotspot></hotspot>
        <scene :scenes="scenes"></scene>
        <bottom-left></bottom-left>
        <bottom-center></bottom-center>
        <bottom-right></bottom-right>
      </div>
    </transition>

    <!--功能层-->
    <edit-functions></edit-functions>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle, new-cap */
/**
 * 高级编辑
 * @author luminghuai | chenliangshan
 * @version 2017-08-11
 */

import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'

import {
  TopCenter,
  TopLeft,
  TopRight,
  RightTop,
  RightMiddle,
  Hotspot,
  Scene,
  BottomLeft,
  BottomCenter,
  BottomRight,
} from './components/Controls'

import EditFunctions from './components/Functions'

export default {
  name: 'edit',

  components: {
    TopCenter,
    TopLeft,
    TopRight,
    RightTop,
    RightMiddle,
    Hotspot,
    Scene,
    BottomLeft,
    BottomCenter,
    BottomRight,
    EditFunctions,
  },

  data() {
    return {
      panoId: null,
    }
  },

  computed: {
    ...mapState({
      active: state => state.edit.active,
      scenes: state => state.edit.scene.list,
    }),
  },

  methods: {
    initPano(pano_id) {
      window.embedpano({
        swf: '/assets/3.0.1/lib/krpano/tour.swf',
        xml: `/user/pano/xml?pano_id=${pano_id}`,
        target: 'pano-editor',
        html5: 'only+webgl+preservedrawingbuffer',
        onready: window.krpanoReady,
      })

      window._krpano = document.getElementById('krpanoSWFObject')
      window.__krpano = new window.krpanoplugin(window._krpano)

      // window.__krpano.hotspots = {}

      // window._krpano.querySelector('canvas')
    },
  },

  created() {
    this.panoId = this.$route.query.pano_id
    // 获取作品信息
    this.$store.dispatch(EDIT.GET_PANOINFO, this.panoId)

    // 菜单初始化
    this.$store.dispatch(EDIT.MENU.INIT, this.panoId)

    // 获取场景信息
    this.$store.dispatch(EDIT.SCENE.INIT, this.panoId)
      .then((sceneId) => {
        // 加载当前场景热点
        window.__krpano.hotspots = {}
        this.$store.dispatch(EDIT.HOTSPOTS.INIT.SPOTS, { scene_id: sceneId, pano_id: this.panoId })
      })
  },

  mounted() {
    this.initPano(this.panoId)
  },
}

</script>

<style lang="postcss">
@import "vars.css";
#pano-editor {
  width: 100vw;
  height: 100vh;
}

.edit-wrapper {
  background-color: #000;
}

/* 控制层 淡入淡出 */
.edit-control-fade-enter-active,
.edit-control-fade-leave-active {
  transition: opacity 0.2s;
}

.edit-control-fade-enter,
.edit-control-fade-leave-to {
  opacity: 0;
}

/* 功能层淡入淡出 */
.edit-function-fade-enter-active,
.edit-function-fade-leave-active {
  transition: 0.3s;
}

.edit-function-fade-enter,
.edit-function-fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.edit-control {
  overflow: hidden;
  color: #fff;

  .el-button {
    height: 30px;
    padding-top: 0;
    padding-bottom: 0;

    .iconfont {
      font-size: 20px;
    }
  }
}
</style>
