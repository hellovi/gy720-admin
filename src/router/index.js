import Vue from 'vue'
import Router from 'vue-router'
import * as views from '@/views'
import center from './center'
import works from './works'
import purchase from './purchase'
import account from './account'
import message from './message'
import point from './point'
import certificate from './certificate'
import publish from './publish'
import edit from './edit'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/user-client',
      component: views.User,
      children: [
        {
          path: '',
          redirect: '/user-client/center',
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
    edit,
  ],
})

router.beforeEach((to, from, next) => {
  // 更换页面title
  to.matched.forEach((match) => {
    const { title } = match.meta
    if (title) {
      document.title = title
    }
  })

  next()
})

export default router
