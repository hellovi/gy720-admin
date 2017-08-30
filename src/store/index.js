import Vue from 'vue'
import Vuex from 'vuex'
import DefaultAvatar from '@/assets/default-avatar.jpg'
import { Http } from '@/utils'
import { GLOBAL } from './mutationTypes'
import work from './work'
import message from './message'
import point from './point'
import purchase from './purchase'
import edit from './edit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      avatar: DefaultAvatar,
    },
  },

  modules: {
    work,
    message,
    point,
    purchase,
    edit,
  },

  mutations: {
    /**
     * 设置用户信息
     * 如果后端返回的信息中没有头像，必须使用默认头像
     * 这个写法稍微有点不干净，但可以确保每个使用到头像的地方都正常工作，而不需要各个地方单独做这个逻辑判断
     */
    [GLOBAL.USER.INIT](state, userInfo) {
      state.userInfo = {
        ...userInfo,
        ...(userInfo.avatar ? {} : { avatar: DefaultAvatar }),
      }
    },

    /**
     * 更新用户积分
     * 增加积分时，总积分和可用积分都要相应增加
     * 删减积分时，只删减可用积分，总积分不变
     */
    [GLOBAL.USER.UPDATE_POINT](state, update) {
      const { integral, integral_remain } = state.userInfo
      state.userInfo = {
        ...state.userInfo,
        integral: (update > 0) ? integral + update : integral,
        integral_remain: integral_remain + update,
      }
    },
  },

  actions: {
    [GLOBAL.USER.INIT]({ commit }) {
      return Http.get('/user/info')
        .then(({ result }) => commit(GLOBAL.USER.INIT, result))
    },
  },
})
