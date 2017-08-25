import Http from '@/utils/http'
import { EDIT } from '../mutationTypes'
import scene from './scene'
import material from './material'
import logo from './logo'
import author from './author'

export default {
  state: {
    active: {
      control: true,
      logo: false,
      author: false,
      setting: false,
      material: false,
      group: false,
      menu: false,
      tour: false,
      hotspots: false,
      share: false,
      scene: false,
      snapshot: false,
      initialview: false,
      vipInfo: false,
      restrictView: false,
    },
    panoinfo: {},
  },

  modules: {
    logo,
    author,
    material,
    scene,
  },

  actions: {
    [EDIT.GET_PANOINFO]({ commit }, pano_id) {
      Http.post('/make/pano/info', { pano_id })
        .then(res => commit(EDIT.GET_PANOINFO, res.result))
    },
  },

  mutations: {
    [EDIT.MODAL.OPEN](state, name) {
      state.active[name] = true
    },

    [EDIT.MODAL.CLOSE](state, name) {
      state.active[name] = false
    },

    [EDIT.GET_PANOINFO](state, panoinfo) {
      state.panoinfo = panoinfo
    },
  },
}
