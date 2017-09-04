<template>
  <el-dialog
    title="确认购买"
    :visible="visible"
    @update:visible="val => $emit('update:visible',val)"
    @open="getQrcode"
  >
    <div class="weixin-dialog">
      <el-row>
        <el-col :span="10" class="text-center">
          <div class="weixin-dialog__qrcode">
            <canvas ref="canvas"></canvas>
          </div>
        </el-col>
        <el-col :span="14">
          <p>支付金额：
            <strong>￥{{ money }}</strong>
          </p>
          <p>请使用
            <span class="text-primary">微信扫一扫</span>，轻松完成支付！</p>
        </el-col>
      </el-row>

      <div class="text-center">
        <el-button type="primary" @click="weixinFinish" >完成支付</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import QRCode from 'qrcode'
import { GLOBAL } from '@/store/mutationTypes'

export default {
  name: 'app-purchase-wexin-slot',

  props: {
    visible: {
      type: Boolean,
      default: 'false',
    },
    isYearVip: {
      type: Boolean,
      default: 'true',
    },
    url: {
      type: String,
      required: true,
    },
    money: {
      type: [Number, String],
      required: true,
    },
    hashOrderId: {
      type: String,
      required: true,
    },
  },

  methods: {
    // 支付完成
    weixinFinish() {
      const nw = window.open()
      nw.location.href = `/user-client/purchase/orders/${this.hashOrderId}`
      this.$emit('update:visible', false)
      // 在此要更新该作品的VIP状态或者用户信息的年会员状态
      if (this.isYearVip) {
        this.$store.dispatch(GLOBAL.USER.INIT)
      } else {
        this.$emit('panoBuyOk')
      }
    },

    // getQrcode(url) {
    //   console.log(url)
    //   QRCode.toCanvas(this.$refs.canvas, url, () => {})
    // },

    getQrcode() {
      this.$nextTick(() => {
        QRCode.toCanvas(this.$refs.canvas, this.url, () => {})
      })
    },
  },

  // watch: {
  //   url(val) {
  //     this.$nextTick(() => {
  //       this.getQrcode(val)
  //     })
  //   },
  // },

  // mounted() {
  //   this.getQrcode(this.url)
  // },

}
</script>

<style lang="postcss">
@import "vars.css";

.weixin-dialog {

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
