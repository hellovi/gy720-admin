<template>
  <div id="app">
    <router-view></router-view>
    <!--购买服务|续费-->
    <template v-if="service.isRender">
      <!--购买服务项目-->
      <el-dialog
        title="购买服务"
        :visible.sync="service.active.buyInfo"
        @close="closeBuyInfo"
        :close-on-click-modal="false"
        size="large"
        :custom-class="service.active.isRenew ? 'app-buy-service-dialog__small' : 'app-buy-service-dialog__large'"
      >
        <app-buy-service :is-renew="service.active.isRenew"></app-buy-service>
      </el-dialog>

      <!-- 购买年会员 -->
      <create-dialog
        :order-type="10"
        :visible.sync="service.active.buyFees"
      ></create-dialog>

      <!-- 购买单作品 -->
      <create-dialog
        :order-type="20"
        :visible.sync="service.active.buySingle"
        @panoBuySuccess="buySingleFinish"
      ></create-dialog>

      <!-- 微信扫码弹窗 -->
      <!--<weixin-dialog
        :visible.sync="service.active.weixinPay"
      ></weixin-dialog>-->
    </template>
  </div>
</template>

<script>

import { GLOBAL } from '@/store/mutationTypes'
import serviceModal from '@/mixins/serviceModal'
import { AppBuyService, CreateDialog } from '@/components'

export default {
  name: 'app',

  mixins: [serviceModal],

  components: {
    AppBuyService,
    CreateDialog,
  },

  methods: {
    buySingleFinish() {
      this.$message.success('购买成功')
    },

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

  created() {
    this.$store.dispatch(GLOBAL.USER.INIT)
  },

}
</script>

<style lang="postcss">
  @import "global.css";

  .app-buy-service-dialog {
    &__large {
      width: 1024px;
    }
    &__small {
      width: 700px;
    }
  }
</style>

