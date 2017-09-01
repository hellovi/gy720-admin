import Vue from 'vue'
import { Http } from '@/utils'
import { EDIT } from '../mutationTypes'

const { MATERIAL, OBJECT } = EDIT

// 自定义事件，用于MATERIAL.INVOKE和MATERIAL.SELECT中
export const customEvent = document.createEvent('Event')
customEvent.initEvent('selectMaterial', false, true)

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
      ad: { data: [] },
      thumb: { data: [] },
      article: { data: [] },
      rotate: { data: [] },
      audio: { data: [] },
      other: { data: [] },
    },
    selectedItem: {},
    // 物品3D分类
    objectCates: [],
    activeObjectCateId: null,
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
      window.dispatchEvent(customEvent)
    },

    /** 物品3D分类 */
    [OBJECT.CATE.INIT](state, cates) {
      state.objectCates = cates
      state.activeObjectCateId = cates[0].id
    },

    [OBJECT.CATE.CREATE](state, cate) {
      state.objectCates = [...state.objectCates, cate]
    },

    [OBJECT.CATE.SELECT](state, id) {
      state.activeObjectCateId = id
    },

    [OBJECT.CATE.REMOVE](state, id) {
      state.objectCates = state.objectCates.filter(cate => cate.id !== id)
    },

    /** 物品3D列表 */
    // 如果列表中已有10项，向列表添加新项目的同时，应该删除列表最后一项
    [OBJECT.CREATE](state, object) {
      const { data } = state.materialData.objects
      Vue.set(state.materialData.objects, 'data', [
        object,
        ...(data.length >= 10 ? data.slice(0, -1) : data),
      ])
    },

    [OBJECT.UPDATE](state, update) {
      const index = state.materialData.objects.data.findIndex(item => item.id === update.id)
      Vue.set(state.materialData.objects.data, index, {
        ...state.materialData.objects.data[index],
        ...update,
      })
    },

    [OBJECT.REMOVE](state, id) {
      const { data } = state.materialData.objects
      Vue.set(state.materialData.objects, 'data', data.filter(item => item.id !== id))
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
        window.addEventListener('selectMaterial', () => {
          resolve(state.selectedItem)
          commit(MATERIAL.CHANGE, 'panos')
          commit(MATERIAL.INVOKE, false)
          commit(EDIT.MODAL.CLOSE, 'material')
        })
      })
    },

    /** 物品3D分类 */
    [OBJECT.CATE.INIT]({ commit }) {
      return Http.get('/user/sourcerotatecategory')
        .then(({ result }) => commit(OBJECT.CATE.INIT, result))
    },

    [OBJECT.CATE.CREATE]({ commit }, data) {
      return Http.post('/user/sourcerotatecategory', data)
        .then(() => commit(OBJECT.CATE.CREATE, data))
    },

    [OBJECT.CATE.REMOVE]({ commit }, id) {
      return Http.delete(`/user/sourcerotatecategory/${id}`)
        .then(() => commit(OBJECT.CATE.REMOVE, id))
    },

    /** 物品3D列表 */
    [OBJECT.CREATE]({ commit }, data) {
      Http.post('/user/sourcerotate', data)
        .then(() => commit(OBJECT.CREATE, data))
    },

    [OBJECT.UPDATE]({ commit }, data) {
      Http.put(`/user/sourcerotate/${data.id}`, data)
        .then(() => commit(OBJECT.UPDATE, data))
    },

    [OBJECT.REMOVE]({ commit }, id) {
      Http.delete(`/user/sourcerotate/${id}`)
        .then(() => commit(OBJECT.REMOVE, id))
    },
  },
}
