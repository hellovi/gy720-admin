<template>
  <div class="edit-functions__material">
    <el-dialog
      title="素材库"
      :visible="active.material"
      :before-close="() => closeModal('material')"
      size="large"
    >
      <ul class="clearfix edit-functions__material__ul">
        <li class="edit-functions__material__title list" v-for="(item, index) in mapper" :key="item.key" @click="switchType(item.key)">
          <el-button size="small">{{item.label}}</el-button>
        </li>
      </ul>
      <keep-alive>
        <component :is="currentView"
          :type = "type"
        >
        </component>
      </keep-alive>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 高级编辑 - 素材库
 * @version 2017-08-21
 */
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
      type: 1,
      mapper: [
        { key: 0, label: '全景图', com: 'PanoMaterial' },
        { key: 1, label: 'LOGO', com: 'materialImages' },
        { key: 2, label: '热点图标', com: 'materialImages' },
        { key: 3, label: '小图标', com: 'materialImages' },
        { key: 4, label: '地面广告', com: 'materialImages' },
        { key: 5, label: '缩略图', com: 'materialImages' },
        { key: 6, label: '图文信息', com: 'materialImageText' },
        { key: 7, label: '物品3D', com: 'materialObject3D' },
        { key: 8, label: '音频', com: '' },
        { key: 9, label: '其他', com: '' },
      ],
    }
  },

  computed: {
    currentView: {
      get() {
        return this.mapper.find(item => item.key === this.type).com
      },
      set() {
        // 设置素材类型前置操作
      },
    },
  },

  methods: {
    switchType(type) {
      this.type = type
      this.creatMaterial(type)
    },

    creatMaterial(type) {
      // 加载素材
      this.$store.dispatch(EDIT.MATERIAL.CREATE, { type })
    },
  },

  created() {
    this.creatMaterial(this.type)
  },
}
</script>

<style lang="postcss">
.edit-functions__material {

  &__ul {
    padding-left: 0px;
  }

  &__title {
    float: left;
    margin-right: 10px;

    & .el-button {
      width: 60px;
      text-align: center;
      padding: 6px 5px;
    }
  }
}
</style>
