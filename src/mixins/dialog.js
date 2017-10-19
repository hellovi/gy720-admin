/**
 * 处理弹窗问题
 * @author chenliangshan
 * @version 2017/10/19
 */

export default {
  methods: {
    // 处理遮罩层问题
    setDialogToBody(dom) {
      this.$nextTick(() => {
        document.body.appendChild(this.$refs[dom].$el)
      })
    },
  },
}
