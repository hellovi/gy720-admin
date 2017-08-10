/**
 * 用户中心 - 个人中心状态控制
 * @module @/store/userClient/center
 * @author Hjz
 * @version 2017-05-06 Hjz
 * @version 2017-06-02 hjz 重构，并且添加懒加载支持
 */
import { CENTER } from '@/store/mutationTypes'
import { Url, Http } from '@/utils'

/**
 * @function 将图片相对地址转化为七牛静态地址
 * @param {Array} list  数据数组 pano:result.data 另外 result.lists.data
 * @return {Array} 更新完地址的数据列表
 */
const toQiniu = (arr) => {
  let list = []
  if (!arr) return list
  list = arr.map((item) => {
    if (item.thumb) item.thumb = Url.static(`${item.thumb}`)
    if (item.avatar) item.avatar = Url.static(`${item.avatar}`)
    if (item.pano) item.pano = toQiniu(item.pano)
    return item
  })
  return list
}

/**
 * @function 关系数据按照点赞数排序
 * @param {Array} list  数据数组 pano:result.data 另外 result.lists.data
 * @return {Array} 排序好的数据列表
 */
const sortlist = (list) => {
  const sortArr = list
  sortArr.sort((a, b) => b.pano_like_sum - a.pano_like_sum)
  return sortArr
}

/**
 * @function 发送Http请求，并处理好请求回来的数据
 * @param {String} url  请求地址
 * @param {function} list  处理数据的函数
 * @return {Promise} res为返回数据
 */
const listAjax = (url, cur = 1, callback) =>
  Http.get(`${url}?current_page=${cur}&paginate=8`)
    .then((res) => {
      // 接口不统一，/user/pano 是放在result里，collection 是在result.list内
      const result = res.result.lists || res.result
      if (result && result.data && callback) {
        result.data = callback(result.data)
      }
      result.data = toQiniu(result.data)
      return Promise.resolve(result || {})
    })


export default {
  state: {
    releaseList: null,
    collectionList: null,
    fansList: null,
    followsList: null,
    loadlock: false,
    linktype: '',
  },

  actions: {
    [CENTER.INITIALIZE]({ commit }) {
      Promise.all([
        listAjax('/user/pano'),
        listAjax('/user/favorite/lists'),
        listAjax('/user/follow/fanslists', 1, sortlist),
        listAjax('/user/follow/followlists', 1, sortlist),
      ]).then(resultArr => commit(CENTER.INITIALIZE, resultArr))
    },

    [CENTER.LIST_UPDATE]({ commit, state }) {
      let pledge = null
      let cur = 1
      if (state.lazylock) return null
      switch (state.linktype) {
        case 'release':
          cur = state.releaseList.current_page
          listAjax('/user/pano', cur + 1)
            .then(res => commit(CENTER.LIST_UPDATE, res))
          break
        case 'collection':
          cur = state.collectionList.current_page
          listAjax('/user/favorite/lists', cur + 1)
            .then(res => commit(CENTER.LIST_UPDATE, res))
          break
        case 'fans':
          cur = state.fansList.current_page
          pledge = listAjax('/user/follow/fanslists', cur + 1, sortlist)
            .then(res => commit(CENTER.LIST_UPDATE, res))
          break
        case 'follows':
          cur = state.followsList.current_page
          pledge = listAjax('/user/follow/followlists', cur + 1, sortlist)
            .then(res => commit(CENTER.LIST_UPDATE, res))
          break
        default:
      }
      return pledge
    },
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    [CENTER.INITIALIZE](state, resultArr) {
      [state.releaseList,
        state.collectionList,
        state.fansList,
        state.followsList] = resultArr
    },

    [CENTER.LINK_UPDATE](state, to) {
      switch (to.path) {
        case '/user-client/center/recent':
          state.linktype = 'release'
          break
        case '/user-client/center/collection':
          state.linktype = 'collection'
          break
        case '/user-client/center/fans':
          state.linktype = 'fans'
          break
        case '/user-client/center/follows':
          state.linktype = 'follows'
          break
        default:
          window.console.log('个人中心前端路由发生跳转错误')
      }
    },

    [CENTER.LIST_UPDATE](state, result) {
      switch (state.linktype) {
        // 发布和收藏暂时不用做懒加载
        // case 'release':
        //   state.releaseList.current_page = result.current_page
        //   state.releaseList.data.concat(result.data)
        //   break
        // case 'collection':
        //   state.collectionList.current_page = result.current_page
        //   state.collectionList.data.concat(result.data)
        //   break
        case 'fans':
          state.fansList.current_page = result.current_page
          state.fansList.data = state.fansList.data.concat(result.data)
          break
        case 'follows':
          state.followsList.current_page = result.current_page
          state.fansList.data = state.followsList.data.concat(result.data)
          break
        default:
        // window.console.log('前端路由发生跳转错误')
      }
    },

    // 控制加载锁，true锁住不让加载，false开放
    [CENTER.LOAD_LOCK](state, bool) {
      state.loadlock = bool
    },
  },

  getters: {
    centerDataList(state) {
      let dataList = null
      switch (state.linktype) {
        case 'release':
          dataList = state.releaseList
          break
        case 'collection':
          dataList = state.collectionList
          break
        case 'fans':
          dataList = state.fansList
          break
        case 'follows':
          dataList = state.followsList
          break
        default:
          dataList = state.releaseList
        // window.console.log('前端路由发生跳转错误')
      }
      return dataList
    },
  },
}
