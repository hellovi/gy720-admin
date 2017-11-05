<template>
  <div role="button" class="edit-control__bottom-left">
    <circle-button
      label="场景"
      icon="items"
      pointer
      v-model="activeSceneList"
      @ui-switch="switchSceneShow"
    >场景</circle-button>

    <circle-button
      label="分享"
      icon="share"
      pointer
      v-model="showShare"
      @ui-switch="uiSwitch"
      @click="openModal('share')"
    ></circle-button>

    <span
      role="button"
      class="btn-circle btn-circle--pointer icon-info"
      :class="{'ui-hidden': !showRemark}"
      @click="openModal('summary')"
    >简介</span>

    <div class="edit-control__bottom-menu-wrapper">
      <draggable element="span"
        :list="menulist"
        @end="onResortMenulist"
      >
        <transition-group
          tag="ul"
          class="edit-control__button-menu list"
        >
          <li class="dash-box"
            v-for="item in menulist" :key="item.id"
          >
            <span>{{ item.title }}</span>
            <edit-tools
              dir="top"
              @edit="openMenuEdition(item)"
              @delete="onDeleteMenu(item.id)"
            ></edit-tools>
          </li>
        </transition-group>
      </draggable>
      <div
        class="btn-add dash-box dash-box--cubic tip tip--right"
        role="button"
        v-show="menulist.length < 3"
        data-tip="添加底部菜单"
        @click="openMenuEdition()"
      >+</div>
    </div>
  </div>
</template>

<script>
/**
 * 高级编辑 - 场景/分享/底部菜单
 *
 * @author luminghuai | huojinzhao
 */

import { mapState } from 'vuex'
import Draggable from 'vuedraggable'
import { EDIT } from '@/store/mutationTypes'
import modal from '../../mixins/modal'
import menu from './mixins/menu'
import EditTools from './EditTools'
import CircleButton from './CircleButton'

export default {
  name: 'edit-bottom-left',

  mixins: [modal, menu],

  data: () => ({
    activeSceneList: 20,
  }),

  components: {
    Draggable,
    EditTools,
    CircleButton,
  },

  computed: {
    ...mapState({
      panoInfo: state => state.edit.panoInfo,
    }),

    showShare: {
      get() {
        return this.panoInfo.show_share
      },
      set(show_share) {
        this.$store.commit(EDIT.PANO.UPDATE, { show_share })
      },
    },

    showRemark() {
      return this.panoInfo.show_remark === 20
    },
  },

  methods: {
    uiSwitch(show_share) {
      this.$store.dispatch(EDIT.PANO.UPDATE, {
        show_share,
      })
        .then(({ status: { reason } }) => this.$message.success(reason))
    },
    switchSceneShow() {
      if (this.activeSceneList === 20) {
        this.openModal('sceneList')
      } else {
        this.closeModal('sceneList')
      }
    },
  },

  created() {
    this.menuLocation = 'bottom_menu'
  },
}
</script>


<style lang="postcss">
.edit-control__bottom-left {
  position: absolute;
  bottom: 30px;
  left: 15px;
  height: 40px;
  z-index: 10;

  & > * {
    vertical-align: top;
  }
}

.edit-control__bottom-menu-wrapper {
  display: inline-block;

  & > .btn-add {
    margin-left: 10px;
  }
}

.edit-control__button-menu {
  display: inline-block;
  vertical-align: top;

  & > .dash-box {
    position: relative;
    float: left;
    width: 66px;
    height: 40px;
    margin-left: 10px;
    line-height: 38px;
    cursor: pointer;
    font-size: 14px;

    &:hover > .edit-tools {
      visibility: visible;
    }
  }
}
</style>
