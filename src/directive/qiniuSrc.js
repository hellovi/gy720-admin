/**
 * qiniu图片链接指令
 * @author chenliangshan
 * @version 2017/09/14
 */

import { Url, Regex } from '@/utils'

const getSrc = (el, binding) => {
  const src = binding.value
  const query = el.dataset ? el.dataset.query : el.getAttribute('data-query')

  if (query) {
    return `${Url.static(src)}${query}`
  } else if (Regex.base64(src)) {
    return src
  }
  return Url.static(src)
}

export default {
  name: 'qiniu-src',

  bind(el, binding) {
    const srcDom = el
    srcDom.src = getSrc(el, binding)
  },

  inserted() {

  },

  update(el, binding) {
    const srcDom = el
    srcDom.src = getSrc(el, binding)
  },
}
