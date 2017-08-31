<template>
  <div class="edit-functions__tour">
    <!-- 导览图导航 -->
    <el-dialog
      class="tour-guidemap"
      title="导览图" size="large"
      :visible.sync="active.tour"
    >
      <ul class="tour-guidemap__list clearfix">
        <li
          class="tour-guidemap__item"
          v-for="tour in tourlist" :key="tour.id"
        >
          <div class="tour-guidemap__item-control">
            <!-- 编辑 -->
            <i
              class="iconfont"
              @click="activateTourEdition"
            >&#xe614;</i>
            <!-- 删除 -->
            <i
              class="iconfont"
              @click="preDeleteTour(tour.id)"
            >&#xe615;</i>
          </div>
          <div>
            <img :src="$url.static(tour.image)">
          </div>
          <p>{{tour.name}}</p>
        </li>
        <li
          class="tour-guidemap__create"
          v-if="tourlist.length < 5"
          @click="activateTourCreation"
        > + </li>
      </ul>
    </el-dialog>

    <!-- 新增导览 -->
    <el-dialog
      title="添加地图" size="small"
      :visible.sync="createTourModal.active"
    >
      <v-tour-creation
        @submit="tourCreationSucceed"
        @cancel="deactivateTourCreation"
      ></v-tour-creation>
    </el-dialog>

    <!-- 编辑导览 -->
    <el-dialog
      class="tour-edition"
      title="添加场景视角展示" size="large" top="5%"
      :close-on-click-modal="false"
      :visible.sync="editTourModal.active"
    >
      <v-tour-edition
        v-if="editTourModal.active"
        :tour-id="editTourModal.tourId"
      ></v-tour-edition>
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
import deleteItem from '@/mixins/deleteItem'
import vTourCreation from './TourCreation'
import vTourEdition from './TourEdition'
import Ajax from './modules/Ajax'

export default {
  name: 'edit-functions__tour',

  mixins: [modal, deleteItem],

  components: {
    vTourCreation,
    vTourEdition,
  },

  data: () => ({
    tourlist: [],

    tourInfo: {},

    createTourModal: {
      active: false,
      confirmLoading: false,
    },

    editTourModal: {
      active: false,
      confirmLoading: false,
      tourId: 0,
    },
  }),

  methods: {
    /* ------ initialization ------ */

    fetchTourlist() {
      Ajax.readTourlist()
        .then((res) => { this.tourlist = res })
    },

    /* ------ application ------ */

    /* --- control --- */

    activateTourCreation() {
      this.createTourModal.active = true
    },

    deactivateTourCreation() {
      this.createTourModal.active = false
    },

    activateTourEdition() {
      this.editTourModal.active = true
    },

    /* --- creation --- */

    tourCreationSucceed(tourInfo) {
      this.tourlist.push(tourInfo)
      this.deactivateTourCreation()
      // this.activateTourEdition()
    },

    /* --- deletion --- */

    preDeleteTour(tourId) {
      this.onDeleteItem({
        title: '删除导览提示',
        message: '此操作将永久删除该导览, 是否继续?',
        itemId: tourId,
        ajax: this.deleteTour,
        success: this.tourDeletionSucceed,
      })
    },

    deleteTour(tourId) {
      return Ajax.removeTourInfo(tourId)
    },

    tourDeletionSucceed(tourId) {
      this.tourlist = this.tourlist
        .filter(tour => tour.id !== tourId)
    },
  },

  created() {
    // Ajax初始化
    Ajax.defaultPanoId = this.$route.query.pano_id

    // 读取导览列表
    this.fetchTourlist()
  },
}
</script>

<style lang="postcss">
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

  & .tour-edition {
    /* 在动画过程中，viewpanel会有显示问题 */
    animation: none;

    & .el-dialog--large {
      width: 900px;
    }
  }
}
</style>
