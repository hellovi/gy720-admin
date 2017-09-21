<template>
  <el-dialog
    :visible="visible"
    @update:visible="val => $emit('update:visible',val)"
    :close-on-click-modal="false"
    @open="open"
    @close="close"
    size="tiny"
    custom-class="confirm-pay"
  >
    <div class="confirm-pay__content text-center">是否完成支付？</div>
    <div slot="footer" class="confirm-pay__button text-center">
      <el-button type="success" @click="success">支付成功</el-button>
      <el-button type="warning" @click="fail">支付失败</el-button>
    </div>
  </el-dialog>
</template>

<script>
  /**
   * 支付是否完成询问框
   * @author chenliangshan
   * @version 2017/09/21
   */

  import { mapState } from 'vuex'
  import { GLOBAL, SERVICE } from '@/store/mutationTypes'

  export default {
    name: 'app-confirm-pay',

    props: {
      visible: {
        type: Boolean,
        default: false,
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

      open() {
        if (this.orderInfo.channel_type === 10) {
          this.$nextTick(() => {
          })
        }
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

<style lass="postcss">
  .confirm-pay {
    &__content {
      font-size: 16px;
    }

    &__button {
      .el-button {
        width: 100px;
        + .el-button {
          margin-left: 40px;
        }
      }
    }
  }
</style>
