<template>
  <div>
    <message-control
      :allChecked="allChecked"
      :someChecked="someChecked"
      @checkAll="checkAll"
    ></message-control>

    <table class="app-table">
      <colgroup>
        <col width="5%">
        <col width="50%">
        <col width="25%">
        <col width="20%">
      </colgroup>
      <thead>
        <tr>
          <th></th>
          <th class="text-left">消息内容</th>
          <th>时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(message, index) in list.data" :key="message.id">
          <td><el-checkbox :value="message.checked" @change="handleCheck(index)"></el-checkbox></td>
          <td class="text-left">{{ message.title }}</td>
          <td>{{ message.created_at }}</td>
          <td><el-button type="danger" size="small">删除</el-button></td>
        </tr>
      </tbody>
    </table>

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
// import { mapState } from 'vuex'
import { MESSAGE } from '@/store/mutationTypes'
import { list } from '@/mixins'
import check from './mixins/check'
import MessageControl from './components/MessageControl'

export default {
  name: 'message-system',

  mixins: [list, check],

  components: {
    MessageControl,
  },

  methods: {
    getData(route) {
      return this.$store.dispatch(MESSAGE.SYSTEM.INIT, route.query.page)
    },
  },
}
</script>
