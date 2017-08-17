import { mapState } from 'vuex'
import { MESSAGE } from '@/store/mutationTypes'

export default {
  computed: {
    ...mapState({
      list: state => state.message.system,
    }),

    allChecked() {
      return this.list.data.length > 0 && this.list.data.every(item => item.checked)
    },

    someChecked() {
      return this.list.data.length > 0 && this.list.data.some(item => item.checked)
    },
  },

  methods: {
    handleCheck(index) {
      this.$store.commit(MESSAGE.CHECK, {
        type: 'system',
        index,
      })
    },

    checkAll({ target }) {
      this.$store.commit(MESSAGE.CHECK_ALL, {
        type: 'system',
        val: target.checked,
      })
    },
  },
}
