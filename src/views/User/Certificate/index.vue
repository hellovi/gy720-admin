<template>
  <div class="cert-content">
    <h1><i class="iconfont">&#xe73c;</i>光鱼认证摄影师</h1>
    <router-view :certInfo="certInfo"></router-view>
  </div>
</template>

<script>
/**
 * 摄影师认证
 *
 * @author zhoumenglin
 * @version 2017-08-11
 */

import { CERTIFICATE } from '@/store/mutationTypes'
import { mapState } from 'vuex'

export default {
  name: 'certifate',

  computed: {
    ...mapState({
      certInfo: state => state.certificate.certInfo,
    }),
  },

  created() {
    this.$store.dispatch(CERTIFICATE.INIT)
      .then(() => {
        if (!this.certInfo.certificate) {
          this.$router.push('/user-client/certificate/apply')
        } else {
          this.$router.push('/user-client/certificate/result')
        }
      })
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.cert-content {
  background-color: #fff;
  &>h1 {
    margin: 0 20px;
    font-size: 24px;
    font-weight:normal;
    line-height:84px;
    border-bottom: 1px solid var(--color-primary);

    & > i {
    margin: 0 20px;
    color: #ff8a00;
    font-size: 50px;
    vertical-align: middle;
  }
  }
}
</style>
