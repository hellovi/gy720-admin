<template>
  <div
    class="center-panos"
    v-if="panosInfo"
  >
    <template v-if="routeType === 'recent'">
      <div class="text-right" style="margin-top: -10px">
        <router-link to="/user-client/works">
          <el-button type="text">查看全部作品</el-button>
        </router-link>
      </div>
    </template>
    <!-- 缺省信息 -->
    <app-empty-body
      v-if="panosInfo.data.length === 0"
    >
      <template v-if="routeType === 'recent'">
        您暂时还没有作品哦！<br/>快去
        <el-button
          type="text" size="large"
          @click="publishPano"
        >
          发布
        </el-button>
        吧...
      </template>
      <template v-if="routeType === 'collections'">
        您暂时还没有收藏作品哦！<br/>快去
        <a href="/pano">
          720°全景
        </a>页看看吧...
      </template>
    </app-empty-body>

    <!-- 作品列表 -->
    <div
      class="center-panos__list clearfix"
      v-if="panosInfo.data.length > 0"
    >
      <v-pano-item
        class="center-panos__item"
        v-for="item in panosInfo.data"
        :key="item.id"
        :pano="item"
        :routeType="routeType"
        @toggle-collection="onToggleCollection"
      ></v-pano-item>
    </div>

    <el-button
      class="center-panos__wholepano-link"
      v-if="panosInfo.data.length > 0 && routeType === 'release'"
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
import Ajax from './modules/ajax'
import { getRouteType, getAuthorsInfo } from './modules/utils'
import vPanoItem from './components/PanoItem'

export default {
  name: 'center-panos',

  components: {
    vPanoItem,
  },

  data: () => ({
    routeType: '',
    panosInfo: null,
  }),

  methods: {
    publishPano() {
      this.$router.push('/user-client/publish')
    },

    checkCompositions() {
      this.$router.push('/user-client/works')
    },

    onToggleCollection(id) {
      Ajax.updatePanoCollection(id)
        .then(() => {
          const pano = this.panosInfo.data
            .find(item => item.id === id)
          if (pano) pano.is_collect = !pano.is_collect
        })
    },
  },

  beforeRouteEnter(to, from, next) {
    getAuthorsInfo(to)
      .then(res => next((vm) => {
        /* eslint-disable */
        vm.panosInfo = res
        vm.routeType = getRouteType(to)
        /* eslint-enable */
      }))
  },
}
</script>

<style>
@import 'vars.css';
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
