/**
 * Vue Ajax请求插件
 * @author lmh
 * @name Http
 * @class
 * @description 基于fetch api封装
 * @version 2017-06-05 根据后台接口的规范变动做了大量的完善
 */

import 'whatwg-fetch'

const token = localStorage.getItem('token')

class Http {
  static install(Vue) {
    /* eslint-disable no-param-reassign */
    Vue.prototype.$http = {
      get: Http.get,
      post: Http.post,
      patch: Http.patch,
      delete: Http.delete,
    }
  }

  // 统一抛出错误
  static errorHandler(res) {
    if (res.ok) {
      return res.json()
        // eslint-disable-next-line
        .then((res) => {
          if (!res.status || res.status.code === 1) {
            return res
          }
          throw new Error(res.status.reason)
        })
    }

    return res.json()
      .then((error) => {
        throw error
      })
  }

  static getUri(uri) {
    return `${Http.HOST}${uri}`
  }

  /**
   * GET请求
   * @param {String} uri - 请求接口
   * @returns {Promise}
   */
  static get(uri, headers = {}) {
    return fetch(Http.getUri(uri), {
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      credentials: 'same-origin',
    })
      .then(Http.errorHandler)
  }

  /**
   * POST请求
   * @param {String} uri - 请求接口
   * @param {Object} body - 请求所需携带参数
   * @returns {Promise}
   */
  static post(uri, body, headers = {}) {
    return fetch(Http.getUri(uri), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
      credentials: 'same-origin',
    })
      .then(Http.errorHandler)
  }

  /**
   * PATCH请求
   * @param {String} uri - 请求接口
   * @param {Object} body - 请求所需携带参数
   * @returns {Promise}
   */
  static patch(uri, body, headers = {}) {
    return fetch(Http.getUri(uri), {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
      credentials: 'same-origin',
    })
      .then(Http.errorHandler)
  }

  /**
   * DELETE请求
   * @param {String} uri - 请求接口
   * @returns {Promise}
   */
  static delete(uri, headers = {}) {
    return fetch(Http.getUri(uri), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      credentials: 'same-origin',
    })
      .then(Http.errorHandler)
  }
}

Http.HOST = process.env.NODE_ENV === 'production' ?
  'https://l.gy720.com' : ''

export default Http
