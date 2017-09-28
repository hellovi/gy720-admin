<template>
  <div class="message">
    <app-tab :data="tabs"></app-tab>
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
    }
  },

}
</script>

<style lang="postcss">
@import 'vars.css';

.message__content {
  min-height: var(--app-main-content-min-height);
  padding: 20px 30px;
  background-color: #fff;
}

.message__content {
  td {
    padding-top: 1em;
    padding-bottom: 1em;
  }
}

.message-summary {
  line-height: 20px;
}
</style>
