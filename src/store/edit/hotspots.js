import Vue from 'vue'
import { Http } from '@/utils'
import { EDIT } from '../mutationTypes'

const { MATERIAL, HOTSPOTS } = EDIT

// 自定义事件，用于MATERIAL.INVOKE和MATERIAL.SELECT中
const selectMaterial = document.createEvent('Event')
selectMaterial.initEvent('selectMaterial', false, true)

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
      // ????这里就可以
      state.activeIcon = data
    },

    [HOTSPOTS.RESET.ICON](state) {
      state.activeIcon = {}
    },

    [HOTSPOTS.INIT.SPOTS](state, data) {
      state.spotsList = data
      // state.spotsList = [...data]
    },

    [HOTSPOTS.CREATE](state, data) {
      state.spotsList.push(data)
    },

    [HOTSPOTS.UPDATE](state, { id, data }) {
      const index = state.spotsList.findIndex(spot => spot.id === id)
      state.spotsList[index] = data
    },

    [HOTSPOTS.REMOVE](state, id) {
      state.spotsList = state.spotsList.filter(spot => spot.id !== +id)
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

    [HOTSPOTS.INIT.SPOTS]({ commit }, { scene_id, pano_id }) {
      const params = `?pano_id=${pano_id}&scene_id=${scene_id}`
      return Http.get(`/user/scenehotspot${params}`)
        .then(({ result }) => {
          /* eslint-disable no-underscore-dangle */
          // 清空所有热点
          window.__krpano.hotspots = {}
          result.forEach((item) => {
            item.pano_id = pano_id
          })
          commit(HOTSPOTS.INIT.SPOTS, result)
          return result
        })
    },

    [HOTSPOTS.CREATE]({ commit }, data) {
      return Http.post('/user/scenehotspot', data)
        .then(({ result }) => {
          result.edit_title = data.edit_title
          commit(HOTSPOTS.CREATE, result)
          return result
        })
    },

    [HOTSPOTS.UPDATE]({ commit }, { id, data }) {
      return Http.put(`/user/scenehotspot/${id}`, data)
        .then(() => {
          commit(HOTSPOTS.UPDATE, { id, data })
          return data
        })
    },

    [HOTSPOTS.REMOVE]({ commit }, { id, scene_id, pano_id }) {
      const param = `?pano_id=${pano_id}&scene_id=${scene_id}`
      return Http.delete(`/user/scenehotspot/${id}${param}`)
        .then(() => {
          commit(HOTSPOTS.REMOVE, id)
        })
    },

    [HOTSPOTS.SELECT.ICON]({ commit, getters }, type) {
      commit(MATERIAL.INVOKE, true)
      commit(MATERIAL.CHANGE, type)
      commit(EDIT.MODAL.OPEN, 'material')
      return new Promise((resolve) => {
        Vue.customEvent = Vue.customEvent || {}
        Vue.customEvent.selectMaterial = () => {
          resolve(getters.selectedItem)
          commit(HOTSPOTS.SELECT.ICON, {
            icon_id: '0',
            thumb: getters.selectedItem.file_path,
            data_id: getters.selectedItem.id,
            diy_src: getters.selectedItem.file_path,
          })
          commit(MATERIAL.CHANGE, 'scene')
          commit(MATERIAL.INVOKE, false)
          commit(EDIT.MODAL.CLOSE, 'material')
        }
        window.addEventListener('selectMaterial', Vue.customEvent.selectMaterial)
      })
    },
  },
}
