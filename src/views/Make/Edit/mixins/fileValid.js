/*
 * 文件校验
 * @Author: chenliangshan
 * @Date: 2018-01-17 11:28:01
 * @Last Modified by: chenliangshan
 * @Last Modified time: 2018-01-17 11:28:40
 */

export default {
  methods: {
    isFileValid({ ratio, dimension, dimensionTip }, image) {
      const { width, height } = image
      const currentRatio = width / height
      if (dimension && !dimension(width, height)) {
        this.$message.error(`图片必须${dimensionTip}`)
        return false
      } else if (ratio) {
        const [w, h] = ratio
        if (currentRatio !== w / h) {
          this.$message.error(`图片比例必须为${w}:${h}`)
          return false
        }
      }

      return true
    },
  },
}
