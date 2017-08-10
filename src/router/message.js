import * as views from '@/views'

export default {
  path: '/user-client/message',
  component: views.Message,
  meta: {
    title: '我的消息',
  },
  children: [
    {
      path: '',
      redirect: 'system',
    },
    {
      path: 'system',
      component: views.MessageSystem,
    },
    {
      path: 'private',
      component: views.MessagePrivate,
    },
    {
      path: 'say',
      component: views.MessageSay,
    },
  ],
}
