/**
 * 异步加载脚本库
 * @author luminghuai | chenliangshan
 * @version 2017/08/25
 */

import { Url, Regex } from '@/utils'

const dynamicLoadScript = (PATH) => {
  const FULL_PATH = Regex.url(PATH) ? PATH : Url.host(PATH)
  let libScript = document.querySelector(`script[src="${FULL_PATH}"]`)

  return new Promise((resolve) => {
    // 如果这个tag不存在，则生成相关代码tag以加载代码
    if (libScript === null) {
      libScript = document.createElement('script')
      libScript.type = 'text/javascript'
      libScript.src = `${FULL_PATH}`
      const s = document.getElementsByTagName('head')[0]
      s.appendChild(libScript)
    }

    // 等待代码加载完成后回调
    if (libScript.loaded) {
      resolve()
    } else {
      libScript.addEventListener('load', () => {
        libScript.loaded = true
        resolve()
      })
    }
  })
}

export default dynamicLoadScript
