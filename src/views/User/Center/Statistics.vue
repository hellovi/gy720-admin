<template>
  <div class="statistics">

    <div class="statistics__line">
      <div class="statistics__inner">
        <h4 class="statistics__title">
          最近一个月作品浏览数据统计
        </h4>
        <div
          class="statistics__lineChart"
          ref="lineChart"
        ></div>
      </div>
    </div>

    <div class="statistics__map">
      <div class="statistics__inner">
        <h4 class="statistics__title">
          区域数据统计
         </h4>
        <div
          class="statistics__mapChart"
          ref="mapChart"
        ></div>
      </div>
    </div>

    <div class="statistics__pie">
      <div class="statistics__inner">
        <h4 class="statistics__title">
          访问省份TOP5
        </h4>
        <div
          class="statistics__pieChart"
          ref="pieChart"
        ></div>
      </div>
    </div>

  </div>
</template>

<script>
/**
 * 个人中心 - 统计组件
 *
 * @author huojinzhao
 */
import chartsBoot from '@/utils/chartConfig'

export default {
  name: 'center-statistics',

  mounted() {
    this.$http.get('/user/panolog')
      .then(({ result }) => {
        chartsBoot({
          line: {
            data: result.trend,
            dom: this.$refs.lineChart,
          },
          map: {
            data: result.map,
            dom: this.$refs.mapChart,
          },
          pie: {
            data: result.pie,
            dom: this.$refs.pieChart,
          },
        })
      })
  },
}
</script>

<style>
@import "vars.css";

@mixin statChartBelow {
  border-top: 1px solid var(--app-bg);
  height: 540px;
  padding: 15px;
}

.statistics {
  width: 100%;
  padding: 30px;
  background-color: #fff;
  font-size: 0;

  &__inner {
    border: 1px solid var(--gray-light);
    border-radius: 5px;
    overflow: auto;
  }

  &__line {
    margin-bottom: 30px;

    &Chart {
      border-top: 1px solid var(--gray-light);
      height: 430px;
      padding: 15px;
    }
  }

  &__map {
    display: inline-block;
    margin-right: 1%;
    width: 67%;

    &Chart {
      position: relative;
      @include statChartBelow;
    }
  }

  &__pie {
    display: inline-block;
    width: 32%;

    &Chart {
      @include statChartBelow;
    }
  }

  &__title {
    margin: 0;
    padding-left: 15px;
    background-color: var(--gray-extra-light);
    line-height: 40px;
    font-size: 14px;
  }
}
</style>
