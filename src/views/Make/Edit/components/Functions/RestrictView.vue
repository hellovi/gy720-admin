<template>
  <transition name="edit-function-fade">
    <div class="restrict-view">
      <!--上-->
      <el-row class="v-box v-box__top">
        <el-col :span="12">
          限制：<span class="v-box__txt">{{ restrict.vlookatmin }}</span>
          <el-button
            type="warning"
            :disabled="isDefault('vlookatmin')"
            @click="reset('vlookatmin')"
          >重置</el-button>
        </el-col>

        <el-col :span="12">
          当前：<span class="v-box__txt">{{ view.vlookat }}</span>
          <el-button
            type="primary"
            :disabled="!isDefault('vlookatmin') || view.vlookat >= 0"
            @click="setView('vlookatmin', 'vlookat')"
          >设定</el-button>
        </el-col>
      </el-row>

      <!--下-->
      <el-row class="v-box v-box__bottom">
        <el-col :span="12">
          限制：<span class="v-box__txt">{{ restrict.vlookatmax }}</span>
          <el-button
            type="warning"
            :disabled="isDefault('vlookatmax')"
            @click="reset('vlookatmax')"
          >重置</el-button>
        </el-col>

        <el-col :span="12">
          当前：<span class="v-box__txt">{{ view.vlookat }}</span>
          <el-button
            type="primary"
            :disabled="!isDefault('vlookatmax') || view.vlookat < 0"
            @click="setView('vlookatmax', 'vlookat')"
          >设定</el-button>
        </el-col>
      </el-row>

      <!--左-->
      <div class="v-box v-box__left">
        <div class="top">
          限制：<span class="v-box__txt">{{ restrict.hlookatmin }}</span>
          <el-button
            type="warning"
            :disabled="isDefault('hlookatmin')"
            @click="reset('hlookatmin')"
          >重置</el-button>
        </div>

        <div class="bottom">
          当前：<span class="v-box__txt">{{ view.hlookat }}</span>
          <el-button
            type="primary"
            :disabled="!isDefault('hlookatmin') || view.hlookat > 0"
            @click="setView('hlookatmin', 'hlookat')"
          >设定</el-button>
        </div>
      </div>

      <!--右-->
      <div class="v-box v-box__right">
        <div class="top">
          <el-button
            type="warning"
            :disabled="isDefault('hlookatmax')"
            @click="reset('hlookatmax')"
          >重置</el-button>
          限制：<span class="v-box__txt">{{ restrict.hlookatmax }}</span>
        </div>

        <div class="bottom">
          <el-button
            type="primary"
            :disabled="!isDefault('hlookatmax') || view.hlookat <= 0"
            @click="setView('hlookatmax', 'hlookat')"
          >设定</el-button>
          当前：<span class="v-box__txt">{{ view.hlookat }}</span>
        </div>
      </div>

      <!-- 中 -->
      <div class="v-center-box">
        <div class="v-box v-box__center">
          最小 fov： <span class="v-box__txt"> {{ restrict.fovmin }}</span>
          <el-button
            type="primary"
            :disabled="!isDefault('fovmin')"
            @click="setView('fovmin', 'fov')"
          >设定</el-button>
          <el-button
            type="warning"
            :disabled="isDefault('fovmin')"
            @click="reset('fovmin')"
          >重置</el-button>
        </div>

        <div class="v-box v-box__center">
          当前 fov： {{ view.fov }}
        </div>

        <div class="v-box v-box__center">
          最大 fov： <span class="v-box__txt"> {{ restrict.fovmax }}</span>
          <el-button
            type="primary"
            :disabled="!isDefault('fovmax')"
            @click="setView('fovmax', 'fov')"
          >设定</el-button>
          <el-button
            type="warning"
            :disabled="isDefault('fovmax')"
            @click="reset('fovmax')"
          >重置</el-button>
        </div>
      </div>

      <!-- 操作 -->
      <div class="restrict-view__sub">
        <div class="sub-row">
          <el-button
            type="primary"
            @click="saveView"
            :loading="loading"
          >保存当前设置</el-button>
        </div>

        <el-row class="sub-row">
          <el-col :span="12" class="sub-row__col">
            <el-button type="warning" @click="resetAll">全部重置</el-button>
          </el-col>
          <el-col :span="12" class="sub-row__col">
            <el-button @click="close">取消</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </transition>
</template>

<script>
/**
 * 高级编辑-限制视角
 * @author  luminhuai | chenliangshan
 * @version 2017/08/31
 */

/* eslint-disable no-underscore-dangle */
/** @typedef {'vlookatmin'|'hlookatmin'|'hlookatmax'|'vlookatmax'|'fovmin'|'fovmax'} RestrictProp */
/** @typedef {'fov'|'vlookat'|'hlookat'} ViewProp */

import { mapGetters } from 'vuex'
import modal from '../../mixins/modal'
import esc from '../../mixins/esc'

// 默认的视角设置
const defaultRestrict = {
  vlookatmin: -90, // 上
  hlookatmin: -180, // 左
  hlookatmax: 180, // 右
  vlookatmax: 90, // 下
  fovmin: 40,
  fovmax: 140,
}

