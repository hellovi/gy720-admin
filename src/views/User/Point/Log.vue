<template>
  <div v-loading="loading">
    <table class="app-table">
      <thead>
        <tr>
          <th>时间</th>
          <th>积分、经验变动</th>
          <th>日志</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in list.data" :key="log.date">
          <td>{{ log.date }}</td>
          <!-- 这里正负数有疑问 -->
          <td>{{ getFormattedText(log.integral, log.experience) }}</td>
          <td>{{ log.name }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="isEmpty" class="empty">
      <div>您暂时还没有任何积分变动哦……</div>
    </div>

    <el-pagination
      v-if="list.last_page > 1"
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
 * @version 2017-08-25
 */

import { mapState } from 'vuex'
import { list } from '@/mixins'
import { POINT } from '@/store/mutationTypes'

export default {
  name: 'point-log',

  mixins: [list],

  data() {
    return {
      loading: false,
    }
  },

  computed: {
    ...mapState({
      list: state => state.point.log,
    }),
  },

  methods: {
    // 为不同积分显示相应的文本格式
    getFormattedText(integral, experience) {
      const integralText = `积分${(integral > 0) ? '+' : ''}${integral}`
      const experienceText = `积分${(experience > 0) ? '+' : ''}${experience}`
      return `${integralText} ${experienceText}`
    },

    getData(route) {
      this.loading = true
      return this.$store.dispatch(POINT.LOG.INIT, route.query.page)
        .then(() => { this.loading = false })
    },
  },
}
</script>
