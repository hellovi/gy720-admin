<template>
  <div class="center-authors">

    <template v-if="authorsInfo">
     <!-- 缺省信息（关注）  -->
    <div class="empty-wrap"
      v-if="routeType === 'follows'
        && authorsInfo.data.length === 0"
    >
      <div class="empty">
        <div>
          您暂时还没关注摄影师喔！
          <br>
          快去
          <a :href="authorsLink" class="link">关注摄影师</a>
          吧 ...
        </div>
      </div>
    </div>

    <!-- 缺省信息（粉丝） -->
    <div class="empty-wrap"
      v-if="routeType === 'fans'
        && authorsInfo.data.length === 0"
    >
      <div class="empty">
        <div>
          您暂时还没有粉丝喔！
          <br>
          快去
          <router-link to="/user-client/publish" class="link">
            发布
          </router-link>
          作品吧 ...
        </div>
      </div>
    </div>

    <!-- 摄影师列表 -->
    <div class="center-authors__list clearfix"
      v-if="authorsInfo.data.length > 0"
    >
      <v-author-item
        class="center-authors__item"
        v-for="(item, index) in authorsInfo.data"
        :key="item.user_id"  :author="item" :index="index">
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
import { getRouteType, getAuthorsInfo } from './modules/utils'
import vAuthorItem from './components/AuthorItem'

export default {
  name: 'center-Authors',

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

  computed: {
    authorsLink() {
      // 后端地址还没有确定
    },
  },

  methods: {
    onIntersectionObserve() {
      this.observerInstance = new IntersectionObserver(
        this.beforeLazyload,
        {
          threshold: 1,
        },
      )
      this.observerInstance.observe(this.$refs.loading)
    },

    preLoading() {
      const options = {
        target: this.$refs.loading,
        text: '努力加载中...',
        customClass: 'center-authors__loading-tag',
      }
      this.loadingInstance = Loading.service(options)
    },

    lazyload() {
      // 判断是否有懒加载进行中
      if (this.loadlocked) return
      // 显示加载状态
      this.preLoading()
      // 锁住懒加载
      this.loadlocked = true
      // 请求分页数据
      getAuthorsInfo(this.$route, this.authorsInfo.current_page + 1)
        .then(({ data, ...args }) => {
          const newData = { ...this.authorInfo.data, ...data }
          this.authorInfo = { ...args, data: newData }
          // 加载成功后，打开懒加载
          this.offLoading()
          this.loadlocked = false
        })
    },

    beforeLazyload(entries) {
      if (this.authorsInfo && entries[0].isIntersecting) {
        this.onLazyload()
      }
    },

    offLoading() {
      this.loadingInstance.close()
    },

    onLazyload() {
      const currentPage = this.authorsInfo.current_page
      const lastPage = this.authorsInfo.last_page
      // 是否满足分页请求条件
      const reqBool = currentPage < lastPage

      if (reqBool) this.lazyload()
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
