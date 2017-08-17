<template>
  <el-dialog custom-class="chat-box" title="用户名" :visible="value" :before-close="handleClose">
    <div class="chat-box__more hover-primary" @click="loadMore">查看更多消息</div>
    <dl class="chat-box__content" @wheel="loadMore">
      <dt><time class="chat-box__date">2016-12-01</time></dt>
      <dd>
        <ul class="list">
          <li class="chat-item chat-item--left">
            <div class="clearfix">
              <img class="chat-item__avatar" src="http://l-statics.gy720.com/data/avatar/20170101/471811501052670905.jpg" alt="用户名">
              <article class="chat-item__message">传统的东亚文化里没有“我爱你”这种说法。</article>
            </div>
          </li>
          <li class="chat-item chat-item--right">
            <div class="clearfix">
              <img class="chat-item__avatar" src="http://l-statics.gy720.com/data/avatar/20170101/471811501052670905.jpg" alt="用户名">
              <article class="chat-item__message">那应该怎么说？</article>
            </div>
          </li>
          <li class="chat-item chat-item--left">
            <div class="clearfix">
              <img class="chat-item__avatar" src="http://l-statics.gy720.com/data/avatar/20170101/471811501052670905.jpg" alt="用户名">
              <article class="chat-item__message">"今夜月色真好"。</article>
            </div>
          </li>
        </ul>
      </dd>
    </dl>
    <div class="chat-box__input">
      <el-input type="textarea" placeholder="发送消息......" :rows="3" resize="none"></el-input>
      <el-button type="primary">发送</el-button>
    </div>

    <div style="width: 20px; height: 30px; border: 20% solid #ccc;"></div>
  </el-dialog>

</template>

<script>
export default {
  name: 'chat-box',

  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    handleClose(done) {
      this.$emit('input', false)
      done()
    },

    loadMore() {
      // eslint-disable-next-line
      console.log('more')
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
    min-height: 360px;
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
}
</style>
