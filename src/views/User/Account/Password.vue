<template>
  <el-row>
    <el-col :span="12">
      <form-alert label-width="200px"
                  :title="formAlertTitle"
                  :type="formAlertType"
                  :contents="this.formAlert"></form-alert>
      <el-form :model="userPwd"
               :rules="rules"
               :ref="formRef"
               label-width="200px">
        <el-form-item prop="oldPassword" label="旧密码">
          <el-input type="password" placeholder="请输入旧密码" v-model="userPwd.oldPassword"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input type="password" placeholder="请输入新密码" v-model="userPwd.newPassword" ref="newPassword"></el-input>
        </el-form-item>
        <el-form-item prop="new_password_confirmation" label="确认密码">
          <el-input type="password" placeholder="请输入确认密码" v-model="userPwd.new_password_confirmation"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     class="user-account__btn"
                     :loading="formLoading"
                     @click.native="beforeSubmit">提交</el-button>
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

  import form from './mixins/form'
  import { pwdRule, equalRule } from './rules'
  import FormAlert from './components/Alert'

  export default {
    name: 'account-password',
    mixins: [form],
    components: { FormAlert },
    data() {
      return {
        userPwd: {
          oldPassword: null,
          newPassword: null,
          new_password_confirmation: null,
        },
        rules: {
          oldPassword: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { validator: pwdRule, message: '密码格式不能包含特殊字符，如：%`~!@……等', trigger: 'blur' },
            { type: 'string', min: 6, max: 16, message: '密码长度为6~16个字符', trigger: 'blur' },
          ],
          new_password_confirmation: [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
            { validator: equalRule, refs: this.$refs, equal: 'newPassword', message: '确认密码与新密码不一致', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      submitForm() {
        this.$http.patch('/user/update-password', this.userPwd)
          .then(() => {
            this.successHandler({
              message: '密码修改成功 !',
            })
          })
          .catch((errors) => {
            this.errorHandler(errors)
          })
      },
    },
  }
</script>
