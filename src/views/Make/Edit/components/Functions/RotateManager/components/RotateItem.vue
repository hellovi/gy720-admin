<template>
  <li class="rotate-item">
    <div class="clearfix">
      <img class="rotate-item__img" v-qiniu-src="item.thumb || `${rotateDefault}`"/>
      <ul class="list rotate-item__btns">
        <li><el-button size="mini" type="primary" @click="upload">上传图片</el-button></li>
        <li><el-button size="mini" type="primary" @click="manage">管理图片</el-button></li>
        <li><el-button size="mini" @click="update">修改</el-button></li>
        <li><el-button size="mini" @click="viewer">预览</el-button></li>
        <li><el-button type="warning" size="mini" @click.stop="remove">删除</el-button></li>
      </ul>
    </div>
    <div class="rotate-item__name">{{ item.title }}</div>
  </li>
</template>

<script>
  import rotateDefault from '@/assets/default-rotate.jpg'

  export default {
    name: 'rotate-item',

    props: {
      item: {
        type: Object,
        required: true,
      },
    },

    data() {
      return {
        rotateDefault,
      }
    },

    methods: {
      upload() {
        this.$emit('open-upload', this.item.id)
      },

      manage() {
        this.$emit('open-manage', this.item.id)
      },

      update() {
        this.$emit('update', this.item)
      },

      viewer() {
        this.$emit('viewer', this.item)
      },

      remove() {
        this.$emit('remove', this.item.id)
      },
    },
  }
</script>
