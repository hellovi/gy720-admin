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
            <div class="message-avatar" v-if="message.user_id">
              <a :href="`/author/view/${message.user_id}`">
                <img :src="$url.static(message.avatar)" :alt="message.nickname">
              </a>
            </div>
            <div class="message-content">
              <a :href="`/author/view/${message.user_id}`" v-if="message.user_id" class="message-name hover-primary">{{ message.nickname }}</a>
              <div class="message-summary">{{ message.content }}</div>
            </div>
          </td>
          <td>{{ message.date }}</td>
          <td>
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
      您还没有收到任何系统消息
    </app-empty-body>

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
  name: 'message-system',

  mixins: [list, check],

  components: {
    MessageControl,
  },

  data() {
    return {
      listLoading: false, // 是否正在加载列表数据
      loading: -1, // 用以存储需要显示加载状态的按钮
    }
  },

  computed: {
    ...mapState({
      list: state => state.message.system,
      userInfo: state => state.userInfo,
    }),
  },

  methods: {
    getData(route) {
      this.listLoading = true
      return this.$store.dispatch(MESSAGE.SYSTEM.INIT, route.query.page)
        .catch(({ status }) => this.$message.error(status.reason))
        .then(() => { this.listLoading = false })
    },

    /**
     * 删除单个消息或已选中的所有消息，若传入id，则为前者，否则为后者
     * 接口请求成功后，应根据id同时删去store中的对应数据
     */
    removeMessage(removeId) {
      this.remove('system', '/user/message/delete', removeId)
    },

    /**
     * 标记所有选中项为已读
     * 接口请求成功后，应把store中对应的未读计数减去标记项的个数
     */
    markSelected() {
      this.loading = 'mark-selected'
      this.$http.post('/user/message/read', {
        ids: this.checked.map(id => ({ id })),
      })
        .then(() => {
          this.$store.commit(MESSAGE.COUNT.UPDATE, {
            type: 'system',
            count: this.checked.length,
          })
          this.loading = -1
        })
    },
  },
}
</script>

<style lang="postcss">
  .message {
    &-content {
      .message-summary {
        margin: 0;
      }
    }
    &-name {
      display: inline-block;
      margin-bottom: 10px;
    }
  }
</style>
