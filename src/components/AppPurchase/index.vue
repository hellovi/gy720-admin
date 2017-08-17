<template>
  <div>
    <el-dialog
      title="购买服务"
      size="large"
      :visible.sync="visible"
      @close="$emit('close')"
      class="app-purchase"
    >
      <el-row class="app-purchase__types">
        <el-col :span="12">
          <img :src="require('@/assets/icon-2999.png')" alt="2299元/年">
          <p>（一年内不限作品次数）</p>
          <el-button type="warning" @click="openDialogVip">立刻购买</el-button>
        </el-col>
        <el-col :span="12">
          <img :src="require('@/assets/icon-99.png')" alt="2299元/年">
          <p>（只能购买5次）</p>
          <el-button type="warning" @click="openDialogPano">立刻购买</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col v-for="item in buylist" :key="item" :span="8" class="app-purchase__item">
          <span>{{item}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="app-purchase__item">
          <span>重要信息开启提示 <em>(仅2299元用户)</em></span>
        </el-col>
        <el-col :span="8" class="app-purchase__item">
          <span>网站首页案例推送 <em>(仅2299元用户)</em></span>
        </el-col>
      </el-row>

    </el-dialog>

    <!-- 购买年会员 -->
    <create-dialog
      :goodsId="9"
      :visible="dialog.vip"
      @close="dialog.vip = false"
    ></create-dialog>

    <!-- 购买单作品 -->
    <create-dialog
      :panoId="panoId"
      :goodsId="10"
      :visible="dialog.pano"
      @close="dialog.pano = false"
    ></create-dialog>

  </div>
</template>

<script>
import CreateDialog from './CreateDialog'

export default {

  components: {
    CreateDialog,
  },

  props: {
    visible: {
      type: Boolean,
      default: 'false',
    },
    panoId: {
      type: Number,
      required: 'true',
    },
  },

  data() {
    return {
      buylist: ['自定义场景', '隐藏作品信息', '是否显示人气和点赞', '隐私加密', '隐藏LOGO', '是否开启说一说', '自定义LOGO', '加载文字提示', '滚动文字广告', '数据统计功能', '右侧自定义菜单'],

      dialog: {
        vip: false,
        pano: false,
      },
    }
  },

  methods: {
    openDialogVip() {
      this.dialog.vip = true
      this.$emit('close')
    },
    openDialogPano() {
      this.dialog.pano = true
      this.$emit('close')
    },
  },

}
</script>

<style lang="postcss">
@import "vars.css";

:root {
  --tips-color: rgb(242, 182, 0);
}

.app-purchase {

  &__types {
    margin-bottom: 30px;
    text-align: center;

    & p {
      font-size: 14px;
      margin: 10px 0;
      color: var(--tips-color);
    }
  }

  &__item {
    position: relative;
    padding-left: 45px;
    margin: 0.5em 0;

    & > span {
      vertical-align: middle;

      & > em {
        font-style: normal;
        font-size: 12px;
        color: var(--tips-color);
      }
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 20px;
      top: 50%;
    }

    &::before {
      transform: translateY(-50%);
      width: 14px;
      height: 14px;
      background-color: var(--color-primary);
    }

    &::after {
      width: 4px;
      height: 8px;
      border-width: 0 1px 1px 0;
      border-style: solid;
      border-color: #fff;
      transform: rotate(45deg) translateY(-7px) scale(1.2);
    }
  }
}
</style>
