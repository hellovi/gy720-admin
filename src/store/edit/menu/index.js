/**
 * 高级编辑 - 菜单
 *
 * @author huojinzhao
 */

import { EDIT } from '../../mutationTypes'
import Ajax from './ajax'

const { MENU } = EDIT

export default {
  state: {
    position: '',
    bottom_menu: [],
    right_menu: [],
    editionType: '',
    editionInfo: {},
  },

  mutations: {
    [MENU.INIT](state, {
      bottomList,
      rightList,
    }) {
      state.bottom_menu = bottomList
      state.right_menu = rightList
    },

    [MENU.LOCATE](state, position) {
      state.position = position
    },

    [MENU.CREATE](state, menuInfo) {
      state[state.position].push(menuInfo)
    },

    [MENU.DELETE](state, id) {
      state[state.position] = state[state.position]
        .filter(item => item.id !== id)
    },

    /**
     * @param {object} payload
     * @param {string} payload.editionType
     * @param {object} payload.editionInfo
     */
    [MENU.PREPARE_EDITION](state, payload) {
      state.editionType = payload.editionType
      state.editionInfo = payload.editionInfo
    },

    [MENU.FINISH_EDITION](state) {
      state.editionInfo = {}
    },

    [MENU.PATCH_INFO](state, menuInfo) {
      state[state.position] = state[state.position]
        .map((item) => {
          if (item.id === menuInfo.id) {
            return menuInfo
          }
          return item
        })
    },

    // drag操作直接在组件中修改了menulist排序
    // [MENU.REPLACE_LIST](state, menulist) {
    //   state[state.position] = menulist
    // },
  },

  actions: {
    [MENU.INIT]({ commit }, panoId) {
      Ajax.defaultPanoId = panoId

      Promise.all([
        Ajax.readMenulist('bottom_menu'),
        Ajax.readMenulist('right_menu'),
      ])
        .then(([bottomList, rightList]) => {
          commit(MENU.INIT, { bottomList, rightList })
        })
    },

    [MENU.CREATE]({ commit }, menuInfo) {
      return Ajax.insertMenu(menuInfo)
        .then(res => commit(MENU.CREATE, res))
    },

    [MENU.DELETE]({ commit }, id) {
      return Ajax.removeMenu(id)
        .then(() => commit(MENU.DELETE, id))
    },

    [MENU.PATCH_INFO]({ commit }, menuInfo) {
      return Ajax.updateMenuInfo(menuInfo)
        .then(() => {
          commit(MENU.PATCH_INFO, menuInfo)
          commit(MENU.FINISH_EDITION)
        })
    },

    [MENU.REPLACE_LIST]({ commit }, menulist) {
      return Ajax.replaceMenulist(menulist)
        .then(() => commit(MENU.REPLACE_LIST, menulist))
    },
  },
}
