<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { GLOBAL } from '@/store/mutationTypes'

export default {
  name: 'app',

  created() {
    this.$store.dispatch(GLOBAL.USER.INIT)
  },
}
</script>

<style lang="postcss">
@import "global.css";
</style>

