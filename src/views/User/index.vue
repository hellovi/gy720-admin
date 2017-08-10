<template>
  <div>
    <app-header></app-header>
    <div class="app-body">
      <app-user></app-user>
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
}
</script>

<style lang="postcss">
@import "vars.css";

:root {
  --margin-bottom: 15px;
  --app-body-min-height: calc(100vh - var(--header-height) - var(--footer-height) - var(--margin-bottom));
  --app-user-area: calc(var(--app-user-height) + var(--app-user-margin-top) + var(--app-user-margin-bottom));
}

.app-body {
  max-width: var(--content-width);
  min-height: var(--app-body-min-height);
  margin: 0 auto var(--margin-bottom);
  overflow: hidden;
}

.app-content {
  min-height: calc(var(--app-body-min-height) - var(--app-user-area));
}
</style>
