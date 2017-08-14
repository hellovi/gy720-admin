<template>
  <div class="works-workitem clearfix">
    <!-- 选择作品 -->
    <div class="workitem__select">
      <el-checkbox
        :value="checked"
        @click.native.prevent="onChangeCheckedWorks"
      ></el-checkbox>
    </div>

    <!-- 作品封面 -->
    <a class="workitem__avatar"
      :href="workPanoPath"
      :title="item.pano_name"
    >
      <img class="workitem__avatar-img has-shadow"
        :src="workAvatarPath"
      />
    </a>

    <!-- 作品信息 -->
    <div class="workitem__info">
      <!-- 第一行 -->
      <div class="workitem__info-name">
        <span v-if="isOwnWork"
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
          :href="workPanoPath"
          title="预览作品"
        >
          {{item.pano_name}}
        </a>
      </div>
      <!-- 第二行  -->
      <div class="workitem__info-detail">
        <span class="workitem__info-detail__item">
          {{item.updated_at | formatDateString}}
        </span>
        <span class="workitem__info-detail__item">
          <i class="iconfont">&#xe63d;</i>{{item.hits}}
        </span>
        <span class="workitem__info-detail__item">
          <i class="iconfont">&#xe641;</i>{{item.like_nums}}
        </span>
      </div>
    </div>

    <!-- 离线下载 -->
    <v-work-offline
      class="workitem__offline"
      :item="item"
    ></v-work-offline>

    <!-- 作品操作 -->
    <div class="workitem__biz">
      <el-button
        v-if="!isOwnWork"
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
        @click="onEdit"
        :to="`/make-client/edit?pano_id=${item.id}`"
      >
        高级编辑
      </el-button>
    </div>
  </div>
</template>

<script>
/**
 * 个人作品 - 作品组件
 *
 * @author hjz
 */
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
    // 作品跳线上pano预览的地址
    workPanoPath() {
      return `/pano/view/${this.item.hash_pano_id}`
    },
    // 作品封面在七牛云地址
    workAvatarPath() {
      return this.$url.static(this.item.thumb)
    },
    // 判断是否购买作品
    isOwnWork() {
      return this.item.pay_name === '20'
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

    },

    onChart() {

    },

    onShare() {

    },

    onDelete() {
      console.log('sf')
      this.$emit('delete', this.item.id)
    },

    onEdit() {

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
      line-height: var(--workitem-lineheight);
    }

    &__avatar {
      @include contain-img-cover;

      float: left;
      margin: 0 var(--gap-unit-horizontal);
      width: var(--workitem-lineheight);
      background-color: var(--color-white);
    }

    &__info {
      float: left;
      padding: var(--gap-unit-vertical) 0;

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
      float: right;
    }

    &__biz {
      float: right;
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
}
</style>
