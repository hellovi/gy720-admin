<template>
  <div :id="editorId"></div>
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
  // import UEautoupload from './plugins/autoupload'

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
          // const self = this

          // 自定义请求报头信息-加载服务器配置
          /*eslint-disable*/
          /*window.UE.Editor.prototype.loadServerConfig = function() {
            const me = this
            setTimeout(() => {
              try {
                // eslint-disable-next-line
                me.options.imageUrl && me.setOpt('serverUrl', me.options.imageUrl.replace(/^(.*[\/]).+([\.].+)$/, '$1controller$2'))

                const configUrl = `${me.getActionUrl('config')}&noCache=${Date.now()}`

                /!* eslint no-underscore-dangle: 0 *!/
                me._serverConfigLoaded = false

                /!* 发出ajax请求 *!/
                self.$http.get(configUrl)
                  .then((res) => {
                    const config = res
                    window.UE.utils.extend(me.options, config)
                    me.fireEvent('serverConfigLoaded')
                    me._serverConfigLoaded = true
                  })
                  .catch((error) => {
                    // eslint-disable-next-line
                    console.error(error)
                  })
              } catch (e) {
                // eslint-disable-next-line
                console.error(e)
              }
            })
          }*/
          // 重置UEditor全局UE.ajax方法
          window.UE.ajax = UEajax()
          // window.UE.plugin.register('autoupload2', UEautoupload, 'autoupload')

          // 实例富文本编辑器
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
