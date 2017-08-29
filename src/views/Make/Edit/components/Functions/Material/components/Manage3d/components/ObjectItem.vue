<template>
  <div class="manage__object">
    <el-card class="manage__object__card">
      <el-row>
        <el-col :span="20" class="manage__object__thumb">
          <img class="manage__object__thumb__img"
          src="http://www.gy720.com/data/rotate/984/152/small_59376a9ee502d.jpg"/>
        </el-col>
        <el-col :span="4" class="manage__object__btn-group">
          <el-button size="mini" type="primary">上传图片</el-button>
          <el-button size="mini" type="primary">管理图片</el-button>
          <el-button size="mini" @click="onEditWork">修改</el-button>
          <el-button size="mini">预览</el-button>
          <el-button type="warning" size="mini">删除</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col>{{item.title}}</el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
/**
 * 物品3D-物品
 *
 * @author yj
 */
export default {
  name: 'manage3d-obj-item',

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  methods: {
    onEditWork() {
      this.$emit('editWork', this.item.id)
    },
  },
}
</script>
<style lang="postcss">
.manage__object {
  &__card {
    float: left;
    width: auto;

    & .el-card__body {
      padding: 5px;
    }
  }

  &__thumb {
    float: left;
    width: 140px;
    height: 140px;
    line-height: 140px;
    margin-bottom: 3px;
    background: #f5f5f5;
    vertical-align: middle;

    &__img {
      max-width: 130px;
      max-height: 130px;
    }
  }

  &__btn-group{
    float: left;
    width: 60px;
    margin: 3px 0 0 8px;

    & .el-button {
      float: left;
      margin-bottom: 5px;
      width: 58px;
    }

    & .el-button+.el-button {
      margin-left: 0px;
    }
  }
}
</style>
