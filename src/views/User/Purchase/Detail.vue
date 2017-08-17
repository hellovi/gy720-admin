<template>
  <div class="purchase-detail">
    <table class="app-table purchase-detail__table">
      <thead>
        <tr>
          <th>订单编号</th>
          <th>{{order.order_sn}}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>下单时间：</td>
          <td>{{order.created_at}}</td>
        </tr>
        <tr>
          <td>订单金额：</td>
          <td class="text-danger">￥{{order.order_amount}} 元</td>
        </tr>
        <tr>
          <td>订单状态：</td>
          <td>
            {{paystatus}}
            <el-button type="primary" size="small" @click="dialog.confirm = true">去付款</el-button>
          </td>
        </tr>
        <tr>
          <td>订单商品：</td>
          <td>
            {{order.goods_name}} x {{order.goods_num}}
            <span class="text-danger">￥{{order.order_amount}} 元 </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 确认订单组件 -->
    <confirm-dialog
      :visible="dialog.confirm"
      @close="dialog.confirm = false"
      :orderSn="order.order_sn"
      :price="order.order_amount"
    ></confirm-dialog>

  </div>
</template>

<script>
/**
 * 订单详情
 *
 * @author zhoumenglin
 * @version 2017-08-10
 */
import { ConfirmDialog } from '@/components'

export default {
  name: 'purchase-detail',

  components: {
    ConfirmDialog,
  },

  data() {
    return {
      order: {
        created_at: '',
        goods_name: '',
        goods_num: null,
        order_amount: '',
        order_sn: null,
        pay_type: '',
        status: '',
      },

      dialog: {
        confirm: false,
      },
    }
  },

  computed: {
    paystatus() {
      switch (this.order.status) {
        case '10':
          return '待支付'
        case '20':
          return '已支付'
        case '30':
          return '已取消'
        case '90':
          return '已删除'
        default:
          return ''
      }
    },
  },

  methods: {
  },

  beforeRouteEnter(t, f, n) {
    n((vm) => {
      const ordersn = t.params.ordersn
      vm.$http.get(`/user/pay/ordershow?orderSn=${ordersn}`)
        .then((res) => {
          // eslint-disable-next-line
          vm.order = res.result.order
        })
    })
  },


}
</script>

<style lang="postcss">
.purchase-detail {
  & th,
  & td {
    text-align: left;
  }

  & th:first-child {
    width: 130px;
  }

  .el-button {
    margin-left: 10px;
  }
}
</style>
