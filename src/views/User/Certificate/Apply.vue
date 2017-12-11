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
      <ul class="cert-apply__term list clearfix" v-if="certInfo.condition">
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
          >我同意<el-button type="text" @click.stop="showProtocol">《光鱼摄影师认证服务协议》</el-button>
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
          >我同意<el-button type="text" @click.stop="showProtocol">《光鱼摄影师认证服务协议》</el-button>
          </el-checkbox>
        </el-form-item>
        <p v-if="note.company !== ''">
          审核未通过原因：
          <span class="text-danger">{{note.company}}</span>
        </p>
      </el-form>

      <el-button type="primary" size="large" class="cert-apply__submit" :disabled="!canSubmit" @click="beforeSubmit">立即申请</el-button>

    </div>
    <el-dialog
      v-model="protocolDialog"
      title="光鱼摄影师认证服务协议"
      size="large"
    >
      <div>
        <p>
          尊敬的用户，欢迎使用由厦门光鱼信息科技有限公司（下列简称为“光鱼全景”或“光鱼官网”）提供的服务。在使用前请您阅读如下服务协议，使用本应用即表示您同意接受本协议，本协议产生法律效力，特别涉及免除或者限制光鱼责任的条款，请仔细阅读。如有任何问题，可向光鱼官网咨询。
        </p>
        <p> <strong>1.服务条款的确认和接受</strong>
        </p>
        <p>通过访问和使用本网站，用户表示同意接受本协议的所有条件和条款。</p>
        <p> <strong>2.服务条款的变更和修改</strong>
        </p>
        <p>
          光鱼全景有权在必要时修改服务条款，服务条款一旦发生变动，将会在用户中心提示修改内容。如果不同意所改动的内容，用户可以放弃获得的本网站信息服务。如果用户继续享用本网站信息服务，则视为接受服务条款的变动。本网站保留随时修改或中断服务而不需通知用户的权利。本网站行使修改或中断服务的权利，不需对用户或第三方负责。
        </p>
        <p>
          <strong>3.用户行为</strong>
        </p>
        <p>3.1用户账号、密码和安全</p>
        <p>
          用户一旦注册成功，便成为光鱼官网的合法用户，将得到一个密码和帐号。同时，此账号密码可登陆光鱼官网的所有网页和APP。因此用户应采取合理措施维护其密码和帐号的安全。用户对利用该密码和帐号所进行的一切活动负全部责任；由该等活动所导致的任何损失或损害由用户承担，光鱼官网不承担任何责任。
        </p>
        <p>
          用户的密码和帐号遭到未授权的使用或发生其他任何安全问题，用户可以立即通知光鱼官网，并且用户在每次连线结束，应结束帐号使用，否则用户可能得不到光鱼官网的安全保护。对于用户长时间未使用的帐号，光鱼官网有权予以关闭并注销其内容。
        </p>
        <p>3.2账号注册时的禁止行为</p>
        <p>· 请勿以党和国家领导人或其他社会名人的真实姓名、字号、艺名、笔名注册；</p>
        <p>· 冒充任何人或机构，或以虚伪不实的方式谎称或使人误认为与任何人或任何机构有关的名称；</p>
        <p>· 请勿注册和其他网友之名相近、相仿的名字；</p>
        <p>· 请勿注册不文明、不健康名字，或包含歧视、侮辱、猥亵类词语的名字；</p>
        <p>· 请勿注册易产生歧义、引起他人误解的名字</p>
        <p>3.3．用户在本应用上不得发布下列违法信息和照片：</p>
        <p>· 反对宪法所确定的基本原则的；</p>
        <p>· 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>
        <p>· 损害国家荣誉和利益的；</p>
        <p>· 煽动民族仇恨、民族歧视，破坏民族团结的；</p>
        <p>· 破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
        <p>· 散布谣言，扰乱社会秩序，破坏社会稳定的；</p>
        <p>· 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>
        <p>· 侮辱或者诽谤他人，侵害他人合法权益的；</p>
        <p>· 含有法律、行政法规禁止的其他内容的；</p>
        <p>· 禁止骚扰、毁谤、威胁、仿冒网站其他用户；</p>
        <p>· 严禁煽动非法集会、结社、游行、示威、聚众扰乱社会秩序；</p>
        <p>· 严禁发布可能会妨害第三方权益的文件或者信息，例如（包括但不限于）：病毒代码、黑客程序、软件破解注册信息。</p>
        <p>· 禁止上传他人作品。其中包括你从互联网上下载、截图或收集的他人的作品；</p>
        <p>· 禁止上传广告、横幅、标志等网络图片；</p>
        <p>
          <strong>4.上传或发布的内容</strong>
        </p>
        <p>
          用户上传的内容是指用户在光鱼官网上传或发布的视频或其它任何形式的内容包括文字、图片、音频等。除非光鱼全景收到相关通知，光鱼全景将用户视为其在本应用上载或发布的内容的版权拥有人。作为内容的发表者，需自行对所发表内容负责，因所发表内容引发的一切纠纷，由该内容的发表者承担全部法律及连带责任。光鱼全景不承担任何法律及连带责任。
        </p>
        <p>
          对于经由本应用而传送的内容，光鱼不保证前述其合法性、正当性、准确性、完整性或品质。用户在使用本应用时，有可能会接触到令人不快、不适当或令人厌恶的内容。在任何情况下，光鱼全景均不对任何内容承担任何责任，包括但不限于任何内容发生任何错误或纰漏以及衍生的任何损失或损害。光鱼全景有权（但无义务）自行拒绝或删除经由本应用提供的任何内容。
        </p>
        <p>
          个人或单位如认为光鱼全景平台上存在侵犯自身合法权益的内容，应准备好具有法律效应的证明材料，及时与光鱼全景取得联系，以便光鱼全景公司迅速作出处理。
        </p>
        <p>隐私条款</p>
        <p>1.用户信息公开情况说明</p>
        <p>
          尊重用户个人隐私是光鱼全景的一项基本政策。所以，光鱼全景不会在未经合法用户授权时公开、编辑或透露其注册资料及保存在本应用中的非公开内容，除非有下列情况：
        </p>
        <p>· 有关法律规定或光鱼全景合法服务程序规定。</p>
        <p>· 在紧急情况下，为维护用户及公众的权益。</p>
        <p>· 为维护光鱼全景的商标权、专利权及其他任何合法权益。</p>
        <p>· 其他需要公开、编辑或透露个人信息的情况。</p>
        <p>在以下（包括但不限于）几种情况下，光鱼全景有权使用用户的个人信息：</p>
        <p>
          · 在进行促销或抽奖时，光鱼全景可能会与赞助商共享用户的个人信息，在这些情况下光鱼会在发送用户信息之前进行提示，并且用户可以通过不参与来终止传送过程；
        </p>
        <p>· 光鱼官网可以将用户信息与第三方数据匹配。</p>
        <p>· 光鱼全景会通过透露合计用户统计数据，向未来的合作伙伴、广告商及其他第三方以及为了其他合法目的而描述光鱼全景的服务；</p>
        <p>2.隐私权政策适用范围</p>
        <p>· 用户在登录本网站服务器时留下的个人身份信息。</p>
        <p>· 用户通过本网站服务器与其他用户或非用户之间传送的各种资讯。</p>
        <p>· 本站与商业伙伴共享的其他用户或非用户的各种信息。</p>
        <p>3.资讯公开与共享</p>
        <p>光鱼全景不会将用户的个人信息和资讯故意透露、出租或出售给任何第三方。但以下情况除外：</p>
        <p>· 用户本人同意与第三方共享信息和资讯;</p>
        <p>· 只有透露用户的个人信息和资讯，才能提供用户所要求的某种产品和服务;</p>
        <p>
          · 应代表本应用提供产品或服务的主体的要求提供（除非我们另行通知，否则该等主体无权将相关用户个人信息和资讯用于提供产品和服务之外的其他用途）：根据法律法规或行政命令的要求提供；因外部审计需要而提供；用户违反了本应用服务条款或任何其他产品及服务的使用规定；经光鱼评估，用户的帐户存在风险，需要加以保护。
        </p>
        <p>4.Cookies、日志档案和webbeacon</p>
        <p>
          通过使用cookies，本应用向用户提供简单易行并富个性化的网络体验。cookies能帮助我们确定用户连接的页面和内容，并将该等信息储存。我们使用自己的cookies和webbeacon，用于以下用途：
        </p>
        <p>
          · 记住用户身份。例如：cookies和webbeacon有助于我们辨认用户作为我们的注册用户的身份，或保存用户向我们提供有关用户的喜好或其他信息；
        </p>
        <p>
          · 分析用户使用我们服务的情况。我们可利用cookies和webbeacon来了解用户使用我们的服务进行什么活动、或哪些网页或服务最受欢迎；我们为上述目的使用cookies和webbeacon的同时，可能将通过cookies和webbeacon收集的非个人身份信息汇总提供给广告商和其他伙伴，用于分析您和其他用户如何使用我们的服务并用于广告服务。用户可以通过浏览器或用户选择机制拒绝或管理cookies或webbeacon。但请用户注意，如果用户停用cookies或webbeacon，我们有可能无法为您提供最佳的服务体验，某些服务也可能无法正常使用。
        </p>
        <p>
          · 当你使用本站的服务时，我们的主机会自动记录用户的浏览器在访问网站时所发送的信息和资讯。主机日志资讯包括但不限于用户的网路请求、IP地址、浏览器类型、浏览器使用的语言、请求的日期和时间，以及一个或多个可以对用户的浏览器进行辨识的cookie。
        </p>
        <p>
          <strong>5.账户删除申请</strong>
        </p>
        <p>
          用户有权在任何时候编辑用户在光鱼全景平台的帐户信息和资讯，用户也可以填写相关申请表格，要求删除个人帐户，但是用户无条件同意在你的帐户删除后，该帐户内及与该帐户相关的信息和资讯仍然保留在本网站档案记录中，除上述第三条规定的情况外，光鱼全景将为用户保密。
        </p>
        <p>免责声明</p>
        <p>
          厦门光鱼信息科技有限公司对于任何从光鱼全景平台下面应用而获得的他人的信息、内容或者广告宣传等任何资讯（以下统称“信息”），不保证其真实性、准确性和完整性。如果任何单位或者个人通过上述“信息”而进行任何行为，须自行甄别真伪和谨慎预防风险。否则，无论何种原因，光鱼不对任何非与光鱼直接发生的交易或行为承担任何直接、间接、附带或衍生的损失和责任。
        </p>
        <p>光鱼不保证（包括但不限于）下列情况不发生：</p>
        <p>1.光鱼适合用户的使用要求；</p>
        <p>2.光鱼不受干扰，及时、安全、可靠或不出现错误；</p>
        <p>3.用户经由光鱼取得的任何产品、服务或其他材料符合用户的期望;</p>
        <p>4.用户使用经由光鱼下载的或取得的任何资料，其风险自行负担；因而使用导致用户电脑系统损坏或资料流失，用户应负完全责任；</p>
        <p>
          5.基于以下原因而造成的利润、商业信誉、资料损失或其他有形或无形损失，光鱼不承担任何直接、间接、附带、衍生或惩罚性的赔偿：
        </p>
        <p>· 本应用使用或无法使用；</p>
        <p>· 用户资料遭到未授权的使用或修改；</p>
        <p>· 其他与本应用相关的事宜。</p>
        <p>
          6.光鱼用户之间通过本应用相识、交往中所发生或可能发生的任何心理、生理上的伤害和经济上的损失，光鱼不承担任何直接、间接或附带的责任。
        </p>
        <p>7.光鱼平台用户因为违反光鱼规定而触犯中华人民共和国法律的，责任自负，光鱼不承担任何责任。</p>
        <p>
          8.用户在浏览互联网时自行判断使用光鱼的搜索或检索目录。因网络攻击、黑客攻击、病毒感染等原因将导致网站运行异常、信息泄露、数据丢失或其他问题引导用户进入到被认为具有攻击性或不适当的网站，光鱼全景没有义务承担风险。
        </p>
        <p>
          9.用户在使用光鱼全景平台期间可能需第三方软件或服务支持，可能因第三方原因导致通讯线路故障、技术问题、网络中断、终端故障、系统不稳定或其他突发状况，光鱼不保证第三方服务之安全性、准确性、有效性及其他不确定的风险。由此若引发的任何争议及损害，光鱼全景不承担任何责任。
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 摄影师认证 - 认证
 *
 * @author zhoumenglin | chenliangshan
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
      default() {
        return {
          condition: {
            panoramas: false,
            popular: false,
            is_complete: false,
          },
        }
      },
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

      protocolDialog: false,
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
      return condition && condition.panoramas && condition.popular && condition.is_complete
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

    showProtocol() {
      this.protocolDialog = true
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
