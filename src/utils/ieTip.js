import browser from './browser'

const ieTip = () => {
  const isWebGL = ((el) => {
    try {
      return !!(window.WebGLRenderingContext && (el.getContext('webgl') || el.getContext('experimental-webgl')))
    } catch (err) {
      return false
    }
  })(document.createElement('canvas'))

  if (browser.lteIE(9) || !isWebGL) {
    const tips = '<style> .change-browser-tips { font-size: 16px; line-height: 1.7em; width: 800px; position: fixed; top: 50px; left: 50%; z-index: 999999; margin-left: -400px; color: #fff } .change-browser-tips .cont { width:100%; position: absolute; top: 0; left: 0; z-index: 999999; padding: 20px } .change-browser-tips .bg { width: 800px; height: 200px; background: #333; opacity: .72; filter: alpha(opacity=72); position: absolute; top: 0; left: 0; z-index: 9999; padding: 20px } .change-browser-tips h4 { text-align: center; line-height: 3em; font-size: 15px; margin: 0; } .change-browser-tips .browser { text-align: center; overflow: hidden; margin: 6px 0 0 } .change-browser-tips .browser a { display: inline-block; margin: 0 4px } .change-browser-tips .cont p { margin-bottom: 0; color: #fff; } .change-browser-tips .close { color: #fff; position: absolute; top: 15px; right: 15px; z-index: 10000; font-size: 20px; cursor: pointer; opacity: 0.8; } </style> <div class="change-browser-tips"> <div class="close" id="ieTipsClose">X</div> <div class="cont"> <p>您的浏览器版本过低或使用了IE兼容模式。为了更好的使用体验，请升级浏览器或切换浏览模式。</p> <h4>或下载使用我们推荐的浏览器：</h4> <div class="browser"> <a target="_blank" title="谷歌浏览器" href="http://rj.baidu.com/soft/detail/14744.html"><img width="80" src="/assets/3.0.1/images/common/chrome.png" alt="chrome"></a> <a target="_blank" title="safari浏览器" href="https://www.apple.com/cn/safari/"><img width="80" src="/assets/3.0.1/images/common/safari.png" alt="safari"></a> </div> </div> <span class="bg"></span> </div>'
    document.write(tips)

    document.querySelector('#ieTipsClose').addEventListener('click', () => {
      document.querySelector('.change-browser-tips').style.display = 'none'
    })
  }
}

export default ieTip()
