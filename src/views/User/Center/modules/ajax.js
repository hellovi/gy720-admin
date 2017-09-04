/**
 * 个人中心 - 请求模块
 *
 * @author huojinzhao
 */

import { Http, Url } from '@/utils'

const RECENTWORKS_URL = '/user/pano'
const COLLECTIONS_URL = '/user/collection'
const FANS_URL = '/user/fans'
const FOLLOWS_URL = '/user/follow'
const TOGGLE_FOLLOW_URL = '/user/follower'
const TOGGLE_COLLECTION_URL = '/user/collect'

class Ajax {
  // static properties

  static defaultPerpage

  // 公共方法

  /**
   * 转化列表信息每项中的静态资源为七牛访问地址
   *
   * @param {Array} data - result.data
   * @return {Array} list - 转化后的新列表
   */
  static staticsToQiniu(data) {
    let list = []
    if (!data) return list
    list = data.map((item) => {
      const temp = {}
      if (item.thumb) temp.thumb = Url.static(`${item.thumb}`)
      if (item.avatar) temp.avatar = Url.static(`${item.avatar}`)
      if (item.pano) temp.pano = this.staticsToQiniu(item.pano)
      return { ...item, ...temp }
    })
    return list
  }

  /**
   * 请求数据公用方法
   *
   * @description 只是请求的url不同，req和res的处理都相同
   * @method GET
   * @param {String} url - 请求数据地址
   * @param {int} page - 请求第几页
   * @param {int} per - 每页数据数目
   * @param {Promise/Object} data - 数据信息，列表在res.data中
   */
  static readInfo(url, page = 1, per = Ajax.defaultPerpage) {
    return Http.get(`${url}?page=${page}&per_page=${per}`)
      .then(({ result }) => {
        const data = this.staticsToQiniu(result.data)
        return { ...result, ...{ data } }
      })
  }

  // 获取数据

  /**
   * 获取最近发布作品数据
   */
  static readRecentworks(page, per) {
    return this.readInfo(RECENTWORKS_URL, page, per)
  }

  /**
   * 获取我的收藏数据
   */
  static readCollections(page, per) {
    return this.readInfo(COLLECTIONS_URL, page, per)
  }

  /**
   * 获取我的粉丝数据
   */
  static readFans(page, per) {
    return this.readInfo(FANS_URL, page, per)
  }

  /**
   * 获取我的关注数据
   */
  static readFollows(page, per) {
    return this.readInfo(FOLLOWS_URL, page, per)
  }

  // 更新数据

  /**
   * 更新对某个作者的关注（关注/取消关注）
   *
   * @method GET
   * @param {int} id - 目标作者的id
   * @return {Promise} data - needless
   */
  static updateAuthorFollow(id) {
    return Http.get(`${TOGGLE_FOLLOW_URL}/${id}`)
  }

  /**
   * 更新对某个作品的收藏（收藏/取消收藏）
   *
   * @method GET
   * @param {int} id - 目标作品的id
   * @return {Promise} data - needless
   */
  static updatePanoCollection(id) {
    return Http.get(`${TOGGLE_COLLECTION_URL}/${id}`)
  }
}

export default Ajax
