/**
 * 比较两值是否相等
 * @author  chenliangshan
 * @version 2017/08/17
 */

/*eslint-disable*/

const equalRule = (rule, value, callback, source, options) => {
  let errors = []

  if (value !== rule.refs[rule.equal].value) {
    errors.push(options.message)
  }
  callback(errors)
}

export default equalRule
