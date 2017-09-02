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
      <el-form-item label="应用到其它场景" label-width="8em">
        <el-button type="ghost">当前场景组</el-button>
        <el-button type="ghost">所有场景</el-button type=host"g">
      </el-form-item>
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
      <el-form-item label="应用到其它场景" label-width="8em">
        <el-button type="ghost">当前场景组</el-button>
        <el-button type="ghost">所有场景</el-button>
      </el-form-item>
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

export default {
  name: 'edit-scene-setting-supplement',

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
