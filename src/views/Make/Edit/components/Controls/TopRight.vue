<template>
  <div class="edit-control__top-right">
    <el-button type="primary">设置</el-button>
    <el-button type="primary">素材库</el-button>
    <el-button type="primary">视角</el-button>
    <el-button type="primary">皮肤</el-button>
  </div>
</template>

<script>
/**
 * 高级编辑 - 设置/素材库/视角/皮肤
 * @author luminghuai
 * @version 2017-08-11
 */

export default {
  name: 'edit-right-middle',
}
</script>

<style lang="postcss">
.edit-control__top-right {
  position: absolute;
  top: 10px;
  right: 10px;

  .el-button {
    width: 80px;

    & + .el-button {
      margin-left: 20px;
    }
  }
}
</style>
