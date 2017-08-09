<template>
  <a class="center-panoItem item-common has-shadow"
    target="_blank"
    :href="panoPath(pano.hash_pano_id)"
    :title="pano.pano_name"
  >

    <!-- 作品图片 -->
    <div class="img-square bg-light">
      <img :src="pano.thumb" class="zoom-in" />
    </div>

    <!-- 作者头像 | 作品名 -->
    <div class="center-panoItem__info">
      <a class="center-panoItem__info__avatar"
        target="_blank" :href="userPath(pano.hash_user_id)"
        :title="pano.nickname + '的主页'"
      >
        <div class="img-circle bg-gary-light zoom-in">
          <img :src="pano.avatar" />
        </div>
      </a>

      <div class="center-panoItem__info__panoName ellipsis">
        {{pano.pano_name}}
      </div>
    </div>

    <!-- 浏览数 | 点赞数 -->
    <div class="center-panoItem__icons text-center">
      <div class="center-panoItem__icons--eye left">
        <i class="iconfont">&#xe63d;</i>{{pano.hits}}
      </div>

      <div class="center-panoItem__icons--thumb right">
        <i class="iconfont">&#xe641;</i>{{pano.like_nums}}
      </div>

      <router-link
        :to="`/make-client/edit?pano_id=${pano.id}`"
        class="tag bg-warning has-shadow"
        title="前往高级编辑"
      >
        高级编辑
      </router-link>
    </div>
  </a>
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

  methods: {
    userPath(hashUserId) {
      return this.$url.host(`author/${hashUserId}`)
    },
    panoPath(hashPanoId) {
      return this.$url.host(`/pano/view/${hashPanoId}`)
    },
  },
}
</script>

<style>

@import "vars.css";

.center-panoItem {
  &:hover {
    & .panoItem__icons {
      transform: translateY(0);
    }
  }

  &__info {
    position: relative;
    height: 34px;

    &__avatar {
      position: absolute;
      bottom: 8px;
      left: 8px;
      width: 44px;
      height: 44px;
    }

    &__panoName {
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
    transition: all .2s ease-out;
    transform: translateY(-100%);

    &>div {
      padding: 0 8px;
      border-radius: 4px;
      line-height: 20px;
      font-size: 12px;

      & i {
        margin-right: 5px;
        font-size: 12px;
      }
    }

    & .tag {
      border-radius: 4px;
      line-height: 23px;
      transition: all .15s ease-out;

      &:hover {
        background-color: #ffc000 !important;
      }
    }

    &--eye {
      border: 1px solid #d2d2d2;
      background-color: rgba(255, 255, 255, .6);
      color: #666;
    }

    &--thumb {
      border: 1px solid #288ee4;
      background-color: rgba(40, 142, 228, .65);
      color: #ffffff;
    }
  }
}
</style>

