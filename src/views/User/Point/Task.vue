<template>
  <div v-loading="loading">
    <!--日常任务 -->
    <table class="app-table">
      <colgroup>
        <col width="35%">
        <col width="25%">
        <col width="25%">
        <col width="15%">
      </colgroup>
      <thead>
        <tr>
          <th class="text-left" colspan="4">日常任务</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks.filter(item => item.id !== 8)" :key="task.id">
          <td>{{ task.name }}</td>
          <td>{{ `${task.integral}积分 ${task.experience}经验`.replace(/(^|\s)(?=\d+)/g, '$1+') }}</td>
          <td>
            <!-- {{ `今日已领取${task.user_mission_count}/${task.limit}次` }} -->
            {{ degree(task.mission_type,task.user_mission_count,task.limit) }}
          </td>
          <td>
            <el-button
              v-if="task.id === 1"
              type="primary"
              size="small"
              :disabled="task.user_mission_count >= task.limit"
              @click="doTask(task.id, task.integral)"
            >{{ task.name }}</el-button>

            <el-button
              v-if="task.id === 2"
              type="primary"
              size="small"
              :disabled="task.user_mission_count >= task.limit"
              @click="$router.push('/user-client/account/info')"
            >完善个人资料</el-button>

            <el-button
              v-if="task.id === 3"
              type="primary"
              size="small"
              :disabled="task.user_mission_count >= task.limit"
              @click="$router.push('/user-client/publish')"
            >发布作品</el-button>

            <el-button
              v-if="task.id === 5 || task.id === 6"
              type="primary"
              size="small"
              :disabled="task.user_mission_count >= task.limit"
              @click="$router.push('/forum')"
            >{{ task.id === 5 ? '回复话题': '发布话题' }}</el-button>

          </td>
        </tr>
      </tbody>
    </table>

    <!--分享任务  -->
    <table class="app-table">
      <colgroup>
        <col width="35%">
        <col width="25%">
        <col width="25%">
        <col width="15%">
      </colgroup>
      <thead>
        <tr>
          <th class="text-left" colspan="4">分享任务</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>邀请注册</td>
          <td>{{ `${tasks.find(item => item.id === 8).integral}积分 ${tasks.find(item => item.id === 8).experience}经验`.replace(/(^|\s)(?=\d+)/g, '$1+') }}</td>
          <td>{{`已邀请${tasks.find(item => item.id === 8).user_mission_count}次`}}</td>
          <td>
            <el-button type="primary" size="small" @click="invite" :loading="loadingInvite">去邀请</el-button>
          </td>
        </tr>
      </tbody>
    </table>

    <!--邀请注册弹框-->
    <el-dialog :visible.sync="inviteModal" custom-class="invite-modal" title="分享" >
      <img class="invite-modal__qrcode" :src="qrcode" alt="微信扫一扫分享二维码" title="微信扫一扫分享二维码">
      <p class="text-gray">您的专属邀请二维码，微信“扫一扫”点击右上角分享</p>
      <el-input v-model="inviteUrl" ref="input">
        <template slot="append"><el-button @click="copyLink">复制链接</el-button></template>
      </el-input>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 积分任务
 *
 * @author yangjun | luminghuai
 * @version 2017-08-25
 * @description 去邀请功能存疑问，尚未完成
 */

import { mapState } from 'vuex'
import { GLOBAL, POINT } from '@/store/mutationTypes'

export default {
  name: 'point-task',

  data() {
    return {
      loading: false,
      inviteUrl: '',
      inviteModal: false,
      qrcode: '',
      loadingInvite: false,
    }
  },

  computed: {
    ...mapState({
      tasks: state => state.point.tasks,
    }),
  },

  methods: {
    /**
     * 根据id请求对应任务接口
     * 若完成任务，更新该任务的轻取次数，并更新用户信息中的积分
     * @param {number} id - 任务id
     * @param {number} integral - 任务所得积分
     */
    doTask(id, integral) {
      this.$http.get(`/user/integral/complete/${id}`)
        .then(() => {
          // 这里可能需要判断是直接完成任务还是转跳页面
          this.$store.commit(POINT.TASK.UPDATE, id)
          this.$store.commit(GLOBAL.USER.UPDATE_POINT, integral)
        })
        .catch(({ status }) => this.$message.error(status.reason))
    },

    // 邀请注册
    invite() {
      this.loadingInvite = true
      this.$http.get('/user/invitelink')
        .then(({ result }) => {
          this.qrcode = result.qrcode
          this.inviteUrl = result.invite_link
          this.inviteModal = true
          this.loadingInvite = false
        })
        .catch(({ status }) => {
          this.$message.error(status.reason)
          this.loadingInvite = false
        })
    },


    // 复制链接（可能需要处理Safari下的兼容性）
    copyLink() {
      this.$refs.input.$el.children[0].select()
      try {
        document.execCommand('copy')
        this.$message.success('操作成功')
      } catch (e) {
        this.$message.error('操作失败')
      }
    },

    // 格式化任务完成情况
    degree(type, count, limit) {
      switch (type) {
        case 10:
          return `今日已完成${count}/${limit}次`
        case 20:
          return `已完成${count}/${limit}`
        case 30:
          return `已完成${count}次`
        default:
          return '无任务类型'
      }
    },
  },

  created() {
    this.loading = true
    this.$store.dispatch(POINT.TASK.INIT)
      .then(() => { this.loading = false })
  },
}
</script>

<style lang="postcss">
.invite-modal {
  .el-dialog__body {
    text-align: center;
  }
  &__qrcode {
    height: 180px;
    width: 180px;
  }
}
</style>
