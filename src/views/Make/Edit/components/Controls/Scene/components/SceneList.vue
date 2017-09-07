<template>
  <div class="edit-scene clearfix">
    <!-- 左侧：滚动 -->
    <div
      class="scene-arrow scene-arrow--left iconfont"
      @click="scrollToLeft(1)"
    >&#xe651;</div>

    <!-- 中间：场景列表 -->
    <draggable
      :list="sceneList"
      @end="$emit('drag-end')"
      class="scene-list-wrapper"
      ref="wrapper"
    >
      <transition-group class="scene-list list clearfix" tag="ul" ref="list">
        <!-- 场景项 -->
        <li
          class="scene-item"
          :class="{'scene-item--active': scene.id === activeSceneId}"
          v-for="scene in sceneList" :key="scene.id"
        >
          <div
            class="scene-item__wrapper"
            @click="$emit('select', scene.id)"
          >
            <img
              class="scene-item__image"
              :src="$url.static(scene.thumb)"
              :alt="scene.name"
            >
            <span class="scene-item__title ellipsis" :title="scene.name">{{ scene.name }}</span>
          </div>
          <!-- 设置、删除icon -->
          <edit-tools
            dir="top"
            @delete="$emit('delete', scene.id)"
            @edit="$emit('edit', scene)"
          ></edit-tools>
        </li>
      </transition-group>
    </draggable>

    <!-- 右侧：滚动 -->
    <div
      class="scene-arrow scene-arrow--right iconfont"
      @click="scrollToRight(1)"
    >&#xe7a2;</div>

    <!-- 右侧：添加场景 -->
    <div class="scene-add tip tip--top" data-tip="上传场景">
      <div
        class="btn-add dash-box"
        role="button"
        @click="openSceneCreation"
      >+</div>
    </div>
  </div>
</template>

<script>
/**
 * 高级编辑 - 场景条
 * @author luminghuai
 * @version 2017-09-07
 */

import { EDIT } from '@/store/mutationTypes'
import Draggable from 'vuedraggable'
import EditTools from '../../EditTools'

export default {
  name: 'edit-scene-list',

  components: {
    Draggable,
    EditTools,
  },

  props: {
    sceneList: {
      type: Array,
      required: true,
    },
  },

  computed: {
    activeSceneId() {
      return this.$store.getters.activeScene.id
    },
  },

  methods: {
    /**
     * 向左滚动
     * 每次滚动`90 * count`的宽度
     * @param {number} count - 一次点击所移动的场景个数
     */
    scrollToLeft(count) {
      const { list } = this
      const moveWidth = 90 * count // 90是每个场景的宽度（含一侧margin）

      const left = parseInt(list.style.left || 0, 10)
      if (Math.abs(left) <= moveWidth) {
        list.style.left = '0px'
      } else {
        list.style.left = `${left + moveWidth}px`
      }
    },

    /**
     * 向右滚动
     */
    scrollToRight(count) {
      const { wrapper, list } = this
      const contentWidth = wrapper.clientWidth // 场景条的显示宽度
      const scrollWidth = list.scrollWidth // 场景条所有内容的实际总宽度
      const moveWidth = 90 * count

      const left = parseInt(list.style.left || 0, 10)
      if ((scrollWidth + left) - moveWidth < contentWidth) {
        list.style.left = `${-(scrollWidth - contentWidth)}px`
      } else {
        list.style.left = `${left - moveWidth}px`
      }
    },

    /**
     * 调用素材框添加场景
     * 添加成功后刷新页面
     */
    openSceneCreation() {
      this.$store.dispatch(EDIT.MATERIAL.INVOKE, 'scene')
        .then(() => {
          document.location.reload()
        })
    },

  },

  mounted() {
    this.wrapper = this.$refs.wrapper.$el
    this.list = this.$refs.list.$el
  },
}
</script>

<style lang="postcss">
:root {
  --padding: 5px;
  --scene-size: 80px;
  --total-height: calc(var(--scene-size) + var(--padding) * 2);
  --arrow-width: 40px;
  --right-area-size: calc(var(--scene-size) + var(--padding) * 3 + var(--arrow-width));
  --left-area-size: calc(var(--arrow-width) + var(--padding));
  --content-width: calc(100vw - var(--left-area-size) - var(--right-area-size));
}

.edit-scene {
  position: relative;
  height: var(--total-height);
  padding: var(--padding) 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.scene-list-wrapper {
  position: absolute;
  left: var(--left-area-size);
  bottom: 0;
  width: var(--content-width);
  height: calc(var(--total-height) + 40px);
  padding-top: 40px;
  overflow: hidden;
}

.scene-list {
  position: absolute;
  top: 45px;
  left: 0;
  min-width: 100%;
  text-align: center;
  white-space: nowrap;
  transition: 0.5s;
}

.scene-item {
  position: relative;
  display: inline-block;
  width: var(--scene-size);
  height: var(--scene-size);
  cursor: pointer;
  transition: transform 1s;

  &:hover > .edit-tools {
    visibility: visible;
  }

  &--active {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      width: 100%;
      height: 100%;
      box-shadow: inset 0 0 0 1px #ffc000;
    }
  }

  & + li {
    margin-left: 10px;
  }

  &__wrapper {
    position: relative;
    z-index: 10;
  }

  &__image {
    display: block;
    width: var(--scene-size);
    height: var(--scene-size);
  }

  &__title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    text-align: center;
    line-height: 22px;
  }
}

.scene-arrow {
  position: absolute;
  top: 0;
  z-index: 5;
  width: var(--arrow-width);
  height: var(--total-height);
  font-size: 30px;
  text-align: center;
  line-height: var(--total-height);
  cursor: pointer;
  transition: 1s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  &--left {
    left: 0;
  }

  &--right {
    right: calc(var(--scene-size) + 10px);
  }
}

.scene-add  {
  position: absolute;
  top: 0;
  right: 5px;
  z-index: 2;
  margin-top: var(--padding);
  overflow: hidden;

  & > .dash-box {
    width: var(--scene-size);
    height: var(--scene-size);
    border-width: 2px;
    font-size: 36px;
    line-height: calc(var(--scene-size) - 10px);
  }
}
</style>
