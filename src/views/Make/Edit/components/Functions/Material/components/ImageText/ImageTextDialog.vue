<template>
  <div class="image-text-dialog">
    <app-form-alert
      :contents="msgAlert"
    ></app-form-alert>
    <el-form
      :model="detail"
      :ref="formRef"
      :rules="rules"
    >
      <el-form-item prop="title">
        <el-input placeholder="请输入标题" v-model="detail.title"></el-input>
      </el-form-item>
      <el-form-item prop="content">
        <app-ueditor
          v-model="detail.content"
          @blur="ueditorBlur"
          style="min-height: 280px"
        ></app-ueditor>
      </el-form-item>
      <el-form-item>
        <el-row class="image-text-dialog__btn">
          <el-col :span="3">
            链接按钮
          </el-col>
          <el-col :span="3">
            <el-form-item prop="btn_show">
              <el-switch
                v-model="detail.btn_show"
                on-text="开"
                off-text="关"
                :on-value="20"
                :off-value="10"
              ></el-switch>
            </el-form-item>
          </el-col>
          <template v-if="!disabled">
            <el-col :span="3">
              按钮名称
            </el-col>
            <el-col :span="5">
              <el-form-item prop="btn_title">
                <el-input
                  placeholder="例如:点击购买"
                  v-model="detail.btn_title"
                  size="small"
                  @change="validChange('btn_title')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              链接地址
            </el-col>
            <el-col :span="7">
              <el-form-item prop="btn_url">
                <el-input
                  :placeholder="`例如:${configHost.origin}`"
                  v-model="detail.btn_url"
                  size="small"
                  @change="validChange('btn_url')"
                ></el-input>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form-item>
    </el-form>
    <el-row class="image-text-dialog__sub">
      <el-button type="primary" :loading="formLoading" @click="beforeSubmit">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-row>
  </div>
</template>

<script>
  import { Url } from '@/utils'

  const defInfo = {
    id: null,
    title: null,
    btn_title: null,
    btn_url: null,
    btn_show: 10,
    content: null,
    created_at: null,
  }

  export default {
    components: {
      AppUeditor: () => System.import('@/components/AppUeditor'),
    },
    props: {
      visible: {
        type: Boolean,
        default: true,
      },
      id: {
        type: Number,
        default: null,
      },
      type: {
        type: String,
        default: 'add',
      },
    },

    data: () => ({
      configHost: Url.configHost,
      detail: {
        ...defInfo,
      },
      msgAlert: {},
      formLoading: false,
      formRef: 'form',
      info: {},
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { type: 'string', max: 30, message: '标题不能超过30个字符', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { type: 'string', max: 300000, message: '内容不能超过300000个字符', trigger: 'blur' },
        ],
        btn_title: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { type: 'string', max: 10, message: '不能超出10个字符', trigger: 'blur' },
        ],
        btn_url: [
          { required: true, message: '请输入链接地址', trigger: 'blur' },
          { type: 'string', max: 300, message: '不能超出300个字符', trigger: 'blur' },
        ],
      },
    }),

    computed: {
      disabled() {
        return this.detail.btn_show === 10
      },
    },

    watch: {
      visible(val) {
        if (val) {
          this.open()
        } else {
          this.close()
        }
      },
    },

    methods: {
      // 监听指定字段值触发校验
      validChange(name) {
        this.$refs[this.formRef].validateField(name)
      },

      // 编辑时获取初始值
      getInfo() {
        this.$nextTick(() => {
          if (this.id) {
            this.$http.get(`/user/sourcearticle/${this.id}`)
              .then((res) => {
                this.info = { ...res.result }
                this.detail = { ...this.info }
              })
          }
        })
      },

      // 富文本编辑器事件监听
      ueditorBlur() {
        this.$refs[this.formRef].validateField('content')
      },

      // 重置表单为默认值
      resetFields() {
        this.show = false
        // 赋值默认值
        this.detail = { ...defInfo }
        this.info = {}
        this.$nextTick(() => {
          this.formLoading = false
          this.$refs[this.formRef].resetFields()
          this.$emit('close')
        })
      },

      // 重置表单为初始值
      resetForm() {
        if (this.type === 'edit') {
          this.detail = { ...this.info }
        } else {
          this.$refs[this.formRef].resetFields()
        }
      },

      // 表单提示前校验
      beforeSubmit() {
        this.$refs[this.formRef].validate((valid) => {
          if (valid) {
            this.msgAlert = {}
            this.formLoading = true
            if (this.detail.id) {
              return this.updateForm()
            }
            return this.submitForm()
          }
          return false
        })
      },

      // 表单提交-新增
      submitForm() {
        this.$http.post('/user/sourcearticle', this.detail)
          .then(() => {
            this.$message.success('新增成功！')
            this.$emit('update')
            this.resetFields()
          })
          .catch((errors) => {
            this.errorHandler(errors)
          })
      },

      // 表单提交-更新
      updateForm() {
        this.$http.put(`/user/sourcearticle/${this.detail.id}`, this.detail)
          .then(() => {
            this.$message.success('更新成功！')
            this.$emit('update')
            this.resetFields()
          })
          .catch((errors) => {
            this.errorHandler(errors)
          })
      },

      // 表单报错处理
      errorHandler(errors) {
        this.msgAlert = errors
        this.formLoading = false
      },

      // 打开
      open() {
        this.getInfo()
        this.$emit('open')
      },

      // 关闭
      close() {
        this.resetFields()
        this.$emit('close')
      },

    },

    mounted() {
      this.open()
    },
  }
</script>

<style lang="postcss">
  .image-text-dialog{
    .el-form-item__content {
      line-height: inherit;
    }
    .is-error {
      .edui-editor {
        border-color: #ff4949;
      }
    }
    &__btn {
      line-height: 30px;
      .el-input {
        padding-right: 8px;
      }
    }
    &__sub {
      text-align: center;
      .el-button {
        width: 100px;
      }
    }
  }
</style>
