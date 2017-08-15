import * as views from '@/views'

const ACCOUNT_PATH = '/user-client/account'

export default {
  path: ACCOUNT_PATH,
  component: views.Account,
  redirect: `${ACCOUNT_PATH}/info`,
  meta: {
    title: '账号管理',
  },
  children: [
    {
      path: 'info',
      component: views.AccountInfo,
      meta: {
        title: '修改资料',
      },
    },
    {
      path: 'password',
      component: views.AccountPassword,
      meta: {
        title: '修改密码',
      },
    },
    {
      path: 'bind',
      component: views.AccountBind,
      meta: {
        title: '账号绑定',
      },
    },
  ],
}
