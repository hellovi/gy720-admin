<template>
  <div>
    <app-tab :data="tabs"></app-tab>
    <router-view class="purchase-content"></router-view>
  </div>
</template>

<script>
/**
 * 购买服务
 *
 * @author zhoumenglin
 * @version 2017-08-10
 */

export default {
  name: 'purchase',

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

