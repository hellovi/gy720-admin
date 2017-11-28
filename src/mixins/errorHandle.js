import { errorHandler } from '@/utils'

export default {
  methods: {
    showError(reason) {
      const h = this.$createElement
      const msgList = typeof reason === 'string' ? [reason] : reason
      this.$msgbox({
        type: 'error',
        title: '提交错误',
        message: h(
          'ol',
          null,
          Object.keys(msgList).map(key => h('li', null, msgList[key])),
        ),
        confirmButtonText: '确定',
      })
    },

    errorHandler(errors) {
      const error = errorHandler(errors)
      const h = this.$createElement
      this.$notify.error({
        duration: error.length * 2000,
        message: h('ol',
          error.map(val => h('li', val)),
        ),
      })
    },
  },
}
