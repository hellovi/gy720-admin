<template>
  <div class="purchase-detail">
    <table class="app-table purchase-detail__table">
      <thead>
        <tr>
          <th>订单编号</th>
          <th>{{order.number}}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>下单时间：</td>
          <td>{{order.created_at}}</td>
        </tr>
        <tr>
          <td>订单金额：</td>
          <td><span class="text-danger">￥{{order.money}}</span> 元</td>
        </tr>
        <tr>
          <td>支付方式：</td>
          <td>{{channel_type}}</td>
        </tr>
        <tr>
          <td>订单状态：</td>
          <td>
            {{order.order_status_name}}
          </td>
        </tr>
        <tr>
          <td>订单商品：</td>
          <td>
            {{order.name}}
          </td>
        </tr>
        <tr v-if="isYearVip && hasInvoice">
          <td class="purchase-detail__bill"><p>发票信息：</p></td>
          <td>
            <p>公司抬头：{{ order.company }}</p>
            <p>邮寄地址：{{ order.address }}</p>
            <p>联&nbsp;&nbsp;系&nbsp;&nbsp;人：{{ order.contact }}</p>
            <p>电话号码：{{order.mobile }}</p>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="isWaitPay" class="purchase-detail__button">
      <el-button
        type="primary"
        @click="dialog.confirm = true"
      >去付款</el-button>
      <el-button
        type="primary"
        @click="beforeOrderDelete(order.hash_order_id)"
      >取消订单</el-button>
    </div>

     <!-- 确认订单组件 -->
    <confirm-dialog
      :visible.sync="dialog.confirm"
      :is-year-vip="isYearVip"
      :hash-order-id="order.hash_order_id"
      :number="order.number"
      :money="order.money"
      :current-window-open='true'
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
import { deleteItem } from '@/mixins'
import { PURCHASE } from '@/store/mutationTypes'

export default {
  name: 'purchase-detail',

  mixins: [deleteItem],

  components: {
    ConfirmDialog,
  },

  data() {
    return {
      order: {
        hash_order_id: '',
        number: '',
        created_at: '',
        money: '',
        channel_type: null,
        order_status_name: null,
        name: '',
        company: null,
        address: '',
        contact: '',
        mobile: '',
        order_type: null,
      },

      dialog: {
        confirm: false,
      },
    }
  },

  computed: {
    isYearVip() { // 是否是年会员
      return this.order.order_type === 10
    },

    isWaitPay() { // 是否完成订单
      return this.order.order_status === 10
    },

    channel_type() { // 支付类型
      switch (this.order.channel_type) {
        case 10:
          return '支付宝支付'
        case 20:
          return '微信支付'
        default:
          return '未付款'
      }
    },

    hasInvoice() {
      return !!this.order.company
    },
  },

  methods: {
    beforeOrderDelete(id) {
      this.onDeleteItem({
        title: '删除订单',
        message: '此操作将永久删除该订单, 是否继续?',
        itemId: id,
        ajax: this.orderDelete,
        success: this.orderDeleteSuccess,
      })
    },

    orderDelete(id) {
      return this.$store.dispatch(PURCHASE.ORDERS.DELETE, id)
    },

    orderDeleteSuccess() {
      this.$message({
        message: '该订单删除成功',
        type: 'warning',
      })
      this.$router.push('/user-client/purchase/orders')
    },

    // 获取订单详情
    getOrderDetail(ordersn) {
      this.$http.get(`/user/order/${ordersn}`)
        .then((res) => {
          this.order = res.result
        })
    },

  },

  beforeRouteEnter(t, f, n) {
    n((vm) => {
      vm.getOrderDetail(t.params.ordersn)
    })
  },

  beforeRouteUpdate(t, f, n) {
    this.getOrderDetail(t.params.ordersn)
    n()
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

  &__bill {
    vertical-align: top;
  }

  p {
      margin:20px 0;
    }

  &__button {
    margin-top: 20px;
  }
}
</style>
