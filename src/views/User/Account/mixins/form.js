/**
 * 表单错误处理公共逻辑
 * @author  chenliangshan
 * @version 2017/08/11
 */

const alertDefaultTitle = '提示的文案'

export default {
  data() {
    return {
      formAlert: {},
      formAlertType: null,
      formAlertTitle: null,
      formLoading: false,
      formRef: 'form',
    }
  },

  methods: {
    beforeSubmit() {
      this.$refs[this.formRef].validate((valid) => {
        if (valid) {
          this.formAlert = {}
          this.formLoading = true
          this.submitForm()
        }
      })
    },

    successHandler({ message, title = alertDefaultTitle }) {
      this.formLoading = false
      this.formAlertTitle = title
      this.formAlertType = 'success'
      if (message) {
        this.formAlert = { success: [message] }
      } else {
        this.formAlert = { success: ['提交成功'] }
      }
    },

    errorHandler({ errors, message, title = alertDefaultTitle }) {
      this.formLoading = false
      this.formAlertTitle = title
      this.formAlertType = 'error'
      if (errors) {
        this.formAlert = errors
      } else if (message) {
        this.formAlert = { error: [message] }
      } else {
        this.formAlert = { error: ['服务端错误，请联系网站管理员或稍后重试'] }
      }
      this.formLoading = false
    },
  },
}
