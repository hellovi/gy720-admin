<template>
  <div>
    <el-dialog
      title="确认支付"
      class="confirm-dialog"
      :visible.sync="visible"
      @update:visible="val => $emit('update:visible',val)"
    >
      <p class="text-center">订单已经创建成功，订单号：
        <span class="text-primary">{{orderSn}}</span>
        <br>需支付金额：
        <span class="text-danger">￥{{price}}</span>
      </p>

      <el-radio-group v-model="payType">
        <el-radio label="alipay">支付宝</el-radio>
        <el-radio label="weixin">微信</el-radio>
      </el-radio-group>

      <div class="text-center">
        <el-button type="primary" @click="createpay">确认支付</el-button>
      </div>

    </el-dialog>

    <!-- 微信扫码弹窗 -->
    <weixin-dialog
      :visible.sync="dialog.weixin"
      :price="price"
      :orderSn="orderSn"
    ></weixin-dialog>

  </div>
</template>

<script>

import WeixinDialog from './WeixinDialog'

export default {

  components: {
    WeixinDialog,
  },

  props: {
    visible: {
      type: Boolean,
      default: 'false',
    },
    orderSn: {
      type: String,
      required: 'true',
    },
    price: {
      type: String,
      required: 'true',
    },
    payType: {
      type: String,
      default: 'alipay',
    },
  },

  data() {
    return {
      dialog: {
        weixin: false,
      },
    }
  },

  methods: {
    // 创建支付链接
    createpay() {
      if (this.payType === 'alipay') {
        this.windowOpen('https://www.baidu.com')
        this.alipayFinish('968810')
        this.$emit('update:visible', false)
      } else {
        this.dialog.weixin = true
        this.$emit('update:visible', false)
      }


      // 等待获取支付链接接口

      // this.$http.get(`/user/pay/createpay?orderSn=${this.orderSn}`)
      //   .then((res) => {
      //     if (this.payType === 'alipay') {
      //       this.windowOpen(res.result.payLink)
      //       this.alipayFinish(this.orderSn)
      //       this.$emit('update:visible', false)
      //     } else {
      //       this.dialog.weixin = true
      //       this.$emit('update:visible', false)
      //     }
      //   }).catch((error) => {
      //     this.$message.error(`${error.message}`)
      //   })
    },

    // 新窗口打开支付链接
    windowOpen(url) {
      const nw = window.open()
      nw.location.href = url
    },

    // 支付完成
    alipayFinish(orderSn) {
      this.$alert('请您在新打开的支付平台页面进行支付，支付完成前请不要关闭该窗口', '提示', {
        confirmButtonText: '支付完成',
        type: 'warning',
        callback: () => {
          // 在此要更新该作品的VIP状态或者用户信息的年会员状态
          this.windowOpen(`/user-client/purchase/orders/${orderSn}`)
        },
      })
    },

  },
}
</script>

<style lang="postcss">
@import "vars.css";
.confirm-dialog {
  & p {
    line-height: 2;
  }
}
</style>
