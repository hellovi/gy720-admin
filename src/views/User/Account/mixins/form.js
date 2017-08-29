/**
 * 表单错误处理公共逻辑
 * @author  chenliangshan
 * @version 2017/08/11
 */

export default {
  data() {
    return {
      formAlert: {},
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

    errorHandler(errors) {
      this.formAlert = errors
      this.formLoading = false
    },
  },
}
