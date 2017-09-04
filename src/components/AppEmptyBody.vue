<template>
  <div class="app-empty-wrap">
    <div class="app-empty-body" :style="{width, height}">
      <div class="app-empty-body__content">
        <i class="iconfont app-empty-body__content-icon" v-html="icon"></i>
        <div class="app-empty-body__content-msg">
          <slot>
            暂时还没有任何数据...
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app-empty-body',

    props: {
      icon: {
        type: String,
        default: '&#xe602;',
      },
      width: {
        type: String,
        default: '540px',
      },
      height: {
        type: String,
        default: '200px',
      },
    },
  }
</script>

<style lang="postcss">
  @import "vars.css";

  .app-empty-wrap {
    background-color: #fff;
    min-height: 300px;
    padding: 50px 0;
  }

  .app-empty-body {
    position: relative;
    border: 2px dashed var(--border-color);
    border-radius: 5px;
    margin: 0 auto;
    color: var(--gray);
    background-color: #fff;
    &__content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      &-icon {
        font-size: 50px;
        padding-right: 20px;
        display: table-cell;
        vertical-align: middle;
      }
      &-msg {
        font-size: 16px;
        line-height: 24px;
        display: table-cell;
        vertical-align: middle;
        a {
          color: var(--color-primary);
          cursor: pointer;
        }
      }
    }
  }
</style>
