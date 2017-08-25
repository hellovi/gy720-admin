<template>
  <el-dialog
    :visible.sync="show"
    :modal="false"
  >
    <el-input placeholder="请输入标题"></el-input>
    <app-ueditor
      :value="detail.content"
      @contentChange="contentChange"
      @ueReady="ueRready"
    ></app-ueditor>
    <!-- <form-group class="imgtxt__footer" label="链接按钮" type="checkbox" name="btnswitch" v-model="btn_open"></form-group>
    <form-group class="imgtxt__footer btnname" label="按钮名称" name="btnname" placeholder="例如：点击购买" v-model="detail.btn_title"></form-group>
    <form-group class="imgtxt__footer linkaddr" label="链接地址" name="linkaddr" placeholder="例如：http://abc.com" v-model="detail.btn_url"></form-group> -->
    <el-button type="primary">提交</el-button>
  </el-dialog>
</template>

<script>

export default {
  components: {
    AppUeditor: () => System.import('@/components/AppUeditor'),
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
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
    editor: null,
    btn_open: false,
    show: this.visible,
  }),

  watch: {
    visible(val) {
      this.show = val
    },
    show(val) {
      this.$emit('input', val)
      this.$emit('update:visible', val)
    },
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

  mounted() {
    this.detail = { ...this.detail, ...this.info }
    this.btn_open = this.detail.btn_show === '10'
  },
}
</script>

<style lang="postcss">
  #edui_fixedlayer {
     z-index: 9999!important;
  }

  .edui-default .edui-dialog {
    z-index: 9999!important;
  }
</style>
