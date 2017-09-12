<template>
  <div :id="rotateViewId" class="rotateView-box" v-loading.body="loading">
    <div :id="`${rotateViewId}_playlist_skin`" style="display:none;">
      <ul data-skin>
        <li :data-preloader-path="`${rotateSkinPath}preloader.png`"></li>
        <li :data-hand-move-path="`${rotateSkinPath}handmove.cur`"></li>
        <li :data-hand-grab-path="`${rotateSkinPath}handgrab.cur`"></li>
        <li :data-hand-rotate-path="`${rotateSkinPath}handrotate.cur`"></li>
        <li :data-main-lightbox-close-button-normal-path="`${rotateSkinPath}close-icon.png`"></li>
        <li :data-main-lightbox-close-button-selected-path="`${rotateSkinPath}close-icon-rollover.png`"></li>
        <li :data-controller-background-left-path="`${rotateSkinPath}bg-bar-left.png`"></li>
        <li :data-controller-background-center-path="`${rotateSkinPath}bg-bar-middle.png`"></li>
        <li :data-controller-background-right-path="`${rotateSkinPath}bg-bar-right.png`"></li>
        <li :data-controller-pan-button-normal-state-path="`${rotateSkinPath}move-icon.png`"></li>
        <li :data-controller-pan-button-selected-state-path="`${rotateSkinPath}move-icon-rollover.png`"></li>
        <li :data-controller-rotate-button-normal-state-path="`${rotateSkinPath}rotate-icon.png`"></li>
        <li :data-controller-rotate-button-selected-state-path="`${rotateSkinPath}rotate-icon-rollover.png`"></li>
        <li :data-controller-next-button-normal-state-path="`${rotateSkinPath}right-icon.png`"></li>
        <li :data-controller-next-button-selected-state-path="`${rotateSkinPath}right-icon-rollover.png`"></li>
        <li :data-controller-prev-button-normal-state-path="`${rotateSkinPath}left-icon.png`"></li>
        <li :data-controller-prev-button-selected-state-path="`${rotateSkinPath}left-icon-rollover.png`"></li>
        <li :data-controller-play-button-normal-state-path="`${rotateSkinPath}play-icon.png`"></li>
        <li :data-controller-play-button-selected-state-path="`${rotateSkinPath}play-icon-rollover.png`"></li>
        <li :data-controller-pause-button-normal-state-path="`${rotateSkinPath}pause-icon.png`"></li>
        <li :data-controller-pause-button-selected-state-path="`${rotateSkinPath}pause-icon-rollover.png`"></li>
        <li :data-controller-info-button-normal-state-path="`${rotateSkinPath}info-icon.png`"></li>
        <li :data-controller-info-button-selected-state-path="`${rotateSkinPath}info-icon-rollover.png`"></li>
        <li :data-controller-link-button-normal-state-path="`${rotateSkinPath}link-icon.png`"></li>
        <li :data-controller-link-button-selected-state-path="`${rotateSkinPath}link-icon-rollover.png`"></li>
        <li :data-controller-fullscreen-full-button-normal-state-path="`${rotateSkinPath}fullscr-full-icon.png`"></li>
        <li :data-controller-fullscreen-full-button-selected-state-path="`${rotateSkinPath}fullscr-full-icon-rollover.png`"></li>
        <li :data-controller-fullscreen-normal-button-normal-state-path="`${rotateSkinPath}fullscr-normal-icon.png`"></li>
        <li :data-controller-fullscreen-normal-button-selected-state-path="`${rotateSkinPath}fullscr-normal-icon-rollover.png`"></li>
        <li :data-controller-zoomin-button-normal-state-path="`${rotateSkinPath}zoomin.png`"></li>
        <li :data-controller-zoomin-button-slected-state-path="`${rotateSkinPath}zoomin-rollover.png`"></li>
        <li :data-controller-zoomout-button-normal-state-path="`${rotateSkinPath}zoomout.png`"></li>
        <li :data-controller-zoomout-button-slected-state-path="`${rotateSkinPath}zoomout-rollover.png`"></li>
        <li :data-controller-scrollba-background-left-path="`${rotateSkinPath}scrool-left.png`"></li>
        <li :data-controller-scrollbar-background-middle-path="`${rotateSkinPath}scrool-middle.png`"></li>
        <li :data-controller-scrollbar-background-right-path="`${rotateSkinPath}scrool-right.png`"></li>
        <li :data-controller-scrollbar-handler-normal-state-path="`${rotateSkinPath}handler.png`"></li>
        <li :data-controller-scrollbar-handler-selected-state-path="`${rotateSkinPath}handler-rollover.png`"></li>
        <li :data-button-tooltip-bottom-pointer-path="`${rotateSkinPath}button-tool-tip-down-pointer.png`"></li>
        <li :data-button-tooltip-top-pointer-path="`${rotateSkinPath}button-tool-tip-top-pointer.png`"></li>
        <li :data-button-tooltip-left-path="`${rotateSkinPath}button-tool-tip-left.png`"></li>
        <li :data-button-tooltip-middle-path="`${rotateSkinPath}button-tool-tip-middle.png`"></li>
        <li :data-button-tooltip-right-path="`${rotateSkinPath}button-tool-tip-right.png`"></li>
        <li :data-info-window-close-button-normal-state-path="`${rotateSkinPath}close-icon.png`"></li>
        <li :data-info-window-close-button-selected-state-path="`${rotateSkinPath}close-icon-rollover.png`"></li>
      </ul>
      <div data-paylist v-if="data.length">
        <ul v-for="(list, index) in data" :key="index">
          <li :data-small-image-path="$url.static(list.small_img)"></li>
          <li :data-large-image-path="$url.static(list.large_img)"></li>
        </ul>
      </div>
    </div>
    <app-empty-body v-if="data.length === 0">
      您暂时还没有物品图片
    </app-empty-body>
  </div>
