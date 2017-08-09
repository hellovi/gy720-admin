/**
 * 统计组件配置 - 饼图配置
 *
 * @author huojinzhao
 *
 * @function {pieOption} // 省TOP5统计图
 * @param  {type} data // 服务器返回的json数据
 * @return {type} // 返回echart的pie型配置
 */

export default function (data) {
  // 给legend.data
  const nameArr = data.map(value => value.name)

  return {
    title: {
      text: '访问省份TOP5',
      itemStyle: {
        fontWeight: 500,
      },
      left: 'center',
      subtext: '最近一个月',
      subtextStyle: {
        fontSize: 12,
      },
    },
    legend: {
      orient: 'vertical',
      left: 0,
      // 省份名称
      data: [...nameArr],
    },
    toolbox: {
      show: true,
      right: 0,
      feature: {
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: {
      show: false,
      type: 'category',
      nameLocation: 'start',
    },
    yAxis: {
      show: false,
    },
    series: [
      {
        name: '访问省份TOP5',
        type: 'pie',
        data: [
          {
            ...data[0],
            itemStyle: { normal: { color: '#c12e34' } },
          },
          {
            ...data[1],
            itemStyle: { normal: { color: '#ffcc00' } },
          },
          {
            ...data[2],
            itemStyle: { normal: { color: '#0098d9' } },
          },
          {
            ...data[3],
            itemStyle: { normal: { color: '#2b821d' } },
          },
          {
            ...data[4],
            itemStyle: { normal: { color: '#005eaa' } },
          },
        ],
      },
    ],
    tooltip: {
      show: true,
      formatter: '{a} <br/> {b} : {c} ({d}%)',
    },
  }
}
