export default {
  methods: {
    /**
     * 使得用户可以使用键盘上的esc键退出，27为esc键的keyCode
     */
    closeByEsc(event) {
      if (event.keyCode === 27) this.close()
    },
  },

  created() {
    document.addEventListener('keyup', this.closeByEsc)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.closeByEsc)
  },
}
