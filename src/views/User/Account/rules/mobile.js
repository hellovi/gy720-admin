/**
 * 手机号码格式校验
 * @author  chenliangshan
 * @version 2017/08/29
 */

/*eslint-disable*/

const mobileRule = (rule, value, callback, source, options) => {
  let errors = []

  const pattern = /^1[3|4|5|7|8][0-9]\d{8}$/
  if (!pattern.test(value)) {
    errors.push(options.messages)
  }
  callback(errors)
}

export default mobileRule
