/**
 * 用户中心/个人中心/统计组件 配置
 *
 * @author huojinzhao
 */

import echarts from 'echarts'
import chinaJSON from '@/assets/resource/china.json'
import lineOption from './lineOption'
import mapOption from './mapOption'
import pieOption from './pieOption'


export default function ({ line, pie, map }) {
  const lineChart = echarts.init(line.dom)
  lineChart.setOption(lineOption(line.data))

  echarts.registerMap('china', chinaJSON)
  const mapChart = echarts.init(map.dom)
  mapChart.setOption(mapOption(map.data))

  const pieChart = echarts.init(pie.dom)
  pieChart.setOption(pieOption(pie.data))
}
