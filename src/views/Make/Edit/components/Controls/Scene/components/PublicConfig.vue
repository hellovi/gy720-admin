<template>
  <el-form-item
    class="edit-functions__scene-setting"
    label="设置生效范围"
    label-width="7em"
  >
    <el-button
      :class="value?'':'active'"
      type="ghost"
      size="small"
      @click="$emit('input', false)"
    >当前场景</el-button>
    <el-button
      :class="value?'active':''"
      type="ghost"
      size="small"
      @click="preChooseAll"
    >当前作品</el-button>
  </el-form-item>
</template>

<script>
/**
 * @desc    当前组和所有场景分组设置
 *
 * @author  huojinzhao
 */

export default {
  name: 'edit-scene-setting-public-config',

  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    preChooseAll() {
      this.$msgbox({
        title: '设置当前作品',
        message: '此操作会覆盖所有场景设置，是否继续？',
        showCancelButton: true,
        type: 'warning',
        beforeClose: this.chooseAll,
      })
    },

    chooseAll(action, instance, done) {
      if (action === 'confirm') {
        this.$emit('input', true)
      }
      done()
    },
  },
}
</script>

<style lang="postcss">
@import 'vars.css';

.edit-functions__scene-setting {

  & .el-button.active {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
  }
}
</style>
