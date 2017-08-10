<template>
  <el-row class="pano-material">
    <el-col class="pano-material__left" :span="3">
      <dl class="pano-material__menu">
        <dt>全景相册</dt>
        <dd>默认分类</dd>
        <dd>1212</dd>
      </dl>
    </el-col>

    <el-col class="pano-material__right" :span="21">
      <el-row class="pano-material__header">
        <el-col :span="4">
          <el-checkbox>全选</el-checkbox>
        </el-col>
        <el-col class="text-right" :span="14">
          <div class="pano-material__header__count">
            已选择<span class="text-primary">4</span>个场景
          </div>
        </el-col>
        <el-col :span="6">
          <el-input size="small" placeholder="请输入场景名称" icon="search"></el-input>
        </el-col>
      </el-row>

      <div class="pano-material__content">
        <el-row :gutter="20">
          <el-col class="pano-material__item" :span="6">
            <el-checkbox></el-checkbox>
            <img src="#" alt="">
            <h4>海关别墅大门</h4>
          </el-col>
          <el-col class="pano-material__item" :span="6">
            <el-checkbox></el-checkbox>
            <img src="#" alt="">
            <h4>海关别墅大门</h4>
          </el-col>
          <el-col class="pano-material__item" :span="6">
            <el-checkbox></el-checkbox>
            <img src="#" alt="">
            <h4>海关别墅大门</h4>
          </el-col>
          <el-col class="pano-material__item" :span="6">
            <el-checkbox></el-checkbox>
            <img src="#" alt="">
            <h4>海关别墅大门</h4>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="postcss">
@import "vars.css";

:root {
  --border: 1px solid var(--gray-extra-light);
}

.pano-material {
  border-bottom: var(--border);

  &__right {
    padding: 0 20px;
    border-left: var(--border);
  }

  &__header {
    padding: 8px 0;
    border-bottom: var(--border);
    line-height: 30px;

    &__count {
      margin-right: 1em;
    }
  }

  &__content {
    min-height: 600px;
    padding: 20px 0;
  }
}

.pano-material__menu {
  margin: 0;
  text-align: right;

  & > dt,
  & > dd {
    padding-right: 14px;
  }

  & > dt {
    border-bottom: var(--border);
    margin: 5px 0;
    font-size: 16px;
    font-weight: 700;
    line-height: 40px;
  }

  & > dd {
    border-bottom: var(--border);
    margin: 0;
    line-height: 40px;
  }
}

.pano-material__item {
  position: relative;
  height: 120px;

  .el-checkbox {
    position: absolute;
    top: 5px;
    left: 15px;
  }

  & > img {
    width: 100%;
    height: 100%;
  }

  & > h4 {
    position: absolute;
    bottom: 0;
    left: 10px;
    width: calc(100% - 20px);
    padding-left: 0.6em;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-weight: normal;
    line-height: 22px;
  }
}
</style>
