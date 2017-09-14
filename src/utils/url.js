// TODO: 必须判断生产环境和开发环境
import { Regex } from '@/utils'

export default class Url {
  static install(Vue) {
    // eslint-disable-next-line
    Vue.prototype.$url = {
      static: this.static,
      host: this.host,
      staticHotSpots: this.staticHotSpots,
    }
  }

  static static(pathname) {
    return Regex.url(pathname) || Regex.base64(pathname) ? pathname : `http://l-statics.gy720.com/${pathname}`
  }

  static host(pathname) {
    return `https://l.gy720.com/${pathname}`
  }

  static staticHotSpots(pathname) {
    return `https://l.gy720.com/assets/3.0.1/lib/krpano/hoticon/${pathname}`
  }
}
