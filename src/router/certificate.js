import * as views from '@/views'

export default {
  path: '/user-client/certificate',
  component: views.Certificate,
  meta: {
    title: '摄影师认证',
  },
  children: [
    {
      path: 'result',
      component: views.CertificateResult,
    },
    {
      path: 'apply',
      component: views.CertificateApply,
    },
  ],
}
