<template>
  <div class="edit-functions__addspotsfir">
    <el-row :gutter="20">

      <el-col :span="6"
        v-for="item in firInfo"
        :key="item.key"
        class="edit-functions__item"
      >
        <div class="edit-functions__item__inner"
             @click="switchStep(item.key)">
          <i :class="[item.icon,'iconfont']"></i>
          <span>{{item.text}}</span>
        </div>

      </el-col>
    </el-row>
  </div>
</el-row>
</template>

<script>
/**
 * 高级编辑 - hotspots
 * @author yj
 * @version 2017-08-14
 */


export default {
  name: 'edit-functions__addSpotFir',

  props: {
    firInfo: {
      type: Array,
      required: true,
    },
  },

  methods: {
    switchStep(type) {
      this.$emit('switch-step', 2, type)
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";
.edit-functions {

  &__addspotsfir {
    width: 640px;
    margin: 50px auto;
  }

  &__item {
    cursor: pointer;
    text-align: center;

    &__inner {
      height: 100px;
      border: 1px solid var(--border-color);

      & > .iconfont {
        display: block;
        margin: 30px 0 5px 0;
        font-size: 22px;
     }
    }

    &:nth-of-type(n+5) {
      margin-top: 20px;
    }
  }
}


</style>
