<template>
  <div>

    <div class="cert-result" v-if="certStatus(10)">
      <h3 class="cert-result__title">申请提交成功</h3>
      <p>您已经成功提交认证申请，工作人员将在3个工作日内处理</p>
      <p>申请需求，请耐心等候</p>
      <el-button type="primary" @click="goTo('/user-client/center')">返回个人中心</el-button>
    </div>

    <div class="cert-result" v-if="certStatus(20)">
      <h3 class="cert-result__title">认证失败</h3>
      <p>您的认证申请经审核未能通过</p>
      <p>原因如下：{{ certInfo.certificate.note }}</p>
      <el-button type="primary" @click="goTo('/user-client/certificate/apply')">重新认证</el-button>
    </div>

    <div class="cert-result" v-if="certStatus(30)">
      <h3 class="cert-result__title">认证成功</h3>
      <p>您的认证申请已通过审核，恭喜您已正式成为光鱼认证摄影师！</p>
      <p>&nbsp;</p>
      <p>认证摄影师特权: </p>
      <p>特权一：拥有认证标识，提升账号价值。</p>
      <p>特权二：有机会承接光鱼官方提供的商业任务。</p>
      <p>特权三：摄影师和作品更大几率被提为官方推荐。</p>
      <el-button type="primary" @click="goTo('/user-client/center')">返回个人中心</el-button>
    </div>

  </div>
</template>

<script>
/**
 * 摄影师认证 - 认证结果
 *
 * @author zhoumenglin
 * @version 2017-08-11
 */


export default {
  name: 'certifate-result',

  props: {
    certInfo: {
      type: Object,
      required: true,
    },
  },

  methods: {
    goTo(url) {
      this.$router.push(url)
    },

    certStatus(status) {
      return this.certInfo.certificate && this.certInfo.certificate.certificate_status === status
    },
  },

}
</script>

<style lang="postcss">
@import "vars.css";

.cert-result {
  padding: 120px 0 150px 0;
  text-align: center;

  &__title {
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 30px;
  }

  .el-button {
    margin-top: 30px;
  }
}
</style>
