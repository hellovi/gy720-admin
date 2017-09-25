<template>
  <div class="purchase-detail" v-loading="loading">
    <template v-if="!orderEmpty">
      <app-form-alert :contents="formAlert"></app-form-alert>

      <table class="app-table purchase-detail__table">
        <thead>
        </thead>
        <tbody>
        <tr>
          <td>订单编号：</td>
          <td>{{order.number}}</td>
          <td>创建时间：</td>
          <td>{{order.created_at}}</td>
        </tr>
        <tr>
          <td>服务名称：</td>
          <td>
            <template v-if="order.order_type === 20">
              作品：
            </template>
            {{ order.name }}
          </td>
          <td>订单金额：</td>
          <td>
            <span class="text-danger">￥{{ order.money }}</span>
          </td>
        </tr>
        <tr>
          <td>订单状态：</td>
          <td>{{ order.order_status_name }}</td>
          <td>支付方式：</td>
          <td>
            <template v-if="isWaitPay">
              <el-select style="width: 100px;" v-model:number="order.channel_type" :disabled="!channelTypeEdit">
                <el-option :value="10" label="支付宝"></el-option>
                <el-option :value="20" label="微信"></el-option>
              </el-select>
              <el-button type="success" v-if="channelTypeEdit" @click="() => channelTypeEdit = false">确定</el-button>
              <el-button type="primary" v-else @click="() => channelTypeEdit = true">更改</el-button>
            </template>
            <template v-else>
              {{ order.channel_type_name }}
            </template>
          </td>
        </tr>
        <tr v-if="isYearVip && hasInvoice">
          <td class="purchase-detail__bill"><p>发票信息：</p></td>
          <td colspan="3">
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
          @click="updateOrder"
          :loading="formLoading"
        >去付款</el-button>
        <el-button
          type="primary"
          @click="beforeOrderDelete(order.hash_order_id)"
        >取消订单</el-button>
      </div>
    </template>
    <app-empty-body v-if="orderEmpty && !loading">
      该订单不存在
    </app-empty-body>
  </div>
</template>

<script>
/**
 * 订单详情
 *
 * @author zhoumenglin | chenliangshan
 * @version 2017-09-22
 */

import { deleteItem } from '@/mixins'
import { PURCHASE, SERVICE } from '@/store/mutationTypes'

export default {
  name: 'purchase-detail',

  mixins: [deleteItem],

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

      channelTypeEdit: false,

      formAlert: {},
      formLoading: false,

      loading: true,

      orderEmpty: false,
    }
  },

  computed: {
    isYearVip() { // 是否是年会员
      return this.order.order_type === 10
    },

    isWaitPay() { // 是否完成订单
      return this.order.order_status === 10
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
    getOrderDetail(ordersn = this.$route.params.ordersn) {
      this.channelTypeEdit = false
      this.loading = true
      this.$http.get(`/user/order/${ordersn}`)
        .then((res) => {
          this.order = res.result
          this.loading = false
          this.orderEmpty = false
        })
        .catch(() => {
          this.loading = false
          this.orderEmpty = true
        })
    },

    // 提交更新订单支付
    updateOrder() {
      const isAlipay = this.order.channel_type === 10
      const nw = isAlipay ? window.open('/user-client/pay') : null
      this.formAlert = {}
      this.formLoading = true

      const ajaxForm = () => {
        this.$http.get(`/user/order/payment/${this.order.hash_order_id}/${this.order.channel_type}`)
          .then(({ result }) => {
            if (isAlipay) {
              // 更新支付平台链接（支付宝方式）
              nw.location.replace(result.url)
            }
            this.$store.dispatch(SERVICE.MODAL.CREATEORDER, result)
            this.formLoading = false
            this.$store.dispatch(SERVICE.MODAL.CALLBACK)
              .then(() => {
                // 支付完成返回订单列表
                this.$router.push('/user-client/purchase/orders')
              })
          })
          .catch((errors) => {
            if (isAlipay) {
              nw.close()
            }
            this.formAlert = errors
            this.formLoading = false
          })
      }

      if (isAlipay) {
        nw.onload = () => {
          ajaxForm()
        }
      } else {
        ajaxForm()
      }
    },

  },

  beforeRouteEnter(t, f, n) {
    n((vm) => {
      vm.getOrderDetail()
    })
  },

  beforeRouteUpdate(t, f, n) {
    this.getOrderDetail()
    n()
  },

}
</script>

<style lang="postcss">
.purchase-detail {
  & td {
    text-align: left;
    &:nth-child(odd) {
      width: 110px;
    }
    &:nth-child(even) {
      width: 400px;
    }
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
