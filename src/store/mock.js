// 摄影师认证mock
export default {

  // 待审核

  // result: {
  //   certificate: {
  //     certificate_type: 10,
  //     name: 'aokami',
  //     number: '123456789',
  //     front: '1.jpg',
  //     back: '2.jpg',
  //     certificate_status: 10,
  //     note: null,
  //     accept: 1,
  //     certificate_status_name: '待审核',
  //   },
  //   condition: {
  //     panoramas: true,
  //     popular: true,
  //     is_complete: true,
  //   },
  // },

  // 审核失败

  result: {
    certificate: {
      certificate_type: 20,
      name: 'aokami',
      number: '123456789',
      front: '1.jpg',
      back: '2.jpg',
      certificate_status: 20,
      note: '营业执照不清晰',
      certificate_status_name: '审核失败',
      accept: 1,
    },
    condition: {
      panoramas: true,
      popular: true,
      is_complete: true,
    },
  },

  // 审核成功

  // result: {
  //   certificate: {
  //     certificate_type: 10,
  //     name: 'aokami',
  //     number: '123456789',
  //     front: '1.jpg',
  //     back: '2.jpg',
  //     certificate_status: 30,
  //     note: null,
  //     certificate_status_name: '审核成功',
  //     accept: 1,
  //   },
  //   condition: {
  //     panoramas: true,
  //     popular: true,
  //     is_complete: true,
  //   },
  // },


  // 不满足条件第一次认证

  // result: {
  //   certificate: null,
  //   condition: {
  //     panoramas: false,
  //     popular: false,
  //     is_complete: false,
  //   },
  // },

  // 已满足条件第一次认证

  // result: {
  //   certificate: null,
  //   condition: {
  //     panoramas: true,
  //     popular: true,
  //     is_complete: true,
  //   },
  // },

}
