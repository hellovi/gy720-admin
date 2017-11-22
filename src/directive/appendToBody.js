/**
 * 将元素插入至body元素上
 * 如：嵌套的 Dialog 必须指定该指令
 * @author  chenliangshan
 * @version 2017/11/22
 */

export default {
  name: 'append-to-body',

  bind(el) {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    el.children[0].style.top = '10%'
    document.body.appendChild(el)
  },

  inserted() {

  },

  update() {

  },
}
