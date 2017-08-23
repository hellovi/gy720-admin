/**
 * 我的作品 - 删除作品&作品分类
 *
 * @author huojinzhao
 * @description 删除都是用到id，并做警告确认和结果回显
 * @param ajax 封装好的请求方法
 * @param success 删除成功的回调，写在各自组件中
 */

export default {
  methods: {
    onDeleteItem({
      title,
      message,
      itemId,
      ajax,
      success,
    }) {
      this.$msgbox({
        title,
        message,
        confirmButtonText: '确定',
        showCancelButton: true,
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: this.submitItemDelete(itemId, ajax, success),
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
      ajax,
      success,
      instance,
      done,
    ) {
      /* eslint-disable */
      instance.confirmButtonLoading = true
      ajax(id)
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功',
          })
          success()
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err.message,
          })
        })
        .finally(() => {
          instance.confirmButtonLoading = false
          done()
        })
      /* eslint-enable */
    },
  },
}
