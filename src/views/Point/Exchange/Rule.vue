<template>
  <div>
    <table class="app-table">
      <thead>
        <tr>
          <th>商品名称</th>
          <th>所需积分值</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="exchange in exchanges" :key="exchange.id">
          <td>{{ exchange.describe }}</td>
          <td>{{ exchange.score }}</td>
          <td>
            <el-button type="primary" size="small" @click="handleExchange(exchange.id)">我要兑换</el-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/**
 * 积分兑换 - 规则
 *
 * @author luminghuai
 * @version 2017-08-09
 */

import { mapState } from 'vuex'
import { POINT } from '@/store/mutationTypes'

export default {
  name: 'point-exchange-rule',

  data() {
    return {
      resultText: '',
    }
  },

  computed: {
    ...mapState({
      exchanges: state => state.point.exchanges,
    }),
  },

  methods: {
    handleExchange(id) {
      const h = this.$createElement
      this.$msgbox({
        message: h('div', { class: 'exchange-confirm' }, [
          h('p', [
            '是否确认兑换',
            h('em', '10元商业会员抵用券'),
            '成功兑换后',
          ]),
          h('p', [
            '将扣除',
            h('em', '800点积分'),
          ]),
        ]),
        showCancelButton: true,
        confirmButtonText: '确认兑换',
      })
        .then(() => this.confirmExchange(id))
        .catch(() => {})
    },

    confirmExchange(id) {
      this.$http.post('/user/integralexchange/create', {
        rule_id: id,
        count: 1,
      })
        // 这里应该更新userInfo中的积分，后台没有扣除积分
        .then(() => this.$message.success('兑换成功'))
        .catch(error => this.$message.error(error))
    },
  },

  created() {
    this.$store.dispatch(POINT.EXCHANGE.INIT)
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.exchange-confirm {
  text-align: center;

  p:first-child {
    margin-bottom: 0.5em;
  }

  em {
    font-style: normal;
    color: var(--color-primary);
  }
}
</style>

