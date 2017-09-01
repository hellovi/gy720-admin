<template>
    <el-dialog
      title="热点图标库"
      :visible="value"
      size="large"
      :modal="false"
      :before-close="() => this.$emit('input', false)"
    >
      <div class="hotspots-icon__lists" v-loading="loading">
        <dl class="hotspots-icon__item clearfix">
          <dt>系统图标</dt>
          <dd
            v-for="icon in icons"
            :key="icon.icon_id"
            :class="{icon_active: activeId === icon.icon_id }"
            @click="selectIcon(icon)"
          >
            <img :src="$url.host(icon.thumb)"/>
          </dd>
        </dl>
      </div>

      <el-button class="hotspots-icon__btn" type="primary" @click="submitIcon">确认</el-button>

    </el-dialog>
  </div>
</template>

<script>
/**
 * 热点图标模块
 * @module ./IconHotspots
*/

export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      icons: [],
      loading: false,
      activeId: 0,
      activeInfo: {},
    }
  },
  methods: {
    submitIcon() {
      this.$emit('submitIcon', this.activeInfo)
      this.activeInfo = {}
      this.$emit('input', false)
    },

    selectIcon(icon) {
      this.activeInfo = icon
      this.activeId = icon.icon_id
    },
  },

  created() {
    this.loading = true
    this.$http.get('/user/scenehotspot/icons')
      .then(({ result }) => {
        this.loading = false
        result.map((items) => {
          items.list.map((item) => {
            this.icons.push(item)
            return true
          })
          return true
        })
      })
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.hotspots-icon__item {
    & > dt {
      color: var(--color-primary);
      margin-bottom: 1em;
    }

    & > dd {
      float: left;
      width: 52px;
      height: 52px;
      background-color: rgb(99, 99, 99);
      padding: 0.4em;
      margin-bottom: 1em;
      margin-left: 0;
      cursor: pointer;
      margin-right: 1em;
      /*
      &:not(:nth-child(11n+1) ) {
        margin-left: 1em;
      }*/

      > img {
        width: 100%;
        height: 100%;
      }
    }

    & .icon_active {
      border: 2px solid #ffc000;
    }
  }

  .hotspots-icon__btn {
    display: block;
    width: 80px;
    margin: 0 auto;
  }
</style>
