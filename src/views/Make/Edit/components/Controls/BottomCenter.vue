<template>
  <div class="edit-control__bottom-center">
    <a :href="`/pano/view/${panoInfo.hash_pano_id}`" target="_blank">
      <el-button type="primary">预览</el-button>
    </a>
    <a :href="`/user-client/works?cate_id=${panoInfo.pano_category_id}`" target="_blank">
      <el-button>发布</el-button>
    </a>
  </div>
</template>

<script>
/**
 * 高级编辑 - 发布/预览
 * @author luminghuai
 * @version 2017-08-11
 */

import { mapState } from 'vuex'

export default {
  name: 'edit-bottom-center',

  computed: {
    ...mapState({
      panoInfo: state => state.edit.panoInfo,
    }),
  },
}
</script>

<style lang="postcss">
.edit-control__bottom-center {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);

  a {
    + a {
      padding-left: 20px;
    }
  }
  .el-button {
    width: 120px;
    height: 34px;
  }
}
</style>
