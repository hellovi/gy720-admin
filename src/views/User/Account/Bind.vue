<template>
  <div>
    <el-row>
      <el-col :span="12">
        <ul class="user-account-bind">
          <li class="clearfix">
            <label class="user-account-bind__label">
              手机绑定
            </label>
            <div class="user-account-bind__content">
              已绑定188****0893，可用于登录和修改密码
            </div>
          </li>
          <li class="clearfix">
            <label class="user-account-bind__label">
              邮箱绑定
            </label>
            <div class="user-account-bind__content">
              <!--TODO 判断是否已绑定邮箱-->
              <template v-if="false">
                已绑定188****@qq.com，可用于登录和修改密码
              </template>
              <template v-else>
                <el-button
                  @click.native="bindEmailStatus"
                  v-if="!emailVisible"
                >立即绑定</el-button>
                <el-form
                  class="email-bind"
                  :ref="formRef"
                  :rules="rules"
                  :model="userEmailBind"
                  v-else
                >
                  <app-form-alert
                    :contents="this.formAlert"
                  ></app-form-alert>
                  <el-form-item prop="email">
                    <el-input
                      placeholder="输入邮箱"
                      v-model="userEmailBind.email"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="auth_code">
                    <el-row>
                      <el-col :span="10">
                        <el-input
                          :style="{paddingRight: '10px'}"
                          placeholder="验证码"
                          v-model="userEmailBind.auth_code"
                        ></el-input>
                      </el-col>
                      <el-col :span="8">
                        <timer-btn
                          @click.native="emailSend"
                          :disabled="disabled"
                          :second="60"
                          ref="timerBtn"
                        ></timer-btn>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      class="user-account__btn"
                      :loading="formLoading"
                      @click.native="beforeSubmit"
                    >立即绑定</el-button>
                    <el-button
                      class="user-account__btn"
                      @click.native="bindEmailStatus(false)"
                    >取消绑定</el-button>
                  </el-form-item>
                </el-form>
              </template>
            </div>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="user-account-third">
      <el-col :span="12">
        <h3 class="user-account-third__title">第三方登录绑定</h3>
        <!--TODO 判断第三方账号绑定情况-->
        <div class="user-account-third__content">
          <el-row>
            <el-col :span="3">
              <label class="third-icon third-icon__weixin"></label>
            </el-col>
            <el-col :span="20" class="third-content">
              <template>
                <p class="txt">您尚未绑定“微信账号”，绑定后您可以直接使用微信快捷方式登录</p>
                <a class="ahref" href="" target="_blank">立即绑定</a>
              </template>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <label class="third-icon third-icon__qq"></label>
            </el-col>
            <el-col :span="20" class="third-content">
              <template>
                <p class="txt">您尚未绑定“QQ账号”，绑定后您可以直接使用QQ快捷方式登录</p>
                <a class="ahref" href="" target="_blank">立即绑定</a>
              </template>
              <template>
                <p class="ahref">已绑定账号：包着海苔的饭团</p>
              </template>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <label class="third-icon third-icon__weibo"></label>
            </el-col>
            <el-col :span="20" class="third-content">
              <template>
                <p class="txt">您尚未绑定“微博账号”，绑定后您可以直接使用微博快捷方式登录</p>
                <a class="ahref" href="" target="_blank">立即绑定</a>
              </template>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  /**
   * 绑定账号
   * @author  chenliangshan
   * @version 2017/08/17
   */

  import AppFormAlert from '@/components/AppFormAlert'
  import form from './mixins/form'
  import TimerBtn from './components/TimerBtn'

  export default {
    name: 'account-bind',
    mixins: [form],
    components: { TimerBtn, AppFormAlert },
    data() {
      return {
        emailVisible: false,
        disabled: false,
        userEmailBind: {
          email: null,
          auth_code: null,
        },
        rules: {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '邮箱格式有误', trigger: 'blur' },
          ],
          auth_code: [
            { required: true, type: 'string', message: '请输入验证码', trigger: 'blur' },
            { type: 'string', len: 6, message: '验证码长度为6个字符', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      bindEmailStatus(status = true) {
        this.emailVisible = status
        if (!status) {
          // 清除错误信息
          this.formAlert = {}

          // 重置绑定表单
          this.$refs[this.formRef].resetFields()
        }
      },
      // 发送邮箱
      emailSend() {
        this.disabled = true
        // TODO 请求发送验证接口
        setTimeout(() => {
          this.sended()
        }, 2000)
      },
      // 发送倒计时
      sended() {
        this.$refs.timerBtn.run()
        this.disabled = false
      },
      // 提交邮箱绑定
      submitForm() {
        this.$http.patch('/', this.userEmailBind)
          .then(() => {
            this.successHandler({
              message: '邮箱绑定成功！',
            })
          })
          .catch((errors) => {
            this.errorHandler(errors)
          })
      },
    },
  }
</script>
