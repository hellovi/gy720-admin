import Http from '@/utils/http'

const GET_CATELIST_API = '/make/panocate/lists'
const GET_WORKLIST_API = '/make/pano/lists'

class Request {
  /**
   * 请求分类列表
   * @return {Promise/Array} data - 分类列表
   */
  static getCatelist() {
    return Http.get(GET_CATELIST_API)
      .then(({ result: { cates } }) => cates)
  }

  /**
   * 请求作品列表数据
   * @param {Object} query - 当前路由query对象
   * @return {Promise/Array} data - 作品列表
   */
  static getWorklist(
    {
      cate_id = 8,
      current_page = 1,
      per_page = 8,
    } = {
      cate_id: 1,
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

export default Request
