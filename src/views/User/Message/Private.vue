<template>
  <div v-loading="listLoading">
    <message-control
      :allChecked="allChecked"
      :someChecked="checked.length > 0"
      :loading="loading"
      show-mark-button
      @check-all="checkAll"
      @remove-selected="removeMessage"
      @mark-selected="markSelected"
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
          <td><el-checkbox :value="checked.includes(message.id)" @change="check(message.id)"></el-checkbox></td>
          <td class="text-left">
            <div class="message-avatar" :class="{unread: message.unread}" :data-count="message.unread">
              <a :href="`/author/view/${message.user_id}`"><img :src="$url.static(message.avatar)" :alt="message.nickname"></a>
            </div>
            <div>
              <a :href="`/author/view/${message.user_id}`" class="hover-primary">{{ message.nickname }}</a>
              <div class="message-summary">{{ message.content }}</div>
            </div>
          </td>
          <td>{{ message.date }}</td>
          <td>
            <el-button type="primary" size="small" @click="openChatBox(message)">回复</el-button>
            <el-button
              type="danger"
              size="small"
              :loading="loading === message.id"
              @click="removeMessage(message.id)"
            >删除</el-button>
          </td>
        </tr>
      </tbody>
    </table>

    <app-empty-body v-if="isEmpty">
      您还没有收到任何私信
    </app-empty-body>

    <el-pagination
      v-if="list.last_page > 1"
      layout="prev, pager, next"
      :total="list.total"
      :current-page="list.current_page"
      @current-change="pageChange"
    ></el-pagination>

    <chat-box v-model="modal" :user-id="userId" @close="userId = -1"></chat-box>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      listLoading: false,
      loading: -1,
      modal: false,
      userId: -1,
    }
  },

  computed: {
    ...mapState({
      list: state => state.message.private,
    }),
  },

  methods: {
    removeMessage(removeId) {
      this.remove('private', '/user/chat/delete', removeId)
    },

    /**
     * 标记所有选中项为已读
     * 接口请求成功后，应把store中对应的未读计数减去标记项的个数
     */
    markSelected(ids = this.checked) {
      this.loading = 'mark-selected'
      this.$http.post('/user/chat/read', {
        ids: ids.map(id => ({ id })),
      })
        .then(() => {
          ids.map(id => this.$store.commit(MESSAGE.PRIVATE.UPDATE, { id, unread: 0 }))
          this.loading = -1
        })
    },

    openChatBox({ id, user_id }) {
      this.userId = user_id
      this.markSelected([id])
      this.modal = true
    },

    getData(route) {
      this.listLoading = true
      return this.$store.dispatch(MESSAGE.PRIVATE.INIT, route.query.page)
        .catch(({ status }) => this.$message.error(status.reason))
        .then(() => { this.listLoading = false })
    },
  },
}
</script>
