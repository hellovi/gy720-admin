<template>
  <div>
    <el-form
      label-width="115px"
      label-position="left"
    >
      <el-form-item label="企业名称：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="营业执照号：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="营业执照扫描件:"></el-form-item>
      <div><el-checkbox>我同意《光鱼摄影师认证服务协议》</el-checkbox></div>
      <el-button type="primary" size="large" class="cert-apply__submit">立即申请</el-button>
    </el-form>
  </div>
</template>

<script>
/**
 * 摄影师认证 - 企业认证
 *
 * @author zhoumenglin
 * @version 2017-08-11
 */

export default {
  name: 'certifate-apply-company',

}
</script>

<style>

</style>
