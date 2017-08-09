import * as views from '@/views'

export default {
  path: '/user-clinet/purchase',
  component: views.Purchase,
  meta: {
    title: '购买服务',
  },
  children: [
    {
      path: 'orders',
      component: views.PurchaseOrders,
    },
  ],
}
