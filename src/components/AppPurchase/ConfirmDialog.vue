<template>
  <div>
    <!-- 确认支付弹窗 -->
    <el-dialog
      title="确认支付"
      class="confirm-dialog"
      :visible="visible"
      @update:visible="val => $emit('update:visible',val)"
    >
      <p>订单已经创建成功，订单号：<span class="text-primary">{{number}}</span></p>
      <p>订单金额：<span class="text-danger">￥{{money}}</span></p>

      <app-form-alert :contents="formAlert"></app-form-alert>

      <el-radio-group v-model="channel_type">
        <el-radio :label="10">支付宝</el-radio>
        <el-radio :label="20">微信</el-radio>
      </el-radio-group>

      <div class="text-center">
        <el-button
          type="primary"
          :loading="formLoading"
          @click="createpay"
        >确认支付</el-button>
      </div>
    </el-dialog>

    <!-- 微信扫码弹窗 -->
    <weixin-dialog
      :visible.sync="dialog.weixin"
      :is-year-vip="isYearVip"
      :hash-order-id="hashOrderId"
      :money="money"
      :url="url"
      @panoBuySuccess="panoBuySuccess"
      :current-window-open="currentWindowOpen"
    ></weixin-dialog>

  </div>
</template>

<script>
import { GLOBAL } from '@/store/mutationTypes'
import AppFormAlert from '@/components/AppFormAlert'
import WeixinDialog from './WeixinDialog'

export default {
  name: 'app-purchase-confirm',

  components: {
    AppFormAlert,
    WeixinDialog,
  },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    isYearVip: {
      type: Boolean,
      default: true,
    },
    hashOrderId: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    money: {
      type: [Number, String],
      required: true,
    },
    currentWindowOpen: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      dialog: {
        weixin: false,
      },
      channel_type: 10, // 支付类型 10:支付宝 20：微信
      url: '', // 支付链接

      formAlert: {}, // 接口返回错误信息
      formLoading: false, // 提交按钮loading
    }
  },

  computed: {
    isAlipay() {
      return this.channel_type === 10
    },
  },

  methods: {
    // 创建支付链接
    createpay() {
      this.formAlert = {}
      this.formLoading = true

      this.$http.get(`/user/order/payment/${this.hashOrderId}/${this.channel_type}`)
        .then(({ result }) => {
          if (this.isAlipay) {
            this.windowOpen(result.url)
            this.alipayFinish()
            this.$emit('update:visible', false)
          } else {
            this.url = result.url
            this.dialog.weixin = true
            this.$emit('update:visible', false)
          }
          this.formLoading = false
        })
        .catch((errors) => {
          this.formAlert = errors
          this.formLoading = false
        })
    },

    windowOpen(url) { // 新窗口打开链接
      const nw = window.open()
      nw.location.href = url
    },

    alipayFinish() { // 支付宝支付完成
      this.$alert('请您在新打开的支付平台页面进行支付，支付完成前请不要关闭该窗口', '提示', {
        confirmButtonText: '支付完成',
        type: 'warning',
        callback: () => {
          // 在此更新该作品的VIP状态或者用户信息的年会员状态
          if (this.isYearVip) {
            this.$store.dispatch(GLOBAL.USER.INIT)
          } else {
            this.panoBuySuccess()
          }
          // 支付完成跳转
          if (this.currentWindowOpen) {
            this.$router.push(`/user-client/purchase/orders/${this.hashOrderId}`)
          } else {
            this.windowOpen(`/user-client/purchase/orders/${this.hashOrderId}`)
          }
        },
      })
    },

    panoBuySuccess() {
      this.$emit('panoBuySuccess')
    },

  },
}
</script>

<style lang="postcss">
@import "vars.css";
.confirm-dialog {
  & p {
    margin:0;
    margin-bottom:15px;
  }

  .el-dialog__body {
    padding: 30px 76px;
  }

  .el-radio-group{
    margin-bottom: 15px;
  }

  .el-radio__label {
    padding-left: 10px;
  }

  .el-radio+.el-radio {
    margin-left: 25px;
}
}
</style>
