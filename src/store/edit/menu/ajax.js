/**
 * 高级编辑 - 菜单 - 请求处理
 *
 * @author huojinzhao
 */

import Http from '@/utils/http'

const MENU_API = '/user/panomenu'
const SORT_MENU_API = '/user/panomenu/sort'

/**
 *菜单位置：
 *   position: bottom_menu底部菜单，right_menu 右侧菜单
 * 菜单类型：
 *   type_id: 1网址链接， 2图文信息，3地图导航，4电话拨号
 */

/**
 * @desc 菜单数据结构
 *
 * @typedef  {object} MenuInfo
 * @prop  {number}  pano_id     -   作品id
 * @prop  {number}  type_id     -   菜单类型
 * @prop  {string}  position    -   菜单位置
 * @prop  {string}  title       -   菜单名称
 * @prop  {string}  data        -   菜单数据
 * @prop  {number}  list_order  -   菜单排序
 * @prop  {number}  [id]        -   菜单id
 * @prop  {number}  [is_tips]   -   是否提示
 */

/* eslint-disable  prefer-template */

export default class Ajax {
  /* ------ property ------ */

  // id是hash_id
  static defaultPanoId = null

  /* ------ function ------ */

  /**
   * @desc 添加新菜单
   *
   * @method  POST
   * @param   {MenuInfo}  info
   * @return  {Promise}   dataless
   */
  static insertMenu(info) {
    return Http.post(MENU_API, info)
  }

  /**
   * @desc 获取菜单列表
   *
   * @method  GET
   * @param   {number}    position
   * @return  {Promise}   菜单列表
   */
  static readMenulist(position) {
    const url = MENU_API
      + `?pano_id=${this.defaultPanoId}`
      + `&position=${position}`

    return Http.get(url)
  }

  /**
   * @desc 删除菜单
   *
   * @method  DELETE
   * @param   {number}    id    - 菜单id
   * @return  {Promise}   dataless
   */
  static removeMenu(id) {
    const url = MENU_API
      + `/${id}`
      + `?pano_id=${this.defaultPanoId}`

    return Http.delete(url)
  }

  /**
   * @desc 修改菜单内容
   *
   * @method  PATCH
   * @param   {MenuInfo}  info
   * @return  {Promise}   dataless
   */
  static updateMenuInfo(info) {
    const url = MENU_API
      + `/${info.id}`
      + `?pano_id=${this.defaultPanoId}`

    return Http.patch(url, info)
  }

  /**
   * @desc 修改菜单列表排序
   *
   * @method POST
   * @param {MenuInfo[]} menulist
   */
  static replaceMenulist(menulist) {
    const url = SORT_MENU_API
      + `?pano_id=${this.defautlPanoId}`

    return Http.post(url, menulist)
  }
}
