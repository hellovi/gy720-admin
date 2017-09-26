import Vue from 'vue'
import Router from 'vue-router'
import * as views from '@/views'
import { Url } from '@/utils'
import center from './center'
import works from './works'
import purchase from './purchase'
import account from './account'
import message from './message'
import point from './point'
import certificate from './certificate'
import publish from './publish'
import edit from './edit'

const isIE = (v) => {
  const b = document.createElement('b')
  b.innerHTML = `<!--[if IE ${v}]><i></i><![endif]-->`
  return b.getElementsByTagName('i').length === 1
}

Vue.use(Router)

const userCenterPath = '/user-client/center'

const router = new Router({
  base: isIE(9) ? '/ie' : '',
  mode: 'history',
  routes: [
    {
      path: !isIE(9) ? '/ie' : '',
      redirect: (to) => {
        const url = to.fullPath
        const hashIndex = url.indexOf('#')

        if (hashIndex !== -1 && !isIE(9)) {
          const queryIndex = url.indexOf('?')
          const fullPath = url.substr(hashIndex + 1)
          const path = queryIndex !== -1 ?
            url.substr(hashIndex + 1, queryIndex - hashIndex - 1) :
            url.substr(hashIndex + 1)
          const query = Url.getQuery(to.fullPath)
          return {
            fullPath,
            path,
            query,
            hash: '',
          }
        }
        return userCenterPath
      },
    },
    {
      path: '/user-client',
      component: views.User,
      children: [
        {
          path: '',
          redirect: userCenterPath,
        },
        center,
        works,
        purchase,
        account,
        message,
        point,
        certificate,
        publish,
      ],
    },
    // 跳转支付路由
    {
      path: '/user-client/pay',
      component: views.Pay,
    },
    edit,
    { path: '*', redirect: userCenterPath },
  ],
})

router.beforeEach((to, from, next) => {
  // 更换页面title
  to.matched.forEach((match) => {
    const { title } = match.meta
    if (title) {
      document.title = `${title} - 光鱼全景`
    }
  })

  next()
})

export default router
