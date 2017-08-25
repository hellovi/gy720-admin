<template>
  <div id="editor" class="material-ueditor"></div>
</template>

<script>
/**
 * 富文本公用模块
 * @author yangjun
 */

import { dynamicLoadScript } from '@/utils'
import './ueditor.config'

export default {
  props: {
    value: {
      type: String,
      default: null,
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
  methods: {
    dynamicLoadUeditor() {
      /**
       * 动态加载ueditor
       */
      dynamicLoadScript('assets/3.0.1/lib/ueditor/1.4.3/ueditor.all.min.js')
        .then(() => {
          this.editor = window.UE.getEditor('editor', {
            autoClearinitialContent: true, // focus时自动清空初始化时的内容
            wordCount: false, // 关闭字数统计
            elementPathEnabled: false, // 关闭elementPath
            initialFrameHeight: 350, // 默认的编辑区域高度
            // initialFrameWidth: null,
          })
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
  },

  mounted() {
    this.dynamicLoadUeditor()
  },

  beforeDestroy() {
    // 组件销毁的时候应该同时销毁ueditor实例
    window.UE.getEditor('editor').destroy()
  },
}
</script>

<style lang="postcss">
.material-ueditor {
  width: 768px;
  height: 383px;
  margin: 0 15px;
}
</style>
