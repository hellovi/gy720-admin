<template>
  <div class="app-user">
    <router-link class="app-user__avatar" to="/user-client/center">
      <img :src="$url.static(userInfo.avatar)" :alt="userInfo.nickname">
    </router-link>

    <div class="app-user__info">
      <span>Hi，<em>{{ userInfo.nickname }}</em></span>
      <span class="app-user__badge">已认证</span>
      <span class="app-user__vip"><i class="iconfont">&#xe6b7;</i>商业版会员</span>
    </div>
    <div class="app-user__point">
      <span class="app-user__badge app-user__badge--level">LV{{ userInfo.level_id }}</span>
      <router-link class="hover-primary" to="/user-client/point">
        积分：{{ userInfo.total_integral }}（可用：{{ userInfo.left_integral }}）
      </router-link>
    </div>
    <div>
      <el-button size="small">修改资料</el-button>
      <el-button size="small">我的主页</el-button>
      <el-button size="small">续费</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-user',

  computed: {
    ...mapState(['userInfo']),
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
  position: relative;
  width: var(--content-width);
  height: var(--app-user-height);
  padding: 15px 15px 15px calc(var(--avatar-width) + var(--avatar-left) + 18px);
  margin: var(--app-user-margin-top) auto var(--app-user-margin-bottom);
  background-color: #fff;

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
      margin-left: 10px;
    }
  }
}

.app-user__badge {
  display: inline-block;
  padding: 2px 8px;
  background-color: #ff8a00;
  color: #fff;
  font-size: 14px;

  &--level {
    background-color: #ffc000;
  }
}
</style>
