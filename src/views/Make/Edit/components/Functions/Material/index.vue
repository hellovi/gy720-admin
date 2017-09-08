<template>
  <div class="edit-functions__material">
    <el-dialog
      title="素材库"
      custom-class="material-dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible="active.material"
      :before-close="close"
      top="10%"
    >
      <!-- 分类标签栏 -->
      <ul class="material-tabs clearfix list">
        <li
          v-for="material in materials"
          :key="material.type"
          class="material-tabs__item"
          :class="{'material-tabs__item--active': material.id === activeId}"
          @click="changeType(material.type)"
        >{{ material.name }}</li>
      </ul>

      <!-- 素材列表 -->
      <div
        class="material-content"
        :is="activeView"
        :key="activeType"
        :active-type="activeType"
        :active-id="activeId"
        :selected="activeMaterial.selected"
        :add-files="files"
        :select-multiple="activeMaterial.multiple"
        ref="materialPage"
      >
        <template slot="footer" scope="scope">
          <div
            v-if="activeType === 'scene'"
            class="material-panos__submit--select"
          >
            <el-button type="primary" @click="checkPanos(scope.checked)" :loading="selectLoading">选择全景图</el-button>
          </div>
          <div
            v-if="activeType === 'photo'"
            class="material-photos__submit--select"
          >
            <el-button type="primary" @click="checkPhotos(scope.checked)" :loading="selectLoading">选择相册</el-button>
          </div>
        </template>
      </div>

      <!-- 底部操作栏  -->
      <material-footer
        :active-type="activeType"
        :active-id="activeId"
        @file-upload="fileUpload"
      ></material-footer>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 高级编辑 - 素材库
 * @author yangjun | luminghuai
 * @version 2017-09-01
 */

import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import PanoMaterial from '@/views/User/Publish/components/PanoMaterial'
import errorHandle from '@/mixins/errorHandle'
import modal from '../../../mixins/modal'
import MaterialList from './components/MaterialList'
import MaterialFooter from './components/MaterialFooter'
import ImageText from './components/ImageText'
import PhotoMaterial from './components/Photo'

export default {
  name: 'edit-functions-material',

  mixins: [errorHandle, modal],

  components: {
    PanoMaterial,
    MaterialList,
    MaterialFooter,
    ImageText,
    PhotoMaterial,
  },

  data() {
    return {
      materials: [
        { type: 'scene', id: 0, name: '全景图', view: 'pano-material' },
        { type: 'logo', id: 1, name: 'LOGO' },
        { type: 'map', id: 2, name: '平面地图' },
        { type: 'hotspot', id: 7, name: '热点图标' },
        { type: 'wxicon', id: 3, name: '朋友圈小图标' },
        { type: 'ad', id: 4, name: '天空/地面广告' },
        { type: 'thumb', id: 5, name: '场景缩略图' },
        { type: 'article', id: 10, name: '图文信息', view: 'image-text' },
        { type: 'rotate', id: 11, name: '物品3D' },
        { type: 'audio', id: 9, name: '音频' },
        { type: 'photo', id: 12, name: '相册', view: 'photo-material' },
        { type: 'other', id: 6, name: '其他' },
      ],
      selectLoading: false,
      files: [],
    }
  },

  computed: {
    ...mapState({
      active: state => state.edit.active,
      activeType: state => state.edit.material.type,
      panoId: state => state.edit.panoInfo.hash_pano_id,
      invoked: state => state.edit.material.invoked,
    }),

    activeMaterial() {
      const activeMaterial = this.materials.find(({ type }) => type === this.activeType)
      // 场景选择-全景图时
      if (this.activeType === 'scene' && this.invoked) {
        // 添加已选过的数据selected
        return {
          ...activeMaterial,
          selected: this.$store.state.edit.scene.list,
        }
      }
      return activeMaterial
    },

    activeId() {
      return this.activeMaterial.id
    },

    activeView() {
      return (this.activeMaterial.view || 'material-list')
    },
  },

  methods: {
    close() {
      this.closeModal('material')
    },

    changeType(type) {
      this.$store.commit(EDIT.MATERIAL.CHANGE, type)
    },

    checkPanos(panos) {
      this.selectLoading = true

      const data = panos.map(({ id, ...args }) => ({
        source_scene_id: id,
        ...args,
      }))

      // 提交选中全景图片到后端
      this.$http.post(`/user/scene?pano_id=${this.panoId}`, { scenes: data })
        .then(({ result }) => {
          this.$store.commit(EDIT.MATERIAL.SELECT, result)
          // 重置子组件选中数据
          this.$refs.materialPage.checked = []
        })
        .catch(({ status: { reason } }) => {
          this.showError(reason)
        })
        .then(() => {
          this.selectLoading = false
        })
    },

    // 选择相册
    checkPhotos(photos) {
      this.$store.commit(EDIT.MATERIAL.SELECTS, photos)
    },

    fileUpload(files) {
      this.files = files.map(({
        source_scene_id, upload_id, ...other }) =>
        ({ ...other }))
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.material-dialog {
  width: 1000px;
}

.material-tabs {
  margin-right: -0.8em;
  &__item {
    float: left;
    padding: 0.3em 0.7em;
    border-radius: 2px;
    background-color: var(--gray-extra-light);
    cursor: pointer;
    transition: 0.2s;
    margin-right: 0.65em;
    margin-bottom: 1em;

    &--active {
      background-color: var(--color-primary);
      color: #fff;
    }
  }
}

.material-content {
  height: 485px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-width: 1px 0;
  border-style: solid;
  border-color: var(--gray-extra-light);

  .el-pagination {
    margin-top: 15px;
  }

  .pano-material__content {
    min-height: 365px;
  }
}

.material-panos__submit, .material-photos__submit {
  &--select {
    position: absolute;
    right: 0;
    bottom: -56px;
  }
}
</style>
