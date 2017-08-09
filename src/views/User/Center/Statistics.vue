<template>
  <div class="statistics">
    <div class="statistics__line">
      <div class="statistics__inner">
        <h4 class="statistics__title">最近一个月作品浏览数据统计</h4>
        <div class="statistics__lineChart" ref="lineChart"></div>
      </div>
    </div>
    <div class="statistics__map">
      <div class="statistics__inner">
        <h4 class="statistics__title">区域数据统计</h4>
        <div class="statistics__mapChart" ref="mapChart"></div>
      </div>
    </div>
    <div class="statistics__pie">
      <div class="statistics__inner">
        <h4 class="statistics__title">访问省份TOP5</h4>
        <div class="statistics__pieChart" ref="pieChart"></div>
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
import mock from './mock'

export default {
  name: 'center-statistics',

  mounted() {
    // ajax.get(/* static*/)
    // mock为本地假数据，接口完成删除
    Promise.resolve(mock)
      .then((res) => {
        chartsBoot({
          line: {
            data: res.review,
            dom: this.$refs.lineChart,
          },
          map: {
            data: res.nation,
            dom: this.$refs.mapChart,
          },
          pie: {
            data: res.province,
            dom: this.$refs.pieChart,
          },
        })
      })
  },
}
</script>

<style>
@import "vars.css";

:root {
  --statChartBelow {
    border-top: 1px solid var(--app-bg);
    height: 540px;
    padding: 15px;
  }
}

.statistics {
  width: 100%;
  padding: 30px;
  background-color: #fff;
  font-size: 0;

  &__inner {
    border: 1px solid var(--light);
    border-radius: 5px;
    overflow: auto;
  }

  &__line {
    margin-bottom: 30px;
    &Chart {
      border-top: 1px solid var(--light);
      height: 430px;
      padding: 15px;
    }
  }

  &__map {
    display: inline-block;
    margin-right: 3%;
    width: 57%;
    &Chart {
      position: relative;
      @apply --statChartBelow;
    }
  }

  &__pie {
    display: inline-block;
    width: 40%;
    &Chart {
      @apply --statChartBelow;
    }
  }

  &__title {
    margin: 0;
    padding-left: 15px;
    background-color: var(--app-bg);
    line-height: 40px;
    font-size: 14px;
  }
}
</style>
