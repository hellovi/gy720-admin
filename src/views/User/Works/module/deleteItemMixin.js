export default {
  methods: {
    onDeleteItem({
      title,
      message,
      itemId,
      request,
      success,
    }) {
      this.$msgbox({
        title,
        message,
        confirmButtonText: '确定',
        showCancelButton: true,
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: this.submitItemDelete(itemId, request, success),
      })
    },

    submitItemDelete(...args) {
      return (action, instance, done) => {
        if (action === 'confirm') {
          this.deleteHandler(...args, instance, done)
        } else {
          done()
        }
      }
    },

    deleteHandler(
      id,
      request,
      success,
      instance,
      done,
    ) {
      /* eslint-disable */
      instance.confirmButtonLoading = true
      request(id)
        .then(() => {
          this.$message({ type: 'success', message: '删除成功' })
          success()
          instance.confirmButtonLoading = false
          done()
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err.message,
          })
          instance.confirmButtonLoading = false
          done()
        })
      /* eslint-enable */
    },
  },
}
