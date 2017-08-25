<template>
  <div>
    <ul class="point-convert-tab list">
      <li>
        <router-link to="rule">我要兑换</router-link>
      </li>
      <li>
        <router-link to="record">兑换记录</router-link>
      </li>
    </ul>

    <router-view class="point-convert-content"></router-view>
  </div>
</template>

<script>
/**
 * 积分兑换
 *
 * @author luminghuai
 * @version 2017-08-25
 */

export default {
  name: 'point-exchange',
}
</script>


<style lang="postcss">
@import "vars.css";

.point-convert-tab {
  margin-bottom: 24px;
  overflow: hidden;

  & > li {
    float: left;
    padding: 0 16px;
    font-size: 12px;
    line-height: 14px;

    &:first-child {
      border-right: 1px solid var(--gray-extra-light);
    }
  }

  & a.router-link-exact-active {
    color: var(--color-primary);
  }
}

.point-convert-content {
  min-height: calc(var(--app-main-content-min-height) - 32px * 2 - 14px - 24px);
}
</style>
