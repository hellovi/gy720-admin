<template>
  <div class="works clearfix" v-loading="loading">
    <!-- 侧栏分类列表  -->
    <v-cate-list
      v-if="catelist.length"
      class="works__catelist"
      :catelist="catelist"
      @createCate="onCreateCate"
      @deleteCate="onDeleteCate"
    >
    </v-cate-list>

    <!-- 主栏作品列表  -->
    <v-work-list
      v-if="worklist"
      class="works__worklist"
      :catelist="catelist"
      :worklist="worklist"
      @deleteWorks="onDeleteWorks"
    >
    </v-work-list>
  </div>
</template>

<script>
/**
 * 我的作品 - 主组件
 *
 * @author hjz
 */

import Ajax from './module/ajax'
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
    loading: true,
  }),

  methods: {
    onCreateCate(cate) {
      this.catelist.push(cate)
    },

    onDeleteCate(id) {
      this.catelist = this.catelist.filter(cate => cate.id !== id)
    },

    onDeleteWorks(ids) {
      const list = this.worklist.data
      this.worklist.data = list.filter(work => !ids.includes(work.id))
    },
  },

  created() {
    Ajax.getCatelist()
      .then((data) => {
        Ajax.getCateCount()
          .then((dataCount) => {
            Ajax.getWorklist(this.$route.query)
              .then((list) => {
                this.loading = false
                this.catelist = data.map(item => ({
                  ...item,
                  count: dataCount[item.id].count,
                }))
                this.worklist = list
              })
          })
      })
      .catch(() => {
        this.loading = false
      })
  },

  beforeRouteUpdate(to, from, next) {
    Ajax.getWorklist(to.query)
      .then((data) => {
        this.worklist = data
        next()
      })
  },
}
</script>

<style>
@import "vars.css";
@import './style/vars.css';

:root {
   --area-height: 788px;
}

.works {
  padding: 20px 15px;
  background-color: var(--color-white);
  position: relative;

  &:before {
    content: '';
    height: calc(100% - 40px);
    border-left: var(--border-split);
    position: absolute;
    left: 135px;
    z-index: 10;
  }

  &__catelist {
    float: left;
    width: 120px;
  }

  &__worklist {
    overflow: hidden;
  }
}
</style>
