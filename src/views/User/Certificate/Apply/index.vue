<template>
  <div class="cert-apply">
    <dl class="cert-apply__privilege">
      <dt>成为认证摄影师后拥有的特权</dt>
      <dd>特权一：拥有认证标识，提升账号价值。</dd>
      <dd>特权二：有机会承接光鱼官方提供的商业任务。</dd>
      <dd>特权三：摄影师和作品更大几率被提为官方推荐。</dd>
    </dl>

    <h3>
      认证类型：
      <router-link to="/user-client/certificate/apply/person">个人认证</router-link>
      <router-link to="/user-client/certificate/apply/company">企业认证</router-link>
    </h3>

    <div class="cert-apply__body">
      <h5>申请条件</h5>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
/**
 * 摄影师认证 - 认证
 *
 * @author zhoumenglin
 * @version 2017-08-11
 */

export default {
  name: 'certifate-apply',

}
</script>

<style lang="postcss">
@import "vars.css";

.cert-apply {
  padding: 15px 85px 50px;

  &__privilege {
    margin: 0 20px;
    font-size: 14px;
    line-height: 1.75;

    & dd {
      margin: 0;
    }
  }

  &__body {
    margin-left: 100px;

    & h5 {
      margin: 20px 0 30px;
      font-weight:normal;
    }
  }

  .el-input {
    width: 210px;
  }

  &__submit {
    width: 138px;
    margin-top: 40px
  }

  &__term {
    margin-bottom: 42px;

    & li {
      float: left;
    width: 125px;
    text-align: center;
    margin-right: 80px;

    & i {
      color: #ffc000;
      font-size: 50px;
    }

    & p {
      line-height: 1;
      font-size: 14px;
      margin: 10px 0 20px;
    }

    & .el-button {
      width: 70px;
    }
  }

  }

  &>h3 {
    margin: 20px 0 0 0;
    padding-left: 20px;
    line-height: 55px;
    font-size: 16px;
    border-bottom: 1px solid var(--color-primary);

    &>a {
      margin-left: 50px;
      font-size: 14px;
      font-weight: normal;

      &.router-link-active {
        color: var(--color-primary);
      }
    }
  }
}
</style>
