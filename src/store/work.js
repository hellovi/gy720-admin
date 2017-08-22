import { Http } from '@/utils'
import { WORK } from './mutationTypes'

export default {
  state: {
    cates: [],
    tags: [],
  },

  mutations: {
    [WORK.CATE.INIT](state, cates) {
      state.cates = cates
    },

    [WORK.CATE.ADD](state, cate) {
      state.cates = [...state.cates, cate]
    },

    [WORK.TAG.INIT](state, tags) {
      state.tags = tags
    },
  },

  actions: {
    [WORK.CATE.INIT]({ commit }) {
      return Http.get('/user/panocategory')
        .then(({ result }) => commit(WORK.CATE.INIT, result))
    },

    [WORK.CATE.ADD]({ commit }, data) {
      return Http.post('/user/panocategory', data)
        .then(({ result }) => {
          commit(WORK.CATE.ADD, result)
          return result.id
        })
    },

    [WORK.TAG.INIT]({ commit }) {
      return Http.get('/user/panotag')
        .then(({ result }) => commit(WORK.TAG.INIT, result))
    },
  },
}
