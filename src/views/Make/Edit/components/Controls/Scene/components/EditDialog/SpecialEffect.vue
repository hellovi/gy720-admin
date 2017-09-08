<template>
  <div class="edit-functions__scene-effect">
    <el-form-item>
      <label
        v-for="effect in effects"
        :key="effect.value"
        :class="{
          'edit-effect-item': true,
          'active': effect.value === form.scene_effect
        }"
        @click="onChooseEffect(effect.value)"
      >
        <input type="checkbox" name="scene_effect" :value="effect.id">
        <i class="iconfont" :class="effect.icon"></i>
        <span>{{ effect.text }}</span>
      </label>
    </el-form-item>

    <apply-options v-model="form.effect"></apply-options>
  </div>
</template>

<script>
/**
 * 场景设置 - 场景特效
 *
 * @author luminghuai | huojinzhao
 * @version 2017-09-08
 */

import ApplyOptions from './ApplyOptions'

export default {
  name: 'edit-scene-setting-effect',

  components: {
    ApplyOptions,
  },

  props: {
    form: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    effects: [
      { text: '无效果', icon: 'icon-wu', value: 0 },
      { text: '下小雪', icon: 'icon-xiaoxue', value: 1 },
      { text: '下雪球', icon: 'icon-my-xue', value: 9 },
      { text: '下雪花', icon: 'icon-zhenxue', value: 5 },
      { text: '银色星星', icon: 'icon-xingxing1', value: 4 },
      { text: '金色星星', icon: 'icon-xingxing', value: 3 },
      { text: '爱心', icon: 'icon-heart', value: 6 },
      { text: '人民币', icon: 'icon-renminbi', value: 8 },
      { text: '下小雨', icon: 'icon-xiaoyu', value: 2 },
      { text: '下大雨', icon: 'icon-dayu', value: 10 },
      { text: '下红包', icon: 'icon-hongbao', value: 11 },
      { text: '笑脸', icon: 'icon-xiaolian', value: 7 },
    ],
  }),

  methods: {
    onChooseEffect(value) {
      this.form.scene_effect = value
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.edit-effect-item {
  float: left;
  margin-right: 15px;
  text-align: center;
  cursor: pointer;

  & > input {
    display: none;
  }

  & > .iconfont {
    display: block;
    width: 80px;
    height: 80px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    font-size: 40px;
    line-height: 80px;
  }

  &.active {

    & > .iconfont {
      background-color: var(--color-primary);
      border: 1px solid var(--color-primary);
      color: #fff;
    }

  }
}
</style>
