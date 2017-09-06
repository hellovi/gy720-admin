import Http from '@/utils/http'
import { EDIT } from '../mutationTypes'

const { SCENE } = EDIT

export default {
  state: {
    list: [],
    public: {
      // scene_effect
      effect: false,
      /*
        'pc_commentate',
        'mobile_commentate',
        'bg_music',
        'commentate_sound',
      */
      narrate: false,
      // 'top_ad_img'
      sky: false,
      // 'bottom_ad_img'
      ground: false,
    },
  },

  actions: {
    /**
     * 获取场景信息
     * 返回当前选中场景（加载完默认为第一项）的id，以便调用热点接口时能确保拿到此id
     */
    [SCENE.INIT]({ commit }, pano_id) {
      return Http.get(`/user/scene?pano_id=${pano_id}`)
        .then(({ result }) => {
          commit(SCENE.INIT, result)
          commit(SCENE.SET_PUBLIC)
          return result[0].id
        })
    },

    [SCENE.UPDATE_LIST]({ commit }, list) {
      commit(SCENE.UPDATE_LIST, list)
      commit(SCENE.SET_PUBLIC)
    },
  },

  mutations: {
    /**
     * 获取场景数据
     * 把第一个场景设为当前场景
     */
    [SCENE.INIT](state, scenes) {
      state.list = [
        { ...scenes[0], active: true },
        ...scenes.slice(1),
      ]
    },

    /**
     * 更新某一个场景的信息
     * 若更新的属性是active，则必须把其它场景的active重置为false
     * @param {Object} state
     * @param {{ id: number, update: Object }} data
     */
    [SCENE.UPDATE](state, { id, update }) {
      state.list = state.list.map((scene) => {
        if (scene.id === id) {
          return { ...scene, ...update }
        }
        if (update.active) {
          return { ...scene, active: false }
        }
        return scene
      })
    },

    [SCENE.DELETE](state, id) {
      state.list = state.list
        .filter(scene => scene.id !== id)
    },

    [SCENE.UPDATE_LIST](state, list) {
      state.list = list.map((one) => {
        const target = state.list
          .find(item => item.id === one.id)
        return { ...target, ...one }
      })
    },

    [SCENE.SET_PUBLIC](state) {
      const checkout = (...props) => {
        const list = state.list
        const bool = list
          .every(item => props
            .every(key => item[key] && item[key] === list[0][key]))
        return bool
      }

      state.public = {
        effect: checkout('scene_effect'),
        narrate: checkout(
          'bg_music',
          'pc_commentate',
          'mobile_commentate',
          'commentate_sound',
        ),
        sky: checkout('top_ad_img'),
        ground: checkout('bottom_ad_img'),
      }
    },
  },

  getters: {
    /**
     * 当前场景
     */
    activeScene(state) {
      return state.list.find(scene => scene.active)
    },
  },
}
