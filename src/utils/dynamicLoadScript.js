/**
 * 异步加载脚本库
 * @author luminghuai | chenliangshan
 * @version 2017/08/25
 */

import Url from './url'

const dynamicLoadScript = (PATH) => {
  const regex = new RegExp('^((?:http|https)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i')
  const FULL_PATH = regex.test(PATH) ? PATH : Url.host(PATH)
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
