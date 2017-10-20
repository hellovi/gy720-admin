<template>
  <div class="edit-functions__view-edition" v-if="viewInfo">
    <div class="edition__control">
      <el-button
        type="primary"
        @click="openSceneSelection"
      >添加场景</el-button>
      <el-button
        class="btn-primary"
        @click="submit"
      >完成编辑</el-button>
    </div>

    <div class="edition__map">
      <v-view-panel
        v-for="(view, index) in viewInfo.map_scenes"
        :info="scenelist.find(({ id }) => view.scene_id === id)"
        :key="view.scene_id"
        :top.sync="view.top"
        :left.sync="view.left"
        :degress.sync="view.degrees"
        @delete="preDeleteView(index)"
        v-if="renderPanel"
      ></v-view-panel>
      <img :src="$url.static(viewInfo.image)">
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

    viewInfo: [],

    viewOrigin: {
      id: 0,
      // pano_map_id: 0,
      scene_id: 0,
      top: 0,
      left: 0,
      degrees: 0,
    },

    scenelist: [],

    sceneSelectionModal: {
      active: false,
    },

    renderPanel: false,
  }),

  methods: {
    /* --- 场景逻辑 --- */

    openSceneSelection() {
      this.sceneSelectionModal.active = true
    },

    closeSceneSelection() {
      this.sceneSelectionModal.active = false
    },

    onChooseScene(sceneInfo) {
      // 更新场景列表中项目的选择状态
      const scene = this.scenelist
        .find(item => item.id === sceneInfo.id)
      if (scene) scene.is_used = true
      // 新增viewPanel
      this.viewInfo.map_scenes.push({
        ...this.viewOrigin,
        scene_id: sceneInfo.id,
        scene_info: sceneInfo,
      })
      // 关闭场景选择
      this.closeSceneSelection()
    },

    /* --- 删除场景 --- */

    preDeleteView(index) {
      const views = this.viewInfo.map_scenes
      const id = views[index].id
      if (id) {
        Ajax.deleteSceneView(id)
          .then(() => {
            this.$message({
              message: '删除视角成功',
              type: 'success',
            })
            this.deleteView(index)
          })
          .catch(() => {
            this.$message({
              message: '删除视角失败',
              type: 'error',
            })
          })
      } else {
        this.deleteView(index)
      }
    },

    deleteView(index) {
      const views = this.viewInfo.map_scenes
      // 重置对应场景状态
      const scene = this.scenelist
        .find(item => item.id === views[index].scene_id)
      if (scene) scene.is_used = false
      // 删除视角
      this.$delete(views, index)
    },

    /* --- 提交操作 ---- */

    submit() {
      Ajax.replaceViewConfig(
        this.viewInfo.map_scenes,
        this.tourId,
      )
        .then(() => {
          this.$message({
            message: '操作成功',
            type: 'success',
          })
          this.cancel()
        })
        .catch((error) => {
          this.$message({
            message: error.status.reason.update[0],
            type: 'error',
          })
        })
    },

    cancel() {
      this.$emit('cancel')
    },
  },

  created() {
    // 读取导览详情
    if (this.tourId) {
      Ajax.retrieveTourInfo(this.tourId)
        .then((res) => { this.viewInfo = res })
    }

    // 读取场景选择列表
    Ajax.readScenelist(this.tourId)
      .then((res) => {
        this.scenelist = res
        this.renderPanel = true
      })

    // 设置viewPanelOrigin对应的导览id
    // this.viewOrigin.pano_map_id = this.tourId
  },
}
</script>

<style lang="postcss">
.edit-functions__view-edition {
  padding: 0 35px;
  text-align: center;

  & .edition__control {
    text-align: right;
    margin-bottom: 10px;
  }

  & .edition__map {
    position: relative;
    display: inline-block;

    & > img {
      width: 800px;
    }
  }

  & .edition__doc {
    text-align: left;

    & dd {
      margin-top: 10px;
      margin-left: 20px;
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
