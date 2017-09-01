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

      /** 如果关闭的是素材框，应同时重置其状态 */
      if (name === 'material') {
        this.$store.commit(EDIT.MATERIAL.CHANGE, 'scene')
        this.$store.commit(EDIT.MATERIAL.INVOKE, false)
      }
    },
  },
}
