<template>
  <el-button :type="btnConf.type"
             :loading="disabled"
             :disabled="disabled || time > 0">{{btnConf.text}}</el-button>
</template>
<script>
  /**
   * 获取验证码
   * @author  chenliangshan
   * @version 2017/08/17
   */

  const defBtnTxt = '获取验证码'
  const defType = 'success'
  const progressType = ''

  export default {
    name: 'timer-btn',
    props: {
      second: {
        type: Number,
        default: 60,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        time: 0,
      }
    },
    computed: {
      btnConf() {
        return this.time > 0 ? { type: progressType, text: `${this.time}s 后重新获取` } : { type: defType, text: defBtnTxt }
      },
    },
    methods: {
      run() {
        this.time = this.second
        this.timer()
      },
      timer() {
        if (this.time > 0) {
          this.time -= 1
          setTimeout(() => this.timer(), 1000)
        }
      },
    },
  }
</script>
