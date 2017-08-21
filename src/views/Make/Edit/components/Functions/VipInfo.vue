<template>
  <vip-info
    :visible.sync="active.vipInfo"
    :pano-id="1"
  ></vip-info>
</template>

<script>
  /**
   * VIP付费信息
   * @author  chenliangshan
   * @version 2017/08/21
   */

  import VipInfo from '@/components/AppPurchase'
  import modal from '../../mixins/modal'

  export default {
    name: 'edit-functions__vip',
    mixins: [modal],
    components: { VipInfo },
    props: {
      data: {
        type: Object,
        default() {
          return {}
        },
      },
    },
  }
</script>
