<template>
  <div class="cert-content">
    <!-- <router-link to="/user-client/certificate/result">结果页</router-link>
    <router-link to="/user-client/certificate/apply">认证页</router-link> -->

    <h1>
      <i class="iconfont">&#xe73c;</i>光鱼认证摄影师
    </h1>

    <router-view :cert-info='certInfo'></router-view>

  </div>
</template>

<script>
/**
 * 摄影师认证
 *
 * @author zhoumenglin
 * @version 2017-08-11
 */

// eslint-disable-next-line
import mock from './mock'

export default {
  name: 'certifate',

  data() {
    return {
      certInfo: {},
    }
  },

  computed: {
  },

  methods: {
    getCertInfo() {
      this.$http.get('/user/certificate')
        .then((res) => {
          this.next(res)
        })
    },

    getMockInfo() {
      Promise.resolve(mock)
        .then((res) => {
          this.next(res)
        })
    },

    next(res) {
      // console.log(!res.result.certificate)
      this.certInfo = res.result

      if (!res.result.certificate) {
        this.$router.push('/user-client/certificate/apply')
      } else {
        this.$router.push('/user-client/certificate/result')
      }
    },
  },

  created() {
    this.getCertInfo()
    // this.getMockInfo()
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
