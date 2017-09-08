<template>
  <div class="edit-functions__scene-supplement">
    <section class="clearfix">
      <div class="setting-img float-left">
        <h5 class="setting-img__title">补天图片</h5>
        <img class="setting-img__img" :src="skySrc">
        <div class="setting-img__button">
          <el-button
            type="primary"
            size="small"
            @click="openMaterialAd('top_ad_img')"
          >更换</el-button>
          <el-button
            v-show="form.top_ad_img"
            type="danger"
            size="small"
            @click="form.top_ad_img = null"
          >删除</el-button>
        </div>
      </div>

      <apply-options v-model="form.sky"></apply-options>
    </section>

    <section class="clearfix">
      <div class="setting-img float-left">
        <h5 class="setting-img__title">补地图片</h5>
        <img class="setting-img__img" :src="groundSrc">
        <div class="setting-img__button">
          <el-button
            type="primary"
            size="small"
            @click="openMaterialAd('bottom_ad_img')"
          >更换</el-button>
          <el-button
            v-show="form.bottom_ad_img"
            type="danger"
            size="small"
            @click="form.bottom_ad_img = null"
          >删除</el-button>
        </div>
      </div>

      <apply-options v-model="form.ground"></apply-options>
    </section>
  </div>
</template>

<script>
/**
 * 场景设置 - 补天补地
 *
 * @author luminghuai | huojinzhao
 * @version 2017-09-08
 */

import placeholderImage from '@/assets/placeholder.jpg'
import { EDIT } from '@/store/mutationTypes'
import ApplyOptions from './ApplyOptions'

export default {
  name: 'edit-scene-setting-supplement',

  components: {
    ApplyOptions,
  },

  props: {
    form: {
      type: Object,
      required: true,
    },
  },

  computed: {
    skySrc() {
      const { top_ad_img } = this.form
      return top_ad_img ? this.$url.static(top_ad_img) : placeholderImage
    },

    groundSrc() {
      const { bottom_ad_img } = this.form
      return bottom_ad_img ? this.$url.static(bottom_ad_img) : placeholderImage
    },
  },

  methods: {
    openMaterialAd(type) {
      this.$store.dispatch(EDIT.MATERIAL.INVOKE, 'ad')
        .then(({ file_path }) => {
          this.form[type] = file_path
        })
    },
  },
}
</script>

<style lang="postcss">
@import 'vars.css';

:root {
  --gutter: 40px;
}

.edit-functions__scene-supplement {
  & > section {
    position: relative;

    &:first-child {
      margin-bottom: var(--gutter);

      &::before {
        content: "";
        position: absolute;
        bottom: calc(var(--gutter) / -2);
        left: 0;
        width: 100%;
        height: 1px;
        background-color: var(--border-color);
      }
    }
  }

  .scene-apply-options {
    position: absolute;
    top: 50%;
    left: 180px;
    transform: translateY(-50%);
  }
}
</style>
