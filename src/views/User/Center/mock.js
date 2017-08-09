export default {
  // 全国访问数据 -- map图
  // 全国数据
  nation: [
    { name: '北京', value: 12 },
    { name: '内蒙古', value: 34 },
    { name: '福建', value: 56 },
    { name: '海南', value: 10 },
    { name: '新疆', value: 23 },
  ],
  // 访问省份TOP5 -- pie图
  // 前五数据
  province: [
    { name: '北京', value: 12 },
    { name: '内蒙古', value: 34 },
    { name: '福建', value: 56 },
    { name: '海南', value: 10 },
    { name: '新疆', value: 23 },
  ],
  // 月浏览统计 -- 折线图
  review: {
    date: ['04-01', '04-02', '04-03'],
    data: {
      pc: [1, 3, 4],
      tablet: [2, 4, 6],
      mobile: [3, 9, 1],
    },
  },
}
