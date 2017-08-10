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
        <tr v-for="log in list.data" :key="log.id">
          <td>{{ log.created_at }}</td>
          <td>{{ formatScore(log.score) }}</td>
          <td>{{ log.describe }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="isEmpty" class="empty">
      <div>您暂时还没有任何积分变动哦……</div>
    </div>

    <el-pagination
      v-if="list.data.length"
      layout="prev, pager, next"
      :total="list.total"
      :current-page="list.current_page"
      @current-change="pageChange"
    ></el-pagination>
  </div>
</template>

<script>
/**
 * 积分日志
 *
 * @author luminghuai
 * @version 2017-08-09
 */

import { mapState } from 'vuex'
import { list } from '@/mixins'
import { POINT } from '@/store/mutationTypes'

export default {
  name: 'point-log',

  mixins: [list],

  computed: {
    ...mapState({
      list: state => state.point.log,
    }),
  },

  methods: {
    // 为不同积分显示相应的文本格式
    formatScore(score) {
      if (score < 0) return `积分${score}`
      return `积分+${score} 经验+${score}`
    },

    getData(route) {
      return this.$store.dispatch(POINT.LOG.INIT, route.query.page)
    },
  },
}
</script>
