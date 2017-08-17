<template>
  <ul class="app-tab list">
    <li v-for="(tab, index) in data" :key="tab.name" class="app-tab__item" :style="{width: `${100 / data.length}%`}">
      <router-link :to="tab.to">
        <i v-if="tab.icon" class="iconfont" v-html="tab.icon"></i>
        <span class="app-tab__name">{{tab.text}}</span>
        <span class="app-tab__count" v-if="counts[index]">{{ counts[index] }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
/**
 * 公共标签组组件
 *
 * @author luminghuai
 * @param {Array<Object>} data - 标签数组，数组内的每个对象表示一个标签
 */

export default {
  name: 'app-tab',

  props: {
    data: {
      type: Array,
      required: true,
    },
    counts: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.app-tab {
  margin: 15px 0;
  overflow: hidden;
  background-color: #fff;
  // box-shadow: var(--box-shadow-base);
  font-size: 14px;


  &__item {
    float: left;
    height: 50px;
    line-height: 50px;
    text-align: center;

    & > a {
      &:hover,
      &.router-link-active {
        color: var(--color-primary);

        & > .iconfont {
          color: var(--color-primary);
        }
      }

      & > .iconfont {
        margin-right: 12px;
        color: var(--gray-light);
        vertical-align: middle;
      }
    }
  }

  &__name {
    vertical-align: middle;
  }

  &__count {
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin-left: 2em;
    background-color: var(--color-danger);
    color: #fff;
    font-size: 12px;
    vertical-align: middle;
    line-height: 18px;
  }
}
</style>
