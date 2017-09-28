/**
 * qiniu图片链接指令
 * @author chenliangshan
 * @version 2017/09/14
 */

import { Url, Regex } from '@/utils'
import DefaultAvatar from '@/assets/default-avatar.jpg'
import DefaultLoading from '@/assets/default-loading.gif'

const getSrc = (el, binding) => {
  const src = binding.value
  const query = el.dataset ? el.dataset.query : el.getAttribute('data-query')
  const type = el.dataset ? el.dataset.type : el.getAttribute('data-type')

  if (src) {
    if (query) {
      return `${Url.static(src)}${query}`
    } else if (Regex.base64(src)) {
      return src
    }
    return Url.static(src)
  }
  // 默认图片
  let srcUrl = src
  switch (type) {
    case 'avatar':
      srcUrl = DefaultAvatar
      break
    default :
      srcUrl = DefaultLoading
      break
  }
  return Url.static(srcUrl)
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
