// eslint-disable-next-line
/** @typedef {'panos'|'logos'|'tours'|'hotspots'|'icons'|'ads'|'thumbs'|'infos'|'objects'|'audios'|'others'} MaterialType - 素材类型 */
/** @typedef {'tour'|'wechat'|'menu','hotspot'|'hotspot3d'} InvokeSource - 调用来源 */

import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'

export default {
  computed: {
    ...mapState({
      active: state => state.edit.active,
    }),
  },

  methods: {
    openModal(name) {
      this.$store.commit(EDIT.MODAL.OPEN, name)
    },

    closeModal(name) {
      this.$store.commit(EDIT.MODAL.CLOSE, name)
    },

    /**
     * 其他组件调用素材组件
     * @param {Object} param
     * @param {MaterialType} param.type -素材类型
     * @param {InvokeSource} param.source - 调用来源
     */
    openMaterModal({ type, source }) {
      this.$store.dispatch(EDIT.MATERIAL.TAB.SELECT, { type, source })
    },
  },
}
