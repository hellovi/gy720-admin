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
      <el-radio-group v-model="type">
        <el-radio :label="10">个人认证</el-radio>
        <el-radio :label="20">企业认证</el-radio>
      </el-radio-group>
    </h3>

    <div class="cert-apply__body">
      <h5>申请条件：</h5>
      <ul class="cert-apply__term list clearfix">
        <li>
          <i class="iconfont">&#xe684;</i>
          <p>10个以上作品</p>
          <el-button v-if="certInfo.condition.panoramas" type="primary" size="small" disabled>已符合</el-button>
          <el-button v-else type="primary" size="small">努力中</el-button>
        </li>
        <li>
          <i class="iconfont">&#xe682;</i>
          <p>总人气超过2000</p>
          <el-button v-if="certInfo.condition.popular"  type="primary" size="small" disabled>已符合</el-button>
          <el-button v-else type="primary" size="small">努力中</el-button>
        </li>
        <li>
          <i class="iconfont">&#xe681;</i>
          <p>完善摄影师资料</p>
          <el-button v-if="certInfo.condition.is_complete"  type="primary" size="small" disabled>已符合</el-button>
          <el-button v-else type="primary" size="small" @click="goTo('/user-client/account')">去完善</el-button>
        </li>
      </ul>

      <div class="cert-apply__error">
        <app-form-alert :contents="formAlert"></app-form-alert>
      </div>

      <el-form
        label-position="left"
        v-show="isPerson"
        ref="formPerson"
        :model="formPerson"
        :rules="rulesPerson"
      >
        <el-form-item label="真实姓名：" prop="name">
          <el-input v-model="formPerson.name" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" prop="number">
          <el-input v-model="formPerson.number" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="身份证扫描件：" prop="front" required>

          <cert-upload
            :width="156"
            :scale="1.56"
            background="front.jpg"
            v-model="formPerson.front"
          ></cert-upload>

          <cert-upload
            :width="156"
            :scale="1.56"
            background="back.jpg"
            v-model="formPerson.back"
          ></cert-upload>

        </el-form-item>
        <el-form-item class="accept-item" prop="accept">
          <el-checkbox
            :true-label="1"
            :false-label="0"
            v-model="formPerson.accept"
          >我同意<el-button type="text">《光鱼摄影师认证服务协议》</el-button>
          </el-checkbox>
        </el-form-item>
        <p v-if="note.person !== ''">
          审核未通过原因：
          <span class="text-danger">{{note.person}}</span>
        </p>
      </el-form>

      <el-form
        label-position="left"
        v-show="!isPerson"
        ref="formCompany"
        :model="formCompany"
        :rules="rulesCompany"
      >
        <el-form-item label="企业名称：" prop="name">
          <el-input v-model="formCompany.name" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="营业执照号：" prop="number">
          <el-input v-model="formCompany.number" placeholder="请输入营业执照号"></el-input>
        </el-form-item>
        <el-form-item label="营业执照扫描件:" prop="front">
          <cert-upload
            :width="210"
            :scale="0.7"
            background="license.jpg"
            v-model="formCompany.front"
          ></cert-upload>
        </el-form-item>
        <el-form-item class="accept-item" prop="accept">
          <el-checkbox
            :true-label="1"
            :false-label="0"
            v-model="formCompany.accept"
          >我同意<el-button type="text">《光鱼摄影师认证服务协议》</el-button>
          </el-checkbox>
        </el-form-item>
        <p v-if="note.company !== ''">
          审核未通过原因：
          <span class="text-danger">{{note.company}}</span>
        </p>
      </el-form>

      <el-button type="primary" size="large" class="cert-apply__submit" :disabled="!canSubmit" @click="beforeSubmit">立即申请</el-button>

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

import { CERTIFICATE } from '@/store/mutationTypes'
import AppFormAlert from '@/components/AppFormAlert'
import CertUpload from './components/CertUpload'

