<template>
  <div class="edit-setting">
    <el-dialog title="设置" :visible="active.setting" size="large" :before-close="close">
      <nav class="edit-setting__nav">
        <ul class="list clearfix">
          <li
            v-for="(tab, index) in tabs"
            :key="tab"
            :class="{active: activeTab === index}"
            @click="activeTab = index"
          >{{ tab }}</li>
        </ul>
      </nav>
      <el-form class="edit-setting__form">
        <basic v-show="activeTab === 0" :form="form" :isVip="isVip" @focus-on-vip-field="focusOnVipField"></basic>
        <wechat v-show="activeTab === 1" :form="form"></wechat>
        <music v-show="activeTab === 2" :form="form"></music>
        <misc v-show="activeTab === 3" :form="form" :isVip="isVip" @focus-on-vip-field="focusOnVipField"></misc>
      </el-form>
      <div slot="footer" class="edit-setting__footer">
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 高级编辑 - 设置
 * @author luminghuai
 * @version 2017-09-05
 */

import { mapState, mapGetters } from 'vuex'
import errorHandle from '@/mixins/errorHandle'
import modal from '../../../mixins/modal'
import Basic from './components/Basic'
import Wechat from './components/Wechat'
import Music from './components/Music'
import Misc from './components/Misc'

export default {
  name: 'edit-functions-setting',

  mixins: [errorHandle, modal],

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
        // 基本信息
        name: '',
        thumb: '',
        start_img: null,
        privacy: 1, // 1公开,2加密
        password: '',
        is_show: 10, // 10是,20否
        pano_remark: '',
        scroll_text: '',
        // 微信设置
        wx_share_title: '',
        wx_share_remark: '',
        wx_friend_icon: null,
        // 背景音乐
        pc_bg_music: 1,
        mobile_bg_music: 1,
        bg_music_src: null,
        bg_music_name: '',
        // 功能微调
        init_scene_anime: 1,
        scene_change_type: 0,
        auto_scene_time: 60,
        auto_rotate_speed: 3,
        loading_text: 'GY720.COM...',

        show_scene_thumb: 1,
        auto_rotate: 1,
        pc_auto_scene: 0,
        mobile_auto_scene: 0,
        auto_mobile_gyro: 1,
        show_hit_like: 1,
        show_comment: 1,
      },
    }
  },

  computed: {
    ...mapState({
      panoInfo: state => state.edit.panoInfo,
    }),
    ...mapGetters(['isVip']),
  },

  watch: {
    panoInfo(val) {
      const { isVip, company_name, ...others } = val
      this.form = {
        ...this.form,
        ...others,
      }
    },
  },

  methods: {
    close() {
      this.closeModal('setting')
    },

    focusOnVipField() {
      if (!this.isVip) {
        this.openModal('vipInfo')
      }
    },

    submit() {
      const id = this.panoInfo.hash_pano_id
      this.$http.post(`/user/pubset/update?pano_id=${id}`,
        this.form,
      )
        .then(() => {
          this.$message.success('操作成功')
          this.closeModal('setting')
        })
        .catch(({ status: { reason } }) => {
          if (typeof reason === 'string') {
            this.$message.error(reason)
          } else {
            this.showError(reason)
          }
        })
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.edit-setting {
  .el-dialog__body {
    height: 620px;
  }

  &__footer {
    text-align: center;

    .el-button {
      width: 12em;
      height: 36px;
    }
  }

  &__nav {
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

  &__form {
    padding: 20px 50px;
  }

  &__vip {
    position: relative;

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

    .el-input__inner,
    .el-textarea__inner {
      border-color: #d1dbe5;
      background-color: #eef1f6;
      color: #bbb;
    }
  }

  &__tip {
    margin-top: 6px;
    color: var(--gray);
    font-size: 12px;
    line-height: 1.4;

    .el-form-item + & {
      margin-top: -20px;
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
