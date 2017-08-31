<template>
  <aside class="object-manage__aside">
    <el-button type="primary" @click="$emit('open-create-object-dialog')">创建物品3D</el-button>

    <a class="hover-primary object-manage__aside__add" @click="openDialog">+创建新分类</a>

    <ul class="list">
      </v-cate-item>
      <li v-for="cate in cates" :key="cate.id" class="object-cate-item" :class="{active: cate.id === choosedCateId}" @click.stop="onChooseCate">
        <i class="iconfont" @click.stop="removeCate(cate.id)">&#xe615;</i>
        {{ cate.name }}
      </li>
    </ul>

    <!-- 创建分类弹窗  -->
    <el-dialog
      title="创建作品分类"
      :visible.sync="dialog"
      :modal="false"
      size="tiny"
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="95px">
        <el-form-item prop="name" label="分类名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item prop="list_order" label="分类排序">
          <el-input v-model="form.list_order"></el-input>
        </el-form-item>
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
 * 物品3D - 侧边栏
 * @author yangjun
 */

export default {
  name: 'manage3d-cate-item',

  props: {
    cates: {
      type: Array,
      required: true,
    },
    choosedCateId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      dialog: false,

      form: {
        name: '',
        list_order: 255,
      },
      rules: {
        name: [
          { required: true, trigger: 'blur', message: '请输入分类名称' },
          { pattern: /^\S{3,6}$/, trigger: 'blur', message: '名称长度应在3到6个字符之间' },
        ],
        list_order: [
          { type: 'number', required: true, trigger: 'blur', message: '请输入分类排序' },
        ],
      },
      loading: false,
    }
  },

  methods: {
    onChooseCate() {
      this.$emit('choose-cate', this.item.id)
    },

    removeCate(id) {
      this.$confirm('确定要删除该项目么？删除后不可以恢复。', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => this.confirmRemove(id))
    },

    confirmRemove(id) {
      // 成功后要删除本地对应数据
      this.$http.delete(`/user/sourcerotatecategory/${id}`)
        .then(() => {
          this.$message.success('操作成功')
        })
    },

    openDialog() {
      this.dialog = true
    },

    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          // 这里判断是创建还是修改，然后调用相应方法
          this.createCate()
        }
      })
    },

    createCate() {
      this.$http.post('/user/sourcerotatecategory', this.form)
        .then(() => {
          this.loading = false
          this.dialog = false
          this.$emit('add-cate', this.form)
        })
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

.object-manage__aside__add {
  display: block;
  margin-top: 20px;
}

.object-manage__aside__add,
.object-cate-item {
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
