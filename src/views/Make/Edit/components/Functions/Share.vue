<template>
  <el-dialog
    class="edit-functions__share" title="分享"
    :visible.sync="active.share" size="small"
  >
    <app-share :data="data"></app-share>
  </el-dialog>
</template>

<script>
/**
 * 高级编辑 - 分享
 *
 * @author huojinzhao
 */

import AppShare from '@/components/AppShare'
import modal from '../../mixins/modal'

export default {
  name: 'edit-functions-share',

  mixins: [modal],

  components: {
    AppShare,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>
.edit-functions__share {

  & .qrcode {
    margin: 10px 0;
    text-align: center;
    font-weight: bold;

    &-img {
      height: 150px;
      width: 150px;
    }
  }
}
</style>

