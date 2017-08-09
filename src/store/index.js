import Vue from 'vue'
import Vuex from 'vuex'
import { Http } from '@/utils'
import { GLOBAL } from './mutationTypes'
import point from './point'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
  },

  modules: {
    point,
  },

  mutations: {
    [GLOBAL.USER.INIT](state, userInfo) {
      state.userInfo = userInfo
    },

    [GLOBAL.USER.UPDATE_POINT](state, update) {
      state.userInfo = {
        ...state.userInfo,
        total_integral: state.userInfo.total_integral + update,
        total_experience: state.userInfo.total_experience + update,
        left_integral: state.userInfo.left_integral + update,
      }
    },
  },

  actions: {
    [GLOBAL.USER.INIT]({ commit }) {
      return Http.get('/user/account/info')
        .then(({ result }) => commit(GLOBAL.USER.INIT, result.userInfo))
    },
  },
})
