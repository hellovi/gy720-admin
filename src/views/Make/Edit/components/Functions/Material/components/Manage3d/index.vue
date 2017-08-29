<template>
  <div class="edit-functions__material__manage">
    <el-dialog
      title="管理3D物品"
      custom-class="manage__wrap"
      :visible.sync="active"
      top = "5%"
    >
      <div class="manage3d">
        <!--侧边栏-->
        <aside class="manage3d__aside">

          <div class="manage3d__aside__btn">
            <el-button type="primary" @click="onCreateWork">创建物品3D</el-button>
          </div>

          <div class="manage3d__aside__catelist">
            <a class="hover-primary manage3d__aside__catelist__item"
             @click="onCreateCate"
            >
             +创建新分类
            </a>
            <!-- 分类列表 -->
            <v-cate-item
              class="manage3d__aside__catelist__item"
              v-for="cate in cateList" :key="cate.id"
              :item="cate"
              :active="cate.id === choosedCateId"
              @deleteCate="onDeleteCate"
              @chooseCate="onChooseCate"
            >
            </v-cate-item>
          </div>

        </aside>
        <!--主列表-->
        <section class="manage3d__list">
           <v-obj-item
              class="manage3d__list__item"
              v-for="obj in objList.data" :key="obj.id"
              :item="obj"
              @editWork="onEditWork"
            >
            </v-obj-item>
        </section>

        <!-- 创建分类弹窗  -->
        <el-dialog
          :visible.sync="createCateModal.tag"
          size="tiny" title="创建作品分类"
          :modal="false"
          @close="onCloseCreateCateModal"
        >
          <el-form
            :model="createCateInfo"
            ref="createCateInfo"
            :rules="createCateRules"
            label-width="95px"
          >
            <el-form-item
              prop="name"
              label="分类名称"
            >
              <el-input v-model="createCateInfo.name"></el-input>
            </el-form-item>
            <el-form-item
              prop="list_order"
              label="分类排序"
            >
              <el-input v-model="createCateInfo.list_order"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button type="primary"
              :loading="createCateModal.confirmLoading"
              @click="onCreateCateConfirm"
            >提交</el-button>
            <el-button
              @click="onCloseCreateCateModal"
            >取消</el-button>
          </div>
        </el-dialog>

        <!-- 创建物品3D弹窗  -->
        <el-dialog
          :visible.sync="createWorkModal.tag"
          size="tiny" title="创建"
          :modal="false"
          @close="onCloseCreateWorkModal"
        >
          <el-form
            :model="createWorkInfo"
            ref="createWorkInfo"
            :rules="createWorkRules"
            label-width="95px"
          >
            <el-form-item
              prop="title"
              label="项目名称"
            >
              <el-input v-model="createWorkInfo.title"></el-input>
            </el-form-item>
            <el-form-item label="所属分类" prop="source_rotate_category_id">
              <el-select v-model="createWorkInfo.source_rotate_category_id">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              prop="remark"
              label="项目简介"
              type="textarea"
              :rows="3"
            >
              <el-input v-model="createWorkInfo.remark"></el-input>
            </el-form-item>
            <el-form-item
              prop="list_order"
              label="排序"
            >
              <el-input v-model="createWorkInfo.list_order"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button type="primary"
              :loading="createWorkModal.confirmLoading"
              @click="onCreateWorkConfirm"
            >提交</el-button>
            <el-button
              @click="onCloseCreateWorkModal"
            >取消</el-button>
          </div>
        </el-dialog>
        <!--删除分类 弹出框-->

      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 高级编辑 - 素材库管理3D物品
 * @version 2017-08-25
 */
import { mapState } from 'vuex'
// import { EDIT } from '@/store/mutationTypes'
import vCateItem from './components/CateItem'
import vObjItem from './components/ObjectItem'
import Ajax from './module/ajax'
import deleteItemMixin from './module/deleteItemMixin'

