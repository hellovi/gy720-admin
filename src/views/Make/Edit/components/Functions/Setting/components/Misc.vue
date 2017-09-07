<template>
  <div class="clearfix">
    <div class="float-left">
      <el-form-item label="初始场景动画效果" label-width="9em">
        <el-select v-model="form.init_scene_anime">
          <el-option v-for="anime in animes" :key="anime.value" :label="anime.name" :value="anime.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="场景切换效果" label-width="9em">
        <el-select v-model="form.scene_change_type">
          <el-option v-for="type in types" :key="type.value" :label="type.name" :value="type.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="场景自动切换时间" label-width="9em">
        <el-select v-model="form.auto_scene_time">
          <el-option v-for="time in times" :key="time.value" :label="time.name" :value="time.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="场景自动旋转速度" label-width="9em">
        <el-select v-model="form.auto_rotate_speed">
          <el-option v-for="speed in speeds" :key="speed.value" :label="speed.name" :value="speed.value"></el-option>
        </el-select>
      </el-form-item>
    </div>

    <div class="float-right">
      <el-form-item label="默认显示场景缩略图" label-width="11em">
        <el-switch :on-value="20" :off-value="10" v-model="form.show_scene_thumb"></el-switch>
      </el-form-item>
      <el-form-item label="场景是否自动旋转" label-width="11em">
        <el-switch :on-value="20" :off-value="10" v-model="form.auto_rotate"></el-switch>
      </el-form-item>
      <el-form-item label="电脑版场景自动切换" label-width="11em">
        <el-switch :on-value="20" :off-value="10" v-model="form.pc_auto_scene"></el-switch>
      </el-form-item>
      <el-form-item label="手机版场景自动切换" label-width="11em">
        <el-switch :on-value="20" :off-value="10" v-model="form.mobile_auto_scene"></el-switch>
      </el-form-item>
      <el-form-item label="手机版陀螺仪默认打开" label-width="11em">
        <el-switch :on-value="20" :off-value="10" v-model="form.auto_mobile_gyro"></el-switch>
      </el-form-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'edit-setting-misc',

  props: {
    form: {
      type: Object,
      required: true,
    },
    isVip: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      animes: [
        { name: '无效果', value: 0 },
        { name: '小行星', value: 1 },
      ],
      types: [
        { name: '默认 - 淡入淡出', value: 0 },
        { name: '前进过渡', value: 1 },
        { name: '黑场过渡', value: 2 },
        { name: '白场过渡', value: 3 },
        { name: '从右至左', value: 4 },
        { name: '从上至下', value: 5 },
        { name: '对角线', value: 6 },
        { name: '圆形展开', value: 7 },
        { name: '垂直展开', value: 8 },
        { name: '水平展开', value: 9 },
        { name: '椭圆缩放', value: 10 },
        { name: '缩放过渡', value: 11 },
      ],
      times: [
        { name: '60秒', value: 60 },
        { name: '100秒', value: 100 },
        { name: '120秒', value: 120 },
      ],
      speeds: [
        { name: '1', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 5 },
        { name: '6', value: 6 },
        { name: '7', value: 7 },
        { name: '8', value: 8 },
        { name: '9', value: 9 },
        { name: '10', value: 10 },
      ],
    }
  },
}
</script>
