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
 * @function 发送Http请求，并处理好请求回来的数据
 * @param {String} url  请求地址
 * @param {int} paginate 每页数量
 * @param {int} cur 目标页
 * @return {Promise} res为返回数据
 */
const listAjax = (url, paginate = 8, cur = 1) =>
  Http.get(`${url}?current_page=${cur}&paginate=${paginate}`)
    .then((res) => {
      const result = res.result
      result.data = toQiniu(result.data)
      return result
    })

// 设置api常量
const API_RECENT = '/user/pano'
const API_COLLECTIONS = '/user/collection'
const API_FANS = '/user/fans'
const API_FOLLOWS = '/user/follow'

export default {
  state: {
    releaseList: null,
    collectionList: null,
    fansList: null,
    followsList: null,
    loadlock: false,
    linktype: '',
    paginate: 8,
  },

  actions: {
    [CENTER.INITIALIZE]({ commit, state }) {
      Promise.all([
        listAjax(API_RECENT, state.paginate),
        listAjax(API_COLLECTIONS, state.paginate),
        listAjax(API_FANS, state.paginate),
        listAjax(API_FOLLOWS, state.pagenate),
      ]).then(resultArr => commit(CENTER.INITIALIZE, resultArr))
    },

    // 作者列表懒加载
    [CENTER.LIST_UPDATE]({ commit, state }) {
      if (state.lazylock) return null

      switch (state.linktype) {
        case 'fans':
          return listAjax(
            API_FANS,
            state.paginate,
            state.fansList.current_page + 1,
          )
            .then(res => commit(CENTER.LIST_UPDATE, res))
        case 'follows':
          return listAjax(
            API_FOLLOWS,
            state.paginate,
            state.followsList.current_page + 1,
          )
            .then(res => commit(CENTER.LIST_UPDATE, res))
        default:
          return null
      }
    },
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    [CENTER.INITIALIZE](state, resultArr) {
      [
        state.releaseList,
        state.collectionList,
        state.fansList,
        state.followsList,
      ] = resultArr
    },

    [CENTER.SETPAGINATE](state, paginate) {
      state.paginate = paginate
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
          // window.console.log('个人中心前端路由发生跳转错误')
      }
    },

    [CENTER.LIST_UPDATE](state, result) {
      let listName = ''
      switch (state.linktype) {
        // 最近发布和收藏不做懒加载
        case 'fans':
          listName = 'fanList'
          break
        case 'follows':
          listName = 'followList'
          break
        default:
        // window.console.log('前端路由发生跳转错误')
      }
      state[listName].current_page = result.current_page
      state[listName].data = [...state[listName].data, ...result.data]
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
