/**
 * 手机号码格式校验
 * @author  chenliangshan
 * @version 2017/09/20
 */

const mobileRule = (rule, value, callback, source, options) => {
  const errors = []

  const pattern = /^1[3|4|5|7|8][0-9]\d{8}$/
  if (!pattern.test(value)) {
    errors.push(rule.message ? options.messages : '手机号码格式有误')
  }
  callback(errors)
}

export default mobileRule
