<template>
  <div class="app-buy-service">
    <el-row :gutter="20">
      <el-col :span="isRenew ? 12 : 8">
        <div class="app-buy-service__type">
          <h3 class="app-buy-service__title">基础功能<span>（免费）</span></h3>
          <p class="app-buy-service__intro">
            包含作品发布制作如下的基础功能，且素材库和全景图上传空间无限制。
          </p>
          <ul class="app-buy-service__item horizontal">
            <li v-for="(item, i) in freeItem" :key="i" v-text="item"></li>
          </ul>
        </div>
      </el-col>
      <el-col :span="isRenew ? 12 : 8">
        <div class="app-buy-service__type is-vip" :class="{active: isRenew || (!isServePage && !service.remain)}">
          <h3 class="app-buy-service__title">2299元/年<span class="gold-color">（商业版）</span></h3>
          <p class="app-buy-service__intro">
            购买此服务，您所有的作品即可使用以下的商业版功能：
          </p>
          <ul class="app-buy-service__item vertical">
            <li v-for="(item, i) in basicItem" :key="i" v-text="item"></li>
          </ul>
          <div class="app-buy-service__added">
            <h4 class="app-buy-service__added-title">以及更多的增值服务</h4>
            <ul class="app-buy-service__added-item">
              <li v-for="(item, i) in addedServices" :key="i" v-text="item"></li>
            </ul>
          </div>
          <div class="app-buy-service__hint">
            <i class="iconfont">&#xe621;</i>续费提示：此服务需每年续费，逾期不续费，所有商业版功能将失效，作品访问及基础功能不受影响
          </div>
          <div class="app-buy-service__button">
            <el-button type="primary" @click="buyService(10)">我要购买</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="8" v-if="!isRenew">
        <div class="app-buy-service__type is-vip" :class="{active: !isServePage && service.remain}">
          <h3 class="app-buy-service__title">99元/作品<span class="gold-color">（商业版）</span></h3>
          <p class="app-buy-service__intro">
            购买此服务，您对应的作品即可使用以下的商业版功能：
          </p>
          <ul class="app-buy-service__item vertical">
            <li v-for="(item, i) in basicItem" :key="i" v-text="item"></li>
          </ul>
          <div class="app-buy-service__hint">
            <i class="iconfont">&#xe621;</i>续费提示：
            <ol>
              <li>此服务同一个账号只能购买 <span class="gold-color">5</span> 次</li>
              <li>此服务购买后永久有效，无需再次续费</li>
            </ol>
          </div>
          <template v-if="isServePage">
            <div class="app-buy-service__way">
              <span class="app-buy-service__way-title gold-color"><i class="iconfont">&#xe621;</i>续费提示：</span>
              <ol>
                <li>点击进入 <a href="/user-client/works">我的作品</a> 页面，选择对应作品右侧的升级商业版进行购买</li>
                <li>或通过对应作品高级编辑页面右上角的logo进行购买</li>
              </ol>
            </div>
          </template>
          <template v-else>
            <div class="app-buy-service__info">
              <p class="app-buy-service__info-txt text-center">
                <template v-if="service.remain">
                  您还可购买 <span class="gold-color">{{ service.remain }}</span> 次此项服务
                </template>
                <template v-else>
                  <strong>此项服务购买次数已用完<br/>建议您购买2299元/年这项服务</strong>
                </template>
              </p>
              <h5>本次购买对应作品：</h5>
              <p class="app-buy-service__info-name text-center">《{{ panoInfo.name }}》</p>
            </div>
            <div class="app-buy-service__button">
              <el-button type="primary" @click="buyService(20)" :disabled="!service.remain">我要购买</el-button>
            </div>
          </template>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  /**
   * 购买服务-组件
   * @author chenliangshan
   * @version 2017/09/19
   */

  import { mapState } from 'vuex'
  import serviceModal from '@/mixins/serviceModal'
  import { SERVICE } from '@/store/mutationTypes'

  export default {
    name: 'app-buy-service',

    mixins: [serviceModal],

    props: {
      isServePage: {
        type: Boolean,
        default: false,
      },

      isRenew: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      freeItem: [
        '上传/发布作品',
        '鱼眼图在线合成',
        '素材库',
        '高级编辑',
        '作品预览',
        '作品访问数据统计',
        '其他功能（30项+）',
      ],

      basicItem: [
        '自定义LOGO',
        '作品离线下载',
        '开场提示广告图',
        '作品预览加密',
        '滚动文字广告',
        '底部菜单未读提示',
        '隐藏作者信息',
        'Loading文字自定义',
      ],

      addedServices: [
        '首页、公众号等官方渠道推荐展示',
        '专属的身份标识及一对一客服服务',
        '平台后期开发的新功能优先内侧及使用权',
      ],

    }),

    computed: {
      ...mapState({
        service: state => state.service,
        panoInfo: state => state.service.buyPanoInfo,
      }),
    },

    methods: {
      buyService(type) {
        // 关闭购买说明
        this.closeServiceModal('buyInfo')
        if (type === 10) {
          // 打开购买年会
          this.openServiceModal('buyFees')
          // 重置作品信息
          this.$store.commit(SERVICE.MODAL.RESETPANOINFO)
        } else {
          this.openServiceModal('buySingle')
        }
      },
    },

  }
