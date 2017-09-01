import Vue from 'vue'
import { Http } from '@/utils'
import { EDIT } from '../mutationTypes'

/**
 * @typedef {Object} State
 * @property {string} type - 素材类型
 * @property {boolean} selectStatus - 试图上是否显示选择按钮
 * @property {string} selectFrom - 调用素材框的源头
 * @property {Object} materialExport - 各个素材类型里所选中的素材数据
 * @property {Object} materialData - 素材数据
 */

const { MATERIAL, OBJECT } = EDIT

// 导出的数据
const getMaterialExport = () => ({
  menu: { title: '', id: 0 }, // 图文素材data(右侧菜单)
  tour: { url: '', id: 0 }, // 导览图(右侧菜单)
  wechat: { url: '', id: 0 }, // 普通素材data(微信设置)
  logos: { url: '', id: 0 }, // LOGO素材(LOGO设置)
  audio: { title: '', url: '', id: 0 }, // 音频素材(背景音乐)
  hotspot: { title: '', id: 0 }, // 图文素材data(热点设置)
  hotspot3d: { title: '', id: 0 }, // 物品3D素材(热点设置)
  hotspotAudio: { title: '', url: '', id: 0 }, // 音频素材(热点设置)
})

export default {
  /** @type {State} */
  state: {
    type: 'panos',
    selectStatus: 1,
    source: '',
    materialExport: getMaterialExport(),
    materialData: {
      panos: { data: [] },
      logos: { data: [] },
      tours: { data: [] },
      hotspots: { data: [] },
      icons: { data: [] },
      ads: { data: [] },
      thumbs: { data: [] },
      infos: { data: [] },
      objects: { data: [] },
      audios: { data: [] },
      others: { data: [] },
    },
    // 物品3D分类
    objectCates: [],
    activeObjectCateId: null,
  },

  mutations: {
    [MATERIAL.TAB.SELECT](state, { type, source = '' }) {
      state.type = type
      state.source = source
    },

    [MATERIAL.INIT](state, { type = state.type, data }) {
      state.materialData[type] = data
    },

    [MATERIAL.ADD](state, result) {
      state.materialData[state.type].data.unshift(result)
    },

    [MATERIAL.SELECT](state, { id = 0, url = '', title = '' }) {
      const source = state.source
      const materExport = state.materialExport
      switch (state.type) {
        case 'infos':
          materExport[source] = { id, title }
          break
        case 'objects':
          materExport[source] = { id, title }
          break
        default:
          // 普通以及音频素材
          materExport[source] = { id, url, title }
      }
      state.source = ''
    },

    [MATERIAL.RESET](state, source) {
      state.materialExport[source] = {
        ...getMaterialExport()[source],
      }
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

    /** 物品3D */
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
    /**
     * 根据传入的type改变选中的素材标签，并派发事件打开素材窗口
     */
    [MATERIAL.TAB.SELECT]({ commit }, { type, source }) {
      commit(MATERIAL.TAB.SELECT, { type, source })
      commit(EDIT.MODAL.OPEN, 'material')
    },

    [MATERIAL.INIT]({ commit }, { url, params = '' }) {
      return Http.get(`${url}${params}`)
        .then(({ result }) => {
          commit(MATERIAL.INIT, { data: result })
        })
    },

    [MATERIAL.ADD]({ commit }, data) {
      return Http.post('/user/source', data)
        .then(({ result }) => commit(MATERIAL.ADD, result))
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

    /** 物品3D */
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
