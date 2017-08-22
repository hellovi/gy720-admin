<template>
  <div v-if="visible" class="restrict-view">
    <!--上-->
    <el-row class="v-box v-box__top">
      <el-col :span="12">
        限制：<span class="v-box__txt">{{ currentView.vlookatmin }}</span>
        <el-button
          type="warning"
          :disabled="isDefault('vlookatmin')"
          @click="reset('vlookatmin')"
        >重置</el-button>
      </el-col>
      <el-col :span="12">
        当前：<span class="v-box__txt">{{ vlookat }}</span>
        <el-button
          type="primary"
          :disabled="!isDefault('vlookatmin') || vlookat >= 0"
          @click="setView('vlookatmin', 'vlookat')"
        >设定</el-button>
      </el-col>
    </el-row>

    <!--下-->
    <el-row class="v-box v-box__bottom">
      <el-col :span="12">
        限制：<span class="v-box__txt">{{ currentView.vlookatmax }}</span>
        <el-button
          type="warning"
          :disabled="isDefault('vlookatmax')"
          @click="reset('vlookatmax')"
        >重置</el-button>
      </el-col>
      <el-col :span="12">
        当前：<span class="v-box__txt">{{ vlookat }}</span>
        <el-button
          type="primary"
          :disabled="!isDefault('vlookatmax') || vlookat >= 0"
          @click="setView('vlookatmax', 'vlookat')"
        >设定</el-button>
      </el-col>
    </el-row>

    <!--左-->
    <div class="v-box v-box__left">
      <el-row class="top">
        <el-col>
          限制：<span class="v-box__txt">{{ currentView.hlookatmin }}</span>
          <el-button
            type="warning"
            :disabled="isDefault('hlookatmin')"
            @click="reset('hlookatmin')"
          >重置</el-button>
        </el-col>
      </el-row>
      <el-row class="bottom">
        <el-col>
          当前：<span class="v-box__txt">{{ hlookat }}</span>
          <el-button
            type="primary"
            :disabled="!isDefault('hlookatmin') || hlookat >= 0"
            @click="setView('hlookatmin', 'hlookat')"
          >设定</el-button>
        </el-col>
      </el-row>
    </div>

    <!--右-->
    <div class="v-box v-box__right">
      <el-row class="top">
        <el-col>
          <el-button
            type="warning"
            :disabled="isDefault('hlookatmax')"
            @click="reset('hlookatmax')"
          >重置</el-button>
          限制：<span class="v-box__txt">{{ currentView.hlookatmax }}</span>
        </el-col>
      </el-row>
      <el-row class="bottom">
        <el-col>
          <el-button
            type="primary"
            :disabled="!isDefault('hlookatmax') || hlookat >= 0"
            @click="setView('hlookatmax', 'hlookat')"
          >设定</el-button>
          当前：<span class="v-box__txt">{{ hlookat }}</span>
        </el-col>
      </el-row>
    </div>

    <div class="v-center-box">
      <el-row class="v-box v-box__center">
        最小 fov： <span class="v-box__txt"> {{ currentView.fovmin }}</span>
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
      </el-row>
      <el-row class="v-box v-box__center">
        当前 fov： {{ fov }}
      </el-row>
      <el-row class="v-box v-box__center">
        最大 fov： <span class="v-box__txt"> {{ currentView.fovmax }}</span>
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
      </el-row>
    </div>

    <!--操作-->
    <div class="restrict-view__sub">
      <el-row class="sub-row">
        <el-col>
          <el-button type="primary" @click="saveView">保存当前设置</el-button>
        </el-col>
      </el-row>
      <el-row class="sub-row">
        <el-col :span="12" class="sub-row__col">
          <el-button type="primary" @click="resetAll">全部重置</el-button>
        </el-col>
        <el-col :span="12" class="sub-row__col">
          <el-button type="primary" @click="close">取消</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  /**
   * 高级编辑-限制视角
   * @author  luminhuai | chenliangshan
   * @version 2017/08/21
   */

  import modal from '../../mixins/modal'

  // 默认的视角设置
  const defaultView = {
    vlookatmin: -90, // 上
    hlookatmin: -180, // 左
    hlookatmax: 180, // 右
    vlookatmax: 90, // 下
    fovmin: 40,
    fovmax: 140,
  }

  // krpano
  // eslint-disable-next-line
  const krpano = window.__krpano

  export default {
    name: 'edit-functions__restrict',
    mixins: [modal],

    data() {
      return {
        timer: null,
        currentView: { ...defaultView },
        fov: 0,
        vlookat: 0, // 纵向
        hlookat: 0, // 横向
      }
    },

    computed: {
      visible() {
        return this.active.restrictView
      },
    },

    watch: {
      visible(val) {
        if (val) {
          this.timer = setInterval(() => {
            // TODO 获取视角数据
            // this.getFov()
            // this.getLookat()
          }, 300)
        } else {
          clearInterval(this.timer)
        }
      },
    },

    methods: {
      // 获取fov
      getFov() {
        this.fov = Math.floor(krpano.get('view.fov'))
      },

      // 获取lookat
      getLookat() {
        this.vlookat = Math.floor(krpano.get('view.vlookat'))
        this.hlookat = Math.floor(krpano.get('view.hlookat'))
      },

      // 判断某项视角属性当前的值是否为默认值
      isDefault(prop) {
        return this.currentView[prop] === defaultView[prop]
      },

      // 设置某一项视角属性，并同步到krpano实例上
      setView(target, source) {
        this.currentView[target] = this[source]
        krpano.set(`view.${target}`, this[source])
        if (target === 'fovmin') {
          krpano.set('view.maxpixelzoom', 0)
        }
      },

      // 重置某一项视角属性，并同步到krpano实例上
      reset(prop) {
        this.currentView[prop] = defaultView[prop]
        krpano.set(`view.${prop}`, defaultView[prop])
      },

      // 重置所有视角属性，并同步到krpano实例上
      resetAll() {
        this.currentView = { ...defaultView }
        Object.keys(this.currentView).forEach((prop) => {
          krpano.set(`view.${prop}`, this.currentView[prop])
        })
      },

      // 保存当前的视角设置
      saveView() {
        // TODO 最终视角数据提交后端
      },

      // 关闭限制视角功能
      close() {
        this.closeModal('restrictView')
        // 显示ui层
        this.openModal('uiView')
      },
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
