/**
 * @desc    场景组件后端交互
 *
 * @author  huojinzhao
 */

import Http from '@/utils/http'

const SCENE_API = '/user/scene'

export default class Ajax {
  /* ------ Initialization ------ */

  static defaultPanoId

  /* ------ Assistance ------ */

  static setPanoQuery(host = SCENE_API) {
    return `${host}?pano_id=${this.defaultPanoId}`
  }

  static setSceneParam(id, host = SCENE_API) {
    return `${host}/${id}`
  }

  /* ------ Application ------ */

  /**
   * @desc    获取场景信息列表
   *
   * @method  GET
   *
   * @return  {Promise}     type: Array   - 场景列表
   */
  static readScenelist() {
    return Http.get(this.setPanoQuery())
      .then(({ result }) => result)
  }

  /**
   * @desc    添加新场景
   *
   * @method  POST
   * @param   {Object}      scenesInfo
   * @param   {Array}       scenesInfo.scenes
   *
   * @return  {Promise}     type: Array   - 场景列表（带id）
   */
  static insertScenes(scenesInfo) {
    return Http.post(this.setPanoQuery(), scenesInfo)
      .then(({ result }) => result)
  }

  /**
   * @desc    修改场景
   *
   * @method  PUT
   * @param   {Object}      sceneInfo
   *
   * @return  {Promise}     dataless
   */
  static replaceScene(sceneInfo) {
    return Http.put(
      this.setPanoQuery(this.setSceneParam(sceneInfo.id)),
      sceneInfo,
    )
  }

  /**
   * @desc    删除场景
   *
   * @method  DELETE
   * @param   {number}      sceneId
   *
   * @return  {Promise}     dataless
   */
  static removeScene(sceneId) {
    return Http.delete(
      this.setPanoQuery(this.setSceneParam(sceneId)),
    )
  }
}
