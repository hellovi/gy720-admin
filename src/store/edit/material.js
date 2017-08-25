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

const { MATERIAL } = EDIT

const testData = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=188704068,3401140839&fm=26&gp=0.jpg'

// const MATERIAL_DICT = {
//   panos: 0,
// }

// 导出的数据
const getMaterialExport = () => ({
  tour: { url: '', id: 0 }, // 导览图(右侧菜单)
  wechat: { url: '', id: 0 }, // 普通素材data(微信设置)
  menu: { title: '', id: 0 }, // 图文素材data(右侧菜单)
  hotspot: { title: '', id: 0 }, // 图文素材data(热点设置)
  hotspot3d: { title: '', id: 0 }, // 物品3D素材(热点设置)
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
  },

  mutations: {
    [MATERIAL.TAB.SELECT](state, { type, source = '' }) {
      state.type = type
      state.source = source
    },

    [MATERIAL.INIT.LOAD](state, { type = state.type, data }) {
      state.materialData[type] = data
    },

    [MATERIAL.ADD](state, result) {
      state.materialData[state.type].data.unshift(result)
    },

    [MATERIAL.SELECT](state, { id, url }) {
      state.materialExport[state.source] = { id, url }
      state.source = ''
    },

    [MATERIAL.RESET](state, payload) {
      const from = payload.from
      state.materialExport[from] = {
        ...getMaterialExport()[from],
      }
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

    [MATERIAL.INIT.NORMALS]({ commit }, params = '') {
      // const { /* id: tag_id, */ url, method = 'post' } = MATERIAL_DICT[type]
      // { file_ext: 'jpg', tag_id, per_page: 20, current_page: 1 }
      return Http.get(`/user/source${params}`)
        .then(({ result }) => {
          commit(MATERIAL.INIT.LOAD, { data: result })
        })
        .catch(() => {
          commit(MATERIAL.INIT.LOAD, {
            data: [{ id: 3, file_path: testData, title: '测试素材' },
              { id: 4, file_path: testData, title: '测试素材' },
              { id: 5, file_path: testData, title: '测试素材' },
            ] })
        })
    },

    [MATERIAL.INIT.PANOS]({ commit }, params = '') {
      return Http.get(`/user/sourcescene${params}`)
        .then(({ result }) => {
          commit(MATERIAL.INIT.LOAD, { type: 'panos', data: result })
        })
    },

    [MATERIAL.ADD]({ commit }, data) {
      return Http.post('/user/source', data)
        .then(({ result }) => {
          commit(MATERIAL.ADD, result)
        })
    },
  },
}
