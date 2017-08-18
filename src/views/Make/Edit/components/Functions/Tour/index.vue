<template>
  <div class="edit-functions__tour">
    <!-- 导览图导航 -->
    <el-dialog
      class="tour-guidemap"
      title="导览图" size="large"
      :visible.sync="active.tour"
    >
      <ul class="tour-guidemap__list clearfix">
        <li v-for="i in 30" :key="i" class="tour-guidemap__item">
          <div class="tour-guidemap__item-control">
            <!-- 编辑 -->
            <i
              class="iconfont"
              @click="onEditTour"
            >&#xe614;</i>
            <!-- 删除 -->
            <i
              class="iconfont"
              @click="onDeleteTour"
            >&#xe615;</i>
          </div>
          <div>
            <img :src="$url.static('data/avatar/20170101/471811501052670905.jpg')">
          </div>
          <p>导览图{{i}}</p>
        </li>
        <li class="tour-guidemap__create" @click="onCreateTour"> + </li>
      </ul>
    </el-dialog>

    <!-- 新增导览 -->
    <el-dialog
      title="添加地图" size="small"
      :visible.sync="createTourModal.tag"
    >
      <v-tour-creation></v-tour-creation>
      <div slot="footer">
        <el-button type="primary"
          @click="onConfirmTourCreation"
        >提交</el-button>
        <el-button
          @click="onEndTourCreation"
        >取消</el-button>
      </div>
    </el-dialog>

    <!-- 编辑导览 -->
    <el-dialog
      title="添加场景热点" size="large" top="5%"
      :visible.sync="editTourModal.tag"
    >
      <v-tour-edition></v-tour-edition>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 高级编辑 - 导览图
 *
 * @author hjz
 */

import modal from '@/views/Make/Edit/mixins/modal'
import vTourCreation from './TourCreation'
import vTourEdition from './TourEdition'

export default {
  name: 'edit-functions__tour',

  components: {
    vTourCreation,
    vTourEdition,
  },

  data: () => ({
    createTourModal: {
      tag: false,
      confirmLoading: false,
    },
    editTourModal: {
      tag: false,
    },
  }),

  methods: {
    onCreateTour() {
      this.createTourModal.tag = true
    },

    onConfirmTourCreation() {
      this.$message({
        message: '创建成功',
        type: 'success',
      })
      this.onEndTourCreation()
      this.onEditTour()
    },

    onEndTourCreation() {
      this.createTourModal.tag = false
    },

    onDeleteTour() {
      this.$msgbox({
        title: '删除导览提示',
        message: '此操作将永久删除该导览, 是否继续?',
        type: 'warning',
        showCancelButton: true,
      })
        .then(() => {
          this.$message({
            message: '删除成功',
            type: 'success',
          })
        })
        .catch(() => {
          this.$message({
            message: '删除失败',
            type: 'error',
          })
        })
    },

    onEditTour() {
      this.editTourModal.tag = true
    },
  },

  mixins: [modal],
}
</script>

<style>
@import 'vars.css';

:root {
  --tour-item-length: 85px;
}

.edit-functions__tour {

  & .tour-guidemap {

    & .el-dialog__body {
      padding-right: 0;
      max-height: 400px;
      overflow-y: auto;
    }

    &__list {
      padding-left: 0;
      margin-bottom: 0;

      & > li {
        float: left;
        margin: 0 12px 10px;
        width: var(--tour-item-length);
        border-radius: 4px;
        text-align: center;
        list-style: none;
        cursor: pointer;
      }
    }

    &__create {
      border: 1px dashed black;
      height: var(--tour-item-length);
      line-height: var(--tour-item-length);
      font-size: 35px;
      color: var(--disabled-color-base);

      &:hover {
        color: color(var(--disabled-color-base) tint(30%));
      }
    }

    &__item {
      position: relative;

      &:hover {

        & .tour-guidemap__item-control {
          display: block;
        }
      }

      &-control {
        position: absolute;
        display: none;
        top: 0;
        left: 0;
        padding: 2px 5px;
        width: 100%;
        background-color: color(black alpha(30%));
        text-align: left;

        & > i {
          color: white;
          font-size: 12px;

          &:hover {
            color: var(--color-warning);
          }
        }

        & i + i {
          float: right;
        }
      }

      & div + div {
        display: block;
        height: var(--tour-item-length);
        font-size: 0;

        & > img {
          width: 100%;
          height: 100%;
        }
      }

      & > p {
        margin: 5px 0;
      }
    }
  }
}
</style>
