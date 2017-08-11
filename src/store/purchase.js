import { Http } from '@/utils'
import { PURCHASE } from './mutationTypes'

export default {
  state: {
    orders: { data: [] },
  },

  mutations: {
    [PURCHASE.ORDERS.INIT](state, orders) {
      state.orders = orders
    },
  },

  actions: {
    [PURCHASE.ORDERS.INIT]({ commit }, page = 1) {
      return Http.get(`/user/pay/orderlists?current_page=${page}`)
        .then(({ result }) => commit(PURCHASE.ORDERS.INIT, result.lists))
    },
  },
}

