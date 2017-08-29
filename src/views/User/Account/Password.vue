<template>
  <el-row>
    <el-col :span="12">
      <app-form-alert
        label-width="200px"
        :contents="this.formAlert"
      ></app-form-alert>
      <el-form
        :model="userPwd"
        :rules="rules"
        :ref="formRef"
        label-width="200px"
      >
        <el-form-item prop="old_password" label="旧密码">
          <el-input
            type="password"
            placeholder="请输入旧密码"
            v-model="userPwd.old_password"
            ref="oldPassword"
          ></el-input>
        </el-form-item>
        <el-form-item prop="new_password" label="新密码">
          <el-input
            type="password"
            placeholder="请输入新密码"
            v-model="userPwd.new_password"
            ref="newPassword"
          ></el-input>
        </el-form-item>
        <el-form-item prop="new_password_confirmation" label="确认密码">
          <el-input
            type="password"
            placeholder="请输入确认密码"
            v-model="userPwd.new_password_confirmation"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="user-account__btn"
            :loading="formLoading"
            @click.native="beforeSubmit"
          >提交</el-button>
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

  import AppFormAlert from '@/components/AppFormAlert'
  import form from './mixins/form'
  import { pwdRule, equalRule, noEqualRule } from './rules'

  export default {
    name: 'account-password',
    mixins: [form],
    components: { AppFormAlert },
    data() {
      return {
        userPwd: {
          old_password: null,
          new_password: null,
          new_password_confirmation: null,
        },
        rules: {
          old_password: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            { type: 'string', min: 6, max: 64, message: '密码长度为6~64个字符', trigger: 'blur' },
          ],
          new_password: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { type: 'string', min: 6, max: 64, message: '密码长度为6~64个字符', trigger: 'blur' },
            { validator: pwdRule, message: '密码格式不能包含特殊字符，如：%`~!@……等', trigger: 'blur' },
            { validator: noEqualRule, refs: this.$refs, equal: 'oldPassword', message: '新密码不能与旧密码一样', trigger: 'blur' },
          ],
          new_password_confirmation: [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
            { type: 'string', min: 6, max: 64, message: '密码长度为6~64个字符', trigger: 'blur' },
            { validator: equalRule, refs: this.$refs, equal: 'newPassword', message: '确认密码与新密码不一致', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      submitForm() {
        this.$http.patch('/user/update-password', this.userPwd)
          .then(() => {
            this.$message.success('密码修改成功 !')
            this.formLoading = false
          })
          .catch((errors) => {
            this.errorHandler(errors)
          })
      },
    },
  }
</script>
