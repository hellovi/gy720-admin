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
            <el-button type="primary" @click="onCreate('work')">创建物品3D</el-button>
          </div>

          <div class="manage3d__aside__catelist">
            <a class="hover-primary manage3d__aside__catelist__item"
             @click="onCreate('cate')"
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
          :visible.sync="cate.modal.tag"
          size="tiny" title="创建作品分类"
          :modal="false"
          @close="onCloseCreateModal('cate')"
        >
          <el-form
            :model="cate.info"
            ref="cateInfo"
            :rules="cate.rules"
            label-width="95px"
          >
            <el-form-item
              prop="name"
              label="分类名称"
            >
              <el-input v-model="cate.info.name"></el-input>
            </el-form-item>
            <el-form-item
              prop="list_order"
              label="分类排序"
            >
              <el-input v-model="cate.info.list_order"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button type="primary"
              :loading="cate.modal.confirmLoading"
              @click="onCreateConfirm('cate')"
            >提交</el-button>
            <el-button
              @click="onCloseCreateModal('cate')"
            >取消</el-button>
          </div>
        </el-dialog>

        <!-- 创建物品3D弹窗  -->
        <el-dialog
          :visible.sync="work.modal.tag"
          size="tiny" title="创建"
          :modal="false"
          @close="onCloseCreateModal('work')"
        >
          <el-form
            :model="work.info"
            ref="workInfo"
            :rules="work.rules"
            label-width="95px"
          >
            <el-form-item
              prop="title"
              label="项目名称"
            >
              <el-input v-model="work.info.title"></el-input>
            </el-form-item>
            <el-form-item label="所属分类" prop="source_rotate_category_id">
              <el-select v-model="work.info.source_rotate_category_id">
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
              <el-input v-model="work.info.remark"></el-input>
            </el-form-item>
            <el-form-item
              prop="list_order"
              label="排序"
            >
              <el-input v-model="work.info.list_order"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button type="primary"
              :loading="work.modal.confirmLoading"
              @click="onCreateConfirm('work')"
            >提交</el-button>
            <el-button
              @click="onCloseCreateModal('work')"
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

const defaultInfo = {
  cate: {
    name: '',
    list_order: 255,
  },
  work: {
    id: 0,
    title: '',
    list_order: 1,
    source_rotate_category_id: 1,
    remark: '',
  },
}

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
      cate: {
        editId: -1,
        modal: {
          tag: false,
          confirmLoading: false,
        },
        // info: {
        //   name: '',
        //   list_order: 255,
        // },
        info: defaultInfo.cate,
        rules: {
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
      },
      work: {
        editId: -1,
        modal: {
          tag: false,
          confirmLoading: false,
        },
        // info: {
        //   id: 0,
        //   title: '',
        //   list_order: 1,
        //   source_rotate_category_id: 1,
        //   remark: '',
        // },
        info: defaultInfo.work,
        rules: {
          title: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入物品名称',
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
    // 首字母大写
    firstUpperCase(str) {
      return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase())
    },
    // 打开弹窗
    onCreate(type) {
      this[type].modal.tag = true
    },
    // 关闭弹窗
    onCloseCreateModal(type) {
      this[type].modal.tag = false
      if (!this[type].modal.confirmLoading) {
        this[type].info = defaultInfo[type]
        this[type].editId = -1
        // if (this[type].editId > 0) {
        //   // 修改(要重置到默认状态)
        //   this[type].info = defaultInfo[type]
        //   this[type].editId = -1
        // } else {
        //   // 新增
        //   this.$refs[`${type}Info`].resetFields()
        // }
      }
    },
    // 重置弹窗
    resetCreateModal(type) {
      this[type].modal.confirmLoading = false
      this.onCloseCreateModal(type)
    },
    // 点击确认按钮去验证
    onCreateConfirm(type) {
      const upperType = this.firstUpperCase(type)
      this.$refs[`${type}Info`].validate((valid) => {
        if (valid) {
          this[type].modal.confirmLoading = true
          if (this[type].editId > 0) {
            // 修改
            this.submitCreate({
              type,
              ajax: Ajax[`update${upperType}`],
              data: { id: this[type].editId, info: this[type].info },
              success: () => {
                this.$emit(`edit${upperType}`, { ...this[type].info })
                this.$message({ type: 'success', message: '修改成功' })
              },
            })
          } else {
            // 新增
            this.submitCreate({
              type,
              ajax: Ajax[`create${upperType}`],
              data: this[type].info,
              success: (id) => {
                this.$emit(`create${upperType}`, { ...this[type].info, id })
                this.$message({ type: 'success', message: '创建成功' })
              },
            })
          }
        }
      })
    },
    // 验证成功并提交(新增/修改)
    submitCreate({ type, ajax, data, success }) {
      ajax(data)
        .then((id) => {
          success(id)
        })
        .catch((err) => {
          this.$message({ type: 'error', message: err.message })
        })
        .finally(() => {
          this.resetCreateModal(type)
        })
    },
    // 编辑作品
    onEditWork(workId) {
      const info = this.objList.data.find(obj => obj.id === workId)
      this.work.info = { ...info }
      this.onCreate('work')
      this.work.editId = workId
    },
    // 删除分类
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
  },

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
