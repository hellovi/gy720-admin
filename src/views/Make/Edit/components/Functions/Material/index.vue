<template>
  <div class="edit-functions__material">
    <el-dialog
      title="素材库"
      :visible="active.material"
      :before-close="() => closeModal('material')"
      size="large"
    >
      <ul class="clearfix edit-functions__material__ul">
        <li
          class="edit-functions__material__title list"
          v-for="(item, index) in materialConfig" :key="item.type"
          @click="changeType(item.type)"
        >
          <el-button
            :class="{'edit-functions__material__button--active': item.id === currentId }"
            size="small"
          >
           {{item.label}}
          </el-button>
        </li>
      </ul>
      <keep-alive>
        <div :is="currentView" :key="type" :current-id="currentId"></div>
      </keep-alive>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 高级编辑 - 素材库
 * @version 2017-08-21
 */
import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import PanoMaterial from '@/views/User/Publish/components/PanoMaterial'
import modal from '../../../mixins/modal'
import { materialImages, materialImageText, materialObject3D } from './components'

export default {
  name: 'edit-functions__material',

  mixins: [modal],

  components: {
    PanoMaterial,
    materialImages,
    materialImageText,
    materialObject3D,
  },

  data() {
    return {
      materialConfig: [
        { type: 'panos', id: 0, label: '全景图', comp: 'PanoMaterial' },
        { type: 'logos', id: 1, label: 'LOGO', comp: 'materialImages' },
        { type: 'tours', id: 2, label: '导览图', comp: 'materialImages' },
        { type: 'hotspots', id: 7, label: '热点图标', comp: 'materialImages' },
        { type: 'icons', id: 3, label: '小图标', comp: 'materialImages' },
        { type: 'ads', id: 4, label: '地面广告', comp: 'materialImages' },
        { type: 'thumbs', id: 5, label: '缩略图', comp: 'materialImages' },
        { type: 'infos', id: 10, label: '图文信息', comp: 'materialImageText' },
        { type: 'objects', id: 11, label: '物品3D', comp: 'materialObject3D' },
        { type: 'audios', id: 8, label: '音频', comp: '' },
        { type: 'others', id: 6, label: '其他', comp: 'materialImages' },
      ],
    }
  },

  computed: {
    ...mapState({
      type: state => state.edit.material.type,
    }),

    currentMaterial() {
      return this.materialConfig.find(item => item.type === this.type)
    },

    currentId() {
      return this.currentMaterial.id
    },

    currentView: {
      get() {
        return this.currentMaterial.comp
      },
      set() {
        // 设置素材类型前置操作
        // 判断是否为其他地方唤起？store?
      },
    },

  },

  methods: {
    changeType(type) {
      this.$store.commit(EDIT.MATERIAL.TAB.SELECT, { type })
    },
  },

  created() {

  },
}
</script>

<style lang="postcss">
@import "vars.css";

.edit-functions__material {

  &__ul {
    padding-left: 0px;
  }

  &__title {
    float: left;
    margin-right: 10px;

    & .el-button {
      width: 55px;
      text-align: center;
      padding: 6px 5px;
    }
  }

  &__button--active {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
}
</style>
