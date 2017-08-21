<template>
  <div
    class="center-panos"
    v-if="dataList"
  >
    <!-- 缺省信息 -->
    <div
      class="empty-wrap"
      v-if="dataList.data.length === 0"
    >
      <div class="empty">
        <div>
          您暂时还没有作品哦！快去
          <el-button
            type="text" size="large"
            @click="publishPano"
          >
            发布
          </el-button>
          吧...
        </div>
      </div>
    </div>

    <!-- 作品列表 -->
    <div
      class="center-panos__list clearfix"
      v-if="dataList.data.length > 0"
    >
      <PanoItem
        class="center-panos__item"
        v-for="item in dataList.data"
        :key="item.id" :pano="item"
      ></PanoItem>
    </div>

    <el-button
      class="center-panos__wholepano-link"
      v-if="dataList.data.length > 0"
      type="text" size="large"
      @click.stop="checkCompositions"
    >
      查看全部作品
    </el-button>
  </div>
</template>

<script>
/**
 * 个人中心 - 作品展示
 *
 * @author huojinzhao
 */
import store from '@/store'
import { mapGetters } from 'vuex'
import { CENTER } from '@/store/mutationTypes'
import PanoItem from './components/PanoItem'

export default {
  name: 'center-panoList',

  components: {
    PanoItem,
  },

  computed: mapGetters({
    dataList: 'centerDataList',
  }),

  methods: {
    publishPano() {
      this.$router.push('/user-client/publish')
    },

    checkCompositions() {
      this.$router.push('/user-client/works')
    },
  },

  beforeRouteEnter(to, from, next) {
    store.commit(CENTER.LINK_UPDATE, to)
    next()
  },
}
</script>

<style>
.center-panos {

  &__item {
    float: left;
    width: 23.0769%;
    margin-right: 30px;
    margin-bottom: 30px;

    &:nth-child(4n) {
      margin-right: 0;
    }
  }

  &__wholepano-link {
    float: right;
  }
}
</style>
