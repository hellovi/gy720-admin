<template>
  <el-dialog
    title="logo"
    :visible.sync="active.logo"
    size="tiny"
  >
      <span>logo</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
/**
 * 高级编辑 - logo
 * @version 2017-08-14
 */

import modal from '../../mixins/modal'

export default {
  name: 'edit-functions__logo',

  mixins: [modal],
}
</script>
