<template>
  <vip-info
    :visible.sync="active.vipInfo"
    :pano-id="panoId"
    :before-close="close"
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
  name: 'edit-functions-vip',

  mixins: [modal],

  components: { VipInfo },

  data() {
    return {
      panoId: null,
    }
  },

  methods: {
    close() {
      this.closeModal('vipInfo')
    },
  },

  created() {
    this.panoId = this.$route.query.pano_id
  },
}
</script>
