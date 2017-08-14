<template>
  <div class="edit-functions__material">
    <el-dialog
      title="素材库"
      :visible.sync="active.material"
      size="tiny"
    >
        <span>素材库</span>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 高级编辑 - 素材库
 * @version 2017-08-14
 */

import modal from '../../mixins/modal'

export default {
  name: 'edit-functions__material',

  mixins: [modal],
}
</script>

<style lang="postcss">
.edit-functions__material {

}
</style>
