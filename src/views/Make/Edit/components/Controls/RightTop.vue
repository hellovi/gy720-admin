<template>
  <div class="edit-control__right-top">
    <div class="edit-qr-code">
      <img :class="{'ui-hidden': showQrcode === 10}" :src="$url.static(panoInfo.qrcode)" alt="作品二维码">
      <div class="ui-swither ui-swither--left" @click.stop>
        <el-switch
          v-model="showQrcode"
          on-text="显示" off-text="隐藏"
          :on-value="20" :off-value="10"
          @change="uiSwitch"
        ></el-switch>
      </div>
    </div>

    <div class="edit-likes">
      <span :class="{'ui-hidden': showLike === 10}">人气：123</span>
      <div class="ui-swither ui-swither--left" @click.stop>
        <el-switch
          v-model="showLike"
          on-text="显示" off-text="隐藏"
          :on-value="20" :off-value="10"
        ></el-switch>
      </div>
    </div>

    <div
      class="btn-add dash-box tip tip--left"
      role="button"
      v-show="menulist.length < 5"
      data-tip="添加右侧菜单"
      @click="openMenuEdition()"
    >+</div>
    <draggable :list="menulist" @end="onResortMenulist">
      <transition-group
        tag="ul"
        class="edit-control__right-menu list"
      >
        <li class="dash-box"
          v-for="item in menulist" :key="item.id"
        >
          <span>{{ item.title }}</span>
          <edit-tools
            dir="left"
            @edit="openMenuEdition(item)"
            @delete="onDeleteMenu(item.id)"
          ></edit-tools>
        </li>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
/**
 * 高级编辑 - 右侧菜单
 *
 * @author luminghuai | huojinzhao
 */

import { mapState } from 'vuex'
import Draggable from 'vuedraggable'
import { EDIT } from '@/store/mutationTypes'
import EditTools from './EditTools'
import modal from '../../mixins/modal'
import menu from './mixins/menu'

export default {
  name: 'edit-right-top',

  mixins: [modal, menu],

  components: {
    Draggable,
    EditTools,
  },

  data() {
    return {
      show: {
        qrcode: true,
        likes: true,
      },
    }
  },

  computed: {
    ...mapState({
      panoInfo: state => state.edit.panoInfo,
    }),

    showQrcode: {
      get() {
        return this.panoInfo.show_qrcode
      },
      set(show_qrcode) {
        this.$store.commit(EDIT.PANO.UPDATE, { show_qrcode })
      },
    },

    showLike: {
      get() {
        return this.panoInfo.show_like
      },
      set(show_like) {
        this.$store.commit(EDIT.PANO.UPDATE, { show_like })
      },
    },
  },

  methods: {
    uiSwitch(show_qrcode) {
      this.$http.post('/user/pubset/qrcode', {
        pano_id: this.panoInfo.hash_pano_id,
        show_qrcode,
      })
        .then(() => this.$message.success('操作成功'))
    },
  },

  created() {
    this.menuLocation = 'right_menu'
  },
}
</script>


<style lang="postcss">
.edit-control__right-top {
  position: absolute;
  top: 10px;
  right: 10px;
}

.edit-qr-code {
  position: relative;
  margin-bottom: 15px;

  & > img {
    display: block;
    width: 80px;
    height: 80px;
  }
}

.edit-likes {
  position: relative;
  margin-bottom: 15px;
  font-size: 13px;
}

.edit-control__right-menu {
  & > li {
    position: relative;
    margin-top: 15px;
    font-size: 12px;
    cursor: pointer;

    &:hover > .edit-tools {
      visibility: visible;
    }
  }
}

@media screen and (max-height: 760px) {
  .edit-qr-code,
  .edit-likes {
    margin-bottom: 10px;
  }

  .edit-control__right-menu > li {
    margin-top: 10px;
  }
}
</style>
