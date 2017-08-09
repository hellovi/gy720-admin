/**
 * 统计组件配置 - 地图配置
 *
 * @author huojinzhao
 *
 * @function mapOption // 全国访问统计图
 * @param  {Array} data // 服务器返回的json数据
 * @return {Object} // 返回echart的map型配置
 */

export default function (data) {
  // 取最大访问数和最小访问数，配置visualmap.inRangle
  const valueArr = data.map(value => value.value).sort((a, b) => a - b)
  let min = valueArr[0]
  min = min > 0 ? valueArr[0] : 0
  let max = valueArr[valueArr.length - 1]
  max = max > 1 ? valueArr[0] : 1

  // 返回配置项
  return {
    title: {
      text: '区域数据统计',
      left: 'center',
      itemStyle: { fontWeight: 500 },
      subtext: '最近一个月',
    },
    legend: {
      left: 0,
      data: ['访问次数'],
    },
    tooltip: {},
    toolbox: {
      show: true,
      right: 15,
      feature: {
        // 此处设置颜色无效
        // dataView: { buttonColor: '#3d6f99', buttonTextColor: '#3d6f99' },
        dataView: {},
        restore: {},
        saveAsImage: {},
        magicType: {},
      },
    },
    geo: {},
    visualMap: {
      type: 'continuous',
      text: ['高', '低'],
      calculable: true,
      inRange: {
        color: ['#a2d4e6', '#005eaa'],
        symbolSize: [min, max],
      },
    },
    series: [{
      type: 'map',
      name: '访问次数',
      map: 'china',
      itemStyle: {
        normal: {
          areaColor: '#a2d4e6',
          borderColor: '#d7e7eb',
        },
      },
      label: { normal: { show: true } },
      // 配置传入数据
      data: [...data],
    }],
  }
}