</template>

<script>
  /**
   * 物品3D-预览
   * @author chenliangshan
   * @version 2017/09/11
   */

  import { dynamicLoadScript } from '@/utils'

  const rotatePath = 'assets/3.0.1/lib/rotate/'
  const rotateSkinPath = `/${rotatePath}skin/2/`

  export default {
    name: 'rotate-view',

    props: {
      id: {
        type: Number,
        required: true,
      },
    },

    data() {
      return {
        data: [],
        viewer: null,
        loading: true,
        rotatePath,
        rotateSkinPath,
      }
    },

    computed: {
      rotateViewId() {
        return this.id || `rotate-view_${Math.random().toString(36).substring(3, 8)}`
      },
    },

    watch: {
      id() {
        this.getData()
      },
    },

    methods: {
      getData() {
        this.loading = true
        this.$http.get(`/user/sourcerotateimage?source_rotate_id=${this.id}`)
          .then(({ result }) => {
            this.data = [...result]
            this.viewerDestroy()
            if (this.data.length) {
              // TODO 需要优化-重新实例有性能问题
              this.init()
            } else {
              this.loading = false
            }
          })
      },
      init() {
        this.$nextTick(() => {
          const small_width = '600'
          const small_height = '514'

          window.FWDUtils.onReady(() => {
            this.loading = false
            this.viewer = new window.FWDViewer({
              playListAndSkinId: `${this.rotateViewId}_playlist_skin`,
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
        })
      },
      viewerDestroy() {
        if (this.viewer !== null && this.viewer.destroy) {
          this.viewer.destroy()
          this.viewer = null
        }
      },
    },

    created() {
      // 配置容器位置
      window.FWDViewContainer = `${this.rotateViewId}`
      dynamicLoadScript(`${this.rotatePath}view.js`)
        .then(() => {
          this.getData()
        })
    },

    beforeDestroy() {
      this.viewerDestroy()
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
