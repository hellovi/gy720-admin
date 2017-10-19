/**
 * 用户中心/个人中心/统计组件 配置
 *
 * @author huojinzhao | chenliangshan
 */

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
import chinaJSON from '@/assets/resource/china.json'
import lineOption from './lineOption'
import mapOption from './mapOption'
import pieOption from './pieOption'

// 引入chart
import('echarts/lib/chart/line')
import('echarts/lib/chart/pie')
import('echarts/lib/chart/map')

// 引入提示框和标题组件
import('echarts/lib/component/tooltip')
import('echarts/lib/component/title')
import('echarts/lib/component/toolbox')
import('echarts/lib/component/visualMap')
import('echarts/lib/component/legendScroll')


export default function ({ line, pie, map }) {
  const lineChart = echarts.init(line.dom)
  lineChart.setOption(lineOption(line.data))

  echarts.registerMap('china', chinaJSON)
  const mapChart = echarts.init(map.dom)
  mapChart.setOption(mapOption(map.data))

  const pieChart = echarts.init(pie.dom)
  pieChart.setOption(pieOption(pie.data))
}
