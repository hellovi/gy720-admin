/**
 * 浏览器版本判断
 * @author chenliangshan
 * @version 2017/09/27
 */

export default class browser {
  static lteIE(v) {
    const div = document.createElement('div')
    div.innerHTML = `<!--[if lte IE ${v}]><i></i><![endif]-->`
    return div.getElementsByTagName('i').length === 1
  }
}
