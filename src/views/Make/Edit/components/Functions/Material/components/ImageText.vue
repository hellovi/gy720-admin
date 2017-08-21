<template>
  <el-dialog class="imgtxt__modal" title="添加图文信息" width="800" @close="closeModal">
    <div class="imgtxt__container clear">
      <input type="text" class="form-control imgtxt__title" placeholder="请输入标题" v-model="detail.title"></input>
      <ueditor
         :value="detail.content" :config="config"
         @contentChange="contentChange" @ueReady="ueRready">
      </ueditor>
      <form-group class="imgtxt__footer" label="链接按钮" type="checkbox" name="btnswitch" v-model="btn_open"></form-group>
      <form-group class="imgtxt__footer btnname" label="按钮名称" name="btnname" placeholder="例如：点击购买" v-model="detail.btn_title"></form-group>
      <form-group class="imgtxt__footer linkaddr" label="链接地址" name="linkaddr" placeholder="例如：http://abc.com" v-model="detail.btn_url"></form-group>
      <button type="button" class="btn btn-block imgtxt__submit" @click="submit">提交</button>
    </div>
  </el-dialog>
</template>
<script>

export default {
  props: {
    info: {
      type: Object,
    },
    // debugger , 可以delete
    ueditor: {
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

  // components: {
  //   ueditor: () => System.import('@/components/Ueditor.vue'),
  // },

  mounted() {
    this.detail = { ...this.detail, ...this.info }
    this.btn_open = this.detail.btn_show === '10'
  },

  methods: {
    ueRready() {
      window.console.log('ueReady')
    },
    contentChange(change) {
      this.detail.content = change.content
    },
    closeModal() {
      this.$emit('close', false)
    },
    submit() {
      this.detail.btn_show = this.btn_open ? '10' : '20'
      // ajax.post('/make/article/add', this.detail)
      //   .then(() => this.$emit('submit'))
    },
  },
}
</script>

<style scoped>
@import 'vars';

.imgtxt {

  &__modal {
    height: 640px;
  }

  &__title {
    width: calc(100% - 30px) !important;
    margin: 15px 0 15px 15px !important;
  }

  &__footer {
    float: left;
    margin: 15px 0 !important;
    &>label {
      width: 70px !important;
    }

    &.btnname input {
      width: 126px;
    }

    &.linkaddr input {
      width: 317px;
    }
  }

  &__submit {
    margin: 15px auto 45px auto !important;
    width: 194px !important;
  }
}
</style>
