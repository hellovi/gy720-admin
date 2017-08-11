<template>
  <div>
    <ul class="cert-apply__term list clearfix">
      <li>
        <i class="iconfont">&#xe684;</i>
        <p>10个以上精品</p>
        <el-button type="primary" size="mini">努力中</el-button>
        <!-- <el-button type="primary" size="mini" disabled>已符合</el-button> -->
      </li>
      <li>
        <i class="iconfont">&#xe682;</i>
        <p>总人气超过2000</p>
        <el-button type="primary" size="mini">努力中</el-button>
        <!-- <el-button type="primary" size="mini" disabled>已符合</el-button> -->
      </li>
      <li>
        <i class="iconfont">&#xe681;</i>
        <p>完善摄影师资料</p>
        <el-button type="primary" size="mini">去完善</el-button>
        <!-- <el-button type="primary" size="mini" disabled>已符合</el-button> -->
      </li>
    </ul>

    <el-form
      label-width="115px"
      label-position="left"
    >
      <el-form-item label="真实姓名：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="身份证号：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="身份证扫描件："></el-form-item>
      <div><el-checkbox>我同意《光鱼摄影师认证服务协议》</el-checkbox></div>
      <el-button type="primary" size="large" class="cert-apply__submit">立即申请</el-button>
    </el-form>
  </div>
</template>

<script>
/**
 * 摄影师认证 - 个人认证
 *
 * @author zhoumenglin
 * @version 2017-08-11
 */

export default {
  name: 'certifate-apply-person',

}
</script>

<style>

</style>
