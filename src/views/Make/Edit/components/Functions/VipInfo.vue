<template>
  <vip-info
    :visible.sync="active.vipInfo"
    :panorama-id="panoId"
    @panoBuySuccess="panoBuySuccess"
  ></vip-info>
</template>

<script>
/**
 * VIP付费信息
 * @author  chenliangshan
 * @version 2017/08/21
 */

import { EDIT } from '@/store/mutationTypes'
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

  watch: {
    'active.vipInfo': function vipInfo(val) {
      if (!val) {
        this.closeModal('vipInfo')
      }
    },
  },

  methods: {
    panoBuySuccess() {
      this.$store.dispatch(EDIT.GET_PANOINFO, this.panoId)
    },
  },

  created() {
    this.panoId = this.$route.query.pano_id
  },
}
</script>
