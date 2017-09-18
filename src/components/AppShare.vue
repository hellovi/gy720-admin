<template>
  <div class="app-share">
    <div class="qrcode">
      <img
        class="qrcode-img"
        :src="$url.static(data.qrcode)">
      <p class="qrcode-title">微信“扫一扫”分享</p>
    </div>
    <div class="address">
      <p class="address-title">作品地址：</p>
      <el-input class="address-info" v-model="panoPath" readonly></el-input>
    </div>
    <div class="iframe">
      <p class="iframe-title">分享到网站或者论坛：</p>
      <el-input class="iframe-info" v-model="iframeUrl" readonly></el-input>
    </div>
  </div>
</template>

<script>
/**
 * 公用分享组件
 *
 * @author huojinzhao | chenliangshan
 * @version 2017/09/18
 */

export default {
  name: 'edit-functions-share',

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  computed: {
    panoPath() {
      return this.$url.host(`pano/view/${this.data.hash_pano_id}`)
    },
    iframeUrl() {
      return `<iframe src="${this.panoPath}" frameborder="no" border="0" style="width:800px;height:500px;"></iframe>`
    },
  },
}
</script>

<style>
.app-share {

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

