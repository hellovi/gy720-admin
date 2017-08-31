<template>
  <div class="edit-functions__view-edition">

    <div class="edition__map">
      <v-view-panel
        v-for="view in viewlist" :key="view.scene_id"
        :top.sync="view.top"
        :left.sync="view.left"
        :degress.sync="view.degress"
      ></v-view-panel>
      <img :src="$url.static('data/avatar/20170101/471811501052670905.jpg')">
    </div>

    <dl class="edition__doc">
      <dt>操作提示：</dt>
      <dd v-for="(item, index) in helpDoc" :key="item">
        {{`${index + 1}、${item}`}}
      </dd>
    </dl>

    <!-- 选择场景 -->
    <el-dialog
      class="edition__selection"
      title="选择场景" size="large" :modal="false"
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
    <div class="edition__control">
      <el-button
        type="info"
        @click="openSceneSelection"
      >添加场景</el-button>
      <el-button
        type="primary"
      >完成编辑</el-button>
      <el-button
        type="ghost"
      >取消编辑</el-button>
    </div>
  </div>
</template>

<script>
/**
 * 高级编辑 - 导览 - 编辑导览视角
 *
 * @author huojinzhao
 */

import Ajax from './modules/Ajax'
import vViewPanel from './ViewPanel'
import vTourScene from './TourScene'

export default {
  name: 'edit-functions__view-edition',

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
      '点击 "添加场景" 按钮，选择需要添加视角展示的场景；',
      '拖动雷达的圆心，可以设置在地图中位置；',
      '拖动雷达的外环区域，可以设置视角方向；',
      '一张导览地图可作为多个场景的地图，可同时添加多个视角，分别对应唯一的场景；',
      '操作完成后, 请记得点击 "完成编辑" 保存操作。',
    ],

    viewlist: [],

    viewOrigin: {
      id: 0,
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
      this.viewlist.push({
        ...this.viewOrigin,
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
    this.viewOrigin.pano_map_id = this.tourId
  },
}
</script>

<style lang="postcss">
.edit-functions__view-edition {
  padding-bottom: 10px;
  text-align: center;

  & .edition__control {
    text-align: center;
    margin-top: 30px;
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
