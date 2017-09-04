import { Http } from '@/utils'
import { PURCHASE } from './mutationTypes'

export default {
  state: {
    list: { data: [] },
  },

  mutations: {
    [PURCHASE.ORDERS.INIT](state, list) {
      state.list = list
    },

    [PURCHASE.ORDERS.DELETE](state, id) {
      state.list.data = state.list.data
        .filter(item => item.hash_order_id !== id)
    },
  },

  actions: {
    [PURCHASE.ORDERS.INIT]({ commit }, page = 1) {
      return Http.get(`/user/order?page=${page}`)
        .then(({ result }) => commit(PURCHASE.ORDERS.INIT, result))
    },

    [PURCHASE.ORDERS.DELETE]({ commit }, id) {
      return Http.delete(`/user/order/${id}`)
        .then(() => commit(PURCHASE.ORDERS.DELETE, id))
    },
  },
}

