import Vue from 'vue'
import Vuex from 'vuex'
import { Http } from '@/utils'
import { GLOBAL } from './mutationTypes'
import center from './center'
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
    isCertified(state) {
      return +state.userInfo.is_certified === 20
    },

    isVip(state) {
      const { vip_expire_at } = state.userInfo
      if (vip_expire_at) {
        return Date.now() < Date.parse(vip_expire_at)
      }
      return false
    },
  },

  modules: {
    center,
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
