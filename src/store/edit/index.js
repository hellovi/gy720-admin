import Http from '@/utils/http'
import { EDIT } from '../mutationTypes'
import material from './material'
import logo from './logo'
import author from './author'
import menu from './menu'
import tour from './tour'
import hotspots from './hotspots'

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
      imageTextEdit: false,
      vipInfo: false,
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
    hotspots,
  },

  actions: {
    [EDIT.GET_PANOINFO]({ commit }, pano_id) {
      return Http.get(`/user/pubset/get?pano_id=${pano_id}`)
        .then(({ result }) => commit(EDIT.GET_PANOINFO, result))
    },

    /**
     * 获取场景信息
     * 返回当前选中场景（加载完默认为第一项）的id，以便调用热点接口时能确保拿到此id
     */
    [EDIT.SCENE.INIT]({ commit }, pano_id) {
      return Http.get(`/user/scene?pano_id=${pano_id}`)
        .then(({ result }) => {
          commit(EDIT.SCENE.INIT, result)
          return result[0].id
        })
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
     * @param {{ id: number, update: Object }} data
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

    [EDIT.SCENE.DELETE](state, id) {
      state.scenes = state.scenes
        .filter(scene => scene.id !== id)
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
