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
              <template v-if="bindInfo.mobile">
                已绑定{{ bindInfo.mobile }}，可用于登录和修改密码
              </template>
              <bind-form
                v-else
                :rules="mobileRules"
                :form-model="mobileModel"
                :placeholder="{account: '手机号码'}"
                send-url="/sms/bind"
                sub-url="/user/binding/mobile"
                @bind-success="updateBindInfo"
              ></bind-form>
            </div>
          </li>
          <li class="clearfix">
            <label class="user-account-bind__label">
              邮箱绑定
            </label>
            <div class="user-account-bind__content">
              <template v-if="bindInfo.email">
                已绑定{{ bindInfo.email }}，可用于登录和修改密码
              </template>
              <bind-form
                v-else
                :rules="emailRules"
                :form-model="emailModel"
                :placeholder="{account: '邮箱'}"
                send-url="/mail/bind"
                sub-url="/user/binding/email"
                @bind-success="updateBindInfo"
              ></bind-form>
            </div>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="user-account-third">
      <el-col :span="12">
        <h3 class="user-account-third__title">第三方登录绑定</h3>
        <div class="user-account-third__content">
          <el-row>
            <el-col :span="3">
              <label class="third-icon third-icon__weixin"></label>
            </el-col>
            <el-col :span="20" class="third-content">
              <template v-if="!bindInfo.chat">
                <p class="txt">您尚未绑定“微信账号”，绑定后您可以直接使用微信快捷方式登录</p>
                <a class="ahref" href="/user/auth/weixinweb" target="_blank">立即绑定</a>
              </template>
              <template v-else>
                <p class="ahref">已绑定账号：{{ bindInfo.chat }}</p>
              </template>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <label class="third-icon third-icon__qq"></label>
            </el-col>
            <el-col :span="20" class="third-content">
              <template v-if="!bindInfo.qq">
                <p class="txt">您尚未绑定“QQ账号”，绑定后您可以直接使用QQ快捷方式登录</p>
                <a class="ahref" href="/user/auth/qq" target="_blank">立即绑定</a>
              </template>
              <template v-else>
                <p class="ahref">已绑定账号：{{ bindInfo.qq }}</p>
              </template>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <label class="third-icon third-icon__weibo"></label>
            </el-col>
            <el-col :span="20" class="third-content">
              <template v-if="!bindInfo.blog">
                <p class="txt">您尚未绑定“微博账号”，绑定后您可以直接使用微博快捷方式登录</p>
                <a class="ahref" href="/user/auth/weibo" target="_blank">立即绑定</a>
              </template>
              <template v-else>
                <p class="ahref">已绑定账号：{{ bindInfo.blog }}</p>
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

  import { mobileRule } from '@/utils/rulesValidator'
  import form from './mixins/form'
  import BindForm from './components/BindForm'

  export default {
    name: 'account-bind',

    mixins: [form],

    components: {
      BindForm,
    },

    data() {
      return {
        emailVisible: false,
        disabled: false,
        userEmailBind: {
          email: null,
          auth_code: null,
        },
        bindInfo: {},
        emailModel: {
          account: 'email',
          code: 'captcha',
        },
        mobileModel: {
          account: 'mobile',
          imgCode: 'img_code',
          code: 'captcha',
        },
        emailRules: {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '邮箱格式有误', trigger: 'blur' },
          ],
          captcha: [
            { required: true, type: 'string', message: '请输入验证码', trigger: 'blur' },
            { type: 'string', len: 4, message: '验证码长度为4个字符', trigger: 'blur' },
          ],
        },
        mobileRules: {
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: mobileRule, message: '手机号码格式有误', trigger: 'blur' },
          ],
          img_code: [
            { required: true, type: 'string', message: '请输入图形验证码', trigger: 'blur' },
          ],
          captcha: [
            { required: true, type: 'string', message: '请输入验证码', trigger: 'blur' },
            { type: 'string', len: 4, message: '验证码长度为4个字符', trigger: 'blur' },
          ],
        },
      }
    },

    methods: {
      getBindInfo() {
        this.$http.get('/user/bind')
          .then((res) => {
            this.updateBindInfo(res.result)
          })
      },

      updateBindInfo(data) {
        this.bindInfo = { ...data }
      },

    },

    created() {
      this.getBindInfo()
    },

  }
</script>
