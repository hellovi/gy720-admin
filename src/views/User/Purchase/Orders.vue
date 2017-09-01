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
        <tr v-for="order in list.data" :key="order.hash_order_id">
          <td>{{ order.number }}</td>
          <td>{{ order.name }}</td>
          <td><span class="text-danger">￥{{ order.money }}</span></td>
          <td>{{ order.order_status_name }}</td>
          <td>{{ order.created_at }}</td>
          <td>
            <el-button
              type="primary"
              size="small"
              v-if="order.order_status === 10"
              @click="goToPay(order.hash_order_id)"
            >去付款</el-button>
            <el-button
              type="primary"
              size="small"
              v-else
              class="purchase-orders__btn"
              @click="goToPay(order.hash_order_id)"
            >查看</el-button>
            <el-button
              type="primary"
              size="small"
              v-if="order.order_status === 10"
              class="purchase-orders__btn"
              @click="beforeOrderDelete(order.hash_order_id)"
            >取消</el-button>
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
import { list, deleteItem } from '@/mixins'
import { PURCHASE } from '@/store/mutationTypes'

export default {
  name: 'purchase-orders',

  mixins: [list, deleteItem],

  computed: {
    ...mapState({
      list: state => state.purchase.list,
    }),
  },

  methods: {
    getData(route) {
      return this.$store.dispatch(PURCHASE.ORDERS.INIT, route.query.page)
    },

    goToPay(orderSn) {
      this.$router.push(`/user-client/purchase/orders/${orderSn}`)
    },

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
