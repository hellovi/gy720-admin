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
  .user-account {
    &__btn {
      width: 100px;
     & + & {
        padding-left: 10px;
      }
    }
  }

  .user-center-account {
    &__content {
      padding: 45px 20px;
      background-color: #fff;
     }
  }
  /* 账号绑定 */
  .user-account-bind {
    margin: 0;
    padding: 0;
    &__label {
      float: left;
      text-align: right;
      width: 200px;
      padding: 11px 12px 11px 0;
    }
    &__content {
      margin-left: 200px;
      text-align: left;
      line-height: 36px;
      .email-bind {
        width: 280px;
      }
    }
    li {
      list-style-type: none;
      font-size: 14px;
      color: #48576a;
      line-height: 1;
      box-sizing: border-box;
    }
  }

  /* 绑定第三方账号 */
  .user-account-third {
    padding: 30px 0 0 130px;
    &__title {
      font-weight: normal;
      font-size: 16px;
      line-height: 30px;
      border-bottom: 1px solid #bfbfbf;
    }
    &__content {
      .el-row {
        padding: 20px;
      }
      .third-icon {
        width: 35px;
        height: 35px;
        display: block;
        overflow: hidden;
        background-image: url('./assets/third-parties.png');
        background-position: 0 0;
        background-repeat: no-repeat;
        &__weixin {
          background-position: 0 0;
        }
        &__qq {
          background-position: 0 -35px;
        }
        &__weibo {
          background-position: 0 -70px;
        }
      }
      .txt {
        padding: 0;
        margin: 0;
        font-size: 12px;
        color: #555;
      }
      .ahref {
        font-size: 12px;
        color: #3b9ff3;
      }
    }
  }
</style>
