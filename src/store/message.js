import { Http } from '@/utils'
import { MESSAGE } from './mutationTypes'

export default {
  state: {
    counts: {},
    system: { data: [] },
  },

  mutations: {
    [MESSAGE.COUNT.INIT](state, counts) {
      state.counts = counts
    },

    [MESSAGE.COUNT.UPDATE](state, { type, count }) {
      state.counts = {
        ...state.counts,
        [type]: state.counts[type] - count,
      }
    },

    [MESSAGE.SYSTEM.INIT](state, list) {
      state.system = list
    },

    [MESSAGE.SYSTEM.DELETE](state, ids) {
      state.system = {
        ...state.system,
        data: state.system.data.filter(({ id }) => !ids.includes(id)),
      }
    },
  },

  actions: {
    [MESSAGE.COUNT.INIT]({ commit }) {
      Http.get('/user/message/unreadcount')
        .then(({ result: { counts } }) => {
          commit(MESSAGE.COUNT.INIT, counts)
        })
    },

    [MESSAGE.SYSTEM.INIT]({ commit }, page = 1) {
      return Http.get(`/user/message?page=${page}`)
        .then(({ result }) => commit(MESSAGE.SYSTEM.INIT, result))
    },
  },
}
