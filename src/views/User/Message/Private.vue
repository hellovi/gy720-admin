<template>
  <div v-loading="listLoading">
    <message-control
      :allChecked="allChecked"
      :someChecked="checked.length > 0"
      :loading="loading"
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
            <div class="message-avatar">
              <a href="#"><img :src="$url.static(message.avatar)" :alt="message.nickname"></a>
            </div>
            <div>
              <!-- 这里及上面的头像似乎应该转跳到用户主页面，但目前地址还未确定 -->
              <a href="#" class="hover-primary">{{ message.nickname }}</a>
              <div class="message-summary">{{ message.content }}</div>
            </div>
          </td>
          <td>{{ message.date }}</td>
          <td>
            <el-button type="primary" size="small" @click="openChatBox(message.user_id)">回复</el-button>
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

    <div v-if="isEmpty" class="empty">
      <div>您目前还没有收到任何系统消息</div>
    </div>

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
    /**
     * 删除单个消息或已选中的所有消息，若传入id，则为前者，否则为后者
     * 接口请求成功后，应根据id同时删去store中的对应数据
     */
    removeMessage(removeId) {
      this.loading = removeId || 'remove-selected'

      const ids = removeId ? [removeId] : this.checked

      this.$http.post('/user/chat/delete', {
        ids: ids.map(id => ({ id })),
      })
        .then(() => {
          this.$store.commit(MESSAGE.PRIVATE.DELETE, ids)
          this.loading = -1
        })
    },

    /**
     * 标记所有选中项为已读
     * 接口请求成功后，应把store中对应的未读计数减去标记项的个数
     */
    markSelected() {
      this.loading = 'mark-selected'
      this.$http.post('/user/chat/read', {
        ids: this.checked.map(id => ({ id })),
      })
        .then(() => {
          this.$store.commit(MESSAGE.COUNT.UPDATE, {
            type: 'private',
            count: this.checked.length,
          })
          this.loading = -1
        })
    },

    openChatBox(userId) {
      this.userId = userId
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
