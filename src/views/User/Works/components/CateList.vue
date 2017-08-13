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
      :visible.sync="cateCreateModal.tag"
      @close="closeCateCreateModal"
      size="tiny" title="创建作品分类"
    >
      <el-form
        :model="cateCreateInfo"
        ref="cateCreateInfo"
        :rules="cateCreateRules"
        label-width="95px"
      >
        <el-form-item
          prop="name"
          label="新分类名称"
        >
          <el-input v-model="cateCreateInfo.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary"
          :loading="cateCreateModal.confirmLoading"
          @click="confirmCateCreate()"
        >提交</el-button>
        <el-button
          @click="closeCateCreateModal()"
        >取消</el-button>
      </div>
    </el-dialog>

    <!-- 删除分类的提醒弹窗 -->
    <el-dialog
      class="works-catelist__delete"
      :visible.sync="cateDeleteModal.tag"
      size="tiny"
      title="确认删除"
    >
      <p>是否确定要删除？删除后，不可以恢复!</p>
      <div slot="footer">
        <el-button type="primary"
          :loading="cateDeleteModal.confirmLoading"
          @click="confirmCateDelete()"
        >确认</el-button>
        <el-button
          @click="closeCateDeleteModal()"
        >取消</el-button>
      </div>
    </el-dialog>
  </aside>
</template>

<script>
/**
 * 个人作品 - 作品分类列表
 *
 * @author hjz
 */
import Request from '../module/request'
import vCateItem from './CateItem'

export default {
  name: 'works-cate-list',

  components: { vCateItem },

  props: {
    catelist: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    choosedCateId: null,
    cateCreateModal: {
      tag: false,
      confirmLoading: false,
    },
    cateCreateInfo: {
      name: '',
    },
    // 表单验证
    cateCreateRules: {
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
    deletedCateId: null,
    cateDeleteModal: {
      tag: false,
      confirmLoading: false,
    },
  }),

  methods: {
    // 目前没有规范 "默认列表分类id" = 1
    // 规范后该组件需要在created钩子中请求默认列表
    onChooseCate(cateId) {
      this.choosedCateId = cateId
      this.$router.push({
        query: { cate_id: cateId },
      })
    },
    onCreateCate() {
      this.cateCreateModal.tag = true
    },
    closeCateCreateModal() {
      this.cateCreateModal.tag = false
      this.$refs.cateCreateInfo.resetFields()
    },
    confirmCateCreate() {
      this.$refs.cateCreateInfo.validate((valid) => {
        if (valid) {
          this.cateCreateModal.confirmLoading = true
          this.submitCateCreate()
        }
      })
    },
    submitCateCreate() {
      Request.createCate(this.cateCreateInfo)
        .then((id) => {
          const cate_name = this.cateCreateInfo.name
          this.$emit('createCate', { id, cate_name })
          this.closeCateCreateModal()
          this.cateCreateModal.confirmLoading = false
        })
    },
    onDeleteCate(cateId) {
      this.deletedCateId = cateId
      this.cateDeleteModal.tag = true
    },
    closeCateDeleteModal() {
      this.cateDeleteModal.tag = false
    },
    confirmCateDelete() {
      this.cateDeleteModal.confirmLoading = true
      Request.deleteCate(this.deletedCateId)
        .then(() => {
          this.$emit('deleteCate', this.deletedCateId)
          this.cateDeleteModal.confirmLoading = false
          this.closeCateDeleteModal()
        })
    },
  },

  created() {
    const cate_id = this.$route.query.cate_id
    this.choosedCateId = cate_id || Request.defaultCateId
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

    & .el-dialog--tiny {
      width: 20%;
    }
  }

  &__delete {
  /* elementUI样式重置  */
    & .el-dialog--tiny {
      width: 20%;
    }
  }
}
</style>
