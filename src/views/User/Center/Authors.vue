<template>
  <div class="center-authors" v-if="dataList">
    <!-- 缺省信息（关注） -->
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

  </div>
</template>

<script>
/**
 * 个人中心 - 作者展示
 *
 * @author huojinzhao
 */
import { mapState, mapGetters } from 'vuex'
import store from '@/store'
import { CENTER } from '@/store/mutationTypes'
import AuthorItem from './components/AuthorItem'

export default {
  name: 'center-followList',

  components: {
    AuthorItem,
  },

  data: () => ({
    // APP组件root的dom
    app: null,
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
    lazyload() {
      const contentH = this.app.scrollHeight
      const fixedOuterH = document.body.scrollHeight
      const scrollSpan = this.app.scrollTop
      const currentPage = this.dataList.current_page
      const lastPage = this.dataList.last_page
      // 是否滚动到触发懒加载位置
      const sbool = contentH - fixedOuterH - scrollSpan <= 170
      // 是否满足分页请求条件
      const rbool = currentPage < lastPage
      if (sbool && rbool) {
        // 判断是否有懒加载进行中
        if (this.loadlock) return
        // 锁住懒加载
        this.$store.commit(CENTER.LOAD_LOCK, true)
        this.$store.dispatch(CENTER.LIST_UPDATE)
        // 加载成功后，打开懒加载
          .then(() => this.$store.commit(CENTER.LOAD_LOCK, false))
      }
    },
  },

  beforeRouteEnter(to, from, next) {
    store.commit(CENTER.LINK_UPDATE, to)
    next()
  },

  activated() {
    this.app.addEventListener('scroll', this.lazyload)
  },

  mounted() {
    this.app = document.getElementById('app')
  },

  deactivated() {
    this.app.removeEventListener('scroll', this.lazyload)
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
}
</style>
