<template>
  <main class="center">
    <app-tab :data="tabs"></app-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </main>
</template>

<script>
/**
 * 个人中心 - 主组件
 *
 * @author huojinzhao
 */
import { CENTER } from '@/store/mutationTypes'

export default {
  name: 'user-client-center',

  data() {
    return {
      tabs: [
        {
          to: '/user-client/center/recent',
          icon: '&#xe617;',
          text: '最近发布的作品',
        },
        {
          to: '/user-client/center/collection',
          icon: '&#xe663;',
          text: '我的收藏',
        },
        {
          to: '/user-client/center/fans',
          icon: '&#xe6a3;',
          text: '我的粉丝',
        },
        {
          to: '/user-client/center/follows',
          icon: '&#xe652;',
          text: '我的关注',
        },
        {
          to: '/user-client/center/statistics',
          icon: '&#xe680;',
          text: '数据统计',
        },
      ],
    }
  },

  beforeCreate() {
    this.$store.dispatch(CENTER.INITIALIZE)
  },
}
</script>

<style>
@import 'vars.css';
.center {
  background-color: var(--app-bg);
  overflow: hidden;
}
</style>
