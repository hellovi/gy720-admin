import { Http } from '@/utils'
import { EDIT } from '../mutationTypes'

const { HOTSPOTS } = EDIT

export default {
  state: {
    icons: [],
    activeIcon: {},
  },

  mutations: {
    [HOTSPOTS.INIT.ICON](state, data) {
      state.icons = data
    },

    [HOTSPOTS.SELECT.ICON](state, data) {
      state.activeIcon = data
    },

    [HOTSPOTS.RESET.ICON](state) {
      state.activeIcon = {}
    },
  },

  actions: {
    [HOTSPOTS.INIT.ICON]({ commit }) {
      return Http.get('/user/scenehotspot/icons')
        .then(({ result }) => {
          const data = []
          result.map((items) => {
            items.list.map((item) => {
              data.push(item)
              return true
            })
            return true
          })
          commit(HOTSPOTS.INIT.ICON, data)
        })
    },

    [HOTSPOTS.INIT.SPOTS](params) {
      return Http.get(`/user/scenehotspot${params}`)
        .then(({ result }) => {
          result.map((item) => {
            // eslint-disable-next-line
            window.__krpano.adddesignhotspot(item)
            return true
          })
        })
    },
  },
}
