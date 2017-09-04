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
      <div v-for="msg in flatContents" class="app-alert__content" v-html="msg"></div>
    </el-alert>
  </div>

</template>

<script>
  /**
   * 提交表单提示信息
   * @author  chenliangshan
   * @version 2017/08/29
   */

  import { errorHandler } from '@/utils'

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
        return Object.keys(this.contents).length ? errorHandler(this.contents) : []
      },
    },
  }
</script>

<style lang="postcss">
  .app-alert {
    .el-alert {
      margin-bottom: 22px;
    }
    .el-alert__content {
      line-height: 20px;
    }
    &__content {
      font-size: 14px;
    }
  }
</style>
