<template>
  <div class="edit-control__right-middle">
    <div v-if="true" role="button" class="btn-add dash-box">+</div>
    <i v-else class="edit-control__tour-guide iconfont">&#xe61b;</i>
  </div>
</template>

<script>
/**
 * 高级编辑 - 添加导航图
 * @author luminghuai
 * @version 2017-08-11
 */

export default {
  name: 'edit-right-middle',
}
</script>

<style lang="postcss">
.edit-control__right-middle {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}

.edit-control__tour-guide {
  display: block;
  width: 80px;
  font-size: 42px;
  text-align: center;
  cursor: pointer;
}
</style>
