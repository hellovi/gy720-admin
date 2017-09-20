import { SERVICE } from './mutationTypes'

const initActive = () => ({
  buyInfo: false, // 购买说明
  buyFees: false, // 购买年费
  buySingle: false, // 单品购买
  isRenew: false, // 是否续费操作
  weixinPay: false, // 微信支付
  alipay: false, // 支付宝
})

// 自定义事件，用于SERVICE.MODAL.SETPANOINFO中
const completePay = document.createEvent('Event')
completePay.initEvent('completePay', false, true)

export default {
  state: {
    buyType: 10, // 10：年会  20：作品
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
      state.active[type] = true
    },

    [SERVICE.MODAL.CLOSE](state, type) {
      state.active[type] = false
    },

    [SERVICE.MODAL.SETPANOINFO](state, { id, name }) {
      state.buyPanoInfo = { id, name }
    },

    [SERVICE.MODAL.BUYTYPE](state, type = 10) {
      state.buyType = type
    },

    [SERVICE.MODAL.RESET](state) {
      state.active = { ...initActive() }
    },

    [SERVICE.MODAL.SETORDERINFO](state, info = {}) {
      state.orderInfo = { ...info }
    },

    [SERVICE.MODAL.COMPLETEPAY](state, info = {}) {
      state.orderInfo = { ...state.orderInfo, ...info }
      window.dispatchEvent(completePay)
    },
  },

  actions: {
    [SERVICE.MODAL.COMPLETEPAY]({ commit, state }, panoInfo = {}) {
      commit(SERVICE.MODAL.SETPANOINFO, panoInfo)
      return new Promise((resolve) => {
        window.addEventListener('completePay', () => {
          resolve(state.orderInfo)
        })
      })
    },
  },
}
