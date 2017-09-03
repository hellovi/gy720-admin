/**
 * 错误信息处理
 * @author chenliangshan
 * @version 2017/09/03
 * @param options {string} 自定义错误信息
 * @param options {object} => { errors, status, message }
 * @param errors {object}  异常错误信息
 * @param status {object}  服务器错误信息
 * @param message {string} 自定义错误信息
 * @returns {array}
 */
const errorHandler = (options) => {
  if (typeof options === 'string') {
    return [options]
  }
  const { errors, status, message } = options
  if (errors) {
    return Object.values(errors).reduce((result, item) => result.concat(item), [])
  } else if (status) {
    const isObj = data => Object.prototype.toString.call(data) === '[object Object]'
    let errorArr = []
    if (isObj(status.reason)) {
      errorArr = Object.values(status.reason).reduce((result, item) => result.concat(item), [])
    } else {
      errorArr.push(status.reason)
    }
    return errorArr
  } else if (message) {
    return [message]
  }
  return ['服务端错误，请联系网站管理员或稍后重试']
}

export default errorHandler
