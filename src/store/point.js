import Vue from 'vue'
import { Http } from '@/utils'
import { POINT } from './mutationTypes'

export default {
  state: {
    tasks: [],
    log: { data: [] },
    exchanges: { data: [] },
    record: { data: [] },
  },

  mutations: {
    [POINT.TASK.INIT](state, tasks) {
      state.tasks = tasks
    },

    [POINT.TASK.UPDATE](state, id) {
      const task = state.tasks.find(item => item.id === id)
      Vue.set(task, 'user_mission_count', task.user_mission_count + 1)
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
      return Http.get('/user/integral')
        .then(({ result }) => commit(POINT.TASK.INIT, result))
    },

    [POINT.LOG.INIT]({ commit }, page = 1) {
      return Http.get(`/user/integral/mark?page=${page}`)
        .then(({ result }) => commit(POINT.LOG.INIT, result))
    },

    [POINT.EXCHANGE.INIT]({ commit }) {
      return Http.get('/user/integral/gift')
        .then(({ result }) => commit(POINT.EXCHANGE.INIT, result))
    },

    [POINT.RECORD.INIT]({ commit }, page = 1) {
      return Http.get(`/user/integral/chest?page=${page}`)
        .then(({ result }) => commit(POINT.RECORD.INIT, result))
    },
  },
}
