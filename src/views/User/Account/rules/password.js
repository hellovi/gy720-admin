/**
 * 密码格式校验
 * @author  chenliangshan
 * @version 2017/08/17
 */

/*eslint-disable*/

const pwdRule = (rule, value, callback, source, options) => {
  let errors = []
  const pattern = new RegExp("[%`~!@#$^&*()=|{}':;',\\[\\].<> /?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？\"\\\\+-]")

  if (pattern.test(value)) {
    errors.push(options.messages)
  }
  callback(errors)
}

export default pwdRule
