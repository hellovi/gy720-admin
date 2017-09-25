/**
 * 密码格式校验
 * @author  chenliangshan
 * @version 2017/08/17
 */

const pwdRule = (rule, value, callback, source, options) => {
  // eslint-disable-next-line
  let errors = []
  const pattern = new RegExp("[%`~!@#$^&*()=|{}':;',\\[\\].<> /?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？\"\\\\+-]")

  if (pattern.test(value)) {
    errors.push(options.messages)
  }
  callback(errors)
}

export default pwdRule
