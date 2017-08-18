<template>
  <el-form
    class="edit-functions__tour-creation"
    label-width="80px"
    :model="tourCreationInfo"
    :rules="tourCreationRules"
  >
    <el-form-item
      class="creation__name"
      label="地图名称"
      prop="name"
    >
      <el-input
        v-model="tourCreationInfo.name"
        placeholder="请输入地图名称，例如一楼、二楼、单元一等（输入4个字符以内）"
      >
      </el-input>
    </el-form-item>
    <el-form-item
      class="creation__material"
      label="平面地图"
    >
      <img
        class="creation__material__display"
        :src="$url.static('data/avatar/20170101/471811501052670905.jpg')">
      <el-button>选择素材</el-button>
      <el-button>删除</el-button>
      <span class="creation__material__note">
        选择平面地图，500px分辨率以上
      </span>
    </el-form-item>
  </el-form>
</template>

<script>
/**
 * 高级编辑 - 创建导览
 *
 * @author hjz
 */

export default {
  name: 'edit-functions__tour-creation',

  data: () => ({
    tourCreationInfo: {
      name: '',
    },

    tourCreationRules: {
      name: [
        { required: true, message: '请输入地图名称', trigger: 'blur' },
        { pattern: /^\S{1,4}$/, message: '请输入4个字符以内', trigger: 'blur' },
      ],
    },
  }),
}
</script>

<style>
@import 'vars.css';

.edit-functions__tour-creation {

  & .creation__material {

    &__display {
      float: left;
      margin-right: 10px;
      height: 35px;
    }

    &__note {
      float: right;

      &::before {
        content: '\e621';
        color: var(--disabled-color-base);
        font-family: 'iconfont';
      }
    }
  }
}
</style>
