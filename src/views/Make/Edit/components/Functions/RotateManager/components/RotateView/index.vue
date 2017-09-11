<template>
  <div id="rotateView-box" class="rotateView-box">
    <div id="viewerPlaylistAndSkin" style="display:none;">
      <ul data-skin>
        <li data-preloader-path="/assets/3.0.1/lib/rotate/skin/2/preloader.png"></li>
        <li data-hand-move-path="/assets/3.0.1/lib/rotate/skin/2/handmove.cur"></li>
        <li data-hand-grab-path="/assets/3.0.1/lib/rotate/skin/2/handgrab.cur"></li>
        <li data-hand-rotate-path="/assets/3.0.1/lib/rotate/skin/2/handrotate.cur"></li>
        <li data-main-lightbox-close-button-normal-path="/assets/3.0.1/lib/rotate/skin/2/close-icon.png"></li>
        <li data-main-lightbox-close-button-selected-path="/assets/3.0.1/lib/rotate/skin/2/close-icon-rollover.png"></li>
        <li data-controller-background-left-path="/assets/3.0.1/lib/rotate/skin/2/bg-bar-left.png"></li>
        <li data-controller-background-center-path="/assets/3.0.1/lib/rotate/skin/2/bg-bar-middle.png"></li>
        <li data-controller-background-right-path="/assets/3.0.1/lib/rotate/skin/2/bg-bar-right.png"></li>
        <li data-controller-pan-button-normal-state-path="/assets/3.0.1/lib/rotate/skin/2/move-icon.png"></li>
        <li data-controller-pan-button-selected-state-path="/assets/3.0.1/lib/rotate/skin/2/move-icon-rollover.png"></li>
        <li data-controller-rotate-button-normal-state-path="/assets/3.0.1/lib/rotate/skin/2/rotate-icon.png"></li>
        <li data-controller-rotate-button-selected-state-path="/assets/3.0.1/lib/rotate/skin/2/rotate-icon-rollover.png"></li>
        <li data-controller-next-button-normal-state-path="/assets/3.0.1/lib/rotate/skin/2/right-icon.png"></li>
        <li data-controller-next-button-selected-state-path="/assets/3.0.1/lib/rotate/skin/2/right-icon-rollover.png"></li>
        <li data-controller-prev-button-normal-state-path="/assets/3.0.1/lib/rotate/skin/2/left-icon.png"></li>
        <li data-controller-prev-button-selected-state-path="/assets/3.0.1/lib/rotate/skin/2/left-icon-rollover.png"></li>
        <li data-controller-play-button-normal-state-path="/assets/3.0.1/lib/rotate/skin/2/play-icon.png"></li>
        <li data-controller-play-button-selected-state-path="/assets/3.0.1/lib/rotate/skin/2/play-icon-rollover.png"></li>
        <li data-controller-pause-button-normal-state-path="/assets/3.0.1/lib/rotate/skin/2/pause-icon.png"></li>
        <li data-controller-pause-button-selected-state-path="/assets/3.0.1/lib/rotate/skin/2/pause-icon-rollover.png"></li>
        <li data-controller-info-button-normal-state-path="/assets/3.0.1/lib/rotate/skin/2/info-icon.png"></li>
        <li data-controller-info-button-selected-state-path="/assets/3.0.1/lib/rotate/skin/2/info-icon-rollover.png"></li>
        <li data-controller-link-button-normal-state-path="/assets/3.0.1/lib/rotate/skin/2/link-icon.png"></li>
        <li data-controller-link-button-selected-state-path="/assets/3.0.1/lib/rotate/skin/2/link-icon-rollover.png"></li>
        <li data-controller-fullscreen-full-button-normal-state-path="/assets/3.0.1/lib/rotate/skin/2/fullscr-full-icon.png"></li>
        <li data-controller-fullscreen-full-button-selected-state-path="/assets/3.0.1/lib/rotate/skin/2/fullscr-full-icon-rollover.png"></li>
        <li data-controller-fullscreen-normal-button-normal-state-path="/assets/3.0.1/lib/rotate/skin/2/fullscr-normal-icon.png"></li>
        <li data-controller-fullscreen-normal-button-selected-state-path="/assets/3.0.1/lib/rotate/skin/2/fullscr-normal-icon-rollover.png"></li>
        <li data-controller-zoomin-button-normal-state-path="/assets/3.0.1/lib/rotate/skin/2/zoomin.png"></li>
        <li data-controller-zoomin-button-slected-state-path="/assets/3.0.1/lib/rotate/skin/2/zoomin-rollover.png"></li>
        <li data-controller-zoomout-button-normal-state-path="/assets/3.0.1/lib/rotate/skin/2/zoomout.png"></li>
        <li data-controller-zoomout-button-slected-state-path="/assets/3.0.1/lib/rotate/skin/2/zoomout-rollover.png"></li>
        <li data-controller-scrollba-background-left-path="/assets/3.0.1/lib/rotate/skin/2/scrool-left.png"></li>
        <li data-controller-scrollbar-background-middle-path="/assets/3.0.1/lib/rotate/skin/2/scrool-middle.png"></li>
        <li data-controller-scrollbar-background-right-path="/assets/3.0.1/lib/rotate/skin/2/scrool-right.png"></li>
        <li data-controller-scrollbar-handler-normal-state-path="/assets/3.0.1/lib/rotate/skin/2/handler.png"></li>
        <li data-controller-scrollbar-handler-selected-state-path="/assets/3.0.1/lib/rotate/skin/2/handler-rollover.png"></li>
        <li data-button-tooltip-bottom-pointer-path="/assets/3.0.1/lib/rotate/skin/2/button-tool-tip-down-pointer.png"></li>
        <li data-button-tooltip-top-pointer-path="/assets/3.0.1/lib/rotate/skin/2/button-tool-tip-top-pointer.png"></li>
        <li data-button-tooltip-left-path="/assets/3.0.1/lib/rotate/skin/2/button-tool-tip-left.png"></li>
        <li data-button-tooltip-middle-path="/assets/3.0.1/lib/rotate/skin/2/button-tool-tip-middle.png"></li>
        <li data-button-tooltip-right-path="/assets/3.0.1/lib/rotate/skin/2/button-tool-tip-right.png"></li>
        <li data-info-window-close-button-normal-state-path="/assets/3.0.1/lib/rotate/skin/2/close-icon.png"></li>
        <li data-info-window-close-button-selected-state-path="/assets/3.0.1/lib/rotate/skin/2/close-icon-rollover.png"></li>
      </ul>
      <div data-paylist>
        <ul v-for="(list, index) in data.small">
          <li :data-small-image-path="list"></li>
          <li :data-large-image-path="data.large[index]"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * 物品3D-预览
   * @author chenliangshan
   * @version 2017/09/11
   */

  import { dynamicLoadScript } from '@/utils'

  export default {
    name: 'rotate-view',

    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
    },

    data() {
      return {
        viewer: null,
      }
    },

    watch: {
      data: {
        handler() {
          this.$nextTick(() => {
            this.viewer.setupData()
          })
        },
        deep: true,
      },
    },

    methods: {
      init() {
        const small_width = '600'
        const small_height = '514'

        window.FWDUtils.onReady(() => {
          this.viewer = new window.FWDViewer({
            playListAndSkinId: 'viewerPlaylistAndSkin',
            displayType: 'fullscreen',
            preloaderText: '加载环物: ',
            startDraggingMode: 'rotate',
            showLargeImageVersionOnZoom: 'yes',
            useEntireScreenFor3dObject: 'yes',
            stopRotationAtEnds: 'no',
            addCorrectionForWebKit: 'yes',
            addDragAndSpinSupport: 'yes',
            startAtImage: 0,
            imageWidth: small_width,
            imageHeight: small_height,
            zoomFactor: 2,
            dragRotationSpeed: 1.2,
            dragAndSpinSpeed: 1,
            buttonsRotationSpeed: 300,
            slideShowDelay: 300,
            backgroundColor: '#FFFFFF',
            preloaderFontColor: '#585858',
            preloaderBackgroundColor: 'none',
            lightBoxWidth: 800,
            lightBoxHeight: 550,
            lightBoxBackgroundOpacity: 0.8,
            lightBoxBackgroundColor: '#000000',
            buttons: 'rotate, pan, roteteleft, rotateright, scrollbar, play',
            buttonsToolTips: '旋转, 平移, 左旋, 右旋, 缩放级别: , 自动/暂停, 简介, 链接',
            controllerPosition: 'bottom',
            inverseNextAndPrevRotation: 'yes',
            addKeyboardSupport: 'yes',
            slideShowAutoPlay: 'yes',
            startSpaceBetweenButtons: 10,
            spaceBetweenButtons: 10,
            startSpaceForScrollBarButtons: 20,
            startSpaceForScrollBar: 6,
            hideControllerDelay: 3,
            controllerMaxWidth: 926,
            controllerBackgroundOpacity: 1,
            controllerOffsetY: 8,
            scrollBarOffsetX: 0,
            scrollBarHandlerToolTipOffsetY: 4,
            zoomInAndOutToolTipOffsetY: -4,
            buttonsToolTipOffsetY: 0,
            link: 'http://www.gy720.com',
            buttonToolTipFontColor: '#FFFFFF',
            infoWindowBackgroundOpacity: 0.9,
            infoWindowBackgroundColor: '#FFFFFF',
            infoWindowScrollBarColor: '#585858',
            showNavigator: 'no',
            showScriptDeveloper: 'no',
          })
        })
      },
    },

    created() {
      dynamicLoadScript('/assets/3.0.1/lib/rotate/vue-view.min.js')
        .then(() => {
          window.rotateViewId = 'rotateView-box'
          this.$nextTick(() => {
            this.init()
          })
        })
    },

    beforeDestroy() {
      if (this.viewer !== null && this.viewer.destroy) {
        this.viewer.destroy()
      }
    },
  }
</script>

<style lang="postcss">
  .rotateView-box {
    width: 770px;
    height: 540px;
    position: relative;
  }
</style>
