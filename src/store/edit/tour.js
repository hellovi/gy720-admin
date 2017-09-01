/**
 * @desc  高级编辑 - 导览与UI交互state
 *
 * @author huojinzhao
 */

import { EDIT } from '../mutationTypes'

const { TOUR } = EDIT

export default {
  state: {
    toursAmount: 0,
  },

  mutations: {
    [TOUR.INCREASE](state, count) {
      state.toursAmount += count
    },

    [TOUR.DECREASE](state, count) {
      state.toursAmount -= count
    },
  },
}
