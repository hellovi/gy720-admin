<template>
  <el-row class="message-control">
    <el-col :span="16">
      <el-checkbox :value="allChecked" @change="$emit('check-all')">全选</el-checkbox>
      <span style="margin-left: 20px;">
        <el-button
          type="danger"
          size="small"
          :disabled="!someChecked"
          :loading="loading === 'remove-selected'"
          @click="$emit('remove-selected')"
        >删除</el-button>
        <el-button
          v-if="showMarkButton"
          type="primary"
          size="small"
          :disabled="!someChecked"
          :loading="loading === 'mark-selected'"
          @click="$emit('mark-selected')"
        >标记已读</el-button>
      </span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'message-control',

  props: {
    allChecked: {
      type: Boolean,
      required: true,
    },
    someChecked: {
      type: Boolean,
      required: true,
    },
    loading: {
      type: [Number, String],
      required: true,
    },
    showMarkButton: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
