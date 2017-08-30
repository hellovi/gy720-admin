import Http from '@/utils/http'
import { EDIT } from '../mutationTypes'
import scene from './scene'
import material from './material'
import logo from './logo'
import author from './author'
import menu from './menu'

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

    panoInfo: {},
  },

  modules: {
    logo,
    author,
    material,
    scene,
    menu,
  },

  actions: {
    [EDIT.GET_PANOINFO]({ commit }, pano_id) {
      Http.get(`/user/pubset/get?pano_id=${pano_id}`)
        .then(({ result }) => commit(EDIT.GET_PANOINFO, result))
    },
  },

  mutations: {
    [EDIT.MODAL.OPEN](state, name) {
      state.active[name] = true
    },

    [EDIT.MODAL.CLOSE](state, name) {
      state.active[name] = false
    },

    [EDIT.GET_PANOINFO](state, panoInfo) {
      state.panoInfo = panoInfo
    },
  },

  getters: {
    isVip(state, getters, { userInfo }) {
      return userInfo.is_vip || state.panoInfo.is_vip
    },
  },
}
