<template>
  <div class="authorList__author item-common has-shadow"
    v-if="author"
  >

    <!-- 摄影师排名 -->
    <ul class="authorList__label__wrap list-inline"
      v-if="index === 0"
    >
      <li class="authorList__label authorList__label--1">
        TOP&nbsp;1
      </li>
       <li class="authorList__label--Triangle left"></li>
    </ul>

    <!-- 摄影师认证 -->
    <span class="authorList__tag tag bg-warning"
      v-if="(author.is_certified == 20)"
    >
      已认证
    </span>

    <!-- 头像 -->
    <div class="authorList__avatar">
      <a class="img-circle"
        :title="`${author.nickname}的主页`"
        :href="userPath(author.user_id)"
      >
        <img :src="author.avatar">
      </a>
    </div>

    <!-- 姓名 -->
    <a class="authorList__name text-center"
      :href="userPath(author.user_id)"
      :title="`${author.nickname}的主页`"
    >
      {{author.nickname}}
    </a>

    <!-- 个人信息 -->
    <ul class="authorList__icons list-inline">
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
    <div class="text-center">
      <button type="button" class="btn">
        <i class="iconfont">&#xe618;</i>
        <span>关注</span>
      </button>
      <button type="button" class="btn btn-dark">
        <span>取消关注</span>
      </button>
    </div>

    <!-- 作品展示 -->
    <ul class="authorList__pano list-inline"
      v-if="author.pano && author.pano.length > 0"
    >
      <li v-for="item in author.pano" :key="item.id">
        <a class="img-square bg-light"
          :href="panoPath(item.hash_pano_id)"
          :title="item.pano_name"
        >
          <img class="zoom-in" :src="item.thumb">
        </a>
      </li>
      <li v-if="author.pano && author.pano.length === 1">
        <div class="authorList__pano--only img-square">
          <p>
            摄影师暂时
            <br>
            只上传了一
            <br>
            个作品喔
          </p>
        </div>
      </li>
    </ul>

    <!-- 暂时还没上传作品 -->
    <div class="authorList__pano--none"
      v-if="author.pano && author.pano.length === 0"
    >
      <div>
        摄影师暂时还
        <br>
        没上传作品哦！
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

.authorList {

  &__author {
    float: left;
    padding: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
    width: 23.7179%;

    &:nth-child(4n) {
      margin-right: 0;
    }
  }

  &__label {
    padding: 0 4px 0 7px;
    height: 22px;
    line-height: 22px;
    color: #fff;
    font-size: 12px;

    &--Triangle {
      border-width: 11px 0 11px 11px;
      border-style: solid;
      width: 0;
      height: 0;
    }

    &__wrap {
      position: absolute;
      left: 0;
      top: 0;
    }

    &--1 {
      background-color: #ff5f6f;

      &+.authorList__label--Triangle {
        border-color: transparent transparent transparent #ff5f6f;
      }
    }

    &--2 {
      background-color: #f682c8;
      &+.authorList__label--Triangle {
        border-color: transparent transparent transparent #f682c8;
      }
    }

    &--3 {
      background-color: #ffb574;
      &+.authorList__label--Triangle {
        border-color: transparent transparent transparent #ffb574;
      }
    }
  }

  &__tag {
    position: absolute;
    right: 0;
    top: 0;
  }


  &__avatar {
    margin: auto;
    margin-top: 10px;
    border: 1px solid var(--light);
    border-radius: 50%;
    padding: 5px;
    height: 140px;
    width: 140px;
    background: #fff;
    overflow: hidden;
  }

  &__name {
    display: block;
    margin-top: 12px;
    line-height: 1;
  }

  &__icons {
    margin: 10px 5px 15px 5px;

    &>li {
      width: 25%;
      text-align: center;
      line-height: 14px;
      color: var(--dark);
      font-size: 12px;

      & i {
        margin-right: 4px;
        color: var(--light);
      }
    }
  }

  & .btn {
    & i {
      margin-right: 3px;
      font-size: 14px;
    }
  }

  &__pano {
    margin-top: 20px;

    &>li {
      margin-right: 10px;
      width: 47.90%;

      &:nth-child(2) {
        margin-right: 0;
      }

      &>a {
        display: block;
      }
    }

    &--only {
      border: 1px solid var(--light);

      & p {
        position: absolute;
        top: 50%;
        margin-top: -29px;
        width: 100%;
        height: 58px;
        text-align: center;
        color: var(--light);
      }
    }

    &--none {
      position: relative;
      margin-top: 20px;
      border: 1px solid var(--light);
      width: 100%;
      height: 123.33px;
      color: var(--dark);

      &>div {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>

