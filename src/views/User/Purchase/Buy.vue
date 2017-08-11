<template>
  <div class="purchase-buy">
    <el-row :gutter="30">
      <el-col :span="8">
        <div class="panel panel--free">
          <h3 class="panel__header">免费用户功能</h3>
          <ul class="panel__body list">
            <li v-for="(item,index) in freeList" :key="index">
              <i class="iconfont">&#xe60c;</i>{{item}}
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="panel panel--add">
          <img class="panel__img" src="./images/icon-vip.png">
          <h3 class="panel__header">99套餐添加功能</h3>
          <ul class="panel__body list panel__body--add">
            <li v-for="(item,index) in addList" :key="index">
              <i class="iconfont">&#xe60c;</i>{{item}}
            </li>
          </ul>
          <h3 class="panel__header">2299套餐添加功能
            <small>（于99套餐基础添加）</small>
          </h3>
          <ul class="panel__body list panel__body--add">
            <li v-for="(item,index) in moreList" :key="index">
              <i class="iconfont">&#xe60c;</i>{{item}}
            </li>
          </ul>
        </div>
        <div class="panel panel--price">
          <img src="./images/icon-2999.png">
          <div class="panel--price__right">
            <h3>无限次作品数量</h3>
            <el-button type="primary">立即购买</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="panel panel--buy">
          <img class="panel__img" src="./images/icon-vip.png">
          <h3 class="panel__header">购买方式</h3>
          <ul class="panel__body list panel__body--buy">
            <li v-for="(item,index) in payList" :key="index">
              <i class="iconfont">&#xe60c;</i>{{item}}
            </li>
          </ul>
        </div>
        <div class="panel panel--price">
          <img src="./images/icon-2999.png">
          <div class="panel--price__right">
            <h3>作品按次收费</h3>
            <el-button type="primary">我的作品</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/**
 * 购买服务
 *
 * @author zhoumenglin
 * @version 2017-08-10
 */

export default {
  name: 'purchase-buy',

  data() {
    return {
      // 免费功能
      freeList: ['场景漫游', '补地图片', '图文信息', '底部自定义菜单', '超链接', '添加导览图', '物品3D', '初始画面', '多媒体', '视角选择', '背景音乐', '分组功能', '小行星开场', '限制视角', '场景特效', '离线下载', '场景切换效果', '虚拟拍照', '初始场景动画效果', '滤镜功能', '手机版陀螺仪', '素材库存储空间'],
      // 99套餐添加功能
      addList: ['自定义开场提示', '隐藏作者信息', '隐私加密', '自定义LOGO', '加载文字提示', '隐藏LOGO', '是否显示人气和赞', '滚动文字广告', '是否开启说一说', '数据统计功能', '右侧自定义菜单'],
      // 2999套餐添加功能
      moreList: ['重要信息开启提示', '网站首页案例推送'],
      // 购买方式
      payList: ['2299元 / 年', '直接点击 立即购买 开通会员', '99元 / 次', '点击我的作品进入作品列表页面', '点击作品右侧的 高级编辑', '点击作页面的 左上角LOGO 进行购买'],
    }
  },

}
</script>

<style lang="postcss">
.purchase-buy {

  .panel {
    position: relative;
    line-height: 1;
    border-radius: 8px;
    border: 1px solid rgb(157, 157, 157);
    margin-bottom: 20px;

    &--free {
      height: 487px;
    }

    &--add,
    &--buy {
      height: 315px;
    }

    &--price {
      padding: 12px 15px;

      &__right {
        width: 150px;
        text-align: center;
        float: right;

        & h3 {
          font-weight: normal;
          font-size: 16px;
          margin:35px 0 20px 0;
        }
      }
    }

    &__img {
      position: absolute;
      right: 2px;
      top: -10px;
    }

    &__header {
      font-weight: bold;
      font-size: 16px;
      margin: 20px 15px;

      & small {
        font-size: 12px;
      }
    }

    &__body {
      overflow: hidden;
      font-size: 14px;

      & li {
        padding-left: 15px;
        float: left;
        width: 50%;
        margin-bottom: 20px;

        & i {
          margin-right: 8px;
          color: rgb(254, 214, 152);
          font-size: 12px
        }
      }

      &--add {
        font-size: 12px;

        & li {
          margin-bottom: 17px;

          &:last-child {
            margin-bottom: 7px;
          }
        }
      }

      &--buy {
        font-size: 12px;

        & li {
          width: 100%;
          margin-bottom: 17px;

          &:nth-child(1),
          &:nth-child(3) {
            font-weight: bold;
            font-size: 15px;
            color: rgb(255, 175, 50);
          }
        }
      }
    }
  }
}
</style>
