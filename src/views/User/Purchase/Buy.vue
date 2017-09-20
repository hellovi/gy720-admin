<template>
  <!--<div class="buy-server">-->
    <!--<el-row :gutter="30">
      <el-col :span="8">
        <section class="buy-panel">
          <dl class="panel-list clearfix">
            <dt class="panel-list__title">免费用户功能</dt>
            <dd class="panel-list__item" v-for="item in freeList" :key="item">
              <span>{{item}}</span>
            </dd>
          </dl>
        </section>
      </el-col>

      <el-col :span="8">
        <section class="buy-panel buy-panel&#45;&#45;vip">
          <dl class="panel-list clearfix">
            <dt class="panel-list__title">99套餐添加功能</dt>
            <dd class="panel-list__item" v-for="item in addList" :key="item">
              <span>{{item}}</span>
            </dd>

            <dt class="panel-list__title">2299套餐添加功能<span>（于99套餐基础添加）</span></dt>
            <dd class="panel-list__item" v-for="item in moreList" :key="item">
              <span>{{item}}</span>
            </dd>
          </dl>
        </section>

        <section class="buy-panel">
          <img class="buy-price" :src="require('@/assets/icon-2999.png')" alt="2299元/年">
          <div class="buy-action">
            <div>无限次作品数量</div>
            <el-button type="primary" @click="visible = true">立即购买</el-button>
          </div>
        </section>
      </el-col>

      <el-col :span="8">
        <section class="buy-panel buy-panel&#45;&#45;vip">
          <h3 class="panel-list__title">购买方式</h3>
          <dl class="panel-list clearfix">

            <dt class="panel-list__sub-title">2299元 / 年</dt>
            <dd class="panel-list__item">直接点击<em>立即购买</em>开通会员</dd>

            <dt class="panel-list__sub-title">99元 / 次</dt>
            <dd class="panel-list__item">点击<em>我的作品</em>进入作品列表页面</dd>
            <dd class="panel-list__item">点击作品右侧<em>升级商业版</em>进行购买</dd>
            <dd class="panel-list__item">点击作品右侧<em>高级编辑</em>进入作品页面
              <br>点击作品页面的<em>左上角LOGO</em>进行购买
            </dd>
          </dl>
        </section>

        <section class="buy-panel">
          <img class="buy-price" :src="require('@/assets/icon-99.png')" alt="99元/年">
          <div class="buy-action">
            <div>作品按次收费</div>
            &lt;!&ndash; <el-button type="primary" @click="visible2 = true">我的作品</el-button> &ndash;&gt;
            <el-button type="primary" @click="$router.push('/user-client/works')">我的作品</el-button>
          </div>
        </section>
      </el-col>
    </el-row>

    <create-dialog
      :order-type="10"
      :visible.sync="visible"
      :current-window-open='true'
    ></create-dialog>

    <app-purchase
      :panorama-id='9'
      :visible.sync="visible2"
      @panoBuySuccess="ok"
    ></app-purchase>-->
  <!--</div>-->
  <app-buy-service :is-serve-page="true"></app-buy-service>
</template>

<script>
/**
 * 购买服务
 *
 * @author zhoumenglin | luminghuai
 * @version 2017-08-12
 */

import { AppPurchase, CreateDialog, AppBuyService } from '@/components'

export default {
  name: 'purchase-buy',

  components: {
    AppPurchase,
    CreateDialog,
    AppBuyService,
  },

  data() {
    return {
      // 免费功能
      freeList: ['场景漫游', '补地图片', '图文信息', '底部自定义菜单', '超链接', '添加导览图', '物品3D', '多媒体', '背景音乐', '分组功能', '小行星开场', '限制视角', '场景特效', '离线下载', '场景切换效果', '虚拟拍照', '初始场景动画效果', '滤镜功能', '手机版陀螺仪', '素材库存储空间', '说一说', '数据统计'],
      // 99套餐添加功能
      addList: ['自定义开场提示', '隐藏作者信息', '隐私加密', '自定义LOGO', '加载文字提示', '隐藏LOGO', '是否显示人气和赞', '滚动文字广告', '右侧自定义菜单', '离线下载'],
      // 2999套餐添加功能
      moreList: ['重要信息开启提示', '网站首页案例推送'],

      visible: false,

      visible2: false, // 测试公共购买组件
    }
  },

  methods: {
    ok() {
      this.$message('单作品购买成功')
    },
  },

}
</script>

<style lang="postcss">
@import "vars.css";

:root {
  --total-height: 485px;
  --top-height: 315px;
  --panel-gutter: 20px;
  --bottom-height: calc(var(--total-height) - var(--top-height) - var(--panel-gutter));
}

.buy-panel {
  position: relative;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid var(--border-color);

  & + .buy-panel {
    margin-top: var(--panel-gutter);
  }

  &--vip::before {
    content: "";
    position: absolute;
    right: 2px;
    top: -10px;
    width: 64px;
    height: 64px;
    // background-image: url("./images/icon-vip.png");
  }

  &:first-child:last-child {
    height: var(--total-height);

    .panel-list__item {
      font-size: 13px;
      line-height: 2.8;
    }
  }

  &:first-child:not(:last-child) {
    height: var(--top-height);
  }

  &:last-child:not(:first-child) {
    height: var(--bottom-height);
    padding: 0 22px;
  }
}

.panel-list {
  margin: 0;

  &__title,
  &__sub-title {
    float: left;
    width: 100%;
    font-weight: 700;
    margin: 1em 0 0.5em;
  }

  &__title {
    font-size: 16px;

    & > span {
      font-size: 12px;
    }
  }

  &__sub-title {
    font-size: 14px;
    color: rgb(255, 175, 50);

    & ~ .panel-list__item {
      width: 100%;
      margin-left: 1em;
    }
  }

  &__item {
    float: left;
    width: 50%;
    margin: 0;
    font-size: 12px;
    line-height: 2.5;

    &::before {
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 8px;
      background-color: #fed698;
      vertical-align: middle;
    }

    & > span {
      vertical-align: middle;
    }

    & > em {
      font-style: normal;
      color: var(--color-primary);
      margin: 0 0.4em;
    }
  }
}

.buy-price {
  float: left;
  margin-top: calc((var(--bottom-height) - 126px) / 2)
}

.buy-action {
  float: right;
  margin-top: 40px;
  text-align: center;

  & > div {
    margin-bottom: 20px;
    font-size: 16px;
  }
}
</style>
