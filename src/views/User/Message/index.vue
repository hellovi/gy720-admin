<template>
  <div class="message">
    <h3 class="message__title">我的消息</h3>
    <div class="clearfix">
      <message-menu :counts="counts"></message-menu>
      <keep-alive>
        <router-view class="message__content"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
/**
 * 我的消息
 *
 * @module @/views/Message
 * @author lmh
 * @version 2017-05-19 lmh
 */

import MessageMenu from './components/MessageMenu'

export default {
  components: {
    MessageMenu,
  },

  data() {
    return {
      counts: {},
    }
  },

  created() {
    this.$http.get('/user/message/unreadcount')
      .then(({ result: { counts } }) => {
        this.counts = counts
      })
  },
}
</script>

<style lang="postcss">
@import 'vars.css';

.message {
  padding: 20px;
  background-color: #fff;

  &__title {
    margin: 0;
    font-size: 22px;
    font-weight: normal;
    line-height: 3.3636;
  }

  &__content {
    float: right;
    width: 832px;
  }
}
</style>
