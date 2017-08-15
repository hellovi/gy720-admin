<template>
  <el-dialog
    class="edit-functions__share" title="分享"
    :visible.sync="active.share" size="tiny"
    @close="closeModal"
  >
    <div class="qrcode">
      <img class="qrcode-img" :src="data.qrcode">
      <p class="qrcode-title">微信“扫一扫”分享</p>
    </div>
    <div class="address">
      <p class="address-title">作品地址：</p>
      <el-input class="address-info" v-model="panoPath" disabled></el-input>
    </div>
    <div class="iframe">
      <p class="iframe-title">分享到网站或者论坛：</p>
      <el-input class="iframe-info" v-model="iframeUrl" disabled></el-input>
    </div>
  </el-dialog>
</template>

<script>
/**
 * 高级编辑 - 分享
 *
 * @author huojinzhao
 */

import modal from '../../mixins/modal'

const PANO_VIEW_STATIC = 'http://www.gy720.com/pano/view'

export default {
  name: 'edit-functions__share',

  mixins: [modal],

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  computed: {
    panoPath() {
      return `${PANO_VIEW_STATIC}/${this.data.hash_pano_id}`
    },
    iframeUrl() {
      return `<iframe src="${this.panoPath}" frameborder="no" border="0" style="width:800px;height:500px;"></iframe>`
    },
  },
}
</script>

<style>
.edit-functions__share {

  & .el-dialog--tiny {
    width: 40%;

    & > .el-dialog__body {
      padding: 70px 60px;
    }
  }

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

