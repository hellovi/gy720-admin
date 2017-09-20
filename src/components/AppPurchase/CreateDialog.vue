<template>
  <div>
    <el-dialog
      :title="'我要购买' + (isYearVip ? '（2299元/年）' : '（99元/作品）')"
      size="small"
      :visible="visible"
      @update:visible="val => $emit('update:visible',val)"
      :close-on-click-modal="false"
      custom-class="create-dialog"
    >
      <div class="create-dialog__amount">
        <template v-if="isYearVip">
          <div class="text-center" v-if="">
            <el-row>
              <el-col :span="12">
                总金额：￥{{`${numberPadEnd(2299)}`}}元
              </el-col>
              <el-col :span="12">
                优惠金额：￥{{`${numberPadEnd(200)}`}}元
              </el-col>
            </el-row>
            <h2 class="create-dialog__amount-gross">总金额：<span>￥{{`${numberPadEnd(2299)}`}}元</span></h2>
            （支付完成后，商业版有效期至{{ expireTime }}）
          </div>
        </template>
        <template v-else>
          <div class="text-center">
            <h2 class="create-dialog__amount-gross">总金额：<span>￥{{`${numberPadEnd(99)}`}}元</span></h2>
            （作品名称：{{ panoInfo.name }}）
          </div>
        </template>
      </div>

      <el-form
        ref="form"
        :model="form"
        label-width="160px"
        :rules="rules"
        class="create-dialog__form"
      >
        <!-- 接口返回错误信息 -->
        <app-form-alert :contents="formAlert"></app-form-alert>
        <el-form-item label="支付方式：" required>
          <el-radio-group v-model="form.channel_type">
            <el-radio :label="10">支付宝</el-radio>
            <el-radio :label="20">微信</el-radio>
          </el-radio-group>
        </el-form-item>

        <template v-if="isYearVip">
          <!-- 优惠券 -->
          <el-form-item label="输入优惠券：" prop="coupon_code">
            <el-input placeholder="请输入16位优惠券码" v-model="form.coupon_code"></el-input>
          </el-form-item>
          <!-- 是否需要发票 -->
          <el-form-item label="发票信息：">
            <el-radio-group v-model="form.invoice" @change="invoiceToggle">
              <el-radio :label="0">不需要</el-radio>
              <el-radio :label="1">需要</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 发票信息 -->
          <template v-if="hasInvoice">
            <el-form-item label="公司抬头：" prop="company" required>
              <el-input placeholder="不填默认为个人发票" v-model="form.company"></el-input>
            </el-form-item>
            <el-form-item label="邮寄地址：" prop="address" required>
              <el-input placeholder="请输入收件地址" v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="contact" required>
              <el-input placeholder="请输入联系人姓名" v-model="form.contact"></el-input>
            </el-form-item>
            <el-form-item label="电话号码：" prop="mobile" required>
              <el-input placeholder="请输入联系电话" v-model="form.mobile"></el-input>
            </el-form-item>
          </template>
        </template>
        <template v-else>

        </template>
        <el-form-item>
          <el-button
            type="primary"
            :loading="formLoading"
            @click="createOrder"
            style="width: 110px;"
          >支付款</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 创建订单组件
 *
 * @author zhoumenglin | chenliangshan
 * @param {Boolean} visible.sync - 控制组件显示
 * @param {Number} orderType - 购买种类 10：年会员 20：单作品
 */

import { mapState } from 'vuex'
import AppFormAlert from '@/components/AppFormAlert'
import { mobileRule } from '@/utils/rulesValidator'
import { SERVICE } from '@/store/mutationTypes'

export default {
  name: 'app-purchase-create',

  components: {
    AppFormAlert,
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
    currentWindowOpen: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {
        channel_type: 10,
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
          { validator: mobileRule, trigger: 'blur' },
        ],
      },

      money: '', // 创建后订单的价格
      number: '', // 创建后的订单号
      hashOrderId: '', // 创建后的订单hashid

      formAlert: {}, // 接口返回错误信息
      formLoading: false, // 提交按钮loading
    }
  },

  computed: {
    isYearVip() { // 根据订单类型判断是年会员购买还是单作品购买
      return this.orderType === 10
    },

    hasInvoice() { // 是否需要发票
      return this.form.invoice === 1
    },

    ...mapState({
      panoInfo: state => state.service.buyPanoInfo,
      userInfo: state => state.userInfo,
    }),

    expireTime() {
      const expireTime = this.userInfo.vip_expire_at
      const currentTime = new Date()
      if (!expireTime || new Date(expireTime).getTime() < Date.now()) {
        return `${currentTime.getFullYear() + 1}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`
      }
      const newExpireTime = new Date(expireTime)
      newExpireTime.setFullYear(new Date(expireTime).getFullYear() + 1)
      return `${newExpireTime.getFullYear()}-${newExpireTime.getMonth() + 1}-${newExpireTime.getDate()}`
    },
  },

  methods: {
    numberPadEnd(num, units = 2) {
      let str = num.toString()
      let rs = str.indexOf('.')
      if (rs < 0) {
        str += '.'
        rs = str.length
      }
      while (str.length < rs + units) {
        str += '0'
      }
      return str
    },

    couponSnCheck(rule, value, callback) { // 优惠券自定义验证
      const reg = /^\w{16}$/
      if (value && !reg.test(value)) {
        callback(new Error('请输入16位的优惠券码'))
      }
      callback()
    },

    invoiceCheck(msg) { // 发票信息自定义验证
      return (rule, value, callback) => {
        if (this.hasInvoice) {
          if (!value) {
            callback(new Error(`请输入${msg}`))
          }
          callback()
        }
        callback()
      }
    },

    couponToggle() {
      this.hasCoupon = !this.hasCoupon
      this.form.coupon_code = ''
    },

    invoiceToggle() {
      this.form = {
        ...this.form,
        company: null,
        address: null,
        contact: null,
        mobile: null,
      }
    },

    createOrder() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formAlert = {}
          this.formLoading = true

          this.$http.post('/user/order/store', {
            ...this.form,
            order_type: this.orderType,
            panorama_id: this.panoInfo.id || '',
          })
            .then(({ result }) => {
              this.$store.commit(SERVICE.MODAL.SETORDERINFO, result)
              this.formLoading = false
              this.$emit('update:visible', false)
              // TODO 跳转支付方式（微信弹窗|支付新打开标签窗口）
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

  &__form {

  }

  &__amount {
    padding-bottom: 22px;
    &-gross {
      font-size: 20px;
      > span {
        color: #f30e0e;
      }
    }

  }

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
}
</style>
