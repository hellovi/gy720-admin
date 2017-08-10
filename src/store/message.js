import Vue from 'vue'
import { Http } from '@/utils'
import { MESSAGE } from './mutationTypes'

export default {
  state: {
    system: { data: [] },
  },

  mutations: {
    [MESSAGE.SYSTEM.INIT](state, system) {
      state.system = system
    },

    // 更新消息项的勾选状态
    [MESSAGE.CHECK](state, { type, index }) {
      const item = state[type].data[index]
      Vue.set(item, 'checked', !item.checked)
    },

    [MESSAGE.CHECK_ALL](state, { type, val }) {
      state[type].data.forEach(item => Vue.set(item, 'checked', val))
    },
  },

  actions: {
    [MESSAGE.SYSTEM.INIT]({ commit }, page = 1) {
      return Http.get(`/user/message/lists?type=10&page=${page}`)
        .then(({ result }) => commit(MESSAGE.SYSTEM.INIT, result.lists))
    },
  },
}
