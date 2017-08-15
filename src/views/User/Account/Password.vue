<template>
  <el-row>
    <el-col :span="12">
      <el-form :model="userPwd"
               :rules="rules"
               :ref="formRef"
               label-width="200px">
        <el-form-item prop="oldPassword" label="旧密码">
          <el-input v-model="userPwd.oldPassword"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input v-model="userPwd.newPassword"></el-input>
        </el-form-item>
        <el-form-item prop="newPasswordCfm" label="确认密码">
          <el-input v-model="userPwd.newPasswordCfm"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100px" @click.native="beforeSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  /**
   * 修改密码
   * @author  chenliangshan
   * @version 2017/08/14
   */

  import form from './Mixins/form'

  export default {
    name: 'account-password',
    mixins: [form],
    data() {
      return {
        userPwd: {
          oldPassword: null,
          newPassword: null,
          newPasswordCfm: null,
        },
        rules: {
          oldPassword: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
          ],
          newPasswordCfm: [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
          ],
        },
      }
    },
  }
</script>
