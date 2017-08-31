<template>
  <el-dialog title="管理3D物品"  custom-class="object-manage" :visible="value" top = "5%">
    <!-- 侧边栏 -->
    <object-aside
      :cates="cates"
      :choosedCateId="choosedCateId"
      @open-create-object-dialog="createObjectDialog = true"
      @add-cate="addCate"
    ></object-aside>

    <object-list
      :objects="objList.data"
      :cates="cates"
      :dialog="createObjectDialog"
      @open-create-object-dialog="createObjectDialog = true"
      @close-create-object-dialog="createObjectDialog = false"
      @close="createObjectDialog = false"
      @editWork="onEditWork"
      @deleteItem="onDelete"
      @uploadWork="onUploadWork"
    > </object-list>
      <!--上传图片弹出框-->
      <!-- <el-dialog
            title="上传物品3D图片"
            :visible.sync="rotateImageModal"
            size="large"
            :modal="false"
          >
          <app-file-upload
            v-model="rotateImage"
            ref="fileUpload"
            accept="jpg,jpeg,png"
            @file-uploaded="addRotateImage"
        >
          <el-button type="primary" size="large">点击选择图片</el-button>
        </app-file-upload>
      </el-dialog> -->
  </el-dialog>
</template>

<script>
/**
 * 高级编辑 - 素材库管理3D物品
 * @version 2017-08-25
 */
import { mapState } from 'vuex'
import ObjectAside from './components/ObjectAside'
import ObjectList from './components/ObjectList'

const AppFileUpload = () => import('@/components/AppFileUpload')

export default {
  name: 'edit-functions__material--manage3d',

  components: { ObjectAside, ObjectList, AppFileUpload },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    objList: {
      type: Object,
      required: true,
    },
    currentCate: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      cates: [],

      createObjectDialog: false,

      choosedCateId: 1,


      rotateImageModal: false,
      rotateImage: '',
      rotateImageId: '',
    }
  },

  computed: {
    ...mapState({
      type: state => state.edit.material.type,
    }),

    active: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },

  watch: {
    currentCate(val) {
      this.work.info.source_rotate_category_id = val
    },
  },

  methods: {
    onChooseCate(cateId) {
      this.choosedCateId = cateId
      this.$emit('changeCate', cateId)
    },

    // // 上传物品3D图片
    // onUploadWork(id) {
    //   this.rotateImageId = id
    //   this.rotateImageModal = true
    // },
    // // 上传完成后回调
    // addRotateImage(up, file) {
    //   const info = {
    //     title: file.name,
    //     source_rotate_id: this.rotateImageId,
    //     qiniu_key: this.rotateImage,
    //   }
    //   Ajax.createRotateImage(info)
    //     .then(() => {
    //       this.$message({ type: 'success', message: '创建成功' })
    //       this.rotateImageModal = false
    //     })
    //     .catch((err) => {
    //       this.$message({ type: 'error', showClose: true, message: err.status.reason })
    //     })
    // },

    addCate(result) {
      this.cates.push(result)
    },
  },

  created() {
    this.$http.get('/user/sourcerotatecategory')
      .then(({ result }) => {
        this.cates = result
      })
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.object-manage {
  width: 1000px;

  &__aside {
    float: left;
    width: 120px;
    font-size: 14px;

    &__catelist{
      margin-top: 20px;
      text-align: right;

      &__item {
        display: block;
        padding: 10px 12px 10px 16px;
        border-bottom: 1px dotted var(--border-color-split);
        line-height: 19px;
        cursor: pointer;
      }
    }
  }
}

.manage3d {




  &__list {
    height: 100%;
    padding-left: 40px;
    border-left: 1px solid rgb(229, 234, 240);
    overflow: hidden;
  }
}
</style>
