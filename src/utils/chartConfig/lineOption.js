/**
 * 统计组件配置 - 折线图配置
 *
 * @author huojinzhao
 *
 * @function lineOption // 月统计图
 * @param  {Object} data // 服务器返回的json数据
 * @return {Object} // 返回echart的line型配置
 */

export default function lineOption(data) {
  return {
    title: {
      text: '作品浏览数据统计',
      left: 'center',
      itemStyle: {
        fontWeight: 500,
      },
      subtext: '最近一个月',
      subtextStyle: {
        fontSize: 12,
      },
    },
    tooltip: {
      show: true,
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
      nameLocation: 'start',
      // fetch返回数据
      data: [...data.date],
      nameTextStyle: {
        fontSize: 20,
        fontWeight: 'bolder',
      },
      inverse: false,
      boundaryGap: false,
    },
    yAxis: {},
    series: [
      {
        name: 'PC设备',
        type: 'line',
        // fetch返回数据
        data: [...data.data.pc],
      },
      {
        name: '移动设备',
        type: 'line',
        // fetch返回数据
        data: [...data.data.mobile],
        itemStyle: {
          normal: {
            color: '#e6b600',
          },
        },
      },
      {
        name: '平板设备',
        type: 'line',
        // fetch返回数据
        data: [...data.data.tablet],
        itemStyle: {
          normal: {
            color: '#2fabe0',
          },
        },
      },
    ],
    legend: {
      left: 0,
      data: [
        { name: 'PC设备' },
        { name: '移动设备' },
        { name: '平板设备' },
      ],
    },
  }
}
