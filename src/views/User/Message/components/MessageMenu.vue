<template>
  <ul class="message-menu list">
    <li>
      <router-link to="/user-client/message/system">
        <span class="message-menu__name">系统消息</span>
        <i v-if="counts.sys" class="message-menu__count">{{ counts.sys }}</i>
      </router-link>
    </li>
    <li>
      <router-link to="/user-client/message/private">
        <span class="message-menu__name">私信</span>
        <i v-if="counts.person" class="message-menu__count">{{ counts.person }}</i>
      </router-link>
    </li>
    <li>
      <router-link to="/user-client/message/say">
        <span class="message-menu__name">说一说</span>
        <i v-if="counts.comment" class="message-menu__count">{{ counts.comment }}</i>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'message-menu',

  props: {
    counts: Object,
    required: true,
  },
}
</script>

<style lang="postcss">
@import "vars.css";

:root {
  --padding: 8px;
  --count-height: 20px;
}

.message-menu {
  float: left;
  width: 268px;
  border: 1px solid var(--border-color);

  & > li {
    position: relative;
    padding: 0 7px;

    &:not(:last-child)::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background-color: var(--gray-extra-light);
    }

    & > a {
      display: block;
      padding: 0 var(--padding);

      &.router-link-active {
        color: var(--color-primary);

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 2px;
          height: 100%;
          background-color: var(--color-primary);
        }
      }
    }
  }

  &__name {
    line-height: 49px;
  }

  &__count {
    position: absolute;
    top: 50%;
    right: calc(var(--padding) + 5px);
    width: var(--count-height);
    height: var(--count-height);
    border-radius: 50%;
    margin-top: calc(var(--count-height) / -2);
    background-color: var(--color-danger);
    color: #fff;
    font-size: 12px;
    font-style: normal;
    line-height: var(--count-height);
    text-align: center;
  }
}
</style>
