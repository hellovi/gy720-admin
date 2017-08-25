<template>
  <div v-loading="loading">
    <table class="app-table">
      <thead>
        <tr>
          <th>订单号</th>
          <th>兑换礼品名称</th>
          <th>申请时间</th>
          <th>兑换数量</th>
          <th>状态</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in list.data" :key="record.id">
          <td>{{ record.code }}</td>
          <td>{{ record.name }}</td>
          <td>{{ record.date }}</td>
          <td>{{ record.use_status }}</td>
          <td>{{ record.use_status_name }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="isEmpty" class="empty">
      <div>您暂时还没有任何兑换记录哦……</div>
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
 * 积分兑换 - 记录
 *
 * @author luminghuai
 * @version 2017-08-25
 */

import { mapState } from 'vuex'
import { list } from '@/mixins'
import { POINT } from '@/store/mutationTypes'

export default {
  name: 'point-exchange-record',

  mixins: [list],

  data() {
    return {
      loading: false,
    }
  },

  computed: {
    ...mapState({
      list: state => state.point.record,
    }),
  },

  methods: {
    getData(route) {
      this.loading = true
      return this.$store.dispatch(POINT.RECORD.INIT, route.query.page)
        .then(() => { this.loading = false })
    },
  },
}
</script>
