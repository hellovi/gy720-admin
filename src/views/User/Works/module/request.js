import Http from '@/utils/http'

// 常量
const DEFAULT_CATE_ID = 8

// 接口
const GET_CATELIST_API = '/make/panocate/lists'
const GET_WORKLIST_API = '/make/pano/lists'
const DELETE_CATE_API = '/make/panocate/remove'
const CREATE_CATE_API = '/make/panocate/add'

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
   * @return {Promise}
   */
  static createCate(newcate) {
    return Http.post(CREATE_CATE_API, {
      cate_name: newcate.name,
    })
      .then(({ result }) => result.id)
  }

  /**
   * 删除作品分类
   * @param {Number} cateId
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
}

Request.defaultCateId = DEFAULT_CATE_ID

export default Request
