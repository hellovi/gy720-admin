<template>
  <div class="edit-functions__material">
    <el-dialog
      title="素材库"
      custom-class="material-dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible="active.material"
      :before-close="close"
    >
      <!-- 分类标签栏 -->
      <ul class="material-tabs clearfix list">
        <li
          v-for="material in materials"
          :key="material.type"
          class="material-tabs__item"
          :class="{'material-tabs__item--active': material.id === activeMaterial.id}"
          @click="changeType(material.type)"
        >{{ material.name }}</li>
      </ul>

      <!-- 素材列表 -->
      <keep-alive>
        <div
          :is="activeMaterial.view || 'material-list'"
          :key="activeType"
          class="material-content"
          :active-type="activeMaterial.type"
          :active-id="activeMaterial.id"
        ></div>
      </keep-alive>

      <!-- 底部操作栏  -->
      <material-footer
        :active-type="activeMaterial.type"
        :active-id="activeMaterial.id"
      ></material-footer>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 高级编辑 - 素材库
 * @author yangjun | luminghuai
 * @version 2017-08-31
 */

import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import PanoMaterial from '@/views/User/Publish/components/PanoMaterial'
import modal from '../../../mixins/modal'
import { MaterialList, MaterialFooter, ImageText } from './components'

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
        { type: 'panos', id: 0, name: '全景图', view: 'PanoMaterial' },
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
  },

  methods: {
    close() {
      this.closeModal('material')
    },

    changeType(type) {
      this.$store.commit(EDIT.MATERIAL.TAB.SELECT, { type })
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.material-dialog {
  width: 1200px;
}

.material-tabs {
  margin-bottom: 1em;

  &__item {
    float: left;
    padding: 0.4em 0.8em;
    border-radius: 2px;
    background-color: var(--gray-extra-light);
    cursor: pointer;

    & + li {
      margin-left: 1em;
    }

    &--active {
      background-color: var(--color-primary);
      color: #fff;
    }
  }
}
.material-content {
  padding-top: 10px;
  padding-bottom: 10px;
  border-width: 1px 0;
  border-style: solid;
  border-color: var(--gray-extra-light);

  .el-pagination {
    margin-top: 15px;
  }
}

/* .edit-functions__material {
  &__data {
    min-height: 400px;
    position: relative;


  }

  .el-dialog {
    position: inherit;
  }

  &__ul {
    padding-left: 0px;
  }

  &__title {
    float: left;
    margin-right: 10px;

    & .el-button {
      width: 90px;
      margin-bottom: 5px;
      text-align: center;
      padding: 6px 5px;
    }
  }

  &__button--active {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
}


.edit-functions__material {
  &__wrap {
    .el-card {
      text-align: center;
      padding-top: 10px;
    }

    .el-col {
      margin-bottom: 10px;
    }

    .bottom {
      position: relative;

      & > h6 {
        font-size: 12px;
        margin: 10px auto 10px;
      }
    }
  }

  &__image {
    max-height: 40px;
  }

  &__upload {
    margin-top: 20px;

    .el-button {
      margin-right: 10px;
    }

    & > span {
      color: var(--gray);
    }
  }
} */
</style>
