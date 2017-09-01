// eslint-disable-next-line
import { Http } from '@/utils'
import { CERTIFICATE } from './mutationTypes'
// eslint-disable-next-line
import mock from './mock'

export default {
  state: {
    certInfo: {},
  },

  mutations: {
    [CERTIFICATE.INIT](state, certInfo) {
      state.certInfo = certInfo
    },
  },

  actions: {
    [CERTIFICATE.INIT]({ commit }) {
      return Http.get('/user/certificate')
        .then(({ result }) => commit(CERTIFICATE.INIT, result))

      // return Promise.resolve(mock)
      //   .then(({ result }) => commit(CERTIFICATE.INIT, result))
    },
  },
}

