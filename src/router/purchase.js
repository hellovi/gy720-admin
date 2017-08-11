import * as views from '@/views'

export default {
  path: '/user-client/purchase',
  component: views.Purchase,
  meta: {
    title: '购买服务',
  },
  children: [
    {
      path: '',
      redirect: 'buy',
    },
    {
      path: 'buy',
      component: views.PurchaseBuy,
    },
    {
      path: 'orders',
      component: views.PurchaseOrders,
    },
    {
      path: 'orders/:ordersn',
      component: views.PurchaseDetail,
    },
  ],
}
