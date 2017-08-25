/**
 * 异步加载脚本库
 * @author luminghuai | chenliangshan
 * @version 2017/08/25
 */

import Url from './url'

const dynamicLoadScript = (PATH) => {
  const FULL_PATH = Url.host(PATH)
  const libScript = document.querySelector(`script[src="${FULL_PATH}"]`)

  return new Promise((resolve) => {
    if (libScript) {
      // 已经加载过js库，直接执行实例初始化
      resolve()
    } else {
      // 动态写入script标签加载js库，确保在库加载完成后才初始化js实例
      const script = document.createElement('script')
      script.src = FULL_PATH
      script.addEventListener('load', () => {
        resolve()
      })
      document.body.appendChild(script)
    }
  })
}

export default dynamicLoadScript
