<template>
  <div>
    <div class="hotspots-icon__lists" v-loading="loading">
      <dl class="hotspots-icon__item clearfix">
      <dt>
        <el-row>
          <el-col :span="3">系统图标</el-col>
          <el-col :span="3" @click.native="openMaterial" style="cursor: pointer">自定义图标</el-col>
        </el-row>
      </dt>

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

  </div>

</template>

<script>
/**
 * 热点图标模块
 * @module ./IconHotspots
*/
import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'

export default {

  props: {
    value: {
      type: Boolean,
      require: true,
    },
  },

  data() {
    return {
      loading: false,
      activeId: 0,
      activeInfo: {},
    }
  },

  computed: {
    ...mapState({
      icons: state => state.edit.hotspots.icons,
    }),
  },

  methods: {
    submitIcon() {
      this.$store.commit(EDIT.HOTSPOTS.SELECT.ICON, this.activeInfo)
      this.activeInfo = {}
      this.$emit('input', false)
    },

    selectIcon(icon) {
      this.activeInfo = icon
      this.activeId = icon.icon_id
    },

    // 自定义图标
    openMaterial() {
      this.$store.dispatch(EDIT.HOTSPOTS.SELECT.ICON, 'hotspot')
        .then(() => {
          this.activeInfo = {}
          this.$emit('input', false)
        })
    },
  },

  created() {
    this.loading = true
    this.$store.dispatch(EDIT.HOTSPOTS.INIT.ICON)
      .then(() => { this.loading = false })
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
