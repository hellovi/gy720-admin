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
          <p>10个以上精品</p>
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

      <el-form
        label-position="left"
        v-show="type===10"
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
        <el-form-item label="身份证扫描件："></el-form-item>
        <el-form-item prop="accept">
          <el-checkbox :true-label="1" :false-label="0" v-model="formPerson.accept">我同意《光鱼摄影师认证服务协议》</el-checkbox>
        </el-form-item>
      </el-form>

      <el-form
        label-position="left"
        v-show="type===20"
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
        <el-form-item label="营业执照扫描件:"></el-form-item>
        <el-form-item prop="accept">
          <el-checkbox :true-label="1" :false-label="0" v-model="formCompany.accept">我同意《光鱼摄影师认证服务协议》</el-checkbox>
        </el-form-item>
      </el-form>

      <div>{{note}}</div>
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

export default {
  name: 'certifate-apply',

  props: {
    certInfo: {
      type: Object,
      required: 'true',
    },
  },

  data() {
    return {
      type: 10, // 认证类型

      note: '', // 认证错误信息

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
      },
    }
  },

  computed: {
    form() { // 最终提交的表单
      return {
        ...(this.type === 10 ? this.formPerson : this.formCompany),
        certificate_type: this.type,
      }
    },

    canSubmit() { // 是否可点击提交按钮
      const { condition } = this.certInfo
      return !(condition.panoramas && condition.popular && condition.is_complete)
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

    beforeSubmit() {
      const formName = this.type === 10 ? 'formPerson' : 'formCompany'

      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        }
      })
    },
  },

  created() {
    const { certificate } = this.certInfo
    if (certificate) {
      this.type = certificate.certificate_type
      this.note = certificate.note
      if (this.type === 10) {
        this.formPerson = certificate
      } else {
        this.formCompany = certificate
      }
    }
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

  .el-form-item__label {
    width: 115px;
  }

  .el-form-item__error {
    margin-left: 115px;
  }

  &__submit {
    width: 138px;
    margin-top: 18px
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
