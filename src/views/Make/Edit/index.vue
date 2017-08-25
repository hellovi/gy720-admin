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
        <scene></scene>
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

  computed: {
    ...mapState({
      active: state => state.edit.active,
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
    const pano_id = this.$route.query.pano_id
    this.$store.dispatch(EDIT.GET_PANOINFO, pano_id)
  },

  mounted() {
    this.initPano(this.$route.query.pano_id)
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

/* 白色圆形按钮 */
.btn-circle {
  position: relative;
  display: inline-block;
  width: 38px;
  height: 38px;
  border: 0;
  border-radius: 50%;
  background-color: #fff;
  color: #636363;
  text-align: center;
  cursor: pointer;

  & + .btn-circle {
    margin-left: 12px;
  }

  & > .iconfont {
    line-height: 36px;
    font-size: 20px;
  }

  & > span {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) scale(0.8);
    margin-top: 3px;
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
  }
}

/* 虚线框 */
.dash-box {
  display: block;
  width: 80px;
  height: 30px;
  line-height: 28px;
  background: transparent;
  color: #fff;
  border: 1px dashed #fff;
  border-radius: 4px;
  text-align: center;
  transition: 0.2s;

  &--cubic {
    width: 40px;
    height: 40px;
    line-height: 38px;
  }

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
}

/* 虚线框按钮 */
.btn-add {
  display: inline-block;
  font-size: 30px;
  cursor: pointer;
  line-height: 23px;
}

.btn-add.dash-box--cubic {
  line-height: 34px;
}

/* 弹出提示 */
:root {
  --tip-color: rgba(51, 51, 51, 0.95);
  --tip-arrow-gap: 5px;
  --tip-arrow-length: 8px;
}

.tip {
  position: relative;

  &::before,
  &::after {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    transform: scale(0);
    transition: 0.1s ease-in;
  }

  &::before {
    content: "";
    border-style: solid;
  }

  &::after {
    content: attr(data-tip);
    padding: 0 12px;
    border-radius: 3px;
    background-color: var(--tip-color);
    font-size: 12px;
    line-height: 32px;
    white-space: nowrap;
  }

  /* 向下 */
  &--bottom::before,
  &--bottom::after {
    top: 100%;
  }

  &--bottom::before {
    left: 10px;
    border-width: 0 0 var(--tip-arrow-length) var(--tip-arrow-length);
    border-color: transparent transparent var(--tip-color);
    margin-top: var(--tip-arrow-gap);
    transform-origin: left bottom;
  }

  &--bottom::after {
    left: 0;
    margin-top: calc(var(--tip-arrow-gap) + var(--tip-arrow-length));
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    transform-origin: left top;
  }

  /* 向上 */
  &--top::before,
  &--top::after {
    bottom: 100%;
  }

  &--top::before {
    left: 10px;
    border-width: var(--tip-arrow-length) 0 0 var(--tip-arrow-length);
    border-color: var(--tip-color) transparent transparent;
    margin-bottom: var(--tip-arrow-gap);
    transform-origin: left top;
  }

  &--top::after {
    left: 0;
    margin-bottom: calc(var(--tip-arrow-gap) + var(--tip-arrow-length));
    box-shadow: 1px -1px 3px rgba(0, 0, 0, 0.2);
    transform-origin: left bottom;
  }

  /* 向左 */
  &--left::before,
  &--left::after {
    right: 100%;
  }

  &--left::before {
    top: 10px;
    border-width: var(--tip-arrow-length) 0 0 var(--tip-arrow-length);
    border-color: transparent transparent transparent var(--tip-color);
    margin-right: var(--tip-arrow-gap);
    transform-origin: left center;
  }

  &--left::after {
    margin-right: calc(var(--tip-arrow-gap) + var(--tip-arrow-length));
    box-shadow: -1px 1px 3px rgba(0, 0, 0, 0.2);
    transform-origin: right center;
  }

  /* 向右 */
  &--right::before,
  &--right::after {
    left: 100%;
  }

  &--right::before {
    top: 10px;
    border-width: var(--tip-arrow-length) var(--tip-arrow-length) 0 0;
    border-color: transparent var(--tip-color) transparent transparent;
    margin-left: var(--tip-arrow-gap);
    transform-origin: right center;
  }

  &--right::after {
    margin-left: calc(var(--tip-arrow-gap) + var(--tip-arrow-length));
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    transform-origin: left center;
  }

  &:hover {
    &::before,
    &::after {
      color: #fff;
      visibility: visible;
      opacity: 1;
      transform: scale(1);
      transition: 0.25s ease-out;
    }
  }
}
</style>
