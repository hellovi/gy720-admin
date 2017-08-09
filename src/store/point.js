import { Http } from '@/utils'
import { POINT } from './mutationTypes'

export default {
  state: {
    tasks: [],
    log: { data: [] },
    exchanges: [],
    record: { data: [] },
  },

  mutations: {
    [POINT.TASK.INIT](state, tasks) {
      state.tasks = tasks
    },

    [POINT.LOG.INIT](state, log) {
      state.log = log
    },

    [POINT.EXCHANGE.INIT](state, exchanges) {
      state.exchanges = exchanges
    },

    [POINT.RECORD.INIT](state, record) {
      state.record = record
    },
  },

  actions: {
    [POINT.TASK.INIT]({ commit }) {
      return Http.get('/user/scorerules/lists')
        .then(({ result: { rules } }) => commit(POINT.TASK.INIT, rules))
    },

    [POINT.LOG.INIT]({ commit }, page = 1) {
      return Http.get(`/user/integral/lists?current_page=${page}`)
        .then(({ result }) => commit(POINT.LOG.INIT, result))
    },

    [POINT.EXCHANGE.INIT]({ commit }) {
      return Http.get('/user/integralexchange/rules')
        .then(({ result }) => commit(POINT.EXCHANGE.INIT, result.rules))
    },

    [POINT.RECORD.INIT]({ commit }, page = 1) {
      return Http.get(`/user/integralexchange/record?current_page=${page}`)
        .then(({ result }) => commit(POINT.RECORD.INIT, result))
    },
  },
}
