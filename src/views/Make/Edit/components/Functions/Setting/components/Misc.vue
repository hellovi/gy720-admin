<template>
  <div class="clearfix">
    <div class="float-left">
      <el-form-item label="初始场景动画效果" label-width="9em">
        <el-select>
          <el-option label="无效果"></el-option>
          <el-option label="小行星"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="场景切换效果" label-width="9em">
        <el-select>
          <el-option label="无效果"></el-option>
          <el-option label="小行星"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="场景自动切换时间" label-width="9em">
        <el-select>
          <el-option label="60秒"></el-option>
          <el-option label="100秒"></el-option>
          <el-option label="120秒"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="场景自动旋转速度" label-width="9em">
        <el-select>
          <el-option label="60秒"></el-option>
          <el-option label="100秒"></el-option>
          <el-option label="120秒"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Loading提示文字" label-width="9em">
        <div class="description" style="width: 196px;">
          <el-input class="vip"></el-input>
          <div>商业版功能，作者可自定义加载时显示的文字内容</div>
        </div>
      </el-form-item>
    </div>

    <div class="float-right">
      <el-form-item label="默认显示场景缩略图" label-width="11em">
        <el-switch></el-switch>
      </el-form-item>
      <el-form-item label="打开场景自动旋转效果" label-width="11em">
        <el-switch></el-switch>
      </el-form-item>
      <el-form-item label="电脑版场景自动切换" label-width="11em">
        <el-switch></el-switch>
      </el-form-item>
      <el-form-item label="手机版场景自动切换" label-width="11em">
        <el-switch></el-switch>
      </el-form-item>
      <el-form-item label="手机版陀螺仪默认打开" label-width="11em">
        <el-switch></el-switch>
      </el-form-item>
      <el-form-item label="是否显示人气和点赞" label-width="11em">
        <el-switch></el-switch>
      </el-form-item>
      <el-form-item label="是否开启说一说" label-width="11em">
        <el-switch></el-switch>
      </el-form-item>
    </div>
  </div>
</template>
