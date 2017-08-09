<template>
  <div>
    <!--日常任务 -->
    <table class="app-table">
      <colgroup>
        <col width="40%">
        <col width="40%">
        <col width="20%">
      </colgroup>
      <thead>
        <tr>
          <th class="text-left" colspan="3">日常任务</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.describe }}</td>
          <td>{{ formatScore(task.score) }}</td>
          <td v-if="task.name === 'sign'">
            <el-button
              type="primary"
              size="small"
              :disabled="signed"
              @click="goToSign"
            >去签到</el-button>
          </td>
          <td v-else-if="task.name === 'improve_profile'">
            <el-button
              type="primary"
              size="small"
              @click="$router.push('/user-client/accserv/info')"
            >去完善</el-button>
          </td>
          <td v-else>{{ `今日已领取${task.coupon_amount}次`}}</td>
        </tr>
      </tbody>
    </table>

    <!--分享任务  -->
    <table class="app-table">
      <colgroup>
        <col width="40%">
        <col width="40%">
        <col width="20%">
      </colgroup>
      <thead>
        <tr>
          <th class="text-left" colspan="3">分享任务</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>邀请注册</td>
          <td>+5积分 +5经验值</td>
          <td>
            <el-button type="primary" size="small" @click="invite">去邀请</el-button>
          </td>
        </tr>
      </tbody>
    </table>

    <!--邀请注册弹框-->
    <el-dialog :visible.sync="inviteModal" custom-class="invite-modal" title="分享" @open="createQrcode">
      <canvas ref="canvas"></canvas>
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
 * @version 2017-08-09
 */

import { mapState } from 'vuex'
import QRCode from 'qrcode'
import { GLOBAL, POINT } from '@/store/mutationTypes'

export default {
  name: 'point-task',

  data() {
    return {
      signed: false,
      inviteUrl: '',
      inviteModal: false,
    }
  },

  computed: {
    ...mapState({
      tasks: state => state.point.tasks,
    }),
  },

  methods: {
    // 为不同积分显示相应的文本格式
    formatScore(score) {
      if (score < 0) return `积分${score}`
      return `积分+${score} 经验+${score}`
    },

    // 签到（后台积分没有增加）
    goToSign() {
      this.$http.post('/user/sign/add')
        .then(() => {
          this.signed = true
          this.$store.commit(GLOBAL.USER.UPDATE_POINT, 5)
          this.$message.success('操作成功')
        })
        .catch(() => this.$message.error('操作失败'))
    },

    // 邀请注册
    invite() {
      this.inviteModal = true
    },

    // 请求连接、创建二维码（这里每次请求感觉不合适）
    createQrcode() {
      this.$http.get('/user/invitelink')
        .then(({ result: { base_url, invite_code } }) => {
          this.inviteUrl = `${base_url}?invite_code=${invite_code}`
          QRCode.toCanvas(this.$refs.canvas, this.inviteUrl, () => {})
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

    checkSign() {
      this.$http.get('/user/sign/check')
        // 后台不应该返回code 0
        .catch(() => {
          this.signed = true
        })
    },
  },

  created() {
    this.checkSign()
    this.$store.dispatch(POINT.TASK.INIT)
  },
}
</script>

<style lang="postcss">
.invite-modal {
  .el-dialog__body {
    text-align: center;
  }
}
</style>
