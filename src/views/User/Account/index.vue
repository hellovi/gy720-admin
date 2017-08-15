<template>
  <div class="user-center-account">
    <app-tab :data="tabData"></app-tab>
    <div class="user-center-account__content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  /**
   * 账号管理
   * @author  chenliangshan
   * @version 2017/08/10
   */

  export default {
    name: 'app-user-center-account',
    data() {
      return {
        tabData: [
          { to: '/user-client/account/info', name: '修改资料', text: '修改资料', icon: '&#xe64b;' },
          { to: '/user-client/account/password', name: '修改密码', text: '修改密码', icon: '&#xe7c6;' },
          { to: '/user-client/account/bind', name: '账号绑定', text: '账号绑定', icon: '&#xe612;' },
        ],
      }
    },
  }
</script>

<style lang="postcss">
  .user-center-account {
    &__content {
      padding: 45px 20px;
      background-color: #fff;
     }
  }
</style>
