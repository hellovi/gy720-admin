<template>
  <header class="app-header clearfix">
    <a class="app-header__logo" href="/">
      <img :src="require('@/assets/logo.png')" alt="光鱼全景">
    </a>

    <nav class="app-header__nav">
      <ul class="list clearfix">
        <li><a href="/">首页</a></li>
        <li><a href="/pano">720°全景</a></li>
        <li><a href="/author">摄影师</a></li>
        <li><a href="/service">服务</a></li>
        <li><a href="/forum">话题</a></li>
      </ul>
    </nav>

    <div class="app-header__func">
      <div class="header-search">
        <form action="/search">
          <input class="header-search__input" name="keyword" type="search" placeholder="搜索全景">
          <i class="header-search__icon iconfont">&#xe600;</i>
        </form>
      </div>

      <el-button class="app-header__button btn-primary" size="small" @click="checkin">签到</el-button>
      <el-button class="app-header__button" type="primary" size="small" @click="$router.push('/user-client/publish')">发布</el-button>

      <div class="app-header__portal">
        <router-link class="app-header__user" to="/user-client">
          <img class="app-header__avatar" :src="userInfo.avatar" :alt="userInfo.nickname">
          <span class="app-header__name">{{ userInfo.nickname }}</span>
        </router-link>
        <ul class="app-header__menu list">
          <li><router-link to="/user-client/center">个人中心</router-link></li>
          <li><router-link to="/user-client/works">我的作品</router-link></li>
          <li><router-link to="/user-client/purchase">购买服务</router-link></li>
          <li><router-link to="/user-client/account">账号管理</router-link></li>
          <li><router-link to="/user-client/message">我的消息</router-link></li>
          <li><a href="/user/logout">退出登陆</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-header',

  computed: {
    ...mapState(['userInfo']),
  },

  methods: {
    checkin() {
      this.$http.get('/user/integral/complete/3')
        .then(() => {
          this.$message('签到成功！ 积分+5，经验+5')
        })
        .catch(() => this.$message.error('您今天已经签到成功，请明天再试'))
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

:root {
  --logo-height: 30px;
  --search-height: 30px;
  --avatar-height: 34px;
}

.app-header {
  /* 防止弹出菜单在z轴上被其它内容挡住 */
  position: relative;
  z-index: 5;
  min-width: var(--content-width);
  height: var(--header-height);
  padding: 0 110px;
  background-color: #313131;
  color: #fff;
  font-size: 14px;

  &__logo {
    float: left;

    & > img {
      height: var(--logo-height);
      margin-top: calc((var(--header-height) - var(--logo-height)) / 2);
    }
  }

  &__nav {
    float: left;
  }

  &__func {
    float: right;
    margin-left: auto;
  }

  &__button {
    margin-left: 15px !important;
  }

  &__portal {
    position: relative;
    display: inline-block;
    margin-top: calc((var(--header-height) - var(--avatar-height)) / 2);
    margin-left: 20px;

    &:hover > .app-header__menu {
      opacity: 1;
      transform: scaleY(1);
    }
  }

  &__user {
    position: relative;
    display: block;

    &::after {
      content: "";
      display: inline-block;
      border-width: 4px 4px 0 4px;
      border-style: solid;
      border-color: #fff transparent transparent;
      margin-left: 10px;
      vertical-align: middle;
    }
  }

  &__avatar {
    width: var(--avatar-height);
    height: var(--avatar-height);
    border-radius: 50%;
    vertical-align: middle;
  }

  &__name {
    vertical-align: middle;
    margin-left: 10px;
  }

  &__menu {
    position: absolute;
    top: 100%;
    right: 0;
    width: 92px;
    padding: 5px 0;
    border-radius: 4px;
    background-color: #313131;
    font-size: 12px;
    text-align: center;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: center top;
    transition: transform 0.3s, opacity 0.6s;

    & > li {
      line-height: 28px;

      & > a {
        transition: 0.3s;

        &:hover {
          color: var(--color-primary);
        }
      }
    }
  }
}

.app-header__nav {
  margin-left: 50px;

  & > ul {

    > li {
      float: left;
      margin: 0 25px;

      > a {
        display: block;
        line-height: var(--header-height);
        transition: 0.3s;

        &:hover {
          color: var(--color-primary);
        }
      }
    }
  }

}

.header-search {
  position: relative;
  display: inline-block;
  height: var(--search-height);
  margin-top: calc((var(--header-height) - var(--search-height)) / 2);

  & form {
    position: relative;
    height: 100%;
  }

  &__input {
    position: relative;
    width: 50px;
    height: 100%;
    padding: 0 10px;
    border: 0;
    border-radius: 10px;
    outline: 0;
    background-color: transparent;
    text-indent: 500px;
    transition: background 0.3s, width 0.6s;
    z-index: 1;

    &:focus {
      background-color: #fff;
      width: 200px;
      text-indent: 0;
      z-index: 0;

      & + .header-search__icon {
        color: var(--color-primary);
      }
    }
  }

  &__icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 20px;
    line-height: 28px;
    transition: 0.6s;
  }
}
</style>
