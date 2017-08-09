import * as views from '@/views'

export default {
  path: 'user-client/account',
  component: views.Account,
  meta: {
    title: '账号管理',
  },
  children: [
    {
      path: 'info',
      component: views.AccountInfo,
    },
    {
      path: 'password',
      component: views.AccountPassword,
    },
    {
      path: 'bind',
      component: views.AccountBind,
    },
  ],
}
