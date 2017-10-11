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
            <!-- 编辑导览 -->
            <i
              class="iconfont"
              @click="() => activateTourEdition(tour)"
            >&#xe614;</i>
            <!-- 编辑视角 -->
            <i
              class="iconfont"
              @click="() => activateViewEdition(tour)"
            >&#xe6bc;</i>
            <!-- 删除导览 -->
            <i
              class="iconfont"
              @click="preDeleteTour(tour.id)"
            >&#xe615;</i>
          </div>
          <div>
            <img v-qiniu-src="tour.image">
          </div>
          <p>{{tour.name}}</p>
        </li>
        <li
          class="tour-guidemap__create"
          v-show="tourlist.length < 5"
          @click="() => activateTourEdition()"
        > + </li>
      </ul>
    </el-dialog>

    <!-- 编辑导览 -->
    <el-dialog
      title="编辑导览图" size="small"
      :visible.sync="tourEditionModal.active"
      :before-close="deactivateTourEdition"
    >
      <v-tour-edition
        :visible="tourEditionModal.active"
        :type="tourEditionModal.type"
        :tour-info="tourInfo"
        @create="tourEditionCreated"
        @update="tourEditionUpdated"
        @cancel="deactivateTourEdition"
      ></v-tour-edition>
    </el-dialog>

    <!-- 编辑视角 -->
    <el-dialog
      class="tour-edition"
      title="编辑场景热点" size="large" top="5%"
      :close-on-click-modal="false"
      :visible.sync="viewEditionModal.active"
      :before-close="deactivateViewEdition"
    >
      <v-view-edition
        v-if="viewEditionModal.active"
        :tour-id="viewEditionModal.tourId"
        @cancel="deactivateViewEdition"
      ></v-view-edition>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 高级编辑 - 导览图
 *
 * @author huojinzhao
 */

import { EDIT } from '@/store/mutationTypes'
import modal from '@/views/Make/Edit/mixins/modal'
import deleteItem from '@/mixins/deleteItem'
import vTourEdition from './TourEdition'
import vViewEdition from './ViewEdition'
import Ajax from './modules/Ajax'

const { TOUR } = EDIT

export default {
  name: 'edit-functions-tour',

  mixins: [modal, deleteItem],

  components: {
    vTourEdition,
    vViewEdition,
  },

  data: () => ({
    tourlist: [],

    tourInfo: {},

    tourEditionModal: {
      active: false,
      type: 'create',
    },

    viewEditionModal: {
      active: false,
      tourId: 0,
    },
  }),

  methods: {
    /* ------ initialization ------ */

    fetchTourlist() {
      Ajax.readTourlist()
        .then((res) => {
          // 组件数据更新
          this.tourlist = res
          // store数据更新
          this.increaseToursAmount(res.length)
        })
    },

    /* ------ application ------ */

    /* --- assitance ---- */

    increaseToursAmount(count) {
      this.$store.commit(TOUR.INCREASE, count)
    },

    decreaseToursAmount(count) {
      this.$store.commit(TOUR.DECREASE, count)
    },

    /* --- control --- */

    activateTourEdition(tourInfo) {
      if (tourInfo) {
        this.tourInfo = tourInfo
        this.tourEditionModal.type = 'update'
      }
      this.tourEditionModal.active = true
    },

    deactivateTourEdition() {
      this.tourEditionModal.active = false
      // 始终以creation为初始状态
      this.tourInfo = {}
      this.tourEditionModal.type = 'create'
    },

    activateViewEdition(tourInfo) {
      if (tourInfo) {
        this.viewEditionModal.tourId = tourInfo.id
      }
      this.viewEditionModal.active = true
    },

    deactivateViewEdition() {
      this.viewEditionModal = {
        active: false,
        tourId: 0,
      }
    },

    /* --- creation --- */

    tourEditionCreated(tourInfo) {
      // 组件数据更新
      this.tourlist.push(tourInfo)
      this.deactivateTourEdition()
      this.activateViewEdition(tourInfo)
      // store计数更新
      this.increaseToursAmount(1)
    },

    /* --- updation --- */

    tourEditionUpdated(tourInfo) {
      const index = this.tourlist
        .findIndex(item => item.id === tourInfo.id)
      if (index > -1) {
        this.$set(this.tourlist, index, tourInfo)
      }
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
      // 组件数据更新
      this.tourlist = this.tourlist
        .filter(tour => tour.id !== tourId)
      // store计数更新
      this.decreaseToursAmount(1)
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

        & > i {
          color: white;
          font-size: 14px;

          &:hover {
            color: var(--color-warning);
          }
        }

        & i:first-of-type {
          float: left;
          font-size: 12px;
        }

        & i:last-of-type {
          float: right;
          font-size: 12px;
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
