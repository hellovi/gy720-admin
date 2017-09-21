<template>
  <el-dialog
    title="付款（微信）"
    :visible="visible"
    @update:visible="val => $emit('update:visible',val)"
    @open="getQrcode"
    @close="close"
  >
    <div class="weixin-pay">
      <el-row>
        <el-col :span="10" class="text-center">
          <div class="weixin-pay__qrcode">
            <canvas ref="canvas"></canvas>
          </div>
        </el-col>
        <el-col :span="14">
          <p>支付金额：
            <strong>￥{{ orderInfo.money }}</strong>
          </p>
          <p>请使用
            <span class="text-primary">微信扫一扫</span>，完成支付！</p>
        </el-col>
      </el-row>

      <div class="text-center">
        <el-button type="success" @click="success">支付成功</el-button>
        <el-button type="warning" @click="fail">支付失败</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  /**
   * 微信支付-组件
   * @author chenliangshan
   * @version 2017/09/21
   */

  import { mapState } from 'vuex'
  import QRCode from 'qrcode'
  import { GLOBAL, SERVICE } from '@/store/mutationTypes'

  export default {
    name: 'app-wexin-pay',

    props: {
      visible: {
        type: Boolean,
        default: 'false',
      },
    },

    computed: {
      ...mapState({
        orderInfo: state => state.service.orderInfo,
      }),
    },

    methods: {
      skipPath() {
        this.$emit('update:visible', false)
        this.$router.push(`/user-client/purchase/orders/${this.orderInfo.hash_order_id}`)
      },

      success() {
        this.skipPath()
      },

      fail() {
        this.skipPath()
      },

      getQrcode() {
        this.$nextTick(() => {
          QRCode.toCanvas(this.$refs.canvas, this.orderInfo.url, () => {})
        })
      },

      close() {
        this.$http.get(`/user/order/${this.orderInfo.hash_order_id}`)
          .then(({ result }) => {
            if (result.order_status === 20) {
              // 更新用户信息
              this.$store.dispatch(GLOBAL.USER.INIT)
              // 执行支付完成回调
              this.$store.commit(SERVICE.MODAL.COMPLETEPAY)
            }
          })
      },

    },

  }
</script>

<style lang="postcss">
  @import "vars.css";

  .weixin-pay {

    padding: 0 20px;

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
      margin-top: 40px;
      width: 100px;
      + .el-button {
        margin-left: 40px;
      }
    }
  }
</style>
