<template>
  <div
    class="center-panos"
    v-if="panosInfo"
  >
    <!-- 缺省信息 -->
    <app-empty-body
      v-if="panosInfo.data.length === 0"
    >
      您暂时还没有收藏作品哦！<br/>快去
      <a href="/pano">
        720°全景
      </a>页看看吧...
    </app-empty-body>

    <!-- 作品列表 -->
    <div
      class="center-panos__list clearfix"
      v-if="panosInfo.data.length > 0"
    >
      <v-pano-item
        class="center-panos__item"
        v-for="item in panosInfo.data"
        :key="item.id" :pano="item"
        @togglecollection="onToggleCollection"
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
          if (pano) pano.is_follow = !pano.is_follow
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
