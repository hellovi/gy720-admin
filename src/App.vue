<template>
  <div id="app">
    <router-view></router-view>
    <app-buy-service v-if="service.isRender"></app-buy-service>
  </div>
</template>

<script>

import { GLOBAL } from '@/store/mutationTypes'
import serviceModal from '@/mixins/serviceModal'
import { AppBuyService } from '@/components'

export default {
  name: 'app',

  mixins: [serviceModal],

  components: {
    AppBuyService,
  },

  created() {
    this.$store.dispatch(GLOBAL.USER.INIT)
  },

}
</script>

<style lang="postcss">
  @import "global.css";

  .app-buy-service-dialog {
    &__large {
      width: 1024px;
    }
    &__small {
      width: 700px;
    }
  }
</style>

