<template>
  <el-dialog
    title="确认购买"
    :visible.sync="visible"
    class="weixin-dialog"
    :before-close="()=>$emit('close')"
  >
    <el-row>
      <el-col :span="10" class="text-center">
        <img class="weixin-dialog__qrcode" :src="qrCode" alt="微信扫一扫">
      </el-col>
      <el-col :span="14">
        <p>支付金额：
          <strong>￥{{ price }}</strong>
        </p>
        <p>请使用
          <span class="text-primary">微信扫一扫</span>，轻松完成支付！</p>
      </el-col>
    </el-row>

    <div class="text-center">
      <el-button type="primary" @click="weixinFinish" >完成支付</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {

  props: {
    visible: {
      type: Boolean,
      default: 'false',
    },
    qrCode: {
      type: String,
      default: 'http://apiv4.720yun.com/member/my/order/wxpay/56w3ljr7q0r35ogt4zl27w9q1e28o40y',
    },
    price: {
      type: String,
      required: 'true',
    },
    orderSn: {
      type: String,
      required: 'true',
    },
  },

  methods: {
    // 支付完成
    weixinFinish() {
      const nw = window.open()
      nw.location.href = `/user-client/purchase/orders/${this.orderSn}`
      this.$emit('close')
    },
  },

}
</script>

<style lang="postcss">
@import "vars.css";

.weixin-dialog {

  .el-dialog {
    width: 600px;
  }

  .el-dialog__body {
    padding: 50px 30px;
  }

  &__qrcode {
    width: 128px;
    height: 128px;
    background-color:var(--gray);
  }

  & p {
    margin-top:25px;

    & strong {
      color: var(--color-danger);
      font-size: 25px;
    }
  }

  .el-button {
    margin-top: 50px;
  }
}
</style>
