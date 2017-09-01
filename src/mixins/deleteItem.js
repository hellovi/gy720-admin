/**
 * @description 删除事务mixin，进行警告确认和结果回显
 *
 * @author huojinzhao
 *
 * @param {String} title - 删除弹框的标题
 * @param {String|render} message - 删除弹窗的警告内容提示
 * @param {int} itemId - 删除目标的id
 * @callback ajax - 执行删除事务请求的方法
 * @callback success - 删除成功的回调，接受目标id为参数
 */

/* eslint-disable no-underscore-dangle, no-param-reassign */

export default {
  methods: {
    onDeleteItem({
      title,
      message,
      itemId,
      ajax,
      success = () => {},
    }) {
      this.$msgbox({
        title,
        message,
        confirmButtonText: '确定',
        showCancelButton: true,
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: this._submitItemDelete(itemId, ajax, success),
      })
    },

    _submitItemDelete(...args) {
      return (action, instance, done) => {
        if (action === 'confirm') {
          this._deleteHandler(...args, instance, done)
        } else {
          done()
        }
      }
    },

    _deleteHandler(
      id,
      ajax,
      success,
      instance,
      done,
    ) {
      instance.confirmButtonLoading = true
      ajax(id)
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功',
          })
          success(id)
        })
        .catch((err) => {
          const message = err.message
            && typeof err.message === 'string'
            && err.message.length > 0
            ? err.message
            : '删除失败'

          this.$message({ type: 'error', message })
        })
        .finally(() => {
          instance.confirmButtonLoading = false
          done()
        })
    },
  },
}
