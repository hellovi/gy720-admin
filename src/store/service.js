import { Http } from '@/utils'
import { SERVICE } from './mutationTypes'

const initActive = () => ({
  buyInfo: false, // 购买说明
  buyFees: false, // 购买年费
  buySingle: false, // 单品购买
  isRenew: false, // 是否续费操作
  weixinPay: false, // 微信支付
  alipay: false, // 支付宝
  confirmPay: false, // 支付完成询问框
})

// 自定义事件，用于SERVICE.MODAL.SETPANOINFO中
const completePay = document.createEvent('Event')
completePay.initEvent('completePay', false, true)

export default {
  state: {
    buyType: 10, // 10：年会  20：作品
    remain: 0, // 单作品剩下可购买次数
    isRender: false,
    buyPanoInfo: {},
    orderInfo: {}, // 订单信息
    active: initActive(),
  },

  mutations: {
    [SERVICE.MODAL.INIT](state, status) {
      state.isRender = status
    },

    [SERVICE.MODAL.OPEN](state, type) {
      if (!state.isRender) {
        state.isRender = true
      }

      if (type === 'buyInfo') {
        // 获取单作品可购买剩下次数
        Http.get('/user/pano/remainpay')
          .then(({ result }) => {
            state.remain = result.remain
          })
      }

      state.active[type] = true
    },

    [SERVICE.MODAL.CLOSE](state, type) {
      state.active[type] = false
    },

    [SERVICE.MODAL.SETPANOINFO](state, { hash_pano_id = null, name = null }) {
      state.buyPanoInfo = { hash_pano_id, name }
    },

    [SERVICE.MODAL.RESETPANOINFO](state, info = {}) {
      state.buyPanoInfo = { ...info }
    },

    [SERVICE.MODAL.BUYTYPE](state, type = 10) {
      state.buyType = type
    },

    [SERVICE.MODAL.RESET](state) {
      state.active = { ...initActive() }
    },

    [SERVICE.MODAL.CREATEORDER](state, info = {}) {
      state.orderInfo = { ...info }
    },

    [SERVICE.MODAL.COMPLETEPAY](state, info = {}) {
      state.orderInfo = { ...state.orderInfo, ...info }
      window.dispatchEvent(completePay)
    },
  },

  actions: {
    [SERVICE.MODAL.CALLBACK]({ commit, state }, panoInfo = {}) {
      commit(SERVICE.MODAL.SETPANOINFO, panoInfo)
      return new Promise((resolve) => {
        window.addEventListener('completePay', () => {
          resolve({ ...state.orderInfo, hash_pano_id: panoInfo.hash_pano_id || null })
        })
      })
    },

    [SERVICE.MODAL.CREATEORDER]({ commit }, info = {}) {
      commit(SERVICE.MODAL.CREATEORDER, info)
      if (info.channel_type === 10) {
        // 支付宝
        commit(SERVICE.MODAL.OPEN, 'confirmPay')
      } else {
        // 微信支付
        commit(SERVICE.MODAL.OPEN, 'weixinPay')
      }
    },
  },
}
