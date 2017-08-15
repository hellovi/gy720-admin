<template>
  <el-alert
    :title="title"
    :type="type"
    v-if="flatContents.length"
    @close="closeAlert"
    show-icon>
    <div v-for="msg in flatContents" v-html="msg"></div>
  </el-alert>
</template>

<script>
  /**
   * 提交表单提示信息
   * @author  chenliangshan
   * @version 2017/08/11
   */
  export default {
    name: 'form-alert',
    props: {
      title: {
        type: String,
        default: '提示的文案',
      },
      type: {
        type: String,
        default: 'success',
      },
      contents: {
        type: Object,
        default() {
          return {}
        },
      },
    },

    computed: {
      flatContents() {
        return Object.values(this.contents).reduce((result, item) => result.concat(item), [])
      },
    },

    methods: {
      closeAlert() {
        // 清除提示内容
        // this.contents = {}
      },
    },
  }
</script>
