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
      ></div>

      <!-- 底部操作栏  -->
      <material-footer
        :active-type="activeType"
        :active-id="activeId"
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
import modal from '../../../mixins/modal'
import MaterialList from './components/MaterialList'
import MaterialFooter from './components/MaterialFooter'
import ImageText from './components/ImageText'

export default {
  name: 'edit-functions-material',

  mixins: [modal],

  components: {
    PanoMaterial,
    MaterialList,
    MaterialFooter,
    ImageText,
  },

  data() {
    return {
      materials: [
        { type: 'panos', id: 0, name: '全景图', view: 'pano-material' },
        { type: 'logos', id: 1, name: 'LOGO' },
        { type: 'tours', id: 2, name: '平面地图' },
        { type: 'hotspots', id: 7, name: '热点图标' },
        { type: 'icons', id: 3, name: '朋友圈小图标' },
        { type: 'ads', id: 4, name: '天空/地面广告' },
        { type: 'thumbs', id: 5, name: '场景缩略图' },
        { type: 'infos', id: 10, name: '图文信息', view: 'image-text' },
        { type: 'objects', id: 11, name: '物品3D' },
        { type: 'audios', id: 9, name: '音频' },
        { type: 'others', id: 6, name: '其他' },
      ],
    }
  },

  computed: {
    ...mapState({
      active: state => state.edit.active,
      activeType: state => state.edit.material.type,
    }),

    activeMaterial() {
      return this.materials.find(({ type }) => type === this.activeType)
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
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.material-dialog {
  width: 1000px;
}

.material-tabs {
  margin-bottom: 1em;

  &__item {
    float: left;
    padding: 0.3em 0.7em;
    border-radius: 2px;
    background-color: var(--gray-extra-light);
    cursor: pointer;
    transition: 0.2s;

    & + li {
      margin-left: 0.8em;
    }

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
</style>
