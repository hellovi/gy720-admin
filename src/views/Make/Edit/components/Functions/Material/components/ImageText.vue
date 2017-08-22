<template>
    <div>
      <el-input placeholder="请输入标题"></el-input>
      <ueditor
         :value="detail.content" :config="config"
         @contentChange="contentChange" @ueReady="ueRready">
      </ueditor>
      <!-- <form-group class="imgtxt__footer" label="链接按钮" type="checkbox" name="btnswitch" v-model="btn_open"></form-group>
      <form-group class="imgtxt__footer btnname" label="按钮名称" name="btnname" placeholder="例如：点击购买" v-model="detail.btn_title"></form-group>
      <form-group class="imgtxt__footer linkaddr" label="链接地址" name="linkaddr" placeholder="例如：http://abc.com" v-model="detail.btn_url"></form-group> -->
       <el-button type="primary">提交</el-button>
    </div>
</template>
<script>

export default {
  props: {
    info: {
      type: Object,
    },
  },

  data: () => ({
    detail: {
      title: '',
      btn_title: '',
      btn_url: '',
      btn_show: '20',
      content: '',
    },
    config: {
      // focus时自动清空初始化时的内容
      autoClearinitialContent: true,
      // 关闭字数统计
      wordCount: false,
      // 关闭elementPath
      elementPathEnabled: false,
      // 默认的编辑区域高度
      initialFrameHeight: 350,
      // initialFrameWidth: null,
    },
    editor: null,
    btn_open: false,
  }),

  components: {
    ueditor: () => System.import('../../components/Ueditor.vue'),
  },

  mounted() {
    this.detail = { ...this.detail, ...this.info }
    this.btn_open = this.detail.btn_show === '10'
  },

  methods: {
    ueRready() {
      window.console.log('ueReady')
    },

    contentChange(change) {
      window.console.log(change)
      this.detail.content = change.content
    },

    submit() {
      window.console.log('submit')
      this.detail.btn_show = this.btn_open ? '10' : '20'
      // ajax.post('/make/article/add', this.detail)
      //   .then(() => this.$emit('submit'))
    },
  },
}
</script>

