// eslint-disable-next-line
/** @typedef {'panos'|'logos'|'tours'|'hotspots'|'icons'|'ads'|'thumbs'|'infos'|'objects'|'audios'|'others'} MaterialType - 素材类型 */
// eslint-disable-next-line
/** @typedef {'tour'|'wechat'|'menu'|'logos'|'hotspot'|'hotspot3d'|'audio'|'hotspotAudio'} InvokeSource - 调用来源 */

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

      if (name === 'material') {
        this.$store.commit(EDIT.MATERIAL.CHANGE, 'scene')
        this.$store.commit(EDIT.MATERIAL.INVOKE, false)
      }
    },
  },
}