</script>

<style lang="postcss">
  @import "vars.css";

  :root {
    --golb: #ffc000;
  }

  .app-buy-service {
    .gold-color {
      color: var(--golb);
    }

    &__type {
      border: 1px solid #a3a3a3;
      border-radius: 10px;
      padding: 5px 15px 15px;
      min-height: 472px;
      position: relative;

      &.is-vip::before {
        content: "";
        position: absolute;
        right: 2px;
        top: -10px;
        width: 64px;
        height: 64px;
        background-image: url("./assets/icon-vip.png");
      }

      &.active {
        border-color: var(--golb);
        box-shadow: 0 1px 10px rgba(0,0,0,.3);
        box-sizing: border-box;
      }
    }

    &__title {
      font-size: 16px;
    }

    &__intro {
      font-size: 12px;
      line-height: 20px;
      color: #666;
    }

    &__item {
      margin: 0;
      padding: 0;

      &::after {
        content: "";
        display: block;
        clear: both;
      }

      >li {
        list-style-type: none;

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
      }

      /*垂直*/
      &.vertical {
        > li {
          width: 50%;
          font-size: 12px;
          padding-bottom: 15px;
          float: left;
        }
      }
      /*水平*/
      &.horizontal {
        > li {
          width: 100%;
          font-size: 14px;
          padding-bottom: 20px;
        }
      }
    }

    &__added {
      &-title {
        font-size: 12px;
        color: var(--golb);
      }

      &-item {
        font-size: 12px;
        margin: 0;
        padding: 0;

        & > li {
          padding: 0 0 15px 0;
          list-style-type: none;

          &::before {
            content: "★";
            display: inline-block;
            width: 6px;
            height: 6px;
            margin-top: -10px;
            margin-right: 8px;
            color: #fed698;
            vertical-align: middle;
          }
        }
      }
    }

    &__hint {
      font-size: 12px;
      color: var(--gray);
      line-height: 18px;

      & > .iconfont {
        font-size: 14px;
        padding-right: 4px;
      }

      & > ol {
        margin: 0;
        padding: 10px 0 10px 40px;

        li {
          line-height: 20px;
        }
      }
    }

    &__button {
      text-align: center;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 20px;
      & > .el-button {
        width: 60%;
      }
    }

    &__way {
      font-size: 12px;

      a {
        color: var(--color-primary);
      }

      &-title .iconfont {
        font-size: 14px;
        padding-right: 4px;
      }

      & > ol {
        margin: 0;
        padding: 10px 0 10px 40px;

        li {
          color: #666;
          line-height: 20px;
        }
      }
    }

    &__info {
      &-txt {
        font-size: 14px;
        margin: 4px 0 13px 0;
        padding: 0;
        line-height: 20px;
      }

      & > h5 {
        font-size: 12px;
        font-weight: normal;
        margin: 12px 0;
        padding: 0;
      }

      &-name {
        font-size: 16px;
        margin: 10px 0;
        padding: 0;
      }
    }
  }
</style>
