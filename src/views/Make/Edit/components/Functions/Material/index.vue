<template>
  <div class="edit-functions__material">
    <el-dialog
      title="素材库"
      :visible.sync="active.material"
      size="large"
    >
      <ul>
        <li class="edit-functions__material__title" v-for="(item, index) in mapper" :key="item.key">
          <el-button>{{item.label}}</el-button>
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
import modal from '../../../mixins/modal'
import { materialImages, materialImageText, materialObject3D } from './components'

export default {
  name: 'edit-functions__material',

  mixins: [modal],

  components: {
    materialImages,
    materialImageText,
    materialObject3D,
  },

  data() {
    return {
      type: 1,
      mapper: [
        { key: 0, label: '全景图', com: '' },
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
        return this.mapper.filter(item => item.key === this.type)[0].com
      },
      set() {
        // 设置素材类型前置操作
      },
    },
  },

  created() {
    // 加载素材
    this.$store.dispatch(EDIT.MATERIAL.CREATE, { type: this.type })
  },
}
</script>

<style lang="postcss">
.edit-functions__material {
  &__title {

  }
}
</style>
