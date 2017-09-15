import Vue from 'vue'
import { Http } from '@/utils'
import { MESSAGE } from './mutationTypes'

export default {
  state: {
    counts: {},
    system: { data: [] },
    private: { data: [] },
    chat: { history: [] },
    say: { data: [] },
  },

  mutations: {
    [MESSAGE.INIT](state, { type, result }) {
      state[type] = result
    },

    [MESSAGE.DELETE](state, { type, ids }) {
      state[type] = {
        ...state[type],
        data: state[type].data.filter(({ id }) => !ids.includes(id)),
      }
    },

    [MESSAGE.COUNT.INIT](state, counts) {
      state.counts = counts
    },

    [MESSAGE.COUNT.UPDATE](state, { type, count }) {
      state.counts = {
        ...state.counts,
        [type]: state.counts[type] - count,
      }
    },

    [MESSAGE.PRIVATE.UPDATE](state, { id, content }) {
      const target = state.private.data.find(item => item.id === id)
      if (target) {
        Vue.set(target, 'content', content)
      }
    },

    [MESSAGE.PRIVATE.HISTORY.INIT](state, chat) {
      state.chat = chat
    },

    [MESSAGE.PRIVATE.HISTORY.UPDATE](state, item) {
      state.chat.history.push(item)
    },

    [MESSAGE.PRIVATE.HISTORY.RESET](state) {
      state.chat = { history: [] }
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
        .then(({ result }) => {
          commit(MESSAGE.INIT, { type: 'system', result })
        })
    },

    [MESSAGE.PRIVATE.INIT]({ commit }, page = 1) {
      return Http.get(`/user/chat?page=${page}`)
        .then(({ result }) => {
          commit(MESSAGE.INIT, { type: 'private', result })
        })
    },

    [MESSAGE.PRIVATE.HISTORY.INIT]({ commit }, userId) {
      return Http.get(`/user/chat/${userId}`)
        .then(({ result }) => {
          // 每次获取到聊天列表时，应使用列表的最后一项，更新主列表的信息
          const { id, history } = result
          const { content } = history[history.length - 1]
          commit(MESSAGE.PRIVATE.UPDATE, { id, content })

          commit(MESSAGE.PRIVATE.HISTORY.INIT, result)
        })
    },

    [MESSAGE.SAY.INIT]({ commit }, { page = 1, pano_id = '' }) {
      return Http.get(`/user/panocomment?pano_id=${pano_id}&page=${page}&per_page=10`)
        .then(({ result }) => {
          commit(MESSAGE.INIT, { type: 'say', result })
        })
    },
  },
}
