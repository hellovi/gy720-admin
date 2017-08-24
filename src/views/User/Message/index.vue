<template>
  <div class="message">
    <app-tab :data="tabs" :counts="counts"></app-tab>
    <keep-alive>
      <router-view class="message__content"></router-view>
    </keep-alive>
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
      tabs: [
        { to: '/user-client/message/system', icon: '&#xe699;', text: '系统消息' },
        { to: '/user-client/message/private', icon: '&#xe639;', text: '私信' },
        { to: '/user-client/message/say', icon: '&#xe611;', text: '说一说' },
      ],
      counts: [],
    }
  },

  created() {
    this.$http.get('/user/message/unreadcount')
      .then(({ result: { counts } }) => {
        this.counts = [counts.sys, counts.person, counts.comment]
      })
  },
}
</script>

<style lang="postcss">
@import 'vars.css';

.message__content {
  padding: 20px 30px;
  background-color: #fff;
}

.message__content {
  td {
    padding-top: 1em;
    padding-bottom: 1em;
  }
}

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

  /* 私信用户头像上的未读计数，设计图有，原型上无，后端没做 */
  /* &::after {
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
  } */
}

.message-summary {
  margin-top: 10px;
}
</style>
