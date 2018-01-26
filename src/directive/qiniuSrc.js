/**
 * qiniu图片链接指令
 * @author chenliangshan
 * @version 2017/09/14
 */

import { Url } from '@/utils'
import DefaultImg from '@/assets/default-avatar.jpg'

const getSrc = (el, binding) => {
  const src = binding.value
  const query = el.dataset && el.dataset.query ? el.getAttribute('data-query') : ''
  const defaultSrc = el.dataset && el.dataset.src ? el.getAttribute('data-src') : ''

  if (src) {
    return `${Url.static(src)}${query.includes('imageMogr2/crop') || ''}`
  }
  return Url.static(defaultSrc || DefaultImg)
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
