<template>
  <el-row class="works-workitem clearfix">
    <el-col :span="10" class="workitem__select">
      <!-- 选择作品 -->
      <el-checkbox
        :value="checked"
        @click.native.prevent="onChangeCheckedWorks"
      ></el-checkbox>

      <!-- 作品封面 -->
      <a class="workitem__avatar"
         :href="workPanoPath"
         target="_blank"
         :title="item.name"
      >
        <img class="workitem__avatar-img has-shadow"
             v-qiniu-src="item.thumb"
        />
      </a>

      <!-- 作品信息 -->
      <div class="workitem__info">
        <!-- 第一行 -->
        <div class="workitem__info-name ellipsis">
          <span v-if="userInfo.is_vip || item.is_vip"
                class="workitem__info-name--isvip"
          >
            商业作品
          </span>
            <span v-else
                  class="workitem__info-name--novip"
            >
            普通作品
          </span>
          <a
            class=""
            :href="workPanoPath"
            target="_blank"
            title="预览作品"
          >
            {{item.name}}
          </a>
        </div>
        <!-- 第二行  -->
        <div class="workitem__info-detail">
        <span class="workitem__info-detail__item">
          {{item.created_at | formatDateString}}
        </span>
          <span class="workitem__info-detail__item">
          <i class="iconfont">&#xe63d;</i> {{item.popular}}
        </span>
          <span class="workitem__info-detail__item">
          <i class="iconfont">&#xe641;</i> {{item.stargazers}}
        </span>
          <span class="workitem__info-detail__item">
          <i class="iconfont">&#xe642;</i> {{item.collects}}
        </span>
        </div>
      </div>
    </el-col>

    <!-- 作品操作 -->
    <el-col :span="9" class="workitem__biz">
      <el-button
        v-if="!(userInfo.is_vip || item.is_vip)"
        type="text"
        @click="onUpgrade"
      >
        升级商业版
      </el-button>
      <el-button
        type="text"
        @click="onChart"
      >
        管理说一说
      </el-button>
      <el-button
        type="text"
        @click="onShare"
      >
        分享
      </el-button>
      <el-button
        type="text"
        @click="onDelete"
      >
        删除
      </el-button>

      <el-button
        type="text"
        class="workitem__biz-editor"
      >
        <a :href="`/make-client/edit?pano_id=${this.item.hash_pano_id}`" target="_blank">高级编辑</a>
      </el-button>
    </el-col>

    <!-- 离线下载 -->
    <el-col :span="5">
      <v-work-offline
        v-if="item.id"
        class="workitem__offline"
        :item="item"
      ></v-work-offline>
    </el-col>
  </el-row>
</template>

<script>
/**
 * 我的作品 - 单作品组件
 *
 * @author huojinzhao
 */

import { mapState } from 'vuex'
import vWorkOffline from './WorkOffline'

export default {
  name: 'works-work-item',

  components: {
    vWorkOffline,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    checked: false,
  }),

  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),

    // 作品跳线上pano预览的地址
    workPanoPath() {
      return `/pano/view/${this.item.hash_pano_id}`
    },
  },

  filters: {
    formatDateString(str) {
      return str.slice(0, 10)
    },
  },

  methods: {
    onChangeCheckedWorks() {
      this.checked = !this.checked
      this.$emit('change', this.item.id)
    },

    onUpgrade() {
      this.$emit('upgrade', this.item)
    },

    onChart() {
      this.$emit('chart', this.item)
    },

    onShare() {
      this.$emit('share', this.item)
    },

    onDelete() {
      this.$emit('delete', this.item.id)
    },
  },
}
</script>

<style>
@import "vars.css";
@import "../../Center/style/mixins";
@import "../style/vars.css";

.works-workitem {
  height: var(--item-height);
  padding: var(--workitem-padding) 0;

  & .workitem {

    &__select {
      float: left;
    }

    &__avatar {
      @include contain-img-cover;
      margin: 0 var(--gap-unit-horizontal);
      width: var(--workitem-lineheight);
      height: var(--workitem-lineheight);
      display: inline-block;
      vertical-align: middle;
      background-color: var(--color-white);
    }

    &__info {
      max-width: calc(100% - 120px);
      padding: var(--gap-unit-vertical) 0;
      display: inline-block;
      vertical-align: middle;

      &-name {
        margin-bottom: var(--gap-unit-vertical);
        font-size: 12px;
        vertical-align: middle;
        line-height: 18px;

        &--isvip,
        &--novip {
          margin-right: var(--gap-unit-horizontal);
          padding: 0 4px;
          display: inline-block;
          color: #fff;
        }

        &--isvip {
          background-color: var(--color-warning);
        }

        &--novip {
          background-color: var(--disabled-color-base);
        }
      }

      &-detail {
        &__item {
          min-width: 46px;
          display: inline-block;
          padding-right: var(--gap-unit-horizontal);
          color: var(--text-color);
          font-size: 12px;

          & > .iconfont {
            font-size: 14px;
          }
        }
      }
    }

    &__offline {

    }

    &__biz {
      text-align: right;
      line-height: var(--workitem-lineheight);
      font-size: 14px;

      & > .el-button {
        margin-right: var(--gap-unit-horizontal);
      }

      &-editor {
        color: var(--color-warning);

        &:hover {
          color: color(var(--color-warning) tint(30%));
        }
      }
    }
  }

  > .el-dialog__wrapper {
    .el-dialog {
      width: 1000px;
    }
  }
}
</style>