export default {
  name: 'edit-functions-restrict',

  mixins: [modal, esc],

  data() {
    return {
      timer: null,
      restrict: { ...defaultRestrict }, // 这里需要获取用户已经设置的限制？
      view: {
        fov: 0,
        hlookat: 0, // 横向
        vlookat: 0, // 纵向
      },
      loading: false,
    }
  },

  computed: {
    ...mapGetters(['activeScene']),
  },

  methods: {
    /**
     * 获取fov，表示视角的深度
     */
    getFov() {
      this.view.fov = Math.floor(window.__krpano.get('view.fov'))
    },

    /**
     * 获取lookat，示视角的在横轴和纵轴上的位置
     */
    getLookat() {
      this.view.hlookat = this.visualRange(Math.floor(window.__krpano.get('view.hlookat')))
      this.view.vlookat = Math.floor(window.__krpano.get('view.vlookat'))
    },

    /**
     * 计算视角值（限制最小最大范围之间）
     */
    visualRange(hlookat) {
      // 正数 && 负数
      if (hlookat >= -180 && hlookat <= 180) {
        return hlookat
      } else if (parseInt(hlookat / 180, 10) % 2 === 1) {
        // hlookat > 180
        return (hlookat % 180) - 180
      } else if (parseInt(hlookat / 180, 10) % 2 === -1) {
        // hlookat < -180
        return (hlookat % 180) + 180
      }
      return hlookat % 180
    },

    /**
     * 判断某项视角属性当前的值是否为默认值
     * @param {sring} prop - 视角属性
     */
    isDefault(prop) {
      return this.restrict[prop] === defaultRestrict[prop]
    },

    /**
     * 使用当前的视角设置视角限制
     * @param {RestrictProp} rProp - 被限制的属性
     * @param {ViewProp} vProp - 用于限制的视角属性
     */
    setView(rProp, vProp) {
      const val = this.view[vProp]
      this.restrict[rProp] = val
      window.__krpano.set(`view.${rProp}`, val)

      if (rProp === 'fovmin') {
        window.__krpano.set('view.maxpixelzoom', 0)
      }
    },

    /**
     * 重置某项限制属性
     * @param {RestrictProp} prop
     */
    reset(prop) {
      const val = defaultRestrict[prop]
      this.restrict[prop] = val
      window.__krpano.set(`view.${prop}`, val)
    },

    /**
     * 重置所有限制属性
     */
    resetAll() {
      this.restrict = { ...defaultRestrict }
      Object.keys(this.restrict).forEach((prop) => {
        window.__krpano.set(`view.${prop}`, this.restrict[prop])
      })
    },

    /**
     * 保存当前的视角限制
     */
    saveView() {
      this.loading = true

      this.$http.post('/user/scene/viewangle', {
        ...this.view,
        ...this.restrict,
        pano_id: this.$route.query.pano_id,
        id: this.activeScene.id,
      })
        .then(() => {
          this.close()
          this.$message.success('操作成功')
        })
        .catch(({ status: { reason } }) => {
          this.$message.error(reason)
        })
        .then(() => {
          this.loading = false
        })
    },

    /**
     * 退出视角限制功能
     */
    close() {
      this.closeModal('restrictView')
      this.openModal('control')
    },
  },

  created() {
    this.timer = setInterval(() => {
      this.getFov()
      this.getLookat()
    }, 300)
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },
}
</script>

<style lang="postcss">
.restrict-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  pointer-events: none;

  .el-button {
    pointer-events: auto;
  }

  .v-box {
    border: 1px solid #fff;
    padding: 10px 20px;

    &__top,
    &__bottom {
      position: fixed;
      left: 50%;
      width: 440px;
      margin-left: -220px;

      button {
        margin-left: 10px;
      }

      .el-col + .el-col {
        padding-left: 20px;
      }
    }

    &__left, &__right {
      position: fixed;
      top: 50%;
      margin-top: -58px;
      width: 220px;
      padding: 10px 0;

      .top, .bottom {
        padding: 0 20px;
      }

      .top {
        padding-bottom: 10px;
      }

      .bottom {
        padding-top: 10px;
        border-top: 1px solid #fff;
      }
    }

    &__top {
      top: 50px;
    }

    &__bottom {
      bottom: 50px;
    }

    &__left {
      left: 50px;

      button {
        margin-left: 15px;
      }
    }

    &__right {
      right: 50px;

      button {
        margin-right: 15px;
      }

      .v-box__txt {
        padding-right: 0;
      }
    }

    &__center {
      margin: 10px 0;
      text-align: center;
    }

    &__txt {
      text-align: center;
      width: 50px;
      padding: 0 6px;
      display: inline-block;
    }
  }

  .v-center-box {
    width: 314px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -157px;
    margin-top: -98px;
  }

  &__sub {
    width: 260px;
    position: fixed;
    bottom: 150px;
    left: 50%;
    margin-left: -130px;

    .sub-row {

      padding: 10px 0;

      &__col {
        padding-right: 10px;

        & + .sub-row__col {
          padding: 0 0 0 10px;
        }
      }
    }

    button {
      width: 100%;
    }
  }
}
</style>
