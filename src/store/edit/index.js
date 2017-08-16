import { EDIT } from '../mutationTypes'
import scene from './scene'
import material from './material'
import logo from './logo'
import author from './author'

export default {
  state: {
    active: {
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
    },
    panoinfo: {},
  },

  modules: {
    logo,
    author,
    material,
    scene,
  },

  mutations: {
    [EDIT.MODAL.OPEN](state, name) {
      state.active[name] = true
    },

    [EDIT.MODAL.CLOSE](state, name) {
      state.active[name] = false
    },
  },
}
