<template>
  <div>
    <el-row class="message-control">
      <el-col :span="16">
        <el-checkbox :value="allChecked" @change="checkAll">全选</el-checkbox>
        <span style="margin-left: 20px;">
          <el-button size="small" :disabled="!someChecked">删除</el-button>
          <el-button size="small" :disabled="!someChecked">标记已读</el-button>
        </span>
      </el-col>
      <el-col :span="8">
        <el-input size="small" placeholder="请输入关键词" icon="search"></el-input>
      </el-col>
    </el-row>
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
          <th>消息内容</th>
          <th>时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(message, index) in list.data" :key="message.id">
          <td><el-checkbox :value="message.checked" @change="handleCheck(index)"></el-checkbox></td>
          <td>{{ message.title }}</td>
          <td>{{ message.created_at }}</td>
          <td><el-button type="primary" size="small">删除</el-button></td>
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
import { mapState } from 'vuex'
import { list } from '@/mixins'
import { MESSAGE } from '@/store/mutationTypes'

export default {
  name: 'message-system',

  mixins: [list],

  computed: {
    ...mapState({
      list: state => state.message.system,
    }),

    allChecked() {
      return this.list.data.length > 0 && this.list.data.every(item => item.checked)
    },

    someChecked() {
      return this.list.data.length > 0 && this.list.data.some(item => item.checked)
    },
  },

  methods: {
    handleCheck(index) {
      this.$store.commit(MESSAGE.CHECK, {
        type: 'system',
        index,
      })
    },

    checkAll({ target }) {
      this.$store.commit(MESSAGE.CHECK_ALL, {
        type: 'system',
        val: target.checked,
      })
    },

    getData(route) {
      return this.$store.dispatch(MESSAGE.SYSTEM.INIT, route.query.page)
    },
  },
}
</script>


<style lang="postcss">
.message-control {
  margin-bottom: 15px;
}
</style>
