<template>
  <aside class="rotate-manage__aside">
    <el-button type="primary" @click="$emit('create-rotate')">创建物品3D</el-button>

    <a class="hover-primary rotate-manage__aside__add" @click="createCate">+创建新分类</a>

    <ul class="list">
      <li
        class="rotate-cate-item"
        :class="{active: activeCateId === ''}"
        @click.stop="selectCate('')"
      >
        3D物品
      </li>
      <li
        v-for="cate in cates"
        :key="cate.id"
        class="rotate-cate-item"
        :class="{active: cate.id === activeCateId}"
        @click.stop="selectCate(cate.id)"
      >
        <i class="iconfont" @click.stop="removeCate(cate.id)">&#xe615;</i>
        <i class="iconfont" @click.stop="upateCate(cate.id)">&#xe608;</i>
        {{ cate.name }}
      </li>
    </ul>

    <!-- 创建分类弹窗  -->
    <el-dialog title="创建作品分类" :visible.sync="dialog" :modal="false" size="tiny" style="text-align: left;">
      <el-form :model="form" :rules="rules" ref="form" label-width="95px">
        <el-form-item prop="name" label="分类名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <!-- <el-form-item prop="list_order" label="分类排序">
          <el-input v-model.number="form.list_order"></el-input>
        </el-form-item> -->
      </el-form>

      <div slot="footer">
        <el-button
          type="primary"
          :loading="loading"
          @click="submit"
        >提交</el-button>
        <el-button @click="dialog = false">取消</el-button>
      </div>
    </el-dialog>
  </aside>
</template>

<script>
/**
 * 管理3D物品 - 侧边栏
 * @author yangjun | luminghuai
 * @version 2017-08-31
 */

import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'

const defaultForm = {
  name: '',
  list_order: 20,
}

export default {
  name: 'rotate-aside',

  data() {
    return {
      dialog: false,

      form: { ...defaultForm },

      rules: {
        name: [
          { required: true, trigger: 'blur', message: '请输入分类名称' },
          { pattern: /^\S{3,6}$/, trigger: 'blur', message: '名称长度应在3到6个字符之间' },
        ],
        // list_order: [
        //   { type: 'number', required: true, trigger: 'blur', message: '请输入分类排序' },
        // ],
      },

      loading: false,
    }
  },

  computed: {
    ...mapState({
      cates: state => state.edit.material.rotateCates,
      activeCateId: state => state.edit.material.activeRotateCateId,
    }),
  },

  watch: {
    dialog(val) {
      if (!val) {
        this.form = { ...defaultForm }
      }
    },
  },

  methods: {
    /**
     * 打开创建分类弹窗
     */
    createCate() {
      this.dialog = true
    },

    /**
     * 更新某个分类
     * @param {number} - 分类id
     */
    upateCate(id) {
      this.form = { ...this.form, ...this.cates.find(cate => cate.id === id) }
      this.dialog = true
    },

    /**
     * 选择分类
     * @param {number} id - 分类id
     */
    selectCate(id) {
      this.$store.commit(EDIT.ROTATE.CATE.SELECT, id)
    },

    /**
     * 删除某个分类
     * @param {number} - 分类id
     */
    removeCate(id) {
      this.$confirm('确定要删除该项目么？删除后不可以恢复。', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .catch(() => {})
        .then(() => this.$store.dispatch(EDIT.ROTATE.CATE.REMOVE, id))
        .then(() => {
          this.$message.success('操作成功')
        })
        .catch(({ status: { reason } }) => {
          this.$message.error(reason)
        })
    },

    /**
     * 创建新的分类
     */
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.form.id) {
            this.update(this.form.id)
          } else {
            this.create()
          }
        }
      })
    },

    create() {
      this.$store.dispatch(EDIT.ROTATE.CATE.CREATE, this.form)
        .then(() => this.success())
    },

    update() {
      this.$store.dispatch(EDIT.ROTATE.CATE.UPDATE, this.form)
        .then(() => this.success())
    },

    success() {
      this.loading = false
      this.dialog = false
      this.$message.success('操作成功')
    },
  },


}
</script>
<style lang="postcss">
@import 'vars.css';

:root {
  --row-height: 40px;
  --active-point-width: 8px;
}

.rotate-manage__aside__add {
  display: block;
  margin-top: 20px;
}

.rotate-manage__aside__add,
.rotate-cate-item {
  position: relative;
  height: var(--row-height);
  padding: 0 10px 0 20px;
  border-bottom: 1px solid var(--gray-extra-light);
  line-height: calc(var(--row-height) - 1px);
  text-align: right;
  cursor: pointer;

  & > .iconfont {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    display: none;
    color: var(--color-warning);
    font-size: 13px;

    &:first-child {
      margin-left: 1.4em;
    }
  }

  &.active::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 5px;
    width: var(--active-point-width);
    height: var(--active-point-width);
    border-radius: 50%;
    margin-top: calc(var(--active-point-width) / -2);
    background-color: var(--color-primary);
  }

  &:not(.active):not(:first-child):hover {
    & > .iconfont {
      display: block;
    }
  }
}
</style>
