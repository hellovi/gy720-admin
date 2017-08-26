<template>
  <div class="edit-setting">
    <el-dialog title="设置" :visible="active.setting" size="large" :before-close="close">
      <nav class="edit-setting-nav">
        <ul class="list clearfix">
          <li
            v-for="(tab, index) in tabs"
            :key="tab"
            :class="{active: activeTab === index}"
            @click="activeTab = index"
          >{{ tab }}</li>
        </ul>
      </nav>
      <el-form class="edit-setting-form">
        <basic v-show="activeTab === 0"></basic>
        <wechat v-show="activeTab === 1"></wechat>
        <music v-show="activeTab === 2" :form="form"></music>
        <misc v-show="activeTab === 3"></misc>
      </el-form>
      <div slot="footer" class="edit-setting__footer">
        <el-button type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 高级编辑 - 设置
 * @version 2017-08-25
 */
import modal from '../../../mixins/modal'
import Basic from './components/Basic'
import Wechat from './components/Wechat'
import Music from './components/Music'
import Misc from './components/Misc'

export default {
  name: 'edit-functions-setting',

  mixins: [modal],

  components: {
    Basic,
    Wechat,
    Music,
    Misc,
  },

  data() {
    return {
      tabs: ['基本信息', '微信设置', '背景音乐', '功能微调'],
      activeTab: 0,

      form: {
        test: true,
      },
    }
  },

  methods: {
    close() {
      this.closeModal('setting')
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.edit-setting {
  .el-dialog__body {
    height: 580px;
  }

  &__footer {
    text-align: center;

    .el-button {
      width: 12em;
    }
  }
}

.edit-setting-nav {
  border-bottom: 1px dotted var(--border-color);
  margin-top: -20px;

  & > ul {
    & > li {
      float: left;
      width: 25%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;

      &.active {
        color: var(--color-primary);
      }
    }
  }
}

.edit-setting-form {
  padding-top: 20px;

  .vip {
    &::before {
      content: "VIP";
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      margin-right: -30px;
      color: #ffc000;
      font-size: 12px;
      font-style: italic;
    }
  }

  .description {
    & > .el-input,
    & > .el-textarea {
      position: relative;
      margin-bottom: 5px;
    }

    & > div {
      color: var(--gray);
      font-size: 12px;
      line-height: 1.4;
    }
  }
}

:root {
  --image-width: 120px;
}

.setting-img {
  &__title {
    position: relative;
    float: left;
    margin: 0 0 15px;
    color: var(--gray);
    font-size: 14px;
    font-weight: normal;
  }

  &__img {
    clear: both;
    display: block;
    width: var(--image-width);
    height: var(--image-width);
  }

  &__button {
    width: var(--image-width);
    margin-top: 10px;
    text-align: center;
  }

  &__desc {
    width: calc(var(--image-width) + 40px);
    margin-top: 10px;
    margin-left: -20px;
    color: var(--gray);
    font-size: 12px;
    text-align: center;
  }

  & + .setting-img {
    margin-top: 30px;
  }
}
</style>
