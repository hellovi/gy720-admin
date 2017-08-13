<template>
  <div class="works">
    <!-- 侧栏分类列表  -->
    <v-cate-list
      v-if="catelist.length"
      class="works__catelist"
      :catelist="catelist"
    >
    </v-cate-list>

    <!-- 主栏作品列表  -->
    <v-work-list
      v-if="worklist"
      class="works__worklist"
      :catelist="catelist"
      :worklist="worklist"
    >
    </v-work-list>
  </div>
</template>

<script>
/**
 * 个人作品 - 我的作品组件
 *
 * @author hjz
 */
import Request from './module/request'
import vWorkList from './components/WorkList'
import vCateList from './components/CateList'

export default {
  name: 'works',

  components: {
    vWorkList,
    vCateList,
  },

  data: () => ({
    catelist: [],
    // 这里不是空数组，它的值是一个对象，包括分页信息
    worklist: null,
  }),

  created() {
    Request.getCatelist()
      .then((data) => { this.catelist = data })
    Request.getWorklist(this.$route.query)
      .then((data) => { this.worklist = data })
  },

  beforeRouteUpdate(to, from, next) {
    Request.getWorklist(to.query)
      .then((data) => { this.worklist = data; next() })
  },
}
</script>

<style>
@import "vars.css";

:root {
   --area-height: 788px;
}

.works {
  height: var(--area-height);
  padding: 20px 15px;
  background-color: var(--color-white);

  &__catelist {
    float: left;
    width: 120px;
  }

  &__worklist {
    overflow: hidden;
  }
}
</style>
