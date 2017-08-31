<template>
  <div class="clearfix">
    <div class="float-left">
      <el-form-item label="初始场景动画效果" label-width="9em">
        <el-select v-model="form.init_scene_anime">
          <el-option label="无效果" :value="0"></el-option>
          <el-option label="小行星" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="场景切换效果" label-width="9em">
        <el-select v-model="form.scene_change_type">
          <el-option label="默认 - 淡入淡出" :value="0"></el-option>
          <el-option label="前进过渡" :value="1"></el-option>
          <el-option label="黑场过渡" :value="2"></el-option>
          <el-option label="白场过渡" :value="3"></el-option>
          <el-option label="从右至左" :value="4"></el-option>
          <el-option label="从上至下" :value="5"></el-option>
          <el-option label="对角线" :value="6"></el-option>
          <el-option label="圆形展开" :value="7"></el-option>
          <el-option label="垂直展开" :value="8"></el-option>
          <el-option label="水平展开" :value="9"></el-option>
          <el-option label="椭圆缩放" :value="10"></el-option>
          <el-option label="缩放过渡" :value="11"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="场景自动切换时间" label-width="9em">
        <el-select v-model="form.auto_scene_time">
          <el-option label="60秒" :value="60"></el-option>
          <el-option label="100秒" :value="100"></el-option>
          <el-option label="120秒" :value="120"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="场景自动旋转速度" label-width="9em">
        <el-select v-model="form.auto_rotate_speed">
          <el-option label="1" :value="1"></el-option>
          <el-option label="2" :value="2"></el-option>
          <el-option label="3" :value="3"></el-option>
          <el-option label="4" :value="4"></el-option>
          <el-option label="5" :value="5"></el-option>
          <el-option label="6" :value="6"></el-option>
          <el-option label="7" :value="7"></el-option>
          <el-option label="8" :value="8"></el-option>
          <el-option label="9" :value="9"></el-option>
          <el-option label="10" :value="10"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Loading提示文字" label-width="9em">
        <div style="width: 196px;">
          <el-input
            class="edit-setting__vip"
            :readonly="!isVip"
            v-model="form.loading_text"
            @focus="$emit('focus-on-vip-field')"
          ></el-input>
          <div class="edit-setting__tip">商业版功能，作者可自定义加载时显示的文字内容</div>
        </div>
      </el-form-item>
    </div>

    <div class="float-right">
      <el-form-item label="默认显示场景缩略图" label-width="11em">
        <el-switch :on-value="1" :off-value="0" v-model="form.show_scene_thumb"></el-switch>
      </el-form-item>
      <el-form-item label="打开场景自动旋转效果" label-width="11em">
        <el-switch :on-value="1" :off-value="0" v-model="form.auto_rotate"></el-switch>
      </el-form-item>
      <el-form-item label="电脑版场景自动切换" label-width="11em">
        <el-switch :on-value="1" :off-value="0" v-model="form.pc_auto_scene"></el-switch>
      </el-form-item>
      <el-form-item label="手机版场景自动切换" label-width="11em">
        <el-switch :on-value="1" :off-value="0" v-model="form.mobile_auto_scene"></el-switch>
      </el-form-item>
      <el-form-item label="手机版陀螺仪默认打开" label-width="11em">
        <el-switch :on-value="1" :off-value="0" v-model="form.auto_mobile_gyro"></el-switch>
      </el-form-item>
      <el-form-item label="是否显示人气和点赞" label-width="11em">
        <el-switch :on-value="1" :off-value="0" v-model="form.show_hit_like"></el-switch>
      </el-form-item>
      <el-form-item label="是否开启说一说" label-width="11em">
        <el-switch :on-value="1" :off-value="0" v-model="form.show_comment"></el-switch>
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
}
</script>
