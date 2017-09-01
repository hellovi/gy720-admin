<template>
  <el-dialog
    title="场景"
    :visible.sync="active.scene"
    size="tiny"
  >
      <span>场景</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
/**
 * 高级编辑 - 场景
 * @version 2017-08-14
 */

import modal from '../../mixins/modal'

export default {
  name: 'edit-functions-scene',

  mixins: [modal],
}
</script>
