import Vue from 'vue'
import Vuex from 'vuex'
import { Http } from '@/utils'
import { GLOBAL } from './mutationTypes'
import work from './work'
import message from './message'
import point from './point'
import purchase from './purchase'
import edit from './edit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
  },

  getters: {
    isVip(state) {
      return state.userInfo.is_vip
    },
  },

  modules: {
    work,
    message,
    point,
    purchase,
    edit,
  },

  mutations: {
    [GLOBAL.USER.INIT](state, userInfo) {
      state.userInfo = userInfo
    },

    [GLOBAL.USER.UPDATE_POINT](state, update) {
      state.userInfo = {
        ...state.userInfo,
        integral: state.userInfo.integral + update,
        integral_remain: state.userInfo.integral_remain + update,
      }
    },
  },

  actions: {
    [GLOBAL.USER.INIT]({ commit }) {
      return Http.get('/user/info')
        .then(({ result }) => commit(GLOBAL.USER.INIT, result))
    },
  },
})
