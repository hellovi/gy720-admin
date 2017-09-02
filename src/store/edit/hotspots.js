import { Http } from '@/utils'
import { EDIT } from '../mutationTypes'

const { HOTSPOTS } = EDIT

export default {
  state: {
    icons: [],
    activeIcon: {},
    spotsList: [],
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

    [HOTSPOTS.INIT.SPOTS](state, data) {
      state.spotsList = data
    },
  },

  actions: {
    [HOTSPOTS.INIT.ICON]({ commit }) {
      return Http.get('/user/scenehotspot/icons')
        .then(({ result }) => {
          // eslint-disable-next-line
          const data = result.reduce((all, { list }) => [...all, ...list], [])
          commit(HOTSPOTS.INIT.ICON, data)
        })
    },

    [HOTSPOTS.INIT.SPOTS]({ commit }, { params, pano_id }) {
      return Http.get(`/user/scenehotspot${params}`)
        .then(({ result }) => {
          result.forEach((item) => {
            item.pano_id = pano_id
            // eslint-disable-next-line
            window.__krpano.adddesignhotspot(item)
          })
          commit(HOTSPOTS.INIT.SPOTS, result)
        })
    },
  },
}
