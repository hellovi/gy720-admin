<template>
  <div class="image-text-preview">
    <div class="image-text-preview__bg" v-bar>
      <div class="image-text-preview__content">
        <div class="image-text-preview__title">{{ contents.title }}</div>
        <div class="image-text-preview__info" v-html="contents.content"></div>
        <div class="image-text-preview__btn" v-if="contents.btn_show === 20">
          <a :href="contents.btn_url" target="_blank">
            <el-button type="primary">{{ contents.btn_title }}</el-button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * 图文预览窗口
   * @author chenliangshan
   * @version 2017/08/31
   */

  // 模拟滚动条指令
  import './directive/vuebar'

  export default {
    name: 'image-text-preview',

    props: {
      visible: {
        type: Boolean,
        default: true,
      },
      id: {
        type: Number,
        default: null,
      },
    },

    data: () => ({
      contents: {},
    }),

    watch: {
      visible(val) {
        if (val) {
          this.getContents(this.id)
          this.$emit('open')
        } else {
          this.close()
          this.$emit('close')
        }
      },
    },

    methods: {
      getContents(id) {
        this.$http.get(`/user/sourcearticle/${id}`)
          .then((res) => {
            this.contents = { ...res.result }
          })
      },
      close() {
        this.contents = {}
      },
    },

    created() {
      this.getContents(this.id)
    },
  }
</script>

<style lang="postcss">
  .image-text-preview {
    margin: 0 auto;
    width: 294px;
    height: 540px;
    background: url(./assets/bg-iphone6-small.jpg) no-repeat center top;
    position: relative;
    &__bg {
      width: 225px;
      height: 382px;
      position: absolute;
      top: 77.5px;
      left: 35px;
      background: #fff;
      overflow: hidden;
    }
    &__content {
      padding: 8px;
      font-size: 12px;
      color: #666;
      position: absolute;
      overflow-y: auto;
      overflow-x: hidden;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    &__title{
      font-size: 14px;
      font-weight: bold;
      color: #333;
      text-align: center;
      line-height: 1.5em;
      border-bottom: 1px solid #eee;
      padding-bottom: 4px;
      margin-bottom: 8px;
      overflow: hidden;
    }
    &__info {
      img {
        max-width: 100%;
      }
    }
    &__btn {
      text-align: center;
    }
  }
  .vuebar {
    > .vuebar-dragger {
      z-index: 5;
      width: 12px;
      right: 0;
      > .vuebar-dragger-styler {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: rotate3d(0, 0, 0, 0);
        transform: rotate3d(0, 0, 0, 0);
        -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out;
        transition: background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out;
        background-color: rgba(0, 0, 0, 0.1);
        margin: 5px 5px 5px 0;
        border-radius: 20px;
        height: calc(100% - 10px);
        display: block;
      }
    }
    &.vuebar-scrolling-phantom > .vuebar-dragger > .vuebar-dragger-styler {
      background-color: rgba(0, 0, 0, 0.3);
    }
    > .vuebar-dragger:hover > .vuebar-dragger-styler, &.vuebar-dragging > .vuebar-dragger > .vuebar-dragger-styler {
      background-color: rgba(0, 0, 0, 0.5);
      margin: 0;
      height: 100%;
    }
    &.vuebar-dragging-phantom > .vuebar-dragger > .vuebar-dragger-styler {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
</style>
