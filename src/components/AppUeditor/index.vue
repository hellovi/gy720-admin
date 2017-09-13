<template>
  <div :id="editorId" v-loading.body="loading"></div>
</template>

<script>
  /**
   * 富文本编辑器基于UEditor
   * @author  chenliangshan
   * @version 2017/08/25
   */

  import { dynamicLoadScript } from '@/utils'
  import './ueditor.config'
  import UEajax from './ueditor.ajax'
  import UEautoupload from './plugins/autoupload'

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
      loading: true,
    }),

    computed: {
      editorId() {
        return this.id || `app-ueditor_${Math.random().toString(36).substring(3, 8)}`
      },

      // 默认配置
      defConfig() {
        const vModalDom = document.querySelector('.v-modal')
        return {
          autoClearinitialContent: true, // focus时自动清空初始化时的内容
          wordCount: false, // 关闭字数统计
          elementPathEnabled: false, // 关闭elementPath
          initialFrameHeight: 250, // 默认的编辑区域高度
          zIndex: vModalDom ? +vModalDom.style.zIndex : 2000, // 动态当前v-modal的zIndex
        }
      },

      ueditorConfig() {
        return { ...this.defConfig, ...this.config }
      },
    },

    watch: {
      value(val) {
        if (this.instance && Object.keys(this.instance).length) {
          this.instance.setContent(val || '')
        }
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
          // 关闭loading
          this.loading = false

          // 重置UEditor全局UE.ajax方法
          window.UE.ajax = UEajax()

          // 重置自动上传图片插件
          window.UE.plugin.register('autoupload', UEautoupload)

          // 实例富文本编辑器
          this.instance = window.UE.getEditor(this.editorId, this.ueditorConfig)

          // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
          this.instance.addListener('ready', () => {
            this.instance.setContent(this.value || '')
            this.instance.addListener('contentChange', () => {
              const wordCount = this.instance.getContentLength(true)
              const content = this.instance.getContent()
              const plainTxt = this.instance.getPlainTxt()
              this.$emit('contentChange', { wordCount, content, plainTxt })
            })

            // 失焦再同步数据
            this.instance.addListener('blur', () => {
              const content = this.instance.getContent()
              this.$emit('input', content)
              this.$emit('update:value', content)
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
