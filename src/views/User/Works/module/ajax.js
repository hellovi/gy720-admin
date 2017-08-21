/**
 * 我的作品 - 请求模块
 *
 * @author huojinzhao
 */

import Http from '@/utils/http'

// 常量
const DEFAULT_CATE_ID = 8

// 接口
const CATE_API = '/user/panocategory'
const WORKS_API = '/user/pano'
const PUT_WORKS_CATE_API = '/user/pano/category'

class Ajax {
  // 分类相关请求

  /**
   * 请求分类列表信息
   *
   * @method GET
   * @return {Promise/Array} data - 分类列表
   */
  static getCatelist() {
    return Http.get(CATE_API)
      .then(({ result }) => result)
  }

  /**
   * 新增作品分类
   *
   * @method POST
   * @param {String} cateName - 新增分类的名称
   * @return {Promise/int} data - 新增分类id
   */
  static createCate(cateName) {
    return Http.post(`${CATE_API}/${cateName}`)
      .then(({ result }) => result.id)
  }

  /**
   * 删除作品分类
   *
   * @method DELETE
   * @param {Number} cateId
   * @return {Promise} data - needless
   */
  static deleteCate(cateId) {
    return Http.delete(`${CATE_API}/${cateId}`)
  }

  // 作品相关请求

  /**
   * 请求作品列表数据
   *
   * @method GET
   * @param {Object} query - 当前路由query对象
   * @return {Promise/Array} data - 作品分页列表详细信息
   */
  static getWorklist(
    {
      cate_id = DEFAULT_CATE_ID,
      current_page = 1,
      per_page = 8,
    } = {
      cate_id: DEFAULT_CATE_ID,
      current_page: 1,
      per_page: 8,
    },
  ) {
    const url = `${WORKS_API}
      ?cate_id=${cate_id}
      &current_page=${current_page}
      &per_page=${per_page}
    `
    return Http.get(url)
      .then(({ result }) => result)
  }

  /**
   * 移动作品到其他分类
   *
   * @method PUT
   * @param {int} cateId - 目标分类id
   * @param {Array} workIds - 需要移动作品们的id
   * @return {Promise} data - needless
   */
  static updateWorksCate(cateId, workIds) {
    return Http.put(PUT_WORKS_CATE_API, {
      pano_cate_id: cateId,
      ids: workIds,
    })
  }

  /**
   * 删除作品
   *
   * @method DELETE
   * @param {int} workId - 需要删除的作品id
   * @return {Promise} data - needless
   */
  static deleteWork(workId) {
    return Http.delete(`${WORKS_API}/${workId}`)
  }
}

Request.defaultCateId = DEFAULT_CATE_ID

export default Ajax
