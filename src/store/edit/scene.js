// import { Http } from '@/utils'
import { EDIT } from '../mutationTypes'

const { SCENE } = EDIT

export default {
  state: {
    scene_id: 0,
  },

  mutations: {
    [SCENE.CREATE](state) {
      state.scene_id = 1
    },
  },

  actions: {
    [SCENE.CREATE]({ commit }) {
      commit(SCENE.CREATE)
    },
  },
}
