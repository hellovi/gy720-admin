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
              <a :href="`/author/view/${message.hash_user_id}`" class="hover-primary">{{ message.nickname }}</a>
              <div class="message-summary ellipsis" :title="message.content">{{ message.content }}</div>
            </div>
          </td>
          <td>{{ message.name }}</td>
          <td>{{ message.created_at }}</td>
          <td>
            <el-switch
              v-model="message.show_status"
              on-text="显示" off-text="隐藏"
              :on-value="20" :off-value="10"
              on-color="#13ce66" off-color="#ff4949"
              name="message.id"
              @change="switchVisible"
              @click.native="changeVisible(message)"
            ></el-switch>
          </td>
          <td>
            <el-button type="danger" size="small" @click="removeMessage(message.id)">删除</el-button>
          </td>
        </tr>
      </tbody>
    </table>

    <app-empty-body v-if="isEmpty" width="560px">
      您还没有收到任何说一说评论
    </app-empty-body>

    <el-pagination
      v-if="list.last_page > 1"
      layout="prev, pager, next"
      :page-size="list.per_page"
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
  name: 'message-say',

  mixins: [list, check],

  components: {
    MessageControl,
  },

  props: {
    panoId: [Number, String],
  },

  data() {
    return {
      listLoading: false,
      loading: -1,
      currentId: null,
    }
  },

  computed: {
    ...mapState({
      list: state => state.message.say,
    }),
  },

  watch: {
    panoId(val) {
      if (val) {
        this.pageChange(1)
      }
    },
  },

  methods: {
    getData(route) {
      this.listLoading = true
      return this.$store.dispatch(MESSAGE.SAY.INIT, {
        page: route.query.page,
        pano_id: this.panoId || '',
      })
        .catch(({ status }) => this.$message.error(status.reason))
        .then(() => { this.listLoading = false })
    },

    removeMessage(removeId) {
      this.remove('say', '/user/panocomment/delete', removeId)
    },

    pageChange(page) {
      if (this.panoId) {
        this.getData({ query: { page } })
      } else {
        this.$router.push({
          query: { ...this.$route.query, page },
        })
      }
    },

    // 操作显示状态
    switchVisible() {
      this.$http.put(`/user/panocomment/${this.currentId}`)
        .then(({ result: { show_status } }) => {
          this.$message.success('设置成功')
          this.list.data = this.list.data.map((item) => {
            if (item.id === this.currentId) {
              return { ...item, show_status }
            }
            return item
          })
        })
    },

    // 获取当前Id
    changeVisible({ id }) {
      this.currentId = id
    },
  },
}
</script>
