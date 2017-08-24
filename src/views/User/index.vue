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
  max-width: var(--content-width);
  min-height: var(--app-body-min-height);
  margin: 0 auto var(--app-user-margin-bottom);
  overflow: hidden;
}

.app-content {
  min-height: var(--app-content-min-height);
}
</style>
