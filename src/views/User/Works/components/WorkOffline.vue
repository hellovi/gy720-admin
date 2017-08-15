<template>
  <div class="works-workoffline">
    <div class="works-workoffline__avatar">
      <p>离线下载</p>
    </div>
    <div class="works-workoffline__content">
      <!-- 未创建离线下载  -->
      <template v-if="false">
        <el-button
          type="text"
          class="before-create"
        >
          创建离线数据包
        </el-button>
      </template>

      <!-- 创建离线下载  -->
      <template v-else>
        <el-progress
          :text-inside="true"
          :stroke-width="12"
          :percentage="80"
        ></el-progress>
        <!-- 创建中 -->
        <template v-if="true">
          <p class="creating">离线数据包创建中</p>
        </template>
        <!-- 创建完成  -->
        <template v-else>
          <el-button
            type="text"
            class="after-create"
          >
            离线数据包下载
          </el-button>
          <el-button
            type="text"
            class="after-create"
          >
            重新创建离线数据包
          </el-button>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
/**
 * 个人作品 - 作品离线下载组件
 *
 * @author hjz
 */
export default {
  name: 'works-work-offline',

  props: {
    item: {
      type: Object,
      require: true,
    },
  },
}
</script>

<style>
@import "vars.css";
@import "../style/vars.css";

.works-workoffline {
  margin-left: var(--gap-unit-horizontal);
  padding: 4px 6px;
  border: var(--border-base);
  border-radius: var(--border-radius);
  width: 189px;
  height: var(--workitem-lineheight);

  &__avatar {
    float: left;
    height: 100%;
    width: 48px;
    color: var(--disabled-color-base);
    text-align: center;

    &::before {
      content: "\e620";
      display: block;
      margin-top: -1px;
      font-family: "iconfont";
      font-size: 30px;
    }

    & > p {
      margin: 0;
      font-size: 12px;
    }
  }

  &__content {
    margin-left: 56px;
    height: 100%;
    overflow: hidden;

    /* elementUI 进度条样式调整 */
    & .el-progress-bar {

      &__inner {
        font-size: 0;
      }

      &__innerText {
        vertical-align: middle;
      }
    }

    & .creating {
      margin: 8px 0;
      text-align: center;
      font-size: 14px;
      color: var(--disabled-color-base);
    }

    /* elementUI 按钮样式调整 */
    &>.before-create,
    &>.after-create {
      display: block;
      margin: 0;
      width: 100%;
      text-align: center;
    }

    &>.before-create {
      padding: 18px 0;
      font-size: 14px;
    }

    &>.after-create {
      padding: 3px 0;
      font-size: 12px;
    }
  }
}
</style>
