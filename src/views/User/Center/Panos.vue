<template>
  <main v-if="dataList && dataList !== null">

    <!-- 缺省信息 -->
    <div class="empty-wrap" v-if="dataList.data.length === 0">
      <div class="empty">
        <div>
          您暂时还没有作品哦！快去
          <router-link to="/user-client/publish" class="link">发布</router-link> 吧...
        </div>
      </div>
    </div>

    <!-- 作品列表 -->
    <div class="list-inline panoList" v-if="dataList.data.length > 0">
      <PanoItem
        class="center-panoList__item"
        v-for="(item, index) in dataList.data"
        :pano="item" :key="index" />
    </div>

    <router-link
      class="link right"
      to="/user-client/compositions"
      v-if="dataList.data.length > 0"
    >
      查看全部作品
    </router-link>

  </main>
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

  beforeRouteEnter(to, from, next) {
    store.commit(CENTER.LINK_UPDATE, to)
    next()
  },
}
</script>

<style>
.center-panoList__item {
  float: left;
  width: 23.0769%;
  margin-right: 30px;
  margin-bottom: 30px;
  &:nth-child(4n) {
    margin-right: 0;
  }
}
</style>
