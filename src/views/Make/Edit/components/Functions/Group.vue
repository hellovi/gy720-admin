<template>
  <el-dialog title="group" :visible.sync="active.group" custom-class="group-dialog">
    <header class="group-dialog__header clearfix">
      <div class="group-dialog__header__tip clearfix">
      <h5>温馨提示:</h5>
        <ol>
          <li>最多支持添加5个分组</li>
          <li>拖动整个分组名称可以排序</li>
          <li>拖动单个场景可以排序</li>
          <li>未分组的场景显示在第一个默认分组（场景）内</li>
        </ol>
      </div>
      <el-button type="primary" size="small" @click="createNewGroup">添加场景分组</el-button>
    </header>

    <draggable v-model="names">
      <transition-group tag="ul" class="group-list list">
        <li v-for="name in names" :key="name">
          <div class="scene-group">
            <div class="scene-group__title clearfix">
              <h4>{{ name }}</h4>
              <i role="button" class="iconfont" @click="removeGroup">&#xe615;</i>
            </div>
            <draggable :list="groups[name]">
              <transition-group tag="ul" class="list">
                <li v-for="scene in groups[name]" :key="scene.name" class="scene-group__item clearfix">
                  <img :src="scene.src" alt="">
                  <span class="scene-group__item__name">{{ scene.name }}</span>
                </li>
              </transition-group>
            </draggable>
            <el-button size="small" class="scene-group__add" @click="showScenes = true">+</el-button>
          </div>
        </li>
      </transition-group>
    </draggable>

    <el-dialog title="132412" :visible.sync="showScenes" size="large" :modal="false">
      <ul class="work-scenes list clearfix">
        <li v-for="i in 10" :key="i">
          <img src="http://www.gy720.com/data/pano/984/3440/11026/200_26478d4be10cf.jpg" alt="">
          <span>4</span>
        </li>
      </ul>
      <div class="work-scenes__confirm">
        <el-button type="primary" size="">确定</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
/**
 * 高级编辑 - 场景
 * @version 2017-08-14
 */

import Draggable from 'vuedraggable'
import modal from '../../mixins/modal'

export default {
  name: 'edit-functions__group',

  components: {
    Draggable,
  },

  mixins: [modal],

  data() {
    return {
      showScenes: false,
      names: ['a', 'b', 'c', 'd', 'e'],
      groups: {
        a: [
          { src: 'http://www.gy720.com/data/pano/984/3440/11026/200_26478d4be10cf.jpg', name: '0', group: 'a' },
          { src: 'http://www.gy720.com/data/pano/984/3440/11026/200_26478d4be10cf.jpg', name: '1', group: 'a' },
        ],
        b: [
          { src: 'http://www.gy720.com/data/pano/984/3440/11026/200_26478d4be10cf.jpg', name: '3', group: 'b' },
          { src: 'http://www.gy720.com/data/pano/984/3440/11026/200_26478d4be10cf.jpg', name: '4', group: 'b' },
        ],
        c: [
          { src: 'http://www.gy720.com/data/pano/984/3440/11026/200_26478d4be10cf.jpg', name: '5', group: 'c' },
          { src: 'http://www.gy720.com/data/pano/984/3440/11026/200_26478d4be10cf.jpg', name: '6', group: 'c' },
        ],
        d: [
          { src: 'http://www.gy720.com/data/pano/984/3440/11026/200_26478d4be10cf.jpg', name: '7', group: 'd' },
          { src: 'http://www.gy720.com/data/pano/984/3440/11026/200_26478d4be10cf.jpg', name: '8', group: 'd' },
        ],
        e: [
          { src: 'http://www.gy720.com/data/pano/984/3440/11026/200_26478d4be10cf.jpg', name: '7', group: 'e' },
          { src: 'http://www.gy720.com/data/pano/984/3440/11026/200_26478d4be10cf.jpg', name: '8', group: 'e' },
        ],
      },
    }
  },

  methods: {
    createNewGroup() {
      this.$prompt('请输入分组名', '添加场景分组', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern:,
        inputErrorMessage: '邮箱格式不正确',
      })
    },

    removeGroup() {
      this.$confirm('确定要删除该分组吗?', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
      })
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

:root {
  --dialog-width: 1100px;
}

.group-dialog {
  width: var(--dialog-width);
  height: 60%;
  transform: none;
  margin-left: calc(var(--dialog-width) / -2);
  overflow: auto;

  &__header {
    margin-bottom: 20px;
    font-size: 12px;
    color: var(--gray);

    &__tip {
      float: left;

      h5,
      ol {
        float: left;
        margin: 0;
        padding: 0;
        line-height: 20px;
      }

      h5 {
        margin-right: 0.5em;
        font-size: 12px;
        font-weight: normal;
      }

      li {
        float: left;
        margin-left: 2em;
      }
    }

    .el-button {
      float: right;
      margin-top: -4px;
    }
  }
}

.group-list {
  & > li {
    float: left;
    transition: 0.3s;

    & + li {
      margin-left: 20px;
    }
  }
}

.scene-group {
  padding: 5px;
  border-radius: 3px;
  background-color: var(--gray-extra-light);
  transition: 0.5s;

  &__title {
    padding: 4px;
    border-radius: 2px;
    background-color: #fff;

    & > h4 {
      float: left;
      margin: 0;
      font-weight: normal;
    }

    & > .iconfont {
      float: right;
      cursor: pointer;

      &:hover {
        color: var(--color-warning);
      }
    }

    & > .el-input {
      width: 182px;
    }
  }

  &__item {
    width: 182px;
    border: 1px solid var(--border-color);
    margin: 6px 0 0;
    transition: 0.3s;

    & > img {
      float: left;
      width: 60px;
      height: 30px;
    }

    &__name {
      float: left;
      width: 120px;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
  }

  &__add {
    width: 100%;
    margin-top: 8px;
    font-size: 18px;
    font-weight: 700;
    color: var(--gray-light);
  }
}

.work-scenes {
  & > li {
    float: left;
    padding: 2px;
    border: 1px solid var(--border-color);
    margin: 5px;
    font-size: 12px;
    text-align: center;

    & > img {
      display: block;
      width: 80px;
      height: 40px;
      margin-bottom: 2px;
    }
  }

  &__confirm {
    margin-top: 25px;
    text-align: center;

    .el-button {
      width: 10em;
    }
  }
}
</style>
