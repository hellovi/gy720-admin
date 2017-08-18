// import { Http } from '@/utils'
import { EDIT } from '../mutationTypes'

const { MATERIAL } = EDIT

export default {
  state: {
    materialState: {
      // 控制弹窗显示
      active: 0,
      // 素材类型 1-6为普通素材，7图文，8物品3d，9音频，10，其他
      type: 1,
      // 选择按钮状态
      selectStatus: 0,
      // 唤起来源
      selectFrom: '',
    },
    // 导出的数据
    materialExport: {
      // 导览图(右侧菜单)
      tour: {
        url: '',
        id: 0,
      },

      // 图文素材data(右侧菜单)
      menu: {
        title: '',
        id: 0,
      },
      // 图文素材data(热点设置)
      hotspot: {
        title: '',
        id: 0,
      },
      // 物品3D素材(热点设置)
      hotspot3d: {
        title: '',
        id: 0,
      },
      // 普通素材data(微信设置)
      wechat: {
        url: '',
        id: 0,
      },
    },
  },

  mutations: {
    [MATERIAL.CREATE]() {

    },

    [MATERIAL.SELECT](state) {
      window.console.log(88888)
      state.materialExport.tour.id = 777
      state.materialExport.tour.url = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=188704068,3401140839&fm=26&gp=0.jpg'
    },
  },

  actions: {
    [MATERIAL.CREATE]({ commit }, payload) {
      commit(EDIT.MODAL.OPEN, 'material')
      window.console.log(payload)
    },

    [MATERIAL.SELECT]({ commit }) {
      commit(MATERIAL.SELECT)
    },
  },
}
