<template>
  <div>
    <table class="app-table">
      <thead>
        <tr>
          <th>时间</th>
          <th>积分、经验变动</th>
          <th>日志</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in log.data" :key="log.id">
          <td>{{ log.created_at }}</td>
          <td>{{ formatScore(log.score) }}</td>
          <td>{{ log.describe }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="showEmpty" class="empty">
      <div>您暂时还没有任何积分变动哦……</div>
    </div>

    <el-pagination
      v-if="log.data.length"
      layout="prev, pager, next"
      :total="log.total"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
/**
 * 积分日志
 *
 * @author yangjun | luminghuai
 * @version 2017-08-09
 */

import { mapState } from 'vuex'
import { POINT } from '@/store/mutationTypes'

export default {
  name: 'point-log',

  data() {
    return {
      fetching: false,
    }
  },

  computed: {
    ...mapState({
      log: state => state.point.log,
    }),

    showEmpty() {
      return !this.fetching && !this.log.data.length
    },
  },

  methods: {
    // 为不同积分显示相应的文本格式
    formatScore(score) {
      if (score < 0) return `积分${score}`
      return `积分+${score} 经验+${score}`
    },

    // 翻页
    changePage(currentPage) {
      if (currentPage !== this.log.current_page) {
        this.$store.dispatch(POINT.LOG.INIT, currentPage)
      }
    },
  },

  created() {
    this.fetching = true
    this.$store.dispatch(POINT.LOG.INIT)
      .then(() => {
        this.fetching = false
      })
  },
}
</script>
