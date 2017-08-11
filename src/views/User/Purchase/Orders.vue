<template>
  <div class="purchase-orders">
    <table class="app-table">
      <thead>
        <tr>
          <th>订单编号</th>
          <th>商品</th>
          <th>订单金额</th>
          <th>订单状态</th>
          <th>下单时间</th>
          <th>管理操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in list.data" :key="order.order_sn">
          <td>{{ order.order_sn }}</td>
          <td>{{ order.goods_name }} x 1 <span class="text-danger">{{ order.order_amount }}</span></td>
          <td><span class="text-danger">￥{{ order.order_amount }}</span></td>
          <td>{{ paystatus(order.status) }}</td>
          <td>{{ order.created_at }}</td>
          <td>
            <el-button type="primary" size="small" v-if="order.status === '20'" class="purchase-orders__btn">查看</el-button>
            <el-button type="primary" size="small" v-else-if="order.status === '10'" @click="goToPay(order.order_sn)" >去付款</el-button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="isEmpty" class="empty">
      <div>您暂时还没有任何订单信息……</div>
    </div>

    <el-pagination
      v-if="list.data.length"
      layout="prev, pager, next"
      :total="list.total"
      :current-page="list.current_page"
      @current-change="pageChange"
    ></el-pagination>

  </div>
</template>

<script>
/**
 * 我的订单
 *
 * @author zhoumenglin
 * @version 2017-08-10
 */

import { mapState } from 'vuex'
import { list } from '@/mixins'
import { PURCHASE } from '@/store/mutationTypes'

export default {
  name: 'purchase-orders',

  mixins: [list],

  computed: {
    ...mapState({
      list: state => state.purchase.orders,
    }),
  },

  methods: {
    getData(route) {
      return this.$store.dispatch(PURCHASE.ORDERS.INIT, route.query.page)
    },

    paystatus(statusCode) {
      switch (statusCode) {
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

    goToPay(orderSn) {
      this.$router.push(`/user-client/purchase/orders/${orderSn}`)
    },
  },

}
</script>

<style lang="postcss">
.purchase-orders {
  &__btn{
    width: 56px;
  }
}
</style>
