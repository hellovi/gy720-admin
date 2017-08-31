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
        <el-button
          type="primary"
          @click="openSceneSelection"
        >选择场景</el-button>
        <el-button type="primary">保存</el-button>
      </el-form-item>
    </el-form>

    <div class="edition__map">
      <v-view-panel
        v-for="panel in viewPanellist" :key="panel.scene_id"
        :top.sync="panel.top"
        :left.sync="panel.left"
        :degress.sync="panel.degress"
      ></v-view-panel>
      <img :src="$url.static('data/avatar/20170101/471811501052670905.jpg')">
    </div>

    <dl class="edition__doc">
      <dt>帮助操作：</dt>
      <dd v-for="(item, index) in helpDoc" :key="item">
        {{`${index + 1}、${item}`}}
      </dd>
    </dl>

    <!-- 选择场景 -->
    <el-dialog
      class="edition__selection"
      title="选择场景" size="large"
      :modal="false" top="5%"
      :visible.sync="sceneSelectionModal.active"
    >
      <v-tour-scene
        class="edition__selection-item"
        v-for= "scene in scenelist" :key="scene.id"
        :scene="scene"
        @choose="onChooseScene"
      >
      </v-tour-scene>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 高级编辑 - 编辑导览、场景视角
 *
 * @author huojinzhao
 */

import Ajax from './modules/Ajax'
import vViewPanel from './ViewPanel'
import vTourScene from './TourScene'

export default {
  name: 'edit-functions__tour-edition',

  components: {
    vViewPanel,
    vTourScene,
  },

  props: {
    tourId: {
      type: Number,
      required: true,
    },
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
        {
          required: true,
          message: '请输入地图名称',
          trigger: 'blur',
        },
        {
          pattern: /^\S{1,4}$/,
          message: '请输入4个字符以内',
          trigger: 'blur',
        },
      ],
    },

    viewPanellist: [],

    viewPanelOrigin: {
      pano_map_id: 0,
      scene_id: 0,
      top: 0,
      left: 0,
      degress: 0,
    },

    scenelist: [],

    sceneSelectionModal: {
      active: false,
    },
  }),

  methods: {
    openSceneSelection() {
      this.sceneSelectionModal.active = true
    },

    closeSceneSelection() {
      this.sceneSelectionModal.active = false
    },

    onChooseScene(scene_id) {
      // 更新场景列表中项目的选择状态
      const scene = this.scenelist
        .find(item => item.id === scene_id)
      if (scene) scene.is_used = true
      // 新增viewPanel
      this.viewPanellist.push({
        ...this.viewPanelOrigin,
        ...{ scene_id },
      })
      // 关闭场景选择
      this.closeSceneSelection()
    },
  },

  created() {
    // 读取导览详情

    // 读取场景选择列表
    Ajax.readScenelist()
      .then((res) => { this.scenelist = res })

    // 设置viewPanelOrigin对应的导览id
    this.viewPanelOrigin.pano_map_id = this.tourId
  },
}
</script>

<style lang="postcss">
.edit-functions__tour-edition {
  padding-bottom: 10px;
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

  & .edition__selection {
    text-align: left;

    &-item {
      float: left;
    }

    & .el-dialog__body::after {
      content: '';
      display: block;
      clear: both;
    }
  }
}
</style>
