<template>
  <el-row class="message-control">
    <el-col :span="16">
      <el-checkbox :value="allChecked" @change="$emit('checkAll', $event)">全选</el-checkbox>
      <span style="margin-left: 20px;">
        <el-button type="danger" size="small" :disabled="!someChecked">删除</el-button>
        <el-button type="primary" size="small" :disabled="!someChecked">标记已读</el-button>
      </span>
    </el-col>
    <el-col :span="8">
      <el-input size="small" placeholder="请输入关键词" icon="search"></el-input>
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
  },
}
</script>
