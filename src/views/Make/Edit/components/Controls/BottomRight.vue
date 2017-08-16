<template>
  <div class="edit-control__bottom-right">
    <div
      role="button"
      class="btn-circle"
      @click="onOpenSnapshot"
    >
      <i class="iconfont">&#xe636;</i>
      <span>虚拟拍照</span>
    </div>
  </div>
</template>

<script>
/**
 * 高级编辑 - 虚拟拍照
 * @author luminghuai
 * @version 2017-08-11
 */

import { EDIT } from '@/store/mutationTypes'

export default {
  name: 'edit-bottom-right',

  methods: {
    onOpenSnapshot() {
      this.$store.commit(EDIT.MODAL.OPEN, 'snapshot')
    },
  },
}
</script>

<style lang="postcss">
.edit-control__bottom-right {
  position: absolute;
  right: 15px;
  bottom: 30px;
  height: 40px;
}
</style>
