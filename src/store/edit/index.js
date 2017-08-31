import Http from '@/utils/http'
import { EDIT } from '../mutationTypes'
import material from './material'
import logo from './logo'
import author from './author'
import menu from './menu'
import tour from './tour'

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
      restrictView: false,
      object3d: false,
      vipInfo: false, // vip购买窗口
    },

    panoInfo: {},

    scenes: [],
  },

  modules: {
    logo,
    author,
    material,
    menu,
    tour,
  },

  actions: {
    [EDIT.GET_PANOINFO]({ commit }, pano_id) {
      Http.get(`/user/pubset/get?pano_id=${pano_id}`)
        .then(({ result }) => commit(EDIT.GET_PANOINFO, result))
    },

    [EDIT.SCENE.INIT]({ commit }, pano_id) {
      Http.get(`/user/scene?pano_id=${pano_id}`)
        .then(({ result }) => commit(EDIT.SCENE.INIT, result))
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

    /**
     * 获取场景数据
     * 把第一个场景设为当前场景
     */
    [EDIT.SCENE.INIT](state, scenes) {
      state.scenes = [
        { ...scenes[0], active: true },
        ...scenes.slice(1),
      ]
    },

    /**
     * 更新某一个场景的信息
     * 若更新的属性是active，则必须把其它场景的active重置为false
     * @param {Object} state
     * @param {{ id: string, update: Object }} data
     */
    [EDIT.SCENE.UPDATE](state, { id, update }) {
      state.scenes = state.scenes.map((scene) => {
        if (scene.id === id) {
          return { ...scene, ...update }
        }
        if (update.active) {
          return { ...scene, active: false }
        }
        return scene
      })
    },
  },

  getters: {
    isVip(state, getters, { userInfo }) {
      return userInfo.is_vip || state.panoInfo.is_vip
    },

    /**
     * 当前场景
     */
    activeScene(state) {
      return state.scenes.find(scene => scene.active)
    },
  },
}
