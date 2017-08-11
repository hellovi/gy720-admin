<template>
  <div class="edit-control__bottom-center">
    <el-button type="primary">预览</el-button>
    <el-button>发布</el-button>
  </div>
</template>

<script>
/**
 * 高级编辑 - 发布/预览
 * @author luminghuai
 * @version 2017-08-11
 */

export default {
  name: 'edit-bottom-left',
}
</script>


<style lang="postcss">
.edit-control__bottom-center {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);

  .el-button {
    width: 120px;
    height: 34px;
  }
}
</style>
