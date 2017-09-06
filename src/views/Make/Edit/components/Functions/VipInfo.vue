<template>
  <app-purchase
    :visible.sync="active.vipInfo"
    :panorama-id="panoId"
    @panoBuySuccess="panoBuySuccess"
  ></app-purchase>
</template>

<script>
/**
 * VIP付费信息
 * @author  chenliangshan
 * @version 2017/08/21
 */

import { EDIT } from '@/store/mutationTypes'
import AppPurchase from '@/components/AppPurchase'
import modal from '../../mixins/modal'

export default {
  name: 'edit-functions-vip',

  mixins: [modal],

  components: { AppPurchase },

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
    panoBuySuccess() { // 单作品购买成功后更新panoinfo
      this.$store.dispatch(EDIT.GET_PANOINFO, this.panoId)
    },
  },

  created() {
    this.panoId = this.$route.query.pano_id
  },
}
</script>
