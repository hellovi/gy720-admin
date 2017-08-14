import Http from '@/utils/http'

// 常量
const DEFAULT_CATE_ID = 8

// 接口
const GET_CATELIST_API = '/make/panocate/lists'
const DELETE_CATE_API = '/make/panocate/remove'
const CREATE_CATE_API = '/make/panocate/add'
const GET_WORKLIST_API = '/make/pano/lists'
const TRANSER_WORKS_API = '/make/pano/changepanocate'
const DELETE_WORK_API = '/make/pano/remove'

class Request {
  // 分类相关请求

  /**
   * 请求分类列表
   * @return {Promise/Array} data - 分类列表
   */
  static getCatelist() {
    return Http.get(GET_CATELIST_API)
      .then(({ result: { cates } }) => cates)
  }

  /**
   * 新增作品分类
   * @param {String} cateName - 新增分类的名称
   * @return {Promise} data - 新增分类id
   */
  static createCate(newcate) {
    return Http.post(CREATE_CATE_API, {
      cate_name: newcate.name,
    })
      .then(({ result }) => result.id)
  }

  /**
   * 删除作品分类
   * @param {int} cateId
   * @return {Promise}
   */
  static deleteCate(cateId) {
    return Http.post(DELETE_CATE_API, {
      id: cateId,
    })
  }

  // 作品相关请求

  /**
   * 请求作品列表数据
   * @param {Object} query - 当前路由query对象
   * @return {Promise/Array} data - 作品列表
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
    return Http.post(GET_WORKLIST_API, {
      cate_id,
      current_page,
      per_page,
    })
      .then(({ result }) => result)
  }

  /**
   * 移动作品到其他分类
   * @param {int} cateId - 目标分类id
   * @param {Array} workIds - 需要移动作品们的id
   * @return {Promise}
   */
  static updateWorksCate(cateId, workIds) {
    return Http.post(TRANSER_WORKS_API, {
      cate_id: cateId,
      pano_ids: workIds,
    })
  }

  /**
   * 删除作品
   * @param {int} workId - 需要删除的作品id
   * @return {Promise}
   */
  static deleteWork(workId) {
    return Http.post(DELETE_WORK_API, {
      pano_id: workId,
    })
  }
}

Request.defaultCateId = DEFAULT_CATE_ID

export default Request
