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
    [MATERIAL.CREATE](state) {
      state.active = true
    },
    [MATERIAL.DESTROY](state) {
      // 销毁时进行重置等处理
      state.active = false
    },
  },

  actions: {
    [MATERIAL.CREATE]({ commit }) {
      commit(MATERIAL.CREATE)
    },
    [MATERIAL.DESTROY]({ commit }) {
      commit(MATERIAL.DESTROY)
    },
  },
}
