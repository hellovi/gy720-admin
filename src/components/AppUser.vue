<template>
  <div class="app-user">
    <div class="app-user-header">
      <router-link class="app-user__avatar" to="/user-client/center">
        <img v-qiniu-src="userInfo.avatar" data-type="avatar" :alt="userInfo.nickname">
      </router-link>

      <div class="app-user__info">
        <span>Hi，<em>{{ userInfo.nickname }}</em></span>
        <span v-if="userInfo.is_certificate" class="app-user__badge">个人认证</span>
        <router-link
          v-else
          to="/user-client/certificate"
          class="app-user__badge app-user__badge--gray"
        >未认证</router-link>
        <el-tooltip
          effect="dark"
          placement="right"
          :manual="!userInfo.is_vip"
          :content="`到期时间：${vipExpireAt}`"
        >
        <span :class="{'app-user__vip': userInfo.is_vip}">
          <i v-if="userInfo.is_vip" class="iconfont">&#xe6b7;</i>
          {{ userInfo.vip_name }}
        </span>
        </el-tooltip>
      </div>

      <div class="app-user__point">
        <el-tooltip
          effect="dark"
          placement="left"
          :content="`当前经验：${userInfo.experience}`"
        >
          <router-link
            to="/user-client/point/rule"
            class="app-user__badge app-user__badge--level"
          >{{ userInfo.lv }}</router-link>
        </el-tooltip>
        <router-link class="hover-primary" to="/user-client/point">
          经验值：{{ userInfo.integral }}（可用积分：{{ userInfo.integral_remain }}）
        </router-link>
      </div>

      <el-button size="small" @click="goTo('/user-client/account')">修改资料</el-button>
      <el-button size="small" @click="locationTo(`/author/view/${ userInfo.hash_user_id }`)">我的主页</el-button>
      <el-button size="small" @click="renew">续费</el-button>
    </div>
  </div>
</template>

<script>
  /**
   * 用户中心头部
   */

  import { mapState } from 'vuex'
  import serviceModal from '@/mixins/serviceModal'

  export default {
    name: 'app-user',

    mixins: [serviceModal],

    data: () => ({
      isRenew: false,
    }),

    computed: {
      ...mapState(['userInfo']),

      vipExpireAt() {
        return this.userInfo.vip_expire_at ? this.userInfo.vip_expire_at.slice(0, 10) : ''
      },
    },

    methods: {
      goTo(url) {
        this.$router.push(url)
      },
      locationTo(url) {
        window.location.href = url
      },
      renew() {
        this.openServiceModal('buyInfo')
        this.openServiceModal('isRenew')
      },
    },
  }
</script>


<style lang="postcss">
  @import "vars.css";

  :root {
    --avatar-width: 127px;
    --avatar-left: 22px;
  }

  .app-user {
    padding-top: 40px;

    &-header {
      position: relative;
      width: var(--content-width);
      height: var(--app-user-height);
      padding: 15px 15px 15px calc(var(--avatar-width) + var(--avatar-left) + 18px);
      background-color: #fff;
    }

    &__avatar {
      position: absolute;
      bottom: 10px;
      left: var(--avatar-left);

      & > img {
        width: var(--avatar-width);
        height: var(--avatar-width);
        border: 3px solid #fff;
      }
    }

    &__info {
      margin-bottom: 10px;
      font-size: 16px;

      em {
        font-style: normal;
        font-weight: 700;
      }

      & > .app-user__badge {
        margin: 0 10px;
      }
    }

    &__vip {
      color: #ffc000;
    }

    &__point {
      margin-bottom: 10px;
      font-size: 14px;

      & > a {
        margin-right: 10px;
      }
    }
  }

  .app-user__badge {
    display: inline-block;
    padding: 2px 8px;
    background-color: #ff8a00;
    color: #fff;
    font-size: 14px;

    &--gray {
      background-color:  var(--gray);
    }

    &--level {
      background-color: #ffc000;
    }
  }
</style>
