// import { Http } from '@/utils'
import { EDIT } from '../mutationTypes'

const { MATERIAL } = EDIT

export default {
  state: {
    active: false,
  },

  mutations: {
    [MATERIAL.CREATE](state) {
      state.active = true
    },
    [MATERIAL.DESTROY](state) {
      // 销毁时进行重置等处理
      state.active = false
    },
  },

  actions: {
    [MATERIAL.CREATE]({ commit }) {
      commit(MATERIAL.CREATE)
    },
    [MATERIAL.DESTROY]({ commit }) {
      commit(MATERIAL.DESTROY)
    },
  },
}
