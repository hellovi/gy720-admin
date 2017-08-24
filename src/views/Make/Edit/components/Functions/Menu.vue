<template>
  <el-dialog
    class="edit-functions__menu"
    title="菜单编辑"
    :visible.sync="active.menu"
    size="small"
  >
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
/**
 * 高级编辑 - 菜单编辑
 *
 * @author huojinzhao
 */

import modal from '../../mixins/modal'

export default {
  name: 'edit-functions__bottomMenu',

  mixins: [modal],
}
</script>

<style lang="postcss">

</style>