export default {
  name: 'edit-functions__material--manage3d',

  mixins: [deleteItemMixin],

  components: { vCateItem, vObjItem },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    cateList: {
      type: Array,
      required: true,
    },
    objList: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      choosedCateId: 1,
      model: {
        create: false, // 创建物品
        manage: false, // 管理分类
        delete: false, // 删除分类
      },
      // 创建/修改分类与作品
      // createModal: {
      //   cate: {
      //     tag: false,
      //     confirmLoading: false,
      //   },
      //   work: {
      //     tag: false,
      //     confirmLoading: false,
      //   },
      // },
      // createInfo: {

      // },
      // 新分类
      createCateModal: {
        tag: false,
        confirmLoading: false,
      },
      createCateInfo: {
        name: '',
        list_order: 255,
      },
      createCateRules: {
        name: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入分类名称',
          },
          {
            pattern: /^\S{3,6}$/,
            trigger: 'blur',
            message: '名称长度应在3到6个字符之间',
          },
        ],
        list_order: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入分类排序',
          },
        ],
      },

      // 新作品
      createWorkModal: {
        tag: false,
        confirmLoading: false,
      },
      createWorkInfo: {
        id: 0,
        title: '',
        list_order: 1,
        source_rotate_category_id: 1,
        remark: '',
      },
      createWorkRules: {
        name: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入分类名称',
          },
          {
            pattern: /^\S{1,30}$/,
            trigger: 'blur',
            message: '名称长度应在1到30个字符之间',
          },
        ],
        list_order: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入分类排序',
          },
        ],
      },

      edit: {
        cate: -1,
        work: -1,
      },

      cateItems: [], // 分类
      currentCateId: null, // 当前选中的分类
      removeId: -1, // 要删除的分类的id
      items: [], // 物品
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

  methods: {
    onChooseCate(cateId) {
      this.choosedCateId = cateId
    },

    // 分类
    onCreateCate() {
      this.createCateModal.tag = true
    },

    onCloseCreateCateModal() {
      this.createCateModal.tag = false
      if (!this.createCateModal.confirmLoading) {
        this.$refs.createCateInfo.resetFields()
      }
    },

    resetCreateCateModal() {
      this.createCateModal.confirmLoading = false
      this.onCloseCreateCateModal()
    },

    onCreateCateConfirm() {
      this.$refs.createCateInfo.validate((valid) => {
        if (valid) {
          this.createCateModal.confirmLoading = true
          this.submitCateCreate()
        }
      })
    },

    submitCateCreate() {
      Ajax.createCate(this.createCateInfo)
        .then((id) => {
          this.$emit('createCate', { id, ...this.createCateInfo })
          this.$message({ type: 'success', message: '分类创建成功' })
        })
        .catch((err) => {
          this.$message({ type: 'error', message: err.message })
        })
        .finally(() => {
          this.resetCreateCateModal()
        })
    },

    // 作品
    onCreateWork() {
      this.createWorkModal.tag = true
    },
    onCloseCreateWorkModal() {
      this.createWorkModal.tag = false
      if (!this.createWorkModal.confirmLoading) {
        this.$refs.createWorkInfo.resetFields()
      }
    },

    resetCreateWorkModal() {
      this.createWorkModal.confirmLoading = false
      this.onCloseCreateWorkModal()
    },

    onCreateWorkConfirm() {
      this.$refs.createWorkInfo.validate((valid) => {
        if (valid) {
          this.createWorkModal.confirmLoading = true
          if (this.edit.work > 0) {
            // 修改
            this.submitWorkEdit()
          } else {
            // 新增
            this.submitWorkCreate()
          }
          this.edit.work = -1
        }
      })
    },

    submitWorkCreate() {
      Ajax.createObj(this.createWorkInfo)
        .then((id) => {
          this.$emit('createWork', { id, ...this.createWorkInfo })
          this.$message({ type: 'success', message: '作品创建成功' })
        })
        .catch((err) => {
          this.$message({ type: 'error', message: err.message })
        })
        .finally(() => {
          this.resetCreateWorkModal()
        })
    },

    submitWorkEdit() {
      Ajax.updateObj(this.edit.work, this.createWorkInfo)
        .then(() => {
          this.$emit('editWork', { ...this.createWorkInfo })
          this.$message({ type: 'success', message: '作品修改成功' })
        })
        .catch((err) => {
          this.$message({ type: 'error', message: err.message })
        })
        .finally(() => {
          this.resetCreateWorkModal()
        })
    },

    onDeleteCate(cateId) {
      const h = this.$createElement
      const message = h(
        'div',
        [
          h('p', '确定要删除吗？'),
          h('p', '此操作将永久删除该分类，是否继续'),
        ],
      )

      this.onDeleteItem({
        title: '删除分类',
        message,
        itemId: cateId,
        ajax: Ajax.deleteCate,
        success: () => {
          this.$emit('deleteCate', cateId)
        },
      })
    },

    onEditWork(workId) {
      const info = this.objList.data.find(obj => obj.id === workId)
      this.createWorkInfo = { ...info }
      this.onCreateWork()
      this.edit.work = workId
      // this.submitWorkEdit(workId)
    },
  },

  // 父组件做请求
  // created() {
  //   Ajax.getCatelist()
  //     .then((data) => { this.cateList = data })
  // },
}
</script>

<style lang="postcss">
@import "vars.css";

.edit-functions__material {
  &__manage {
    .manage__wrap {
      width: 80%;
      height: 90%;
    }
  }
}

.manage3d {
  height: 700px;

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

  &__list {
    height: 100%;
    padding-left: 40px;
    border-left: 1px solid rgb(229, 234, 240);
    overflow: hidden;
  }
}
</style>
