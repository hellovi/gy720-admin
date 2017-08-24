<template>
  <div id="editor" class="material-ueditor"></div>
</template>

<script>
/**
 * 富文本公用模块
 * @author yangjun
 */

import Vue from 'vue'
import './ueditor.config'

// ueditor库的资源地址
const FULL_PATH = Vue.prototype.$url.host('assets/3.0.1/lib/ueditor/1.4.3/ueditor.all.min.js')

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
    /**
     * 动态加载ueditor
     */
    dynamicLoadUeditor(cb) {
      const ueditorScript = document.querySelector(`script[src="${FULL_PATH}"]`)
      if (ueditorScript) {
        // 已经加载过ueditor库，直接执行实例初始化
        cb()
      } else {
        // 动态写入script标签加载ueditor库，确保在库加载完成后才初始化ueditor实例
        const script = document.createElement('script')
        script.src = FULL_PATH
        script.addEventListener('load', cb)
        document.body.appendChild(script)
      }
    },
  },

  mounted() {
    this.dynamicLoadUeditor(() => {
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
