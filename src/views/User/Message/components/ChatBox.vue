<template>
  <el-dialog custom-class="chat-box" :title="chat.nickname" :visible="value" :before-close="handleClose">
    <!-- <div class="chat-box__more hover-primary">查看更多消息</div> -->
    <dl class="chat-box__content" v-loading="loading" ref="chatContent">
      <!-- <dt><time class="chat-box__date">2016-12-01</time></dt> -->
      <dd>
        <ul class="list">
          <li
            v-for="item in chat.history"
            :key="item.date"
            :class="`chat-item clearfix chat-item--${item.is_another ? 'left' : 'right'}`"
          >
            <div class="clearfix">
              <img class="chat-item__avatar" :src="$url.static(item.avatar)" :alt="item.nickname">
              <article class="chat-item__message">{{ item.content }}</article>
            </div>
            <div class="chat-item__date">{{ item.date }}</div>
          </li>
        </ul>
      </dd>
    </dl>
    <div class="chat-box__input">
      <el-input
        type="textarea"
        placeholder="发送消息......"
        :rows="3"
        resize="none"
        v-model="content"
      ></el-input>
      <el-button type="primary" :loading="sending" @click="sendMessage">发送</el-button>
    </div>

    <div style="width: 20px; height: 30px; border: 20% solid #ccc;"></div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { MESSAGE } from '@/store/mutationTypes'

export default {
  name: 'chat-box',

  props: {
    value: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      content: '',
      sending: false,
      timer: null,
    }
  },

  computed: {
    ...mapState({
      chat: state => state.message.chat,
    }),
  },

  /**
   * 父组件每次点击回复按钮都会引起userId变化
   * 监听这个变化，并根据这个id获取聊天记录
   * 成功获取记录后，启用一个定时器轮询接口，以便获取对方发送的信息
   */
  watch: {
    userId(val) {
      if (val !== -1) {
        this.getHistory(val, true)
          .then(() => {
            this.timer = setInterval(() => {
              this.getHistory(val)
                .then(() => {
                  // 一次轮询完成后，聊天窗口其实可能已经被关闭（利用value来判断）
                  // 这时候取得的数据其实是无用的，反而会干扰其它功能，应该重新清空
                  if (!this.value) {
                    this.$store.commit(MESSAGE.PRIVATE.HISTORY.RESET)
                  }
                })
            }, 5000)
          })
      }
    },
  },

  methods: {
    /**
     * 第一次获取聊天记录时，需要展示loading状态，后续的轮询不需要
     * @param {number} userId
     * @param {boolean} firstTime - 是否为初始化聊天记录
     */
    getHistory(userId, firstTime) {
      if (firstTime) {
        this.loading = true
      }

      return this.$store.dispatch(MESSAGE.PRIVATE.HISTORY.INIT, userId)
        .then(() => {
          this.loading = false
          // 把列表拉到最底部，是用户看到最近的聊天记录
          this.$refs.chatContent.scrollTop = 999999999
        })
    },

    /**
     * 关闭聊天窗口的同时，重置userId，取消轮询，并清空store总的聊天数据
     * 重置userId是为了上面设置的那个watch总是能正确工作
     */
    handleClose(done) {
      this.$emit('input', false)
      this.$emit('close')
      clearInterval(this.timer)
      this.$store.commit(MESSAGE.PRIVATE.HISTORY.RESET)
      done()
    },

    /**
     * 发送一条新的聊天记录
     * 接口调用成功后，清空聊天输入框的内容，并把后台返回的新一条聊天记录插入store中的聊天记录中
     * 接口调用失败时弹出消息提示
     */
    sendMessage() {
      this.sending = true

      const { content } = this

      this.$http.post('/user/chat/send', {
        id: this.chat.id,
        content,
      })
        .then(({ result }) => {
          this.content = ''
          this.$store.commit(MESSAGE.PRIVATE.HISTORY.UPDATE, result)
          this.$nextTick(() => {
            this.$refs.chatContent.scrollTop = 999999999
          })
          // 同时更新主列表的信息
          this.$store.commit(MESSAGE.PRIVATE.UPDATE, {
            id: this.chat.id,
            content: result.content,
          })
          this.sending = false
        })
        .catch(({ message }) => {
          this.$message.error(message)
        })
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.chat-box {
  width: 600px;

  .el-dialog__body {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
    border-top: var(--border);
    margin-top: 15px;
  }

  &__content {
    width: 100%;
    height: 360px;
    padding: 20px 0;
    margin: 0;
    background-color: var(--gray-extra-light);
    overflow-y: auto;

    & > dd {
      margin-left: 0;
    }
  }

  &__date {
    position: relative;
    display: block;
    margin: 25px 0;
    font-size: 13px;
    text-align: center;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      width: 35%;
      height: 1px;
      background-color: var(--gray-light);
    }

    &::before {
      left: 40px;
    }

    &::after {
      right: 40px;
    }
  }

  &__input {
    margin-bottom: -10px;

    .el-textarea__inner {
      border-radius: 0;
      border-width: 1px 0 0;
    }

    .el-button {
      float: right;
      width: 6em;
      margin-right: 15px;
    }
  }

  &__more {
    padding-top: 10px;
    background-color: var(--gray-extra-light);
    font-size: 12px;
    text-align: center;
    cursor: pointer;
  }
}

:root {
  --avatar-height: 30px;
  --message-height: 60px;
  --arrow-height: 8px;
  --date-margin: calc(var(--avatar-height) + 25px + 10px);
}

.chat-item {
  margin-bottom: 25px;

  &--left {
    & > .clearfix > * {
      float: left;
    }

    & .chat-item {
      &__avatar {
        margin-left: 15px;
      }

      &__message {
        margin-left: 25px;

        &::before {
          left: calc(var(--arrow-height) * -1);
          border-width: 6px var(--arrow-height) 6px 0;
          border-right-color: #fff;
        }
      }

      &__date {
        float: left;
        margin-left: var(--date-margin);
      }
    }
  }

  &--right {
    & > .clearfix > * {
      float: right;
    }

    & .chat-item {
      &__avatar {
        margin-right: 15px;
      }

      &__message {
        margin-right: 25px;

        &::before {
          right: calc(var(--arrow-height) * -1);;
          border-width: 6px 0 6px var(--arrow-height);
          border-left-color: #fff;
        }
      }

      &__date {
        float: right;
        margin-right: var(--date-margin);
      }
    }
  }

  &__avatar {
    width: var(--avatar-height);
    height: var(--avatar-height);
    border-radius: 50%;
  }

  &__message {
    position: relative;
    max-width: 70%;
    padding: 0.5em 0.8em;
    border-radius: 1px;

    background-color: #fff;
    font-size: 13px;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      border-style: solid;
      border-color: transparent;
      margin-top: -6px;
    }
  }

  &__date {
    margin-top: 1px;
    font-size: 12px;
    transform: scale(0.9);
    color: var(--gray);
  }
}
</style>
