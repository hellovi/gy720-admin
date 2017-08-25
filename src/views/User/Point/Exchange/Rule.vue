<template>
  <div v-loading="loading">
    <table class="app-table">
      <thead>
        <tr>
          <th>商品名称</th>
          <th>所需积分值</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="exchange in list.data" :key="exchange.id">
          <td>{{ exchange.name }}</td>
          <td>{{ exchange.integral }}</td>
          <td>
            <el-button type="primary" size="small" @click="handleExchange(exchange)">我要兑换</el-button>
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
import { GLOBAL, POINT } from '@/store/mutationTypes'

export default {
  name: 'point-exchange-rule',

  data() {
    return {
      loading: false,
      resultText: '',
    }
  },

  computed: {
    ...mapState({
      list: state => state.point.exchanges,
    }),
  },

  methods: {
    /**
     * 显示确认兑换窗口
     */
    handleExchange({ id, name, integral }) {
      const h = this.$createElement
      this.$msgbox({
        message: h('div', { class: 'exchange-confirm' }, [
          h('p', [
            '是否确认兑换',
            h('em', name),
          ]),
          h('p', [
            '成功兑换后将扣除',
            h('em', `${integral}积分`),
          ]),
        ]),
        showCancelButton: true,
        confirmButtonText: '确认兑换',
      })
        .then(() => this.confirmExchange(id, integral))
        .catch(() => {})
    },

    /**
     * 确认对话后，根据id请求相应接口
     * 兑换成功后，应更新store中用户的可用积分
     */
    confirmExchange(id, integral) {
      this.$http.get(`/user/integral/gift/${id}`)
        .then(() => {
          this.$message.success('兑换成功')
          this.$store.commit(GLOBAL.USER.UPDATE_POINT, -integral)
        })
        .catch(({ message }) => this.$message.error(message))
    },
  },

  created() {
    this.loading = true
    this.$store.dispatch(POINT.EXCHANGE.INIT)
      .then(() => { this.loading = false })
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

