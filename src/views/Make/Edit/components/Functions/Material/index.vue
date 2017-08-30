<template>
  <div class="edit-functions__material">
    <el-dialog
      title="素材库"
      :visible="active.material"
      :before-close="() => closeModal('material')"
      :close-on-click-modal="false"
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
        <div
          :is="currentView"
          :key="type"
          :current-id="currentId"
          @on-manage = "openObject3D"
        ></div>
      </keep-alive>
    </el-dialog>
    <!--管理物品3D-->
    <manage-object
      v-show="manageModel"
      v-model="manageModel"
      :cate-list="cateList"
      :obj-list="objList"
      :current-cate="currentCate"
      @createCate="onCreateCate"
      @createWork="onCreateWork"
      @editWork="onEditWork"
      @deleteItem="onDelete"
      @changeCate="onChangeCate"
    >
    </manage-object>
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
import { materialImages, materialImageText, materialObject3D, manageObject } from './components'
import Ajax from './components/Manage3d/module/ajax'

export default {
  name: 'edit-functions__material',

  mixins: [modal],

  components: {
    PanoMaterial,
    materialImages,
    materialImageText,
    materialObject3D,
    manageObject,
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
        { type: 'audios', id: 9, label: '音频', comp: 'materialImages' },
        { type: 'others', id: 6, label: '其他', comp: 'materialImages' },
      ],
      cateList: [], // 物品3D分类
      objList: { data: [] },
      manageModel: false,
      currentCate: 1,
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

    openObject3D(status) {
      this.manageModel = status
      Ajax.getCatelist()
        .then((data) => { this.cateList = data })
      Ajax.getWorklist()
        .then((data) => { this.objList = data })
    },

    onChangeCate(id) {
      this.currentCate = id
      Ajax.getWorklist({ cate_id: id })
        .then((data) => { this.objList = data })
    },

    onCreateCate(cate) {
      this.cateList.push(cate)
    },

    onCreateWork(work) {
      this.objList.data.push(work)
    },

    onEditWork(work) {
      const editWork = this.objList.data
      editWork[editWork.findIndex(obj => obj.id === work.id)] = { ...work }
      // this.objList.data = editWork.map((item) => {
      //   if (item.id === work.id) {
      //     return { ...work }
      //   }
      //   return item
      // })
    },

    onDelete(type, id) {
      if (type === 'cate') {
        this.cateList = this.cateList.filter(cate => cate.id !== id)
      } else {
        this.objList.data = this.objList.data.filter(cate => cate.id !== id)
      }
    },
  },

  created() {

  },
}
</script>

<style lang="postcss">
@import "vars.css";

.edit-functions__material {
  &__data {
    min-height: 400px;
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
}
</style>
