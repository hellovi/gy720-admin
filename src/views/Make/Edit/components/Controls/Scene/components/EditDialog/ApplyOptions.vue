<template>
  <el-form-item class="scene-apply-options" label="设置生效范围" label-width="7em">
    <el-radio-group :value="value" @input="val => $emit('input', val)">
      <el-radio-button :label="false">当前场景</el-radio-button>
      <el-radio-button :label="true">当前作品</el-radio-button>
    </el-radio-group>
  </el-form-item>
</template>

<script>
/**
 * 高级编辑 - 场景编辑 应用范围
 *
 * @author  huojinzhao | luminghuai
 * @version 2017-09-08
 */

export default {
  name: 'apply-options',

  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
