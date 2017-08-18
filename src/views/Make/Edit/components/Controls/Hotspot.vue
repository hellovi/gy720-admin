<template>
  <div class="edit-control__hotspot">
     <div role="button" class="add-hotspot tip tip--right" data-tip="添加热点" @click="openModal('hotspots')">+</div>
    <!-- <div role="button" class="add-hotspot tip tip--right" data-tip="1添加热点" @click="testMaterial()">+</div>
    <div role="button" class="add-hotspot tip tip--right" data-tip="添加热点" @click="testSelectMaterial()">+</div> -->
  </div>
</template>

<script>
/**
 * 高级编辑 - 添加热点
 * @author luminghuai
 * @version 2017-08-11
 */

import { EDIT } from '@/store/mutationTypes'
import modal from '../../mixins/modal'

export default {
  name: 'edit-hotspot',

  mixins: [modal],

  methods: {
    testMaterial() {
      this.$store.dispatch(EDIT.MATERIAL.CREATE, { type: 2 })
      this.$store.commit(EDIT.MATERIAL.SELECT)
    },

    testSelectMaterial() {
      this.$store.commit(EDIT.MATERIAL.RESET, { from: 'tour' })
    },
  },
}
</script>

<style lang="postcss">
.edit-control__hotspot {
  position: absolute;
  left: 50%;
  bottom: 170px;
  transform: translate(-50%);
}

.add-hotspot {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  font-size: 40px;
  text-align: center;
  line-height: 44px;
  font-weight: 300;
  cursor: pointer;
}
</style>
