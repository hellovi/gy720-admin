<template>
  <div class="edit-functions__scene-supplement">
    <section>
      <h3>
        <span>补天图片</span>
        <em>（免费版功能，遮盖场景天花板、广告宣传等用途）</em>
      </h3>
      <el-button
        type="primary"
        @click="openMaterialAd('top_ad_img')"
      >选择图片</el-button>
      <!-- 公共设置 -->
      <v-public-config
        :data="data"
        :types="['top_ad_img']"
      ></v-public-config>
      <img :src="$url.static(data.top_ad_img)">
    </section>

    <section class="clearfix">
      <h3>
        <span>补地图片</span>
        <em>（免费版功能，遮盖场景天花板、广告宣传等用途）</em>
      </h3>
      <el-button
        type="primary"
        @click="openMaterialAd('bottom_ad_img')"
      >选择图片</el-button>
      <!-- 公共设置 -->
      <v-public-config
        :data="data"
        :types="['bottom_ad_img']"
      ></v-public-config>
      <img :src="$url.static(data.bottom_ad_img)">
    </section>
  </div>
</template>

<script>
/**
 * 场景设置 - 补天补地
 *
 * @author luminghuai | huojinzhao
 */

import { EDIT } from '@/store/mutationTypes'
import vPublicConfig from './PublicConfig'

export default {
  name: 'edit-scene-setting-supplement',

  components: {
    vPublicConfig,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  methods: {
    openMaterialAd(type) {
      this.$store.dispatch(EDIT.MATERIAL.INVOKE, 'ad')
        .then(({ file_path }) => {
          this.data[type] = file_path
        })
    },
  },
}
</script>

<style lang="postcss">
@import 'vars.css';

.edit-functions__scene-supplement {

  & > section {

    & > h3 {

      & em {
        margin-left: 10px;
        font-size: 12px;
        font-weight: normal;
        color: var(--gray);
      }
    }

    & > .el-button {
      float: left;
      margin-right: 50px;
    }

    & > img {
      height: 150px;
    }
  }
}
</style>
