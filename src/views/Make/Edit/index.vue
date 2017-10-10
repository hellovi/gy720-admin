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
 * @version 2017-09-18
 */

import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import { serviceModal } from '@/mixins'

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

const { embedpano, removepano, krpanoReady } = window

export default {
  name: 'edit',

  mixins: [serviceModal],

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
      createLock: false,
      krpanoObj: null,
      panoId: null,
      title: '',
    }
  },

  computed: {
    ...mapState({
      active: state => state.edit.active,
      scenes: state => state.edit.scene.list,
    }),
    krpanoObjId() {
      return `krpano_${Math.random().toString(36).substring(3, 8)}`
    },
  },

  methods: {
    initPano(pano_id) {
      if (!this.createLock && !this.krpanoObj) {
        this.createLock = true

        embedpano({
          id: this.krpanoObjId,
          swf: '/assets/3.0.1/lib/krpano/tour.swf',
          xml: `/user/pano/xml?pano_id=${pano_id}`,
          target: 'pano-editor',
          html5: 'only+webgl+preservedrawingbuffer',
          onready: (krpanoObj) => {
            this.krpanoObj = krpanoObj
            this.createLock = false

            window._krpano = krpanoObj
            window.__krpano = new window.krpanoplugin(krpanoObj)

            return krpanoReady && krpanoReady()
          },
        })

        // window.__krpano.hotspots = {}

        // window._krpano.querySelector('canvas')
      }
    },

    setTitle(title) {
      this.title = title
    },

    updatePano(to, from) {
      // 初始化高级编辑信息
      const pano_id = to.query.pano_id

      // 获取作品信息
      this.$store.dispatch(EDIT.PANO.INIT, pano_id)
        .then(() => {
          if (this.krpanoObj) {
            this.$store.dispatch(EDIT.PANO.UPDATESCENE)
          } else {
            this.initPano(pano_id)
          }
        })

      // 菜单初始化
      this.$store.dispatch(EDIT.MENU.INIT, pano_id)

      // 清空场景信息
      this.$store.commit(EDIT.SCENE.INIT, { scenes: [] })

      // 获取场景信息
      this.$store.dispatch(EDIT.SCENE.INIT, { pano_id })
        .then(() => {
          // 设置页面标题
          document.title = `${this.$store.state.edit.panoInfo.name} - ${this.title}`
        })

      /**
       * 初始化高级编辑function弹窗状态
       * 从非高级编辑路由跳转到高级编辑路由时生效
       */
      if (to.path !== from.path) {
        this.$store.commit(EDIT.MODAL.RESET)
      }
    },

    removePano() {
      if (this.krpanoObj) {
        removepano(this.krpanoObj.id)
        delete this.krpanoObj
      }
    },

  },

  created() {
    // this.panoId = this.$route.query.pano_id
  },

  mounted() {
    // this.initPano(this.panoId)
  },

  beforeDestroy() {
    this.$store.commit(EDIT.SCENE.INIT, { scenes: [] })
    this.removePano()
  },

  beforeRouteEnter(to, from, next) {
    const title = document.title
    next((vm) => {
      vm.setTitle(title)
      vm.updatePano(to, from)
    })
  },

  beforeRouteUpdate(to, from, next) {
    // 关闭购买弹窗
    this.closeServiceModal('buyInfo')
    this.closeServiceModal('isRenew')

    // 销毁上个实例
    this.removePano()
    // 更新作品
    this.updatePano(to, from)

    next()
  },

  beforeRouteLeave(to, from, next) {
    /**
     * 重置高级编辑function弹窗状态
     * 路由离开高级编辑时生效
     */
    if (to.path !== from.path) {
      this.$store.commit(EDIT.MODAL.RESET)
    }
    next()
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
}

.edit-control__top-center,
.edit-control__top-right {
  .el-button {
    height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .iconfont {
    font-size: 20px;
  }
}
</style>
