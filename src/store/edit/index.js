import { Http } from '@/utils'
import { EDIT } from '../mutationTypes'
import material from './material'
import logo from './logo'
import author from './author'
import menu from './menu'
import tour from './tour'
import hotspots from './hotspots'
import scene from './scene'

const active = {
  sceneList: true,
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
  restrictView: false,
  object3d: false,
  object3dView: false,
  imageTextEdit: false,
  summary: false,
  vipInfo: false,
}

export default {
  state: {
    active,

    panoInfo: {
      hash_pano_id: null,
    },
  },

  modules: {
    logo,
    author,
    material,
    menu,
    tour,
    hotspots,
    scene,
  },

  actions: {
    [EDIT.PANO.INIT]({ commit }, pano_id) {
      return Http.get(`/user/pubset/get?pano_id=${pano_id}`)
        .then(({ result }) => commit(EDIT.PANO.INIT, result))
    },

    [EDIT.PANO.UPDATE]({ commit, state }, update) {
      return Http.post(`/user/pubset/update?pano_id=${state.panoInfo.hash_pano_id}`, {
        ...update,
      })
        .then((res) => {
          commit(EDIT.PANO.UPDATE, update)
          return res
        })
    },

    // 更新场景XML
    [EDIT.PANO.UPDATESCENE]({ state }, config = []) {
      // eslint-disable-next-line
      const krpano = window._krpano
      const sceneName = krpano.get('xml').scene
      /**
       * 重新获取XML
       * @type {[string]} 有值为刷新XML
       */
      const param = [`/user/pano/xml?pano_id=${state.panoInfo.hash_pano_id}&type=10`, ...config]
      krpano.call(`loadpano(${param.join()},null,MERGE);loadscene(${sceneName});`)
    },
  },

  mutations: {
    [EDIT.MODAL.OPEN](state, name) {
      state.active[name] = true
    },

    [EDIT.MODAL.CLOSE](state, name) {
      state.active[name] = false
    },

    [EDIT.MODAL.RESET](state) {
      state.active = { ...active }
    },

    [EDIT.PANO.INIT](state, panoInfo) {
      state.panoInfo = panoInfo
    },

    [EDIT.PANO.UPDATE](state, update) {
      state.panoInfo = {
        ...state.panoInfo,
        ...update,
      }
    },
  },

  getters: {
    isVip(state, getters, { userInfo }) {
      return userInfo.is_vip || state.panoInfo.is_vip
    },

    panoId(state, getters, { edit: { panoInfo } }) {
      return panoInfo.hash_pano_id
    },

    panoInfo(state, getters, { edit: { panoInfo } }) {
      return panoInfo
    },
  },
}
