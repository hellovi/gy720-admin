<template>
  <div>
    <app-tab :data="tabs"></app-tab>
    <router-view class="purchase-content"></router-view>
  </div>
</template>

<script>
/**
 * 积分管理
 *
 * @author luminghuai
 * @version 2017-08-09
 */

export default {
  name: 'point',

  data() {
    return {
      tabs: [
        { to: '/user-client/purchase/buy', icon: '&#xe613;', text: '购买服务' },
        { to: '/user-client/purchase/orders', icon: '&#xe611;', text: '我的订单' },
      ],
    }
  },
}
</script>

<style>
.purchase-content {
  padding: 50px 80px;
  background-color: #fff;
}
</style>