export default {
  name: 'certifate-apply',

  components: {
    AppFormAlert,
    CertUpload,
  },

  props: {
    certInfo: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      id: 0, // 认证id（已认证过的）

      type: 10, // 认证类型

      note: { // 审核错误信息
        person: '',
        company: '',
      },

      formAlert: {}, // 接口返回错误信息

      formLoading: false, // 提交按钮Loading

      formPerson: { // 个人认证表单
        name: '',
        number: '',
        front: '',
        back: '',
        accept: 0,
      },

      formCompany: { // 企业认证表单
        name: '',
        number: '',
        front: '',
        accept: 0,
      },

      rulesPerson: { // 个人认证表单验证规则
        name: [
          { required: true, message: '真实姓名不能为空', trigger: 'blur' },
        ],
        number: [
          { required: true, message: '身份证号不能为空', trigger: 'blur' },
          { validator: this.idCheck, trigger: 'blur' },
        ],
        accept: [
          { validator: this.acceptCheck, trigger: 'blur' },
        ],
        front: [
          { validator: this.personImgCheck, trigger: 'blur' },
        ],
      },

      rulesCompany: { // 企业认证表单验证规则
        name: [
          { required: true, message: '企业名称不能为空', trigger: 'blur' },
        ],
        number: [
          { required: true, message: '业执照号不能为空', trigger: 'blur' },
        ],
        accept: [
          { validator: this.acceptCheck, trigger: 'blur' },
        ],
        front: [
          { required: true, message: '请上传营业执照扫描件', trigger: 'blur' },
        ],
      },
    }
  },

  computed: {
    isPerson() { // 是否是个人认证，反之是企业认证
      return this.type === 10
    },

    isPatch() { // 是新建还是修改
      const { certificate } = this.certInfo
      return !!certificate
    },

    form() { // 最终提交的表单
      return {
        ...(this.isPerson ? this.formPerson : this.formCompany),
        certificate_type: this.type,
      }
    },

    canSubmit() { // 是否可点击提交按钮
      const { condition } = this.certInfo
      return condition.panoramas && condition.popular && condition.is_complete
    },
  },

  methods: {
    goTo(url) {
      this.$router.push(url)
    },

    idCheck(rule, value, callback) {
      const reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
      if (!reg.test(value)) {
        callback(new Error('身份证格式不正确'))
      }
      callback()
    },

    acceptCheck(rule, value, callback) {
      if (value === 0) {
        callback(new Error('请仔细阅读并同意该协议'))
      }
      callback()
    },

    personImgCheck(rule, value, callback) {
      if (this.formPerson.front === '' || this.formPerson.back === '') {
        callback(new Error('请上传身份证正反面扫描件'))
      }
      callback()
    },

    beforeSubmit() {
      const formName = this.isPerson ? 'formPerson' : 'formCompany'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formAlert = {}
          this.formLoading = true
          this.submit()
        }
      })
    },

    submit() {
      if (this.isPatch) {
        this.$http.patch('/user/certification', {
          ...this.form,
          id: this.id,
        })
          .then(() => { this.successHandler() })
          .catch((errors) => { this.errorHandler(errors) })
      } else {
        this.$http.post('/user/certification', this.form)
          .then(() => { this.successHandler() })
          .catch((errors) => { this.errorHandler(errors) })
      }
    },

    successHandler() {
      this.$store.dispatch(CERTIFICATE.INIT)
        .then(() => {
          this.goTo('/user-client/certificate/result')
        })
    },

    errorHandler(errors) {
      this.formAlert = errors
      this.formLoading = false
    },

    mergeForm() {
      const { certificate } = this.certInfo
      if (this.isPatch) {
        this.type = certificate.certificate_type
        this.id = certificate.id
        if (this.type === 10) {
          this.formPerson = certificate
          this.note.person = certificate.note
        } else {
          this.formCompany = certificate
          this.note.company = certificate.note
        }
      }
    },
  },

  created() {
    this.mergeForm()
  },

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
      font-weight: normal;
    }
  }

  .el-input {
    width: 210px;
  }

  .el-form-item {
    &__label {
      width: 130px;
      padding-right:0;
    }

    &__error {
      margin-left: 130px;
    }

    &.accept-item .el-form-item__error {
      margin-left: 0;
    }
  }

  &__submit {
    width: 138px;
    margin-top: 18px;
  }

  &__error {
    width: 325px;

    .app-alert {
      padding-bottom: 22px;
    }
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

    & .el-radio {
      margin-left: 50px;
    }
  }
}
</style>
