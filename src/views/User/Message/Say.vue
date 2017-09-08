<template>
  <div v-loading="listLoading">
    <message-control
      :allChecked="allChecked"
      :someChecked="checked.length > 0"
      :loading="loading"
      @check-all="checkAll"
      @remove-selected="removeMessage"
    ></message-control>

    <table class="app-table">
      <colgroup>
        <col width="5%">
        <col width="40%">
        <col width="10%">
        <col width="20%">
        <col width="10%">
        <col width="15%">
      </colgroup>
      <thead>
        <tr>
          <th></th>
          <th class="text-left">消息内容</th>
          <th>场景</th>
          <th>时间</th>
          <th>显示状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(message, index) in list.data" :key="message.id">
          <td><el-checkbox  :value="checked.includes(message.id)" @change="check(message.id)"></el-checkbox></td>
          <td class="text-left">
            <div class="message-avatar" data-count="2">
              <img :src="$url.static(message.avatar)" :alt="message.nickname">
            </div>
            <div>
              <!-- 这里是否要跳链接 -->
              <router-link to="/" class="hover-primary">{{ message.nickname }}</router-link>
              <div class="message-summary ellipsis" :title="message.content">{{ message.content }}</div>
            </div>
          </td>
          <td>{{ message.name }}</td>
          <td>{{ message.created_at }}</td>
          <td>{{ message.show_status_name }}</td>
          <td>
            <el-button type="primary" size="small">隐藏</el-button>
            <el-button type="danger" size="small" @click="removeMessage(message.id)">删除</el-button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="isEmpty" class="empty">
      <div>您目前还没有收到任何说一说评论</div>
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
import { mapState } from 'vuex'
import { MESSAGE } from '@/store/mutationTypes'
import { list } from '@/mixins'
import check from './mixins/check'
import MessageControl from './components/MessageControl'

export default {
  name: 'message-private',

  mixins: [list, check],

  components: {
    MessageControl,
  },

  data() {
    return {
      listLoading: false,
      loading: -1,
    }
  },

  computed: {
    ...mapState({
      list: state => state.message.say,
    }),
  },

  methods: {
    getData(route) {
      this.listLoading = true
      return this.$store.dispatch(MESSAGE.SAY.INIT, route.query.page)
        .catch(({ status }) => this.$message.error(status.reason))
        .then(() => { this.listLoading = false })
    },

    removeMessage(removeId) {
      this.remove('say', '/user/panocomment/delete', removeId)
    },
  },
}
</script>
