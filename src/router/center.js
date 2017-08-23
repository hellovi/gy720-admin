import * as views from '@/views'

export default {
  path: '/user-client/center',
  component: views.Center,
  meta: {
    title: '个人中心',
  },
  children: [
    {
      path: '',
      redirect: 'recent',
    },
    {
      path: 'recent',
      component: views.CenterPanos,
    },
    {
      path: 'collections',
      component: views.CenterPanos,
    },
    {
      path: 'fans',
      component: views.CenterAuthors,
    },
    {
      path: 'follows',
      component: views.CenterAuthors,
    },
    {
      path: 'statistics',
      component: views.CenterStatistics,
    },
  ],
}
