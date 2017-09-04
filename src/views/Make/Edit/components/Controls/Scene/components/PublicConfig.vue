<template>
  <el-form-item label="应用到其它场景" label-width="8em">
    <el-button
      type="ghost"
      @click="() => configGroup(true)"
    >当前场景组</el-button>
    <el-button
      type="ghost"
      @click="() => configGroup()"
    >所有场景</el-button>
  </el-form-item>
</template>

<script>
/**
 * @desc    当前组和所有场景分组设置
 *
 * @author  huojinzhao
 */

import Ajax from '../modules/ajax'

export default {
  name: 'edit-scene-setting-public-config',

  props: {
    data: {
      type: Object,
      required: true,
    },

    types: {
      type: Array,
      required: true,
    },
  },

  methods: {
    configGroup(oneGroup) {
      const info = {}
      const types = [...this.types]
      if (oneGroup) {
        types.push('scene_group_id')
      }
      types.forEach((type) => {
        info[type] = this.data[type]
      })
      Ajax.patchPublicConfig(info)
        .then(() => {
          this.$message({
            type: 'success',
            message: '设置成功',
          })
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '设置失败',
          })
        })
    },
  },
}
</script>

<style lang="postcss">

</style>
