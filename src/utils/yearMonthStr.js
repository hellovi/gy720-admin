/**
 * 当前年月字符串格式化
 * @author chenliangshan
 * @version 2017/08/29
 * @returns {string}
 */
const yearMonthStr = () => {
  const year = new Date().getFullYear()
  const month = (+new Date().getMonth() + 1) > 10 ? (+new Date().getMonth() + 1) : `0${(+new Date().getMonth() + 1)}`
  return `${year}${month}`
}

export default yearMonthStr
