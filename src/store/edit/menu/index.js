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
    menuEdition: null,
  },

  mutations: {
    [MENU.INIT](state, {
      bottomList,
      rightList,
      panoId,
    }) {
      Ajax.defaultPanoId = panoId
      state.bottom_menu = bottomList
      state.bottom_menu = rightList
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

    [MENU.PATCH_INFO](state, menuInfo) {
      state[state.position] = state[state.position]
        .map((item) => {
          if (item.id === menuInfo.id) {
            return menuInfo
          }
          return item
        })
    },

    [MENU.REPLACE_LIST](state, menulist) {
      state[state.position] = menulist
    },
  },

  actions: {
    [MENU.INIT]({ commit }, panoId) {
      Promise.all([
        Ajax.readMenulist('bottom_menu'),
        Ajax.readMenulist('right_menu'),
      ])
        .then(([bottomList, rightList]) => {
          commit(MENU.INIT, {
            bottomList,
            rightList,
            panoId,
          })
        })
    },

    [MENU.CREATE]({ commit }, menuInfo) {
      return Ajax.insertMenu(menuInfo)
        .then(() => commit(MENU.CREATE, menuInfo))
    },

    [MENU.DELETE]({ commit }, id) {
      return Ajax.removeMenu(id)
        .then(() => commit(MENU.DELETE, id))
    },

    [MENU.PATCH_INFO]({ commit }, menuInfo) {
      return Ajax.updateMenuInfo(menuInfo)
        .then(() => commit(MENU.PATCH_INFO, menuInfo))
    },

    [MENU.REPLACE_LIST]({ commit }, menulist) {
      return Ajax.replaceMenulist(menulist)
        .then(() => commit(MENU.REPLACE_LIST, menulist))
    },
  },
}
