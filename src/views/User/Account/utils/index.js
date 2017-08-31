/**
 * @author  chenliangshan
 * @version 2017/08/11
 */

/*eslint-disable*/

/**
 * 字符串转为数组
 * @param dataString  {String}
 * @returns {Array}
 */

export const strToArr = (dataString, split = ',') => {
  const arr = []
  const dataArr = dataString ? dataString.split(split) : []
  dataArr.forEach((data) => {
    arr.push(isNaN(parseInt(data, 10)) ? data : +data)
  })
  return arr
}
