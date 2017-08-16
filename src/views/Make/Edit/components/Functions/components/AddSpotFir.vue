<template>
  <div class="edit-functions__addspotsfir">
    <el-row :gutter="20">

      <el-col :span="8"
        v-for="item in cateType"
        :key="item.key"
        class="edit-functions__item"
      >
        <div class="edit-functions__item__inner"
             @click="switchStep(1, item.key)">
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
 * @version 2017-08-14
 */


export default {
  name: 'edit-functions__addSpotFir',

  data() {
    return {
      // 与后台key值对应，其他地方都依赖于key
      cateType: [
        { icon: 'icon-yanjing', key: 1, text: '场景漫游' },
        { icon: 'icon-wendang', key: 6, text: '图文信息' },
        { icon: 'icon-liulanqidakailianjie', key: 3, text: '超链接' },
        { icon: 'icon-3d1', key: 5, text: '物品3D' },
        { icon: 'icon-shexiang', key: 8, text: '多媒体' },
        { icon: 'icon-danxuankuang', key: 7, text: '无' },
      ],
    }
  },

  methods: {
    switchStep(step, type) {
      this.$emit('switchStep', step, type)
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";
.edit-functions {

  &__addspotsfir {
    width: 340px;
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

    &:nth-of-type(n+4) {
      margin-top: 20px;
    }
  }
}


</style>
