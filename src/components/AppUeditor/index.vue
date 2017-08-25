<template>
  <div :id="editorId"></div>
</template>

<script>
  /**
   * 富文本编辑器基于ueditor
   * @author  chenliangshan
   * @version 2017/08/25
   */

  import { dynamicLoadScript } from '@/utils'
  import './ueditor.config'

  // 默认配置
  const defConfig = {
    autoClearinitialContent: true, // focus时自动清空初始化时的内容
    wordCount: false, // 关闭字数统计
    elementPathEnabled: false, // 关闭elementPath
    initialFrameHeight: 350, // 默认的编辑区域高度
  }

  export default {
    name: 'app-ueditor',

    props: {
      value: {
        type: String,
        default: '',
      },
      id: {
        type: String,
        default: '',
      },
      path: {
        type: String,
        default: 'assets/3.0.1/lib/ueditor/1.4.3/',
      },
      config: {
        type: Object,
        default: () => ({}),
      },
    },

    data: () => ({
      instance: null,
    }),

    computed: {
      editorId() {
        return this.id || `app-ueditor_${Math.random().toString(36).substring(3, 8)}`
      },
      ueditorConfig() {
        return { ...defConfig, ...this.config }
      },
    },

    methods: {
      insertScriptTag() {
        dynamicLoadScript(`${this.path}ueditor.all.min.js`)
          .then(() => {
            this.initEditor()
          })
      },
      initEditor() {
        this.$nextTick(() => {
          this.instance = window.UE.getEditor(this.editorId, this.ueditorConfig)
          // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
          this.instance.addListener('ready', () => {
            this.instance.setContent(this.value)
            this.instance.addListener('contentChange', () => {
              const wordCount = this.instance.getContentLength(true)
              const content = this.instance.getContent()
              const plainTxt = this.instance.getPlainTxt()
              this.$emit('contentChange', { wordCount, content, plainTxt })
            })
            this.$emit('ready', this.instance)
          })
        })
      },
    },

    created() {
      this.insertScriptTag()
    },

    beforeDestroy() {
      // 组件销毁的时候，要销毁 UEditor 实例
      if (this.instance !== null && this.instance.destroy) {
        this.instance.destroy()
      }
    },
  }
</script>
