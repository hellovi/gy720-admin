<template>
  <div class="edit-functions__tour-edition">
    <el-form
      class="edition__editor"
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
        <el-button type="primary">选择场景</el-button>
        <el-button type="primary">保存</el-button>
      </el-form-item>
    </el-form>

    <div class="edition__map">
      <v-view-panel
        :top.sync="viewPanelInfo.top"
        :left.sync="viewPanelInfo.left"
        :degress.sync="viewPanelInfo.degress"
      ></v-view-panel>
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
/**
 * 高级编辑 - 编辑导览、场景视角
 *
 * @author huojinzhao
 */

import vViewPanel from './ViewPanel'

export default {
  name: 'edit-functions__tour-edition',

  components: {
    vViewPanel,
  },

  data: () => ({
    helpDoc: [
      '点击 "选择场景" 按钮，选择需要添加视角展示的场景；',
      '拖动雷达的圆心，可以设置在地图中位置；',
      '拖动雷达的外环区域，可以设置视角方向；',
      '操作完成后, 记得点击 "保存" 哦。',
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

    viewPanelInfo: {
      top: 100,
      left: 200,
      degress: 90,
    },
  }),
}
</script>

<style lang="postcss">
.edit-functions__tour-edition {
  text-align: center;

  & .edition__editor {
    text-align: left;
  }

  & .edition__map {
    position: relative;
    display: inline-block;

    & > img {
      max-width: 800px;
    }
  }

  & .edition__doc {
    text-align: left;

    & dd {
      margin-top: 10px;
    }
  }
}
</style>
