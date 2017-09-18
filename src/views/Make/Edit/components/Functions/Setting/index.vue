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

      <el-form class="edit-setting__form" :model="form" :rules="rules" ref="form">
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
        privacy: 10, // 1公开,2加密
        password: '',
        is_show: 20,
        loading_text: '',
        scroll_text: '',
        // 微信设置
        wx_share_title: '',
        wx_share_remark: '',
        wx_friend_icon: null,
        // 背景音乐
        pc_bg_music: 10,
        mobile_bg_music: 10,
        bg_music_src: null,
        bg_music_name: '',
        // 功能微调
        init_scene_anime: 1,
        scene_change_type: 0,
        auto_scene_time: 60,
        auto_rotate_speed: 3,

        show_scene_thumb: 20,
        auto_rotate: 20,
        pc_auto_scene: 10,
        mobile_auto_scene: 10,
        auto_mobile_gyro: 20,
      },

      rules: {
        name: [
          { required: true, trigger: 'blur', message: '作品名称不能为空' },
        ],
        password: [
          {
            validator: (rule, value, callback) => {
              if (this.form.privacy === 20) {
                if (!value) {
                  callback(new Error('作品密码不能为空'))
                } else if (value.length > 8) {
                  callback(new Error('作品密码为1~8个字符'))
                }
              }
              callback()
            },
          },
        ],
      },
    }
  },

  computed: {
    ...mapGetters(['isVip']),
    ...mapState({
      panoInfo: state => state.edit.panoInfo,
    }),
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          const id = this.panoInfo.hash_pano_id
          this.$http.post(`/user/pubset/update?pano_id=${id}`, this.form)
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
    height: auto;
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
    padding: 30px 50px 10px;
  }

  &__footer {
    text-align: center;

    .el-button {
      width: 12em;
    }
  }

  &-music {
    .el-input {
      width: 16em;

      & + .el-button {
        margin-left: 1em;
      }
    }
  }
}

/* 兼容小分辨率屏幕 */
@media screen and (max-height: 760px) {
  .edit-setting {
    > .el-dialog__wrapper {
      .el-dialog {
        top: 5% !important;
      }
      .el-dialog__body {
        padding-bottom: 0;
      }
    }


    &__form {
      padding-top: 20px;
      padding-bottom: 0;
    }
  }
}
</style>
