<template>
  <div class="center-panoitem has-shadow">

    <!-- 作品封面 -->
    <a class="center-panoitem__cover"
      target="_blank"
      :href="panoPath"
      :title="pano.pano_name"
    >
      <img :src="pano.thumb"/>
    </a>

    <!-- 作者头像 | 作品名 -->
    <div class="center-panoitem__info">
      <a class="center-panoitem__info__avatar"
        target="_blank"
        :href="userPath"
        :title="pano.nickname + '的主页'"
      >
        <img
          class="center-panoitem__info__avatar-img"
          :alt="`作品：${pano.pano_name}`"
          :src="pano.avatar"/>
      </a>

      <div class="center-panoitem__info__panoname ellipsis">
        {{pano.pano_name}}
      </div>
    </div>

    <!-- 浏览数 | 点赞数 -->
    <div class="center-panoitem__icons">
      <div class="center-panoitem__icons--eye">
        <i class="iconfont">&#xe63d;</i>{{pano.hits}}
      </div>

      <div class="center-panoitem__icons--thumb">
        <i class="iconfont">&#xe641;</i>{{pano.like_nums}}
      </div>

      <el-button
        size='mini' type="warning"
        @click.stop="toPanoEdit"
      >
        高级编辑
      </el-button>
    </div>
  </div>
</template>

<script>
/**
 * 个人中心 - 最近发布&收藏作品 - 作品展示项
 *
 * @author huojinzhao
 */
export default {
  name: 'center-panoItem',

  props: {
    pano: {
      type: Object,
      required: true,
    },
  },

  computed: {
    userPath() {
      return this.$url.host(`author/${this.pano.hashUserId}`)
    },
    panoPath() {
      return this.$url.host(`/pano/view/${this.pano.hashPanoId}`)
    },
  },

  methods: {
    toPanoEdit() {
      this.$router.push(`/make-client/edit?pano_id=${this.pano.id}`)
    },
  },
}
</script>

<style>

@import "vars.css";
@import "../style/mixins.css";

.center-panoitem {
  position: relative;
  display: block;
  overflow: hidden;
  background-color: var(--color-white);

  &:hover {
    & .center-panoitem__icons {
      transform: translateY(0);
    }
  }

  &__cover {
    @include contain-img-cover;

    display: block;
    margin-bottom: 34px;
    width: 100%;

    & > img {
      @include zoom-in;
    }
  }

  &__info {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 34px;

    &__avatar {
      @include contain-img-cover;

      position: absolute;
      bottom: 8px;
      left: 8px;
      width: 44px;
      height: 44px;
      background: none;

      &-img {
        border-radius: 50%;
      }
    }

    &__panoname {
      padding-left: 62px;
      padding-right: 10px;
      line-height: 34px;
    }
  }

  &__icons {
    position: absolute;
    top: 0;
    left: 0;
    padding: 6px;
    width: 100%;
    text-align: center;
    transition: all .2s ease-out;
    transform: translateY(-100%);

    &>div {
      padding: 0 8px;
      border-radius: 4px;
      line-height: 19px;
      font-size: 12px;

      & i {
        margin-right: 5px;
        font-size: 12px;
      }
    }

    &--eye {
      float: left;
      border: 1px solid var(--color-light-gray);
      background-color: color(var(--color-extra-light-gray) alpha(60%));
      color: color(--gray-light);
    }

    &--thumb {
      float: right;
      border: 1px solid var(--color-primary);
      background-color: color(var(--color-info) alpha(60%));
      color: var(--color-white);
    }
  }
}
</style>

