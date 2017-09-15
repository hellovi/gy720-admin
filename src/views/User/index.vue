<template>
  <div>
    <app-header></app-header>
    <div class="app-body">
      <app-user v-show="isNotPublish"></app-user>
      <router-view class="app-content"></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import { AppHeader, AppFooter, AppUser } from '@/components'

export default {
  name: 'user-client',

  components: {
    AppHeader,
    AppFooter,
    AppUser,
  },

  computed: {
    isNotPublish() {
      return this.$route.path !== '/user-client/publish'
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.app-body {
  width: var(--content-width);
  min-height: var(--app-body-min-height);
  margin: 0 auto var(--app-user-margin-bottom);
  overflow: hidden;
}

.app-content {
  min-height: var(--app-content-min-height);
}

/* 说-说 */
.message-control {
  margin-bottom: 15px;
}

.message-avatar {
  float: left;
  position: relative;
  width: 60px;
  height: 60px;
  margin-right: 1em;

  img {
    width: 100%;
    height: 100%;
    border: 2px solid var(--border-color);
    border-radius: 50%;

    &:hover {
      opacity: 0.9;
    }
  }

  &.unread::after {
    content: attr(data-count);
    position: absolute;
    top: 0;
    right: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin-top: -3px;
    margin-right: -3px;
    background-color: var(--color-danger);
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 18px;
  }
}

.message-summary {
  margin-top: 10px;
}
</style>
