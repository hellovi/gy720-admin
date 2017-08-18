<template>
  <div class="edit-functions__tour-edition">
    <el-form
      label="80px" :inline="true"
      :model="tourEditionInfo"
      :rules="tourEditionRules"
    >
      <el-form-item
        label="地图名称"
        prop="name"
      >
        <el-input
          v-model="tourEditionInfo.name"
          placeholder="输入4个字符以内"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">添加场景热点</el-button>
        <el-button type="primary">保存</el-button>
      </el-form-item>
    </el-form>

    <div class="edition__map">
      <img :src="$url.static('data/avatar/20170101/471811501052670905.jpg')">
    </div>

    <dl class="edition__doc">
      <dt>帮助操作：</dt>
      <dd v-for="(item, index) in helpDoc" :key="item">
        {{`${index + 1}、${item}`}}
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'edit-functions__tour-edition',

  data: () => ({
    helpDoc: [
      '点击 "添加场景热点" 按钮，选择场景；',
      '拖动热点中间的圆心可以拖动设置热点位置；',
      '拖动热点黑色区域可以设置雷达方向；',
      '操作完成后记得保存哦。',
    ],

    tourEditionInfo: {
      name: '',
    },

    tourEditionRules: {
      name: [
        { required: true, message: '请输入地图名称', trigger: 'blur' },
        { pattern: /^\S{1,4}$/, message: '请输入4个字符以内', trigger: 'blur' },
      ],
    },
  }),
}
</script>

<style>
.edit-functions__tour-edition {

  & .edition__map {

    & > img {
      display: block;
      margin: 0 auto;
      width: 70%;
    }
  }

  & .edition__doc {

    & dd {
      margin-top: 10px;
    }
  }
}
</style>
