<template>
  <div ref="editor" class="imgtxt__ueditor"></div>
</template>

<script>
/**
 * 富文本公用模块
 * @author yangjun
 */
import '@/utils/ueditor/1.4.3/ueditor.config'
import '@/utils/ueditor/1.4.3/ueditor.all'
import '@/utils/ueditor/1.4.3/lang/zh-cn/zh-cn'

export default {
  data() {
    return {
      // eslint-disable-next-line
      id: Number.parseInt(Math.random() * 10000, 10) + 'ueditorId',
    }
  },

  props: {
    value: {
      type: String,
      default: null,
    },
    config: {
      type: Object,
      default: {},
    },
  },

  // watch: {
  //   value: function value(val) {
  //     this.editor = window.UE.getEditor(this.id, this.config)
  //     if (val !== null) {
  //       this.editor.setContent(val)
  //     }
  //   },
  // },
  mounted() {
    this.$nextTick(() => {
      // 保证 this.$el 已经插入文档
      this.$refs.editor.id = this.id
      this.editor = window.UE.getEditor(this.id, this.config)
      this.editor.ready(() => {
        this.editor.setContent(this.value)
        this.editor.addListener('contentChange', () => {
          const wordCount = this.editor.getContentLength(true)
          const content = this.editor.getContent()
          const plainTxt = this.editor.getPlainTxt()
          this.$emit('contentChange', { wordCount, content, plainTxt })
        })
        this.$emit('ueReady', this.editor)
      })
    })
  },

}
</script>

<style>
.imgtxt {

  &__ueditor {
    margin: 0 15px;
    width: 768px;
    height: 383px;
  }
}
</style>
