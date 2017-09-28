<template>
  <div class="works-workoffline">
    <div class="works-workoffline__avatar">
      <p>离线下载</p>
    </div>
    <div class="works-workoffline__content">
      <!-- 未创建离线下载  -->
      <template v-if="data.zip_status === 10">
        <el-button
          type="text"
          class="before-create"
          @click="createOffline(10)"
        >
          创建离线数据包
        </el-button>
      </template>

      <!-- 创建离线下载  -->
      <template v-else>
        <!-- 创建状态 -->
        <p class="creating ellipsis">{{ data.zip_status_name }}</p>
        <el-row class="text-center">
          <el-col :span="12">
            <el-button
              type="text"
              size="small"
              class="after-create"
              :disabled="data.zip_status !== 40"
              @click="downloadOffline(data.zip_key)"
            >下载</el-button>
          </el-col>
          <el-col :span="12">
            <el-button
              type="text"
              size="small"
              class="after-create"
              :disabled="data.zip_status !== 40 && data.zip_status !== 0"
              @click="createOffline(20)"
            >重新创建</el-button>
          </el-col>
        </el-row>
      </template>
    </div>
  </div>
</template>

<script>
/**
 * 个人作品 - 作品离线下载组件
 *
 * @author huojinzhao | chenliangshan
 * @version 2017/09/26
 */

export default {
  name: 'works-work-offline',

  props: {
    item: {
      type: Object,
      require: true,
    },
  },

  data() {
    return {
      pollTime: null,
      data: this.item,
    }
  },

  computed: {
    // 创建状态
    pollStatus() {
      return this.data.zip_status > 10 && this.data.zip_status < 40
    },
  },

  methods: {
    // 创建离线
    createOffline(status = 10) {
      this.getOfflineZip(status)
    },

    // 下载离线
    downloadOffline(key) {
      if (this.data.zip_status >= 40) window.open(key)
    },

    // 请求下载
    getOfflineZip(val = 10) {
      this.$http.get(`/user/pano/offline?pano_id=${this.data.hash_pano_id}&redo=${val}`)
        .then(({ result }) => {
          this.data = { ...this.data, ...result }
          this.pollOffline()
        })
        .catch(({ status }) => {
          this.data.zip_status = 0
          clearTimeout(this.pollTime)
          this.$message.error(status.reason)
        })
    },

    // 轮询创建状态
    pollOffline() {
      if (this.pollStatus) {
        this.pollTime = setTimeout(() => {
          this.getOfflineZip()
        }, 5000)
      } else {
        clearTimeout(this.pollTime)
      }
    },

  },

  mounted() {
    this.pollOffline()
  },

  beforeDestroy() {
    clearTimeout(this.pollTime)
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
      margin: 8px 0 0 0;
      text-align: center;
      font-size: 12px;
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
