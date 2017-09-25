/**
 * 比较两值是否相等
 * @author  chenliangshan
 * @version 2017/08/19
 */

const noEqualRule = (rule, value, callback, source, options) => {
  // eslint-disable-next-line
  let errors = []

  if (value === rule.refs[rule.equal].value) {
    errors.push(options.message)
  }
  callback(errors)
}

export default noEqualRule
