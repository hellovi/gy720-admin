<template>
  <main class="center">
    <app-tab :data="tabs"></app-tab>
    <router-view></router-view>
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
          to: '/user-client/center/collections',
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
    // 为懒加载服务，根据屏幕设置请求个数，保证出现滚动条
    const screenH = window.screen.height
    // 考虑滚轴缩小屏幕情况
    const windowH = window.innerHeight
    // 每页作品数量
    let paginate = 8
    if (Math.max(screenH, windowH) > 2000) paginate = 16
    this.$store.commit(CENTER.SETPAGINATE, paginate)
    // 请求数据
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
