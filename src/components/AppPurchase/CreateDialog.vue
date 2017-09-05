<template>
  <div>
    <el-dialog
      title="生成订单"
      size="small"
      :visible="visible"
      @update:visible="val => $emit('update:visible',val)"
      class="create-dialog"
    >
      <p class="create-dialog__text" v-if="isYearVip">
        <span>确定购买<em>2299元/年</em>的商业版会员么？共需支付<em>2299元</em></span>
        <el-button type="text" @click="couponToggle">我有优惠券</el-button>
      </p>

      <p class="create-dialog__text create-dialog__text--pano" v-else>
        <span>确定购买<em>99元/次</em>的单作品会员么？共需支付<em>99元</em></span>
      </p>

      <!-- 选择优惠券 -->
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        label-position="left"
        :rules="rules"
      >
        <!-- 接口返回错误信息 -->
        <app-form-alert :contents="formAlert"></app-form-alert>

        <!-- 优惠券 -->
        <el-form-item v-if="hasCoupon" label="输入优惠券：" prop="coupon_code">
          <el-input placeholder="请输入16位优惠券码" v-model="form.coupon_code"></el-input>
        </el-form-item>

        <!-- 是否需要发票 -->
        <el-checkbox
          v-if="isYearVip"
          :true-label="1"
          :false-label="0"
          v-model="form.invoice"
          @click='invoiceToggle'
        >需要发票</el-checkbox>

        <!-- 发票信息 -->
        <div v-if="hasInvoice">
          <el-form-item label="公司抬头：" prop="company">
            <el-input placeholder="不填默认为个人发票" v-model="form.company"></el-input>
          </el-form-item>
          <el-form-item label="邮寄地址：" prop="address">
            <el-input placeholder="请输入收件地址" v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="contact">
            <el-input placeholder="请输入联系人姓名" v-model="form.contact"></el-input>
          </el-form-item>
          <el-form-item label="电话号码：" prop="mobile">
            <el-input placeholder="请输入联系电话" v-model="form.mobile"></el-input>
          </el-form-item>
        </div>

        <div class="text-center">
          <el-button
            type="primary"
            :loading="formLoading"
            @click="createOrder"
          >生成订单</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!-- 确认订单组件 -->
    <confirm-dialog
      :visible.sync="dialog.confirm"
      :is-year-vip="isYearVip"
      :hash-order-id="hashOrderId"
      :number="number"
      :money="money"
      @panoBuySuccess="panoBuySuccess"
      :current-window-open="currentWindowOpen"
    ></confirm-dialog>

  </div>
</template>

<script>
/**
 * 创建订单组件
 *
 * @author zhoumenglin
 * @param {Boolean} visible.sync - 控制组件显示
 * @param {Number|String} panoramaId - 作品id
 * @param {Number} orderType - 购买种类 10：年会员 20：单作品
 * @callback panoBuySuccess - 购买单作品完成的回调
 */

import AppFormAlert from '@/components/AppFormAlert'
import ConfirmDialog from './ConfirmDialog'

export default {
  name: 'app-purchase-create',

  components: {
    AppFormAlert,
    ConfirmDialog,
  },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    orderType: {
      type: Number,
      required: true,
    },
    panoramaId: {
      type: [Number, String],
      default: null,
    },
    currentWindowOpen: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {
        order_type: 10, // 购买类型 10:年费 20:单个作品
        coupon_code: '', // 优惠券 （年费版）
        invoice: 0, // 是否需要发票 （年费版）
        company: '', // 公司 （年费版）
        address: '', // 地址 （年费版）
        contact: '', // 联系人 （年费版）
        mobile: '', // 联系方式 （年费版）
        panorama_id: '', // 作品id （单作品）
      },

      hasCoupon: false, // 是否有优惠券

      rules: { // 表单验证规则
        coupon_code: [
          { validator: this.couponSnCheck, trigger: 'blur' },
        ],
        company: [
          { validator: this.invoiceCheck('公司抬头'), trigger: 'blur' },
        ],
        address: [
          { validator: this.invoiceCheck('邮寄地址'), trigger: 'blur' },
        ],
        contact: [
          { validator: this.invoiceCheck('联系人'), trigger: 'blur' },
        ],
        mobile: [
          { validator: this.invoiceCheck('电话号码'), trigger: 'blur' },
          { validator: this.mobileCheck, trigger: 'blur' },
        ],
      },

      money: '', // 创建后订单的价格
      number: '', // 创建后的订单号
      hashOrderId: '', // 创建后的订单hashid

      formAlert: {}, // 接口返回错误信息
      formLoading: false, // 提交按钮loading

      dialog: { // 确认订单弹窗控制
        confirm: false,
      },
    }
  },

  computed: {
    isYearVip() { // 根据订单类型判断是年会员购买还是单作品购买
      return this.orderType === 10
    },

    hasInvoice() { // 是否需要发票
      return this.form.invoice === 1
    },
  },

  methods: {
    couponSnCheck(rule, value, callback) { // 优惠券自定义验证
      const reg = /^\w{16}$/
      if (this.hasCoupon) {
        if (!reg.test(value)) {
          callback(new Error('请输入16位的优惠券码'))
        }
        callback()
      }
      callback()
    },

    invoiceCheck(msg) { // 发票信息自定义验证
      return (rule, value, callback) => {
        if (this.hasInvoice) {
          if (value === '') {
            callback(new Error(`请输入${msg}`))
          }
          callback()
        }
        callback()
      }
    },

    mobileCheck(rule, value, callback) { // 联系方式自定义验证
      const reg = /^1\d{10}$/
      if (this.hasInvoice) {
        if (!reg.test(value)) {
          callback(new Error('手机号格式不正确'))
        }
        callback()
      }
      callback()
    },

    couponToggle() {
      this.hasCoupon = !this.hasCoupon
      this.form.coupon_code = ''
    },

    invoiceToggle() {
      if (this.hasInvoice) {
        this.form.invoice = 0
      } else {
        this.form.invoice = 1
      }
      this.form.company = ''
      this.form.address = ''
      this.form.contact = ''
      this.form.mobile = ''
    },

    createOrder() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formAlert = {}
          this.formLoading = true

          this.$http.post('/user/order/store', {
            ...this.form,
            order_type: this.orderType,
            panorama_id: this.panoramaId,
          })
            .then(({ result }) => {
              this.hashOrderId = result.hash_order_id
              this.number = result.number
              this.money = result.money

              this.formLoading = false
              this.dialog.confirm = true
              this.$emit('update:visible', false)
            })
            .catch((errors) => {
              this.formAlert = errors
              this.formLoading = false
            })
        }
      })
    },

    panoBuySuccess() {
      this.$emit('panoBuySuccess')
    },

  },
}
</script>

<style lang="postcss">
@import "vars.css";

.create-dialog {

  &__text {
    margin: 0;
    font-size: 14px;
    margin-bottom: 22px;

    & em {
      font-style: normal;
      color: var(--color-danger);
      margin: 0 0.2em
    }

    &--pano {
      text-align: center;
      margin-bottom: 25px;
    }

    .el-button {
      padding: 0;
    }
  }

  .el-dialog__body{
    padding: 30px 76px;
  }

  .el-select,.el-radio-group{
    display: block;
  }

  .el-checkbox,.el-radio-group{
    margin-bottom: 20px;
  }
}
</style>
