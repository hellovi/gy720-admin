import { mapState } from 'vuex'
import { EDIT, SERVICE } from '@/store/mutationTypes'

export default {
  computed: {
    ...mapState({
      active: state => state.edit.active,
      panoInfo: state => state.edit.panoInfo,
    }),
  },

  methods: {
    openModal(name) {
      if (name === 'vipInfo') {
        this.$store.commit(SERVICE.MODAL.OPEN, 'buyInfo')
        this.$store.commit(SERVICE.MODAL.SETPANOINFO, this.$store.state.edit.panoInfo)
        this.$store.dispatch(SERVICE.MODAL.CALLBACK, this.panoInfo)
          .then(() => {
            // 更新作品信息
            this.$store.commit(EDIT.PANO.UPDATE, { is_vip: true })
          })
      } else {
        this.$store.commit(EDIT.MODAL.OPEN, name)
      }
    },

    closeModal(name) {
      this.$store.commit(EDIT.MODAL.CLOSE, name)

      /** 如果关闭的是素材框，应同时重置其状态 */
      if (name === 'material') {
        this.$store.commit(EDIT.MATERIAL.CHANGE, 'scene')
        this.$store.commit(EDIT.MATERIAL.INVOKE, false)
      }
    },
  },
}
