<template>
  <div class="center-authors">

    <template v-if="dataList">
     <!-- 缺省信息（关注）  -->
    <div class="empty-wrap"
      v-if="rel === 'follows' && dataList.data.length === 0"
    >
      <div class="empty">
        <div>
          您暂时还没关注摄影师喔！
          <br>
          快去
          <a :href="authorLink" class="link">摄影师中心</a>
          看看吧 ...
        </div>
      </div>
    </div>

    <!-- 缺省信息（粉丝） -->
    <div class="empty-wrap"
      v-if="rel === 'fans' && dataList.data.length === 0"
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
      v-if="dataList.data.length > 0"
    >
      <Author-item
        class="center-authors__item"
        v-for="(item, index) in dataList.data"
        :key="item.user_id"  :author="item" :index="index">
      </Author-item>
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
import { mapState, mapGetters } from 'vuex'
import { Loading } from 'element-ui'
import store from '@/store'
import { CENTER } from '@/store/mutationTypes'
import AuthorItem from './components/AuthorItem'

export default {
  name: 'center-followList',

  components: {
    AuthorItem,
  },

  data: () => ({
    loadingInstance: null,
    observerInstance: null,
  }),

  computed: {
    ...mapState({
      rel: state => state.center.linktype,
      loadlock: state => state.center.loadlock,
    }),

    ...mapGetters({
      dataList: 'centerDataList',
    }),
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

    lazyload() {
      // 判断是否有懒加载进行中
      if (this.loadlock) return

      this.onLoading()
      // 锁住懒加载
      this.$store.commit(CENTER.LOAD_LOCK, true)
      this.$store.dispatch(CENTER.LIST_UPDATE)
      // 加载成功后，打开懒加载
        .then(() => {
          this.offLoading()
          this.$store.commit(CENTER.LOAD_LOCK, false)
        })
    },

    onLazyload() {
      const currentPage = this.dataList.current_page
      const lastPage = this.dataList.last_page
      // 是否满足分页请求条件
      const reqBool = currentPage < lastPage

      if (reqBool) this.lazyload()
    },

    beforeLazyload(entries) {
      if (this.dataList && entries[0].isIntersecting) {
        this.onLazyload()
      }
    },

    onLoading() {
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
  },

  beforeRouteEnter(to, from, next) {
    store.commit(CENTER.LINK_UPDATE, to)
    next(vm => vm.onIntersectionObserve())
  },

  beforeRouteLeave(to, from, next) {
    this.observerInstance.unobserve(this.$refs.loading)
    if (this.loadingInstance) this.offLoading()
    next()
  },
}

</script>

<style>
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
}
</style>
