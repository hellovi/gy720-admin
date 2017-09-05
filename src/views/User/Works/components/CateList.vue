<template>
  <aside class="works-catelist">
    <h4 class="works-catelist__title">作品分类</h4>

    <div class="works-catelist__list">
      <a class="works-catelist__item hover-primary"
        @click="onCreateCate"
      >
        +创建新分类
      </a>
      <!-- 分类列表 -->
      <v-cate-item
        class="works-catelist__item"
        v-for="cate in catelist" :key="cate.id"
        :item="cate"
        :active="cate.id === choosedCateId"
        @deleteCate="onDeleteCate"
        @chooseCate="onChooseCate"
      >
      </v-cate-item>
    </div>

    <!-- 创建分类弹窗  -->
    <el-dialog
      class="works-catelist__create"
      :visible.sync="createCateModal.tag"
      size="tiny" title="创建作品分类"
      @close="onCloseCreateCateModal"
    >
      <!-- 错误回显 -->
      <app-form-alert
        :contents="createCateModal.errorReasons"
      ></app-form-alert>
      <el-form
        :model="createCateInfo"
        ref="createCateInfo"
        :rules="createCateRules"
        label-width="95px"
      >
        <el-form-item
          prop="name"
          label="新分类名称"
        >
          <el-input v-model="createCateInfo.name"></el-input>
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
  </aside>
</template>

<script>
/**
 * 我的作品 - 作品分类列表
 *
 * @author huojinzhao
 */

import deleteItem from '@/mixins/deleteItem'

import Ajax from '../module/ajax'
import vCateItem from './CateItem'

export default {
  name: 'works-cate-list',

  mixins: [deleteItem],

  components: { vCateItem },

  props: {
    catelist: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    choosedCateId: null,

    createCateModal: {
      tag: false,
      confirmLoading: false,
      errorReasons: {},
    },

    createCateInfo: {
      name: '',
    },

    // 新增分类表单验证
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
    },
  }),

  methods: {
    onChooseCate(cateId) {
      this.choosedCateId = cateId
      this.$router.push({
        query: { cate_id: cateId },
      })
    },

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
          this.createCateModal.errorReasons = err
        })
        .finally(() => {
          this.resetCreateCateModal()
        })
    },

    onDeleteCate(cateId) {
      const h = this.$createElement

      const message = h(
        'div',
        [
          h('p', '若分类下有作品，不可以直接删除'),
          h('p', '此操作将永久删除该分类，是否继续？'),
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

  created() {
    const cate_id = this.$route.query.cate_id
    this.choosedCateId = parseInt(cate_id, 10) || Ajax.defaultCateId
  },
}
</script>

<style>
@import 'vars.css';

.works-catelist {
  float: left;
  width: 120px;
  font-size: 14px;

  &__title {
    margin: 10px 0;
    padding: 4px 12px 8px;
    border-bottom: 1px solid var(--border-color-split);
    text-align: right;
    font-size: 18px;
    font-weight: normal;
  }

  &__list {
    text-align: right;
  }

  &__item {
    display: block;
    padding: 10px 12px 10px 16px;
    border-bottom: 1px dotted var(--border-color-split);
    line-height: 19px;
    cursor: pointer;
  }

  &__create {
  /* elementUI样式重置  */
    & .el-dialog__body {
      padding-bottom: 0;
    }
  }
}
</style>
