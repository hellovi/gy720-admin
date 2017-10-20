/**
 * @desc 高级编辑 - 导览 - 请求模块
 *
 * @author huojinzhao
 */

import Http from '@/utils/http'

const TOUR_API = '/user/panomap'
const TOUR_VIEWS_API = '/user/panomapscene/batchupdate'
const DELETE_TOUR_VIEW_API = '/user/panomapscene'
const TOUR_SCENES_API = '/user/panomapscene/scenes'

/**
 * @desc    编辑导览详情的数据结构
 *
 * @typedef {Object}  TourInfo
 *
 * @prop    {number}  pano_id
 * @prop    {string}  name     - max:4
 * @prop    {string}  image    - 图片地址
 */

export default class Ajax {
  /* ------ initialization ------ */

  static defaultPanoId

  /* ------ assistance ------ */

  static setParamUrl({ host, id }) {
    return `${host}/${id}`
  }

  /**
   * @desc 将query参数对象，转化成url
   *
   * @param   {string}    host
   * @param   {Object}    queries       -   query的rest对象
   *
   * @return  {string}    url
   */
  static setQueryUrl({ host, ...queries }) {
    const url = Object.keys(queries).reduce((
      acc,
      val,
      index,
    ) => {
      const separator = index === 0 ? '' : '&'
      return `${acc}${separator}${val}=${queries[val]}`
    }, `${host}?`)

    return url
  }

  /* ------ tour application ------ */

  /**
   * @desc    获取导览列表
   *
   * @method  GET
   *
   * @return  {Promise}   type: Array   - 导览列表
   */
  static readTourlist() {
    return Http.get(this.setQueryUrl({
      host: TOUR_API,
      pano_id: this.defaultPanoId,
    }))
      .then(({ result }) => result)
  }

  /**
   * @desc    获取单个导览详情
   *
   * @method  GET
   * @param   {number}    tourId        - 导览id
   *
   * @return  {Promise}   type: Object  - 导览详情
   */
  static retrieveTourInfo(tourId) {
    return Http.get(this.setParamUrl({
      host: TOUR_API,
      id: tourId,
    }))
      .then(({ result }) => result)
  }

  /**
   * @desc  添加导览
   *
   * @method  POST
   * @param   {TourInfo}   tourInfo      - 导览信息
   *
   * @return  {Promise}    type: Object  - 创建后的导览详情
   */
  static insertTourInfo(tourInfo) {
    return Http.post(this.setQueryUrl({
      host: TOUR_API,
      pano_id: this.defaultPanoId,
    }), tourInfo)
      .then(({ result }) => result)
  }

  /**
   * @desc  修改导览
   *
   * @method  PUT
   * @param   {TourInfo}   tourInfo      - 导览信息
   *
   * @return  {Promise}    type: Object  - 修改后的导览详情
   */
  static updateTourInfo(tourInfo) {
    return Http.put(this.setParamUrl({
      host: TOUR_API,
      id: tourInfo.id,
    }), tourInfo)
      .then(({ result }) => result)
  }

  /**
   * @desc  删除导览
   *
   * @method  Delete
   * @param   {number}      tourId
   *
   * @return  {Promise}     dataless
   */
  static removeTourInfo(tourId) {
    return Http.delete(this.setParamUrl({
      host: TOUR_API,
      id: tourId,
    }))
  }

  /* ------ view application ------ */

  /**
   * @desc  获取场景选择列表
   *
   * @method  GET
   *
   * @return  {Promise}     type:Array   - 场景列表
   */
  static readScenelist(tourId) {
    return Http.get(this.setQueryUrl({
      host: TOUR_SCENES_API,
      pano_id: this.defaultPanoId,
      pano_map_id: tourId,
    }))
      .then(({ result }) => result)
  }

  /**
   * @desc  批量添加/修改场景视角
   *
   * @method  POST
   * @param   {Array}       viewlist
   * @param   {number}      tourId
   *
   * @return  {Promise}     dataless
   */
  static replaceViewConfig(viewlist, tourId) {
    return Http.post(this.setQueryUrl({
      host: TOUR_VIEWS_API,
      pano_id: this.defaultPanoId,
      pano_map_id: tourId,
    }), { update: viewlist })
  }

  /**
   * @desc 删除场景视角
   *
   * @method  DELETE
   * @param   {number}      viewId
   *
   * @return  {Promise}     dataless
   */
  static deleteSceneView(viewId) {
    return Http.delete(this.setParamUrl({
      host: DELETE_TOUR_VIEW_API,
      id: viewId,
    }))
  }
}
