<template>
  <div>
    <el-button
      @click="bindEmailStatus"
      v-if="!visible"
    >立即绑定</el-button>
    <el-form
      class="email-bind"
      :ref="formRef"
      :rules="rules"
      :model="bindForm"
      v-else
    >
      <app-form-alert
        :contents="formAlert"
      ></app-form-alert>
      <el-form-item :prop="formModel.account">
        <el-input
          :placeholder="`请输入${placeholder.account}`"
          v-model="bindForm[formModel.account]"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="formModel.imgCode" prop="img_code">
        <el-row>
          <el-col :span="10">
            <el-input
              :style="{paddingRight: '10px'}"
              placeholder="图片验证码"
              v-model="bindForm[formModel.imgCode]"
            ></el-input>
          </el-col>
          <el-col :span="8" class="bind-phone__img-code">
            <img :src="`/captcha/default?${random}`" @click="updateImgCode">
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item :prop="formModel.code">
        <el-row>
          <el-col :span="10">
            <el-input
              :style="{paddingRight: '10px'}"
              placeholder="验证码"
              v-model="bindForm[formModel.code]"
            ></el-input>
          </el-col>
          <el-col :span="8">
            <timer-btn
              @click.native="codeSend"
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
  </div>
</template>

<script>
  /**
   * 账号绑定表单
   * @author chenliangshan
   * @version 2017/08/29
   */

  import AppFormAlert from '@/components/AppFormAlert'
  import TimerBtn from './TimerBtn'
  import form from '../mixins/form'

  export default {
    name: 'bind-form',

    mixins: [form],

    components: {
      AppFormAlert,
      TimerBtn,
    },

    props: {
      rules: {
        type: Object,
        default: () => ({}),
      },

      formModel: {
        type: Object,
        default: () => ({}),
      },

      sendUrl: {
        type: String,
        default: '',
      },

      subUrl: {
        type: String,
        default: '',
      },

      placeholder: {
        type: Object,
        default: () => ({}),
      },

    },

    data: () => ({
      visible: false,
      bindForm: {},
      disabled: false,
      random: '',
    }),

    methods: {
      // 发送邮箱
      codeSend() {
        if (!this.validFields([this.formModel.account, this.formModel.imgCode]).join().includes('true')) {
          this.disabled = true
          this.$http.post(this.sendUrl, this.bindForm)
            .then(() => {
              this.sended()
              this.$message.success('验证码发送成功，请查收！')
            })
            .catch((errors) => {
              this.disabled = false
              this.errorHandler(errors)
            })
        }
      },

      // 校验表单字段
      validFields(fields) {
        // eslint-disable-next-line
        let arr = []
        fields.forEach((name) => {
          if (name) {
            this.$refs[this.formRef].validateField(name, (inValid) => {
              if (inValid) {
                arr.push(true)
              } else {
                arr.push(false)
              }
            })
          } else {
            arr.push(false)
          }
        })
        return arr
      },

      // 发送倒计时
      sended() {
        this.$refs.timerBtn.run()
        this.disabled = false
      },

      bindEmailStatus(status = true) {
        this.visible = status
        if (!status) {
          // 清除错误信息
          this.formAlert = {}

          // 重置绑定表单
          this.$refs[this.formRef].resetFields()
        }
      },

      // 提交绑定
      submitForm() {
        this.$http.post(this.subUrl, this.bindForm)
          .then((res) => {
            this.$message.success(`${this.placeholder.account}绑定成功！`)
            this.$emit('bind-success', res.result)
          })
          .catch((errors) => {
            this.errorHandler(errors)
          })
      },

      // 更新图片验证码
      updateImgCode() {
        this.random = `${Math.random().toString(36).substring(3, 13)}`
      },

    },

  }
</script>

<style lang="postcss" scoped>
  .bind-phone {
    &__img-code {
      height: 36px;
      img {
        cursor: pointer;
      }
     }
  }
</style>
