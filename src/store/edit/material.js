import Vue from 'vue'
import { Http } from '@/utils'
import { EDIT } from '../mutationTypes'

const { MATERIAL, ROTATE } = EDIT

// 自定义事件，用于MATERIAL.INVOKE和MATERIAL.SELECT中
const selectMaterial = document.createEvent('Event')
selectMaterial.initEvent('selectMaterial', false, true)
// 自定义事件，用于MATERIAL.INVOKES和MATERIAL.SELECTS中
const selectMaterials = document.createEvent('Event')
selectMaterials.initEvent('selectMaterials', false, true)

export default {
  state: {
    type: 'scene',
    invoked: false,
    materialData: {
      scene: { data: [] },
      logo: { data: [] },
      map: { data: [] },
      hotspot: { data: [] },
      wxicon: { data: [] },
      sky: { data: [] },
      thumb: { data: [] },
      article: { data: [] },
      rotate: { data: [] },
      audio: { data: [] },
      photo: { data: [] },
      other: { data: [] },
    },
    isSmallScreen: false,
    selectedItem: {},
    selectedItems: [],
    object3dItem: {},
    // 物品3D分类
    rotateCates: [],
    activeRotateCateId: null,
    // 全景图分类
    activeSceneCateId: null,
  },

  mutations: {
    /**
     * 改变素材框选中的素材类型
     */
    [MATERIAL.CHANGE](state, type) {
      state.type = type
    },

    [MATERIAL.INIT](state, { type = state.type, data }) {
      state.materialData[type] = data
    },

    [MATERIAL.CREATE](state, result) {
      state.materialData[state.type].data.unshift(result)
    },

    [MATERIAL.UPDATE](state, { id, data }) {
      Vue.set(
        state.materialData[state.type],
        'data',
        state.materialData[state.type].data
          .map((item) => {
            if (item.id === id) {
              return { ...item, ...data }
            }
            return item
          }),
      )
    },

    [MATERIAL.REMOVE](state, id) {
      Vue.set(
        state.materialData[state.type],
        'data',
        state.materialData[state.type].data.filter(item => item.id !== id),
      )
    },

    [MATERIAL.INVOKE](state, invoked) {
      state.invoked = invoked
    },

    /**
     * 调用素材框后选中某个素材
     * 选中后派发自定义事件
     */
    [MATERIAL.SELECT](state, item) {
      state.selectedItem = item
      window.dispatchEvent(selectMaterial)
    },
    /*
     * 调用素材选中多个素材
     * 选中后派发自定义事件
     */
    [MATERIAL.SELECTS](state, item) {
      state.selectedItems = item
      if (item.length) {
        window.dispatchEvent(selectMaterials)
      }
    },
    /**
     * 当前查看物品3D的数据
     * @param state
     * @param item {Object}
     */
    [MATERIAL.SELECT_OBJECT3D](state, item) {
      state.object3dItem = item
    },

    /**
     * 判断小屏幕状态
     * @param state
     * @param status {Boolean}
     */
    [MATERIAL.SET_SMALLSCREEN](state, status) {
      state.isSmallScreen = status
    },

    /** 物品3D分类 */
    [ROTATE.CATE.INIT](state, cates) {
      state.rotateCates = cates
      // 默认显示所有3D物品
      state.activeRotateCateId = ''
    },

    [ROTATE.CATE.SELECT](state, id) {
      state.activeRotateCateId = id
    },

    [ROTATE.CATE.CREATE](state, cate) {
      state.rotateCates = [...state.rotateCates, cate]
    },

    [ROTATE.CATE.UPDATE](state, update) {
      state.rotateCates = state.rotateCates.map((cate) => {
        if (cate.id === update.id) {
          return { ...cate, ...update }
        }
        return cate
      })
    },

    [ROTATE.CATE.REMOVE](state, id) {
      state.rotateCates = state.rotateCates.filter(cate => cate.id !== id)
    },

    /** 物品3D列表 */
    // 如果列表中已有10项，向列表添加新项目的同时，应该删除列表最后一项
    [ROTATE.CREATE](state, object) {
      const { data } = state.materialData.rotate
      Vue.set(state.materialData.rotate, 'data', [
        object,
        ...(data.length >= 10 ? data.slice(0, -1) : data),
      ])
    },

    [ROTATE.UPDATE](state, update) {
      const index = state.materialData.rotate.data.findIndex(item => item.id === update.id)
      Vue.set(state.materialData.rotate.data, index, {
        ...state.materialData.rotate.data[index],
        ...update,
      })
    },

    [ROTATE.REMOVE](state, id) {
      const { data } = state.materialData.rotate
      Vue.set(state.materialData.rotate, 'data', data.filter(item => item.id !== id))
    },

    [MATERIAL.SCENE.UPDATE.CATEID](state, id = 1) {
      state.activeSceneCateId = id
    },
  },

  actions: {
    [MATERIAL.INIT]({ commit }, { url, params = '' }) {
      return Http.get(`${url}${params}`)
        .then(({ result }) => {
          commit(MATERIAL.INIT, { data: result })
        })
    },

    [MATERIAL.CREATE]({ commit }, data) {
      return Http.post('/user/source', data)
        .then(({ result }) => commit(MATERIAL.CREATE, result))
    },

    /**
     * 如果移动了分类应当删除
     */
    [MATERIAL.UPDATE]({ commit }, { id, data, isMove }) {
      return Http.put(`/user/source/${id}`, data)
        .then(() => {
          if (isMove) {
            commit(MATERIAL.REMOVE, id)
          } else {
            commit(MATERIAL.UPDATE, { id, data })
          }
        })
    },

    [MATERIAL.REMOVE]({ commit }, id) {
      return Http.delete(`/user/source/${id}`)
        .then(() => commit(MATERIAL.REMOVE, id))
    },

    /**
     * 其它模块调用素材框
     * 把素材框设置为被调用状态（invoked），设置素材框的选中类型，打开素材框
     * 监听自定义事件，在选中某个素材后返回该素材，并重置上述改动
     */
    [MATERIAL.INVOKE]({ commit, state }, type) {
      commit(MATERIAL.INVOKE, true)
      commit(MATERIAL.CHANGE, type)
      commit(EDIT.MODAL.OPEN, 'material')

      return new Promise((resolve) => {
        Vue.customEvent = Vue.customEvent || {}
        Vue.customEvent.selectMaterial = () => {
          resolve(state.selectedItem)
          commit(MATERIAL.CHANGE, 'scene')
          commit(MATERIAL.INVOKE, false)
          commit(EDIT.MODAL.CLOSE, 'material')
        }
        window.addEventListener('selectMaterial', Vue.customEvent.selectMaterial)
      })
    },
    /**
     * 其它模块调用素材框
     * 把素材框设置为被调用状态（invoked），设置素材框的选中类型，打开素材框
     * 监听自定义事件，在选中多个素材后返回该数组，并重置上述改动
     */
    [MATERIAL.INVOKES]({ commit, state }, type) {
      commit(MATERIAL.INVOKE, true)
      commit(MATERIAL.CHANGE, type)
      commit(EDIT.MODAL.OPEN, 'material')

      return new Promise((resolve) => {
        Vue.customEvent = Vue.customEvent || {}
        Vue.customEvent.selectMaterials = () => {
          resolve(state.selectedItems)
          commit(MATERIAL.CHANGE, 'scene')
          commit(MATERIAL.INVOKE, false)
          commit(EDIT.MODAL.CLOSE, 'material')
        }
        window.addEventListener('selectMaterials', Vue.customEvent.selectMaterials)
      })
    },

    /** 物品3D分类 */
    [ROTATE.CATE.INIT]({ commit }) {
      return Http.get('/user/sourcerotatecategory')
        .then(({ result }) => commit(ROTATE.CATE.INIT, result))
    },

    [ROTATE.CATE.CREATE]({ commit }, data) {
      return Http.post('/user/sourcerotatecategory', data)
        .then(({ result }) => commit(ROTATE.CATE.CREATE, result))
    },

    [ROTATE.CATE.UPDATE]({ commit }, data) {
      return Http.put(`/user/sourcerotatecategory/${data.id}`, data)
        .then(() => commit(ROTATE.CATE.UPDATE, data))
    },

    [ROTATE.CATE.REMOVE]({ commit }, id) {
      return Http.delete(`/user/sourcerotatecategory/${id}`)
        .then(() => commit(ROTATE.CATE.REMOVE, id))
    },

    /** 物品3D列表 */
    [ROTATE.CREATE]({ commit }, data) {
      return Http.post('/user/sourcerotate', data)
        .then(({ result }) => {
          commit(ROTATE.CREATE, result)
          return result
        })
    },

    [ROTATE.UPDATE]({ commit }, data) {
      return Http.put(`/user/sourcerotate/${data.id}`, data)
        .then(({ result }) => {
          commit(ROTATE.UPDATE, data)
          return result
        })
    },

    [ROTATE.REMOVE]({ commit }, id) {
      return Http.delete(`/user/sourcerotate/${id}`)
        .then(({ result }) => {
          commit(ROTATE.REMOVE, id)
          return result
        })
    },
  },

  getters: {
    selectedItem(state) {
      return state.selectedItem
    },
  },
}
