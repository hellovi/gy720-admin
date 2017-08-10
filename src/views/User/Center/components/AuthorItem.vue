<template>
  <div class="center-authoritem">
    <!-- 摄影师认证 -->
    <span class="app-user__badge authoritem__certification"
      v-if="(author.is_certified == 20)"
    >
      已认证
    </span>

    <!-- 头像 -->
    <a class="authoritem__avatar"
      :href="userPath"
      :title="`${author.nickname}的主页`"
    >
      <img :src="author.avatar" :alt="`${author.nickname}的头像`">
    </a>

    <!-- 姓名 -->
    <a class="authoritem__name"
      :href="userPath"
      :title="`${author.nickname}的主页`"
    >
      {{author.nickname}}
    </a>

    <!-- 个人信息 -->
    <ul class="authoritem__icons">
      <li>
        <i class="iconfont">&#xe617;</i>
        <span>{{author.pano_sum}}</span>
      </li>
      <li>
        <i class="iconfont">&#xe6bc;</i>
        <span>{{author.pano_hits_sum}}</span>
      </li>
      <li>
        <i class="iconfont">&#xe603;</i>
        <span>{{author.pano_like_sum}}</span>
      </li>
      <li>
        <i class="iconfont">&#xe604;</i>
        <span>{{author.area_name}}</span>
      </li>
    </ul>

    <!-- 关注和取关按钮 -->
    <div class="authoritem__attention">
      <el-button
        class="authoritem__attention--confirm"
        type="primary"
      >
        <i class="iconfont">&#xe618;</i> 关注
      </el-button>
      <el-button
        class="authoritem__attention--cancel"
      >
        取消关注
      </el-button>
    </div>

    <!-- 作品展示 -->
    <div
      class="authoritem__compositions clearfix"
      v-if="author.pano && author.pano.length > 0"
    >
      <a
        class="authoritem__compositions__item"
        v-for="item in author.pano" :key="item.id"
        :href="panoPath(item.hash_pano_id)"
        :title="`作品：${item.pano_name}`"
      >
        <img class="zoom-in" :src="item.thumb">
      </a>
      <div
        class="authoritem__compositions--only"
        v-if="author.pano && author.pano.length === 1"
      >
        <p>
          摄影师暂时
          <br>
          只上传了一
          <br>
          个作品喔 !
        </p>
      </div>
    </div>

    <!-- 暂时还没上传作品 -->
    <div
      class="authoritem__compositions"
      v-if="!author.pano || author.pano.length === 0"
    >
      <div class="authoritem__compositions--none clearfix">
        摄影师暂时还没
        <br>
        上传作品哦！
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 个人中心 - 粉丝&关注 - 作者展示项
 *
 * @author huojinzhao
 */
export default {
  name: 'center-authorItem',

  props: {
    author: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  computed: {
    authorLink() {
      return this.$url.host('author')
    },
    // 当前数据没有hash_pano_id，等后端添加
    userPath() {
      return this.$url.host(`author/${this.author.user_id}`)
    },
  },

  methods: {
    panoPath(id) {
      return this.$url.host(`/pano/view/${id}`)
    },
  },
}
</script>

<style>
@import "vars.css";
@import "../style/mixins.css";

.center-authoritem {
  position: relative;
  padding: 10px;
  background-color: var(--color-white);

  & .authoritem {

    &__certification {
      position: absolute;
      right: 0;
      top: 0;
    }

    &__avatar {
      @include contain-img-cover;

      display: block;
      margin: auto;
      margin-top: 10px;
      border: 1px solid var(--border-color-base);
      border-radius: 50%;
      height: 140px;
      width: 140px;
      background: var(--color-white);

      & > img {
        padding: 5px;
        border-radius: 50%;
      }
    }

    &__name {
      display: block;
      margin-top: 12px;
      text-align: center;
    }

    &__icons {
      margin: 10px 5px 15px 5px;
      padding: 0;
      font-size: 0;

      &>li {
        display: inline-block;
        width: 25%;
        line-height: 14px;
        text-align: center;
        color: var(--gray);
        font-size: 12px;
        list-style: none;

        & i {
          margin-right: 4px;
          color: var(--gray-light);
        }
      }
    }

    &__attention {
      text-align: center;

      &--confirm,
      &--cancel {
         padding: 5px 10px;
         height: 28px;
      }
    }

    &__compositions {
      margin-top: 20px;

      & :nth-child(2) {
        margin-left: 10px;
      }

      &__item,
      &--only {
        @include contain-img-cover;

        float: left;
        width: 47.90%
      }

      &--only,
      &--none {
        border: 1px solid var(--border-color-base);
        background-color: var(--color-white);
        color: var(--gray-light);
        font-size: 14px;
      }

      &--only {
        padding: 22px;
      }

      &--none {
        padding: 44px 76px 45px;
      }
    }
  }
}
</style>
