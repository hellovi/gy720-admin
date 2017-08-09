import * as views from '@/views'

export default {
  path: '/user-client/point',
  component: views.Point,
  meta: {
    title: '我的积分',
  },
  children: [
    {
      path: '',
      redirect: 'task',
    },
    {
      path: 'task',
      component: views.PointTask,
    },
    {
      path: 'exchange',
      component: views.PointExchange,
      children: [
        {
          path: '',
          redirect: 'rule',
        },
        {
          path: 'rule',
          component: views.PointExchangeRule,
        },
        {
          path: 'record',
          component: views.PointExchangeRecord,
        },
      ],
    },
    {
      path: 'log',
      component: views.PointLog,
    },
    {
      path: 'rule',
      component: views.PointRule,
    },
  ],
}
