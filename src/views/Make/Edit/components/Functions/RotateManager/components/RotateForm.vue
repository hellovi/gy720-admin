<template>
  <el-form :model="form" :rules="rules" ref="form" label-width="95px">
    <el-form-item prop="title" label="项目名称">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="所属分类">
      <el-select v-model="form.source_rotate_category_id">
        <el-option
          v-for="cate in cates"
          :key="cate.id"
          :label="cate.name"
          :value="cate.id"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="remark" label="项目简介">
      <el-input type="textarea" :rows="3" v-model="form.remark"></el-input>
    </el-form-item>

    <el-form-item prop="list_order" label="排序">
      <el-input v-model.number="form.list_order"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loading"  @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'

const defaultForm = {
  id: 0,
  title: '',
  list_order: 1,
  source_rotate_category_id: 1,
  remark: '',
}

export default {
  name: 'rotate-form',

  props: {
    active: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      form: { ...defaultForm, ...this.item },
      rules: {
        title: [
          { required: true, trigger: 'blur', message: '物品名称不能为空' },
          { pattern: /^\S{1,30}$/, trigger: 'blur', message: '名称长度应在1到30个字符之间' },
        ],
        remark: [
          { required: true, trigger: 'blur', message: '项目简介不能为空' },
        ],
        list_order: [
          { required: true, type: 'number', trigger: 'blur', message: '分类排序不能为空' },
          { type: 'number', trigger: 'blur', message: '分类排序为数字' },
        ],
      },

      loading: false,
    }
  },

  computed: {
    ...mapState({
      cates: state => state.edit.material.rotateCates,
    }),
  },

  watch: {
    active(val) {
      if (!val) {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
        })
      }
    },
    item(val) {
      if (Object.keys(val).length) this.form = { ...val }
    },
  },

  methods: {
    /**
     * 提交表单
     * 根据有无id判断是创建还是修改
     */
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true

          if (this.form.id) {
            this.update()
          } else {
            this.create()
          }
        }
      })
    },

    /**
     * 修改某项物品3D
     */
    update() {
      this.$store.dispatch(EDIT.ROTATE.UPDATE, this.form)
        .then(this.success)
    },

    /**
     * 创建新的物品3D
     */
    create() {
      this.$store.dispatch(EDIT.ROTATE.CREATE, this.form)
        .then(this.success)
    },

    success() {
      this.loading = false
      this.$message.success('操作成功')
      this.$emit('done', this.form)
    },
  },
}
</script>
