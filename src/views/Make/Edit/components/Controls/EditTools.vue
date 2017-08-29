<template>
  <div :class="`edit-tools ${dir}`">
    <div class="edit-tools__wrapper clearfix">
      <i role="button" class="iconfont" @click="$emit('edit')">&#xe608;</i>
      <i role="button" class="iconfont" @click="$emit('delete')">&#xe615;</i>
    </div>
  </div>
</template>

<script>
/**
 * 高级编辑 - 弹出工具
 * @author luminghuai
 * @version 2017-08-11
 */

export default {
  name: 'edit-tools',

  props: {
    dir: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

:root {
  --left-width: 26px;
  --right-width: 54px;
  --height: 30px;
  --arrow-width: 10px;
  --background-color: rgba(0, 0, 0, 0.3);
}

.edit-tools {
  visibility: hidden;
  position: absolute;
  z-index: 5;

  &__wrapper {
    position: relative;
    border-radius: 3px;
    background-color: var(--background-color);
    color: #fff;

    &::before {
      content: "";
      position: absolute;
      border-style: solid;
    }

    & > .iconfont {
      display: inline-block;
      font-size: 14px;

      &:hover {
        color: var(--color-warning);
      }
    }
  }
}

.edit-tools.left {
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: calc(100% + var(--left-width) + var(--arrow-width) + 5px);

  .edit-tools__wrapper {
    width: var(--left-width);

    &::before {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-width: 5px 0 5px var(--arrow-width);
      border-color: transparent transparent transparent var(--background-color);
    }

    & > .iconfont {
      width: 26px;
    }
  }
}

.edit-tools.right {
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: calc(100% + var(--right-width) + var(--arrow-width) + 5px);
  height: 100%;

  .edit-tools__wrapper {
    float: right;
    width: var(--right-width);
    padding: 0 6px;

    &::before {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-width: 5px var(--arrow-width) 5px 0;
      border-color: transparent var(--background-color) transparent transparent;
    }

    & > .iconfont {
      line-height: var(--height);

      &:last-child {
        float: right;
      }
    }
  }
}

.edit-tools.top {
  left: 0;
  bottom: 0;
  width: 100%;
  height: calc(100% + var(--height) + var(--arrow-width) + 5px);

  .edit-tools__wrapper {
    padding: 0 6px;

    &::before {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: var(--arrow-width) 5px  0 5px;
      border-color: var(--background-color) transparent transparent;
    }

    & > .iconfont {
      font-size: 16px;
      line-height: var(--height);

      &:first-child {
        float: left;
      }

      &:last-child {
        float: right;
      }
    }
  }
}
</style>
