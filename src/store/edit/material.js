/*eslint-disable*/
import { Http } from '@/utils'
import { EDIT } from '../mutationTypes'

const { MATERIAL } = EDIT

const testData = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=188704068,3401140839&fm=26&gp=0.jpg'

// 导出的数据
const materialExport = () => (
  {
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
  }
)


export default {
  state: {
    materialState: {
      // 控制弹窗显示
      active: 0,
      // 素材类型 1-6为普通素材，7图文，8物品3d，9音频，10，其他
      type: 1,
      // 选择按钮状态
      selectStatus: 1,
      // 唤起来源
      selectFrom: '',
    },
    // 导出的数据
    materialExport: materialExport(),
    materialData: [],
  },

  mutations: {
    [MATERIAL.CREATE](state, payload) {
      state.materialData[payload.type] = payload.res.data
    },

    [MATERIAL.SELECT](state) {
      state.materialExport.tour.id = 777
      state.materialExport.tour.url = testData
    },

    [MATERIAL.RESET](state, payload) {
      const from = payload.from
      state.materialExport[from] = {
        ...materialExport()[from],
      }
    },
  },

  actions: {
    [MATERIAL.CREATE]({ commit }, payload) {
      commit(EDIT.MODAL.OPEN, 'material')
      // 调试接口
      const postdata = { file_ext: 'jpg', tag_id: payload.type, per_page: 20, current_page: 1 }
      return new Promise((resolve, reject) => {
        // Http.post('/make/source/lists', postdata)
        //   .then((res) => {
        //     commit(MATERIAL.CREATE, res.result)
        //     resolve()
        //   })
        //   .catch((res) => {
        //     window.console.log('无素材')
        //     window.console.log(res)
        //     reject()
        //   })

        // 临时数据
        const res = {
          data:[{id:3,file_path:testData,title:'测试素材'},
          {id:4,file_path:testData,title:'测试素材'},
          {id:5,file_path:testData,title:'测试素材'},
          ]
        }
        commit(MATERIAL.CREATE, {res, type: payload.type})
        // 临时数据结束

      })
    },

    [MATERIAL.SELECT]({ commit }) {
      commit(MATERIAL.SELECT)
    },
  },
}
