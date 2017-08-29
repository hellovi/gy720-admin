<template>
  <div
    class="app-alert"
    v-bind:style="{paddingLeft: labelWidth}"
    v-if="flatContents.length"
  >
    <el-alert
      :title="title"
      :type="type"
      show-icon>
      <div v-for="msg in flatContents" v-html="msg"></div>
    </el-alert>
  </div>

</template>

<script>
  /**
   * 提交表单提示信息
   * @author  chenliangshan
   * @version 2017/08/29
   */

  import { isEmpty } from 'lodash'

  export default {
    name: 'app-form-alert',

    props: {
      title: {
        type: String,
        default: '提交出现错误',
      },
      type: {
        type: String,
        default: 'error',
      },
      contents: {
        type: Object,
        default: () => ({}),
      },
      labelWidth: {
        type: String,
        default: '0',
      },
    },

    computed: {
      flatContents() {
        return isEmpty(this.contents) ? [] : this.errorHandler(this.contents)
      },
    },

    methods: {
      // 错误信息处理
      errorHandler({ errors, status, message }) {
        if (errors) {
          return Object.values(errors).reduce((result, item) => result.concat(item), [])
        } else if (status) {
          const isObj = data => Object.prototype.toString.call(data) === '[object Object]'
          let errorArr = []
          if (isObj(status.reason)) {
            errorArr = Object.values(status.reason).reduce((result, item) => result.concat(item), [])
          } else {
            errorArr.push(status.reason)
          }
          return errorArr
        } else if (message) {
          return [message]
        }
        return ['服务端错误，请联系网站管理员或稍后重试']
      },
    },
  }
</script>

<style lang="postcss">
  .app-alert {
    padding-bottom: 10px;
  }
</style>
