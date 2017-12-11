/**
 * qiniu图片链接指令
 * @author chenliangshan
 * @version 2017/09/14
 */

import { Url, Regex } from '@/utils'
import DefaultAvatar from '@/assets/default-avatar.jpg'
import DefaultImg from '@/assets/default-img.gif'

const getSrc = (el, binding) => {
  const src = binding.value
  const query = el.dataset ? el.dataset.query : el.getAttribute('data-query')
  const type = el.dataset ? el.dataset.type : el.getAttribute('data-type')
  const defaultSrc = el.dataset ? el.dataset.src : el.getAttribute('data-src')
  const isNotCDNURL = url => Regex.base64(url) || url.includes('/assets/')

  let srcUrl = src
  if (src) {
    if (query) {
      return `${Url.static(src)}${query}`
    } else if (isNotCDNURL(src)) {
      return src
    }
  } else if (defaultSrc) {
    if (isNotCDNURL(defaultSrc)) {
      return defaultSrc
    }
    srcUrl = defaultSrc
  } else {
    // 默认图片
    switch (type) {
      case 'avatar':
        srcUrl = DefaultAvatar
        break
      default :
        srcUrl = DefaultImg
        break
    }
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
