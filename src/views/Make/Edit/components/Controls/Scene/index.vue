<template>
  <div class="edit-control__scene">
    <div class="edit-scene clearfix">
      <div class="edit-scene__left-arrow iconfont" @click="scrollToLeft">&#xe651;</div>
      <draggable :list="items">
        <transition-group tag="ul" class="list clearfix" ref="list" style="left: 0px;">
          <li
            v-for="item in items"
            :key="item"
            class="edit-scene__item"
            :class="{'edit-scene__item--active': item === current}"
          >
            <div class="edit-scene__item__wrapper" @click="selectScene(item)">
              <img class="edit-scene__item__image" src="http://www.gy720.com/data/pano/3510/9647/34192/200_34eaf9e175468.jpg" alt="场景名称">
              <span class="edit-scene__item__title">{{ item }}</span>
            </div>
            <edit-tools dir="top" @onEdit="openModal('scene')"></edit-tools>
          </li>
        </transition-group>
      </draggable>
      <div class="edit-scene__right-arrow iconfont" @click="scrollToRight">&#xe7a2;</div>
    </div>
    <div class="edit-scene-upload tip tip--top" data-tip="上传场景">
      <div role="button" class="btn-add dash-box">+</div>
    </div>

    <!-- 场景设置弹框 -->
    <el-dialog :visible.sync="edit" title="场景设置" size="large">
      <nav class="edit-setting__nav">
        <ul class="list clearfix">
          <li
            v-for="(tab, index) in tabs"
            :key="tab"
            :class="{active: activeTab === index}"
            @click="activeTab = index"
          >{{ tab }}</li>
        </ul>
      </nav>
      <el-form class="edit-setting__form">
        <basic v-show="activeTab === 0"></basic>
        <special-effect v-show="activeTab === 1"></special-effect>
        <music v-show="activeTab === 2"></music>
        <minor v-show="activeTab === 3"></minor>
      </el-form>
      <div slot="footer" class="edit-setting__footer">
        <el-button type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 高级编辑 - 场景
 * @author luminghuai
 * @version 2017-08-30
 * @description 场景设置弹框共用Setting模块的样式
 */

import Draggable from 'vuedraggable'
import modal from '../../../mixins/modal'
import EditTools from '../EditTools'
import Basic from './components/Basic'
import SpecialEffect from './components/SpecialEffect'
import Music from './components/Music'
import Minor from './components/Minor'

export default {
  name: 'edit-scene',

  mixins: [modal],

  components: {
    Draggable,
    EditTools,
    Basic,
    SpecialEffect,
    Music,
    Minor,
  },

  data() {
    return {
      current: 1,
      items: [1, 2, 3, 4, 5],

      edit: false,
      tabs: ['基本信息', '场景特效', '背景音乐', '功能微调'],
      activeTab: 0,
    }
  },

  methods: {
    selectScene(index) {
      this.current = index
    },

    // 125是每个场景图的宽度 + 5px margin
    scrollToLeft() {
      const $list = this.$refs.list
      const left = parseInt($list.style.left, 10)

      if (Math.abs(left) <= 125) {
        $list.style.left = '0px'
      } else {
        $list.style.left = `${left + 125}px`
      }
    },

    scrollToRight() {
      const $list = this.$refs.list

      const { innerWidth } = window
      const scrollWidth = $list.scrollWidth
      const left = parseInt($list.style.left, 10)

      if ((scrollWidth + left) - 120 < innerWidth) {
        $list.style.left = `${-(scrollWidth - innerWidth) - 120}px`
      } else {
        $list.style.left = `${left - 125}px`
      }
    },
  },
}
</script>


<style lang="postcss">
.edit-control__scene {
  position: absolute;
  bottom: 80px;
  left: 0;
  width: 100%;
  height: 70px;
  padding-right: 120px;


  & .edit-scene-upload {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.7);

    & > .dash-box {
      width: 106px;
      height: 56px;
      margin: 7px;
      border-width: 2px;
      font-size: 36px;
      line-height: 45px;
    }
  }
}

.edit-scene {
  position: relative;
  padding: 5px 0;
  background-color: rgba(0, 0, 0, 0.4);

  &__left-arrow,
  &__right-arrow {
    position: absolute;
    top: 0;
    z-index: 5;
    width: 30px;
    height: 70px;
    font-size: 22px;
    text-align: center;
    line-height: 70px;
    cursor: pointer;
    transition: 1s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }

  &__left-arrow {
    left: 0;
  }

  &__right-arrow {
    right: 0;
  }

  .list {
    position: relative;
    height: 60px;
    padding: 0 5px;
    text-align: center;
    white-space: nowrap;
    transition: 1s;
  }

  &__item {
    position: relative;
    display: inline-block;
    width: 120px;
    height: 60px;
    cursor: pointer;
    transition: 1s;

    &:hover > .edit-tools {
      visibility: visible;
    }

    &--active {
      box-shadow: 0 0 0 2px #ffc000;
    }

    & + li {
      margin-left: 5px;
    }

    &__wrapper {
      position: relative;
      z-index: 1;
    }

    &__image {
      display: block;
      width: 100%;
      height: 100%;
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
}
</style>
