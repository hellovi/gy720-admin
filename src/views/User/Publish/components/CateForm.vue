<template>
  <el-form :model="form" :rules="rules" label-width="6em" ref="form">
    <app-form-alert label-width="6em" :contents="errors"></app-form-alert>

    <el-form-item label="分类名称" prop="name">
      <el-input v-model="form.name" placeholder="请填写分类名称(6个字符以内)" :maxlength="6"></el-input>
    </el-form-item>

    <el-form-item style="margin-bottom: 0;">
      <el-button type="primary" :loading="loading" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
/**
 * 发布 - 创建分类表单
 * @author luminghuai
 * @version 2017-08-30
 */

import { mapState } from 'vuex'
import { WORK } from '@/store/mutationTypes'

export default {
  name: 'publish-cate-form',

  props: {
    active: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      form: {
        name: '',
      },
      rules: {
        name: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' },
          { max: 6, message: '长度必须在6个字符内', trigger: 'blur' },
          {
            validator: (rule, value, next) => {
              if (this.cates.some(cate => cate.name === value)) {
                next(new Error('分类名称不能重复'))
              } else {
                next()
              }
            },
            trigger: 'blur',
          },
        ],
      },
      errors: {},
      loading: false,
    }
  },

  computed: {
    ...mapState({
      cates: state => state.work.cates,
    }),
  },

  watch: {
    active(val) {
      if (!val) {
        this.$refs.form.resetFields()
      }
    },
  },

  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          this.errors = {}
          this.$store.dispatch(WORK.CATE.ADD, this.form)
            .then((cate_id) => {
              this.form = { ...this.form, cate_id }
              this.$emit('close')
            })
            .catch((res) => { this.errors = res })
            .then(() => {
              this.loading = false
            })
        }
      })
    },
  },
}
</script>
