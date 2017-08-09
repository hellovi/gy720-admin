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
      component: views.CenterRecent,
    },
    {
      path: 'collection',
      component: views.CenterCollection,
    },
    {
      path: 'fans',
      component: views.CenterFans,
    },
    {
      path: 'follows',
      component: views.CenterFollows,
    },
    {
      path: 'statistics',
      component: views.CenterStatistics,
    },
  ],
}
