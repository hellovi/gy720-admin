<template>
  <div>
    <app-tab :data="tabs"></app-tab>
    <router-view class="point-content"></router-view>
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
        { to: '/user-client/point/task', icon: '&#xe699;', text: '积分任务' },
        { to: '/user-client/point/exchange', icon: '&#xe639;', text: '积分兑换' },
        { to: '/user-client/point/log', icon: '&#xe611;', text: '积分日志' },
        { to: '/user-client/point/rule', icon: '&#xe621;', text: '积分体系规则' },
      ],
    }
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.point-content {
  min-height: var(--app-main-content-min-height);
  padding: 32px 35px;
  background-color: #fff;
}
</style>

