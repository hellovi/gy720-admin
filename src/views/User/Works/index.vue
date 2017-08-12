<template>
  <div class="works">
    <!-- 侧栏分类列表  -->
    <v-cate-list
      class="works__catelist"
      :list="catelist" />

    <!-- 主栏作品列表  -->
    <v-work-list
      class="works__worklist">
    </v-work-list>
  </div>
</template>

<script>
/**
 * 个人作品 - 我的作品组件
 *
 * @author hjz
 */

import { mapState } from 'vuex'
import { WORKS } from '@/store/mutationTypes'
import vWorkList from './components/WorkList'
import vCateList from './components/CateList'

const { CATE, WORKLIST } = WORKS

export default {
  name: 'works',

  components: {
    vWorkList,
    vCateList,
  },

  computed: {
    ...mapState({
      catelist: state => state.works.catelist,
    }),
  },

  methods: {
    chooseCate(cateid) {
      this.cateChoosed = cateid
      this.deleteTarget = -1
      this.$store.dispatch(WORKLIST.INITIALIZE, cateid)
    },
    modalOpen(prop) {
      if (typeof prop === 'string') this.modalActive[prop] = true
    },
    cateDelete() {
      this.$store.dispatch(CATE.DELETE, this.deleteid)
        .then(() => { this.deletewarn = false })
        .catch((err) => { this.warn = err })
    },
    isDelete(cateid) {
      this.deleteid = cateid
      this.deletewarn = true
    },
    cateCreate() {
      this.$validator.validateAll()
        .then(() => {
          this.$store.dispatch(CATE.CREATE, this.newcate)
          this.modalActive.cateCreator = false
        })
    },
  },

  created() {
    this.$store.dispatch(CATE.INITIALIZE)
  },

  updated() {
    if (this.cateChoosed === -1) this.chooseCate(this.catelist[0].id)
  },
}
</script>

<style>
@import "vars.css";

:root {
  --myWork-height: 788px;
}

.works {
  height: var(--myWork-height);
  padding: 20px 15px;

  &__catelist {
    float: left;
    width: 120px;
  }

  &__worklist {
    overflow: hidden;
  }
}
</style>
