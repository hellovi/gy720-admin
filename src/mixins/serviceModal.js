import { mapState } from 'vuex'
import { SERVICE } from '@/store/mutationTypes'

export default {
  computed: {
    ...mapState({
      service: state => state.service,
    }),
  },

  methods: {
    openServiceModal(name) {
      this.$store.commit(SERVICE.MODAL.OPEN, name)
    },

    closeServiceModal(name) {
      this.$store.commit(SERVICE.MODAL.CLOSE, name)
    },
  },
}
