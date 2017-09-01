<template>
  <div class="edit-control__right-middle">
    <i v-if="toursAmount"
      class="edit-control__tour-guide iconfont"
      @click="openModal('tour')"
    >&#xe61b;</i>
    <div v-else
      role="button"
      class="btn-add dash-box"
      @click="openModal('tour')"
    >+</div>
  </div>
</template>

<script>
/**
 * 高级编辑 - 添加导航图
 * @author luminghuai
 * @version 2017-08-11
 */
import { mapState } from 'vuex'
import modal from '../../mixins/modal'

export default {
  name: 'edit-right-middle',

  mixins: [modal],

  computed: {
    ...mapState({
      toursAmount: state => state.edit.tour.toursAmount,
    }),
  },
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
