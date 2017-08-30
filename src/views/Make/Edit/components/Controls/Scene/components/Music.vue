<template>
  <div>
    <section class="clearfix">
      <div class="float-left">
        <div class="setting-img">
          <h5 class="setting-img__title">补天图片</h5>
          <img class="setting-img__img" src="#" alt="补天图片">
        </div>
      </div>
      <div class="float-left">
        <el-button type="primary">选择图片</el-button>
        <el-form-item label="应用到其它场景" label-width="8em">
          <el-checkbox-group>
            <el-checkbox label="当前场景组" name="type"></el-checkbox>
            <el-checkbox label="所有场景" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="edit-setting__tip">免费版功能，遮盖场景天花板、广告宣传等用途</div>
      </div>
    </section>

    <section class="clearfix">
      <div class="float-left">
        <div class="setting-img">
          <h5 class="setting-img__title">补地图片</h5>
          <img class="setting-img__img" src="#" alt="补地图片">
        </div>
      </div>
      <div class="float-left">
        <el-button type="primary">选择图片</el-button>
        <el-form-item label="应用到其它场景" label-width="8em">
          <el-checkbox-group>
            <el-checkbox label="当前场景组" name="type"></el-checkbox>
            <el-checkbox label="所有场景" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="edit-setting__tip">免费版功能，遮盖场景天花板、广告宣传等用途</div>
      </div>
    </section>
  </div>
</template>

<script>
/**
 * 场景设置 - 背景音乐
 * @author luminghuai
 * @version 2017-08-30
 */

export default {
  name: 'edit-scene-setting-music',
}
</script>

