<template>
  <div class="center-authors">

    <template v-if="authorsInfo">
     <!-- 缺省信息（关注）  -->
    <app-empty-body
      v-if="routeType === 'follows' && authorsInfo.data.length === 0"
    >
      您暂时还没关注摄影师喔！
      <br>快去<a class="link" href="/author">摄影师</a>
      发布
    </router-link>
      页面看看吧 ...
    </app-empty-body>

    <!-- 缺省信息（粉丝） -->
    <app-empty-body
      v-if="routeType === 'fans' && authorsInfo.data.length === 0"
    >
      您暂时还没有粉丝喔！
      <br>快去
      <router-link to="/user-client/publish" class="link" exact>
        发布
      </router-link>
      作品吧 ...
    </app-empty-body>

    <!-- 摄影师列表 -->
    <div class="center-authors__list clearfix"
      v-if="authorsInfo.data.length > 0"
    >
      <v-author-item
        class="center-authors__item"
        v-for="(item, index) in authorsInfo.data"
        :key="item.user_id"
        :author="item"
        :index="index"
        @togglefollow="onToggleFollow"
      >
      </v-author-item>
    </div>
    </template>

    <!-- 列表底部loading加载 -->
    <div class="center-authors__loading" ref='loading'></div>
  </div>
</template>

<script>
/**
 * 个人中心 - 作者展示
 *
 * @author huojinzhao
 */
import { Loading } from 'element-ui'
import Ajax from './modules/ajax'
import { getRouteType, getAuthorsInfo } from './modules/utils'
import vAuthorItem from './components/AuthorItem'

export default {
  name: 'center-authors',

  components: {
    vAuthorItem,
  },

  data: () => ({
    routeType: '',
    authorsInfo: null,
    loadlocked: false,
    loadingInstance: null,
    observerInstance: null,
  }),

  methods: {
    /* ------ Initialization ------ */

    /* 懒加载初始化 */

    onIntersectionObserve() {
      this.observerInstance = new IntersectionObserver(
        this.beforeLazyload,
        {
          threshold: 1,
        },
      )
      this.observerInstance.observe(this.$refs.loading)
    },

    /* ------ Application ------ */

    /* 懒加载 */

    beforeLazyload(entries) {
      if (
        this.authorsInfo
        && entries[0].isIntersecting
      ) {
        this.onLazyload()
      }
    },

    onLazyload() {
      // 判断是否有懒加载进行中
      if (this.loadlocked) return
      // 判断是否满足分页请求条件
      const currentPage = this.authorsInfo.current_page
      const lastPage = this.authorsInfo.last_page
      const reqBool = currentPage < lastPage

      if (reqBool) this.lazyload()
    },

    lazyload() {
      // 显示加载状态
      this.preLoading()
      // 锁住懒加载
      this.loadlocked = true
      // 请求分页数据
      getAuthorsInfo(this.$route, this.authorsInfo.current_page + 1)
        .then(({ data, ...args }) => {
          const newData = [...this.authorsInfo.data, ...data]
          this.authorsInfo = { ...args, data: newData }
          // 加载成功后
          // 关闭loading动画
          this.offLoading()
          // 打开懒加载
          this.loadlocked = false
        })
    },

    preLoading() {
      const options = {
        target: this.$refs.loading,
        text: '努力加载中...',
        customClass: 'center-authors__loading-tag',
      }
      this.loadingInstance = Loading.service(options)
    },

    offLoading() {
      this.loadingInstance.close()
    },

    /* 关注/取消关注 */

    onToggleFollow(id) {
      Ajax.updateAuthorFollow(id)
        .then(() => {
          const author = this.authorsInfo.data
            .find(item => item.id === id)
          if (author) author.is_follow = !author.is_follow
        })
    },
  },

  beforeRouteEnter(to, from, next) {
    getAuthorsInfo(to)
      .then(res => next((vm) => {
        /* eslint-disable */
        vm.authorsInfo = res
        vm.routeType = getRouteType(to)
        /* eslint-enable */
        vm.onIntersectionObserve()
      }))
  },

  beforeRouteLeave(to, from, next) {
    this.observerInstance.unobserve(this.$refs.loading)
    if (this.loadingInstance) this.offLoading()
    next()
  },
}

</script>

<style>
@import 'vars.css';

.center-authors {
  &__item {
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    width: 23.7179%;

    &:nth-child(4n) {
      margin-right: 0;
    }
  }

  &__loading {
    height: 80px;

    &-tag {
      background-color: transparent;
    }
  }

  & .link {
    color: var(--color-primary);
    cursor: pointer;

    &:hover {
      color: var(--color-info);
    }
  }
}
</style>
