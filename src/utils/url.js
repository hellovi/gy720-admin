// TODO: 必须判断生产环境和开发环境

export default class Url {
  static install(Vue) {
    // eslint-disable-next-line
    Vue.prototype.$url = {
      static(pathname) {
        return `http://statics.l.gy720.com/${pathname}`
      },
    }
  }
}
