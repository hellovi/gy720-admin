<template>
  <div class="app-buy-flow">
    <el-dialog
      title="购买服务"
      :visible.sync="service.active.buyInfo"
      @close="closeBuyInfo"
      :close-on-click-modal="false"
      size="large"
      :custom-class="service.active.isRenew ? 'app-buy-service-dialog__small' : 'app-buy-service-dialog__large'"
    >
      <service-info :is-renew="service.active.isRenew"></service-info>
    </el-dialog>

    <!-- 购买年会员 -->
    <create-order
      :order-type="10"
      :visible.sync="service.active.buyFees"
    ></create-order>

    <!-- 购买单作品 -->
    <create-order
      :order-type="20"
      :visible.sync="service.active.buySingle"
    ></create-order>

    <!-- 微信扫码弹窗 -->
    <weixin-pay
      :visible.sync="service.active.weixinPay"
    ></weixin-pay>

    <!-- 支付完成询问框 -->
    <confirm-pay :visible.sync="service.active.confirmPay"></confirm-pay>
  </div>
  <!--购买服务项目-->
</template>

<script>
  /**
   * 购买服务流程组件
   * @author chenliangshan
   * @version 2017/09/21
   */

  import serviceModal from '@/mixins/serviceModal'
  import ServiceInfo from './ServiceInfo'
  import CreateOrder from './CreateOrder'
  import WeixinPay from './WeixinPay'
  import ConfirmPay from './ConfirmPay'

  export default {
    name: 'app-buy-service',

    mixins: [serviceModal],

    components: {
      ServiceInfo,
      CreateOrder,
      WeixinPay,
      ConfirmPay,
    },

    methods: {
      closeBuyInfo() {
        this.$nextTick(() => {
          // 防止闪屏问题
          setTimeout(() => {
            this.closeServiceModal('buyInfo')
            this.closeServiceModal('isRenew')
          }, 300)
        })
      },
    },

  }
</script>

<style lang="postcss">
  /* 兼容小分辨率屏幕 */
  @media screen and (max-height: 760px) {
    .app-buy-flow {
      .app-buy-service-dialog__small, .app-buy-service-dialog__large {
        top: 5% !important;
      }
    }
  }
</style>
