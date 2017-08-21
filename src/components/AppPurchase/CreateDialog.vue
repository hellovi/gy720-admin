<template>
  <div>
    <el-dialog
      title="生成订单"
      size="small"
      :visible="visible"
      @update:visible="val => $emit('update:visible',val)"
      class="create-dialog"
    >
      <div class="create-dialog__text" v-if="goodsId === 9">
        <span>确定购买<em>2299元/年</em>的商业版会员么？共需支付<em>2299元</em></span>
        <el-button type="text" @click="couponToggle">我有优惠券</el-button>
      </div>

      <div class="create-dialog__text" v-if="goodsId === 10">
        <span>确定购买<em>99元/次</em>的单作品会员么？共需支付<em>99元</em></span>
      </div>

      <!-- 选择优惠券 -->
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        label-position="left"
        :rules="rules"
      >
        <!-- 选择优惠券下拉框 -->
        <el-form-item v-if="hasCoupon" label="输入优惠券" prop="couponSn">
          <el-select v-model="form.couponSn" placeholder="请选择优惠券">
            <el-option
              v-for="(item,key) in coupons"
              :key="key"
              :label="item.label"
              :value="item.value"
            ></el-option>
           </el-select>
        </el-form-item>

        <!-- 是否需要发票 -->
        <el-checkbox v-if="goodsId === 9" v-model="hasBill" @change='billToggle'>需要发票</el-checkbox>

        <!-- 发票信息 -->
        <div v-if="hasBill">
          <el-form-item label="公司抬头：" prop="company">
            <el-input placeholder="不填默认为个人发票" v-model="form.company"></el-input>
          </el-form-item>
           <el-form-item label="邮寄地址：" prop="address">
            <el-input placeholder="请输入收件地址" v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="name">
            <el-input placeholder="请输入联系人姓名" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="电话号码：" prop="tel">
            <el-input placeholder="请输入联系电话" v-model="form.tel"></el-input>
          </el-form-item>
        </div>

        <!-- 选择支付方式 -->
        <el-radio-group v-model="form.payType">
          <el-radio label="alipay">支付宝</el-radio>
          <el-radio label="weixin">微信</el-radio>
        </el-radio-group>

        <div class="text-center">
          <el-button type="primary" @click="createOrder">生成订单</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!-- 确认订单组件 -->
    <confirm-dialog
      :visible.sync="dialog.confirm"
      :orderSn="orderSn"
      :price="price"
    ></confirm-dialog>

  </div>
</template>

<script>
/**
 * 购买vip组件
 *
 * @author zhoumenglin
 * @param {Boolean} visible - 控制组件显示
 * @description 点击关闭按钮时，组件会向外广播一个`close`事件
 * @version 2017-05-31 zml
 */

import ConfirmDialog from './ConfirmDialog'

// 发票信息
const defaultBill = {
  company: '',
  address: '',
  name: '',
  tel: '',
}

export default {

  components: {
    ConfirmDialog,
  },

  props: {
    visible: {
      type: Boolean,
      default: 'false',
    },
    goodsId: {
      type: Number,
      required: 'true',
    },
    panoId: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      form: {
        goodsId: this.goodsId,
        couponSn: '',
        panoId: this.panoId,
        payType: 'alipay',

        ...defaultBill,
      },

      hasCoupon: false,
      hasBill: false,

      dialog: {
        confirm: false,
      },

      price: '',

      orderSn: '',

      rules: {
        couponSn: [
          { validator: this.couponSnCheck, trigger: 'change' },
        ],
        company: [
          { validator: this.billCheck('公司抬头'), trigger: 'blur' },
        ],
        address: [
          { validator: this.billCheck('邮寄地址'), trigger: 'blur' },
        ],
        name: [
          { validator: this.billCheck('联系人'), trigger: 'blur' },
        ],
        tel: [
          { validator: this.billCheck('电话号码'), trigger: 'blur' },
          { validator: this.mobileCheck, trigger: 'blur' },
        ],
      },

      // 模拟优惠券信息
      coupons: [
        {
          label: '商业会员10元抵用券',
          value: '1122334455667788',
        },
        {
          label: '商业会员98元抵用券',
          value: '1111111111111111',
        },
        {
          label: '商业会员6折抵用券(价值920元)',
          value: '2222222222222222',
        },
      ],
    }
  },

  methods: {
    couponSnCheck(rule, value, callback) {
      if (this.hasCoupon) {
        if (value === '') {
          callback(new Error('请输入优惠券'))
        }
        callback()
      }
      callback()
    },

    billCheck(msg) {
      return (rule, value, callback) => {
        if (this.hasBill) {
          if (value === '') {
            callback(new Error(`请输入${msg}`))
          }
          callback()
        }
        callback()
      }
    },

    mobileCheck(rule, value, callback) {
      const reg = /^1\d{10}$/
      if (this.hasBill) {
        if (!reg.test(value)) {
          callback(new Error('手机号格式不正确'))
        }
        callback()
      }
      callback()
    },

    couponToggle() {
      this.form.couponSn = ''
      this.hasCoupon = !this.hasCoupon
    },

    billToggle() {
      this.form = {
        ...this.form,
        ...defaultBill,
      }
    },

    createOrder() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.dialog.confirm = true
          this.$emit('update:visible', false)

          // 等待创建订单借口

          // this.$http.post('/user/pay/createorder', this.form)
          //   .then((res) => {
          //     this.price = res.result.order.order_amount
          //     this.orderSn = res.result.order.order_sn
          //     this.dialog.confirm = true
          //     this.$emit('update:visible', false)
          //   }).catch((error) => {
          //     this.$message.error(`${error.message}`)
          //   })
        }
      })
    },

  },
}
</script>

<style lang="postcss">
@import "vars.css";

.create-dialog {

  &__text {
    font-size: 14px;
    margin-bottom: 15px;

    & em {
      font-style: normal;
      color: var(--color-danger);
      margin: 0 0.2em
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
