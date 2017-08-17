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
          <td class="text-left">
            <div class="message-avatar" data-count="2">
              <img src="http://l-statics.gy720.com/data/avatar/20170101/471811501052670905.jpg" alt="用户名">
            </div>
            <div>
              <!-- 这里是否要跳链接 -->
              <router-link to="/" class="hover-primary">用户名</router-link>
              <div class="message-summary">{{ message.title }}</div>
            </div>
          </td>
          <td>{{ message.created_at }}</td>
          <td>
            <el-button type="primary" size="small" @click="openChatBox">回复</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </td>
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

    <chat-box v-model="modal"></chat-box>
  </div>
</template>

<script>
import { MESSAGE } from '@/store/mutationTypes'
import { list } from '@/mixins'
import check from './mixins/check'
import MessageControl from './components/MessageControl'
import ChatBox from './components/ChatBox'

export default {
  name: 'message-private',

  mixins: [list, check],

  components: {
    MessageControl,
    ChatBox,
  },

  data() {
    return {
      modal: false,
    }
  },

  methods: {
    openChatBox() {
      this.modal = true
    },

    getData(route) {
      return this.$store.dispatch(MESSAGE.SYSTEM.INIT, route.query.page)
    },
  },
}
</script>

