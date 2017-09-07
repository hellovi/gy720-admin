<template>
  <div class="edit-control__bottom-right">
    <circle-button
      label="VR"
      icon="vr"
      v-model="showVr"
      @ui-switch="val => uiSwitch(val, 'show_vr')"
    ></circle-button>

    <circle-button
      label="说一说"
      icon="say"
      v-model="showComment"
      @ui-switch="val => uiSwitch(val, 'show_comment')"
    ></circle-button>

    <circle-button
      label="点赞"
      icon="zan"
      v-model="showHit"
      @ui-switch="val => uiSwitch(val, 'show_hit')"
    ></circle-button>
  </div>
</template>

<script>
/**
 * 高级编辑 - 右下区域
 * @author luminghuai
 * @version 2017-09-07
 */

import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import CircleButton from './CircleButton'

export default {
  name: 'edit-bottom-right',

  components: {
    CircleButton,
  },

  computed: {
    ...mapState({
      panoInfo: state => state.edit.panoInfo,
    }),

    showVr: {
      get() {
        return this.panoInfo.show_vr
      },
      set(show_vr) {
        this.$store.commit(EDIT.PANO.UPDATE, { show_vr })
      },
    },

    showComment: {
      get() {
        return this.panoInfo.show_comment
      },
      set(show_comment) {
        this.$store.commit(EDIT.PANO.UPDATE, { show_comment })
      },
    },

    showHit: {
      get() {
        return this.panoInfo.show_hit
      },
      set(show_hit) {
        this.$store.commit(EDIT.PANO.UPDATE, { show_hit })
      },
    },
  },

  methods: {
    uiSwitch(val, propName) {
      const id = this.panoInfo.hash_pano_id
      this.$http.post(`/user/pubset/update?pano_id=${id}`, {
        [propName]: val,
      })
        .then(() => this.$message.success('操作成功'))
    },
  },
}
</script>

<style lang="postcss">
.edit-control__bottom-right {
  position: absolute;
  right: 15px;
  bottom: 30px;
  height: 40px;
}
</style>
