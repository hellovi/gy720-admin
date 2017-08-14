<template>
  <div class="edit-functions__setting">
    <el-dialog
      title="设置"
      :visible.sync="active.setting"
      size="tiny"
    >
        <span>设置</span>
        <span slot="footer" class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 高级编辑 - 设置
 * @version 2017-08-14
 */
import modal from '../../mixins/modal'

export default {
  name: 'edit-functions__setting',

  mixins: [modal],
}
</script>

<style lang="postcss">
.edit-functions__setting {

}
</style>
