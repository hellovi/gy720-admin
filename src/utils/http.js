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

const defaultHeaders = {
  Accept: 'application/json',
  Authorization: `Bearer ${token}`,
}

class Http {
  static install(Vue) {
    /* eslint-disable no-param-reassign */
    Vue.prototype.$http = {
      get: Http.get,
      post: Http.post,
      patch: Http.patch,
      put: Http.put,
      delete: Http.delete,
      codepost: Http.codepost,
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
          throw res
        })
    }

    return res.json()
      .then((error) => {
        throw error
      })
  }

  /**
   * GET请求
   * @param {string} uri - 请求接口
   * @param {Object} headers - 指定额外的请求头
   * @returns {Promise}
   */
  static get(uri, headers = {}) {
    return fetch(uri, {
      headers: {
        ...defaultHeaders,
        ...headers,
      },
    })
      .then(Http.errorHandler)
  }

  /**
   * POST请求
   * @param {string} uri - 请求接口
   * @param {Object} body - 请求所需携带参数
   * @param {Object} headers - 指定额外的请求头
   * @returns {Promise}
   */
  static post(uri, body, headers = {}) {
    return fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders,
        ...headers,
      },
      body: JSON.stringify(body),
    })
      .then(Http.errorHandler)
  }

  /**
   * PATCH请求
   * @param {string} uri - 请求接口
   * @param {Object} body - 请求所需携带参数
   * @param {Object} headers - 指定额外的请求头
   * @returns {Promise}
   */
  static patch(uri, body, headers = {}) {
    return fetch(uri, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders,
        ...headers,
      },
      body: JSON.stringify(body),
    })
      .then(Http.errorHandler)
  }

  /**
   * PATCH请求
   * @param {string} uri - 请求接口
   * @param {Object} body - 请求所需携带参数
   * @param {Object} headers - 指定额外的请求头
   * @returns {Promise}
   */
  static put(uri, body, headers = {}) {
    return fetch(uri, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders,
        ...headers,
      },
      body: JSON.stringify(body),
    })
      .then(Http.errorHandler)
  }

  /**
   * DELETE请求
   * @param {string} uri - 请求接口
   * @param {Object} headers - 指定额外的请求头
   * @returns {Promise}
   */
  static delete(uri, headers = {}) {
    return fetch(uri, {
      method: 'DELETE',
      headers: {
        ...defaultHeaders,
        ...headers,
      },
    })
      .then(Http.errorHandler)
  }

  /**
   * 获取短信邮箱验证码 - POST请求
   * @param {string} uri - 请求接口
   * @param {Object} body - 请求所需携带参数
   * @param {Object} headers - 指定额外的请求头
   * @returns {Promise}
   */
  static codepost(uri, body, headers = {}) {
    return fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders,
        ...headers,
      },
      body: JSON.stringify(body),
      /**
       * 使用图形验证码校验
       * credentials为请求发送cookie配置
       * omit: 默认值，忽略cookie的发送
       * same-origin: 表示cookie只能同域发送，不能跨域发送
       * include: cookie既可以同域发送，也可以跨域发送
       */
      credentials: 'same-origin',
    })
      .then(Http.errorHandler)
  }
}

export default Http
