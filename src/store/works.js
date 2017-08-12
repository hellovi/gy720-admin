/**
 * 用户中心 - 个人作品组件状态控制
 *
 * @author Hjz
 */
import http from '@/utils/http'
import { WORKS } from './mutationTypes'

export default {
  state: {
    catelist: [],

    worklist: [],

    // SELESELECTEDLIST,选中作品的id数组
    selectedlist: [],
  },

  actions: {
    // CATE
    [WORKS.CATE.INITIALIZE]({ commit }) {
      // 请求结果，result:{ cates：{...} }
      // id         分类ID
      // cate_name  分类名称
      // user_id    用户ID
      http.get('/make/panocate/lists')
        .then(({ result: { cates } }) => {
          commit(WORKS.CATE.INITIALIZE, cates)
        })
    },

    [WORKS.CATE.CREATE]({ commit }, cate_name) {
      return http.post('/make/panocate/add', { cate_name })
        .then((res) => {
          const id = res.result.id
          commit(WORKS.CATE.CREATE, { id, cate_name })
        })
    },

    [WORKS.CATE.DELETE]({ commit }, cateid) {
      return http.post('/make/panocate/remove', { id: cateid })
        .then(() => {
          commit(WORKS.SELECTEDLIST.INITIALIZE)
          commit(WORKS.CATE.DELETE, cateid)
        })
    },

    // WORKLIST
    [WORKS.WORKLIST.INITIALIZE]({ commit }, cateid) {
      // 请求参数
      // cate_id      int  分类ID
      // per_page     int  每页数量,默认为10
      // current_page int  第几页,默认为1
      // 请求结果，result:{..., data: [ {...}... ]}
      // compSelected需要用到 id 字段（作品id）
      http.post('/make/pano/lists', { cate_id: cateid })
        .then(({ result: { data } }) => {
          commit(WORKS.WORKLIST.INITIALIZE, data)
          // 每次切换分类时选中作品都应该清空
          commit(WORKS.SELECTEDLIST.INITIALIZE)
        })
    },

    [WORKS.WORKLIST.DELETE]({ commit }, compid) {
      http.post('/make/pano/remove', { pano_id: compid })
        .then(() => {
          commit(WORKS.WORKLIST.DELETE, compid)
          // 确保在选中列表中也删除
          commit(WORKS.SELECTEDLIST.UPDATE, compid, false)
        })
    },

    [WORKS.WORKLIST.UPDATE]({ commit, state }, tocateid) {
      return http.post('/make/pano/changepanocate', {
        cate_id: tocateid,
        pano_ids: state.selectedlist,
      }).then(() => {
        commit(WORKS.WORKLIST.DELETE, state.selectedlist)
        commit(WORKS.SELECTEDLIST.INITIALIZE)
        return Promise.resolve()
      })
    },
  },

  mutations: {
    // CATE
    [WORKS.CATE.INITIALIZE](state, catelist) {
      state.catelist = [...catelist]
    },

    [WORKS.CATE.CREATE](state, cate) {
      state.catelist.push(cate)
    },

    [WORKS.CATE.DELETE](state, cateid) {
      const catelist = state.catelist
      const target = catelist.findIndex(cate => cate.id === cateid)
      catelist.splice(target, 1)
    },

    // WORKLIST
    [WORKS.WORKLIST.INITIALIZE](state, worklist) {
      state.worklist = [...worklist]
    },

    [WORKS.WORKLIST.DELETE](state, compidList) {
      let deletelist = []
      const clist = state.worklist
      if (Array.isArray(compidList)) deletelist = compidList
      else deletelist = [compidList]
      deletelist.forEach((id) => {
        clist.forEach((comp, index, arr) => {
          if (comp.id === id) arr.splice(index, 1)
        })
      })
    },

    // SELESELECTEDLIST
    [WORKS.SELECTEDLIST.INITIALIZE](state) {
      state.selectedlist = []
    },

    [WORKS.SELECTEDLIST.UPDATE](state, [compid, boolToChose]) {
      const list = state.selectedlist
      if (boolToChose) list.push(compid)
      else list.splice(list.indexOf(compid), 1)
    },
  },
}
