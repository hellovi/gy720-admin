<template>
  <div class="edit-functions__addspotsec">

    <el-form ref="spotForm" :rules="rules" :model="form" label-width="80px">
      <!--名称图标固定显示-->
      <el-form-item label="热点名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入热点名称"></el-input>
      </el-form-item>

      <!-- <el-form-item label="热点图标" prop="icon.id"
       :rules="[ { required: true, message: '请输入热点名称', trigger: 'blur' }]"> -->
      <el-form-item label="热点图标" prop="icon">
        <el-button type="primary" size="small">选择</el-button>
      </el-form-item>

      <el-form-item label="链接场景" v-if="type === 1" prop="scene">
        <el-button type="primary" size="small">选择</el-button>
        <!--下面区域-->
      </el-form-item>

      <el-form-item label="链接地址" v-if="type === 3">
        <el-input v-model="form.url" placeholder="http://"></el-input>
      </el-form-item>

      <el-form-item  :label="label[type]" v-if="[6, 5, 8].indexOf(type) >= 0">
        <el-button type="primary" size="small">选择</el-button>
      </el-form-item>

      <el-form-item>
        <el-button  @click="switchStep(1)">上一步</el-button>
        <el-button type="primary" @click="submitForm('spotForm')">确定</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
/**
 * 高级编辑 - hotspots
 * @author yj
 * @version 2017-08-14
 */


export default {
  name: 'edit-functions__addSpotSec',

  props: {
    type: Number,
    default: 1,
  },

  data() {
    return {
      label: {
        6: '图文信息',
        5: '物品3D',
        8: '多媒体',
      },

      form: {
        name: '',
        url: '',
        icon: { id: '', name: '', url: '' },
        scene: {},
      },

      rules: {
        name: [
          { required: true, message: '请输入热点名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' },
        ],
        icon: [
          {
            type: 'object',
            required: true,
            fields: {
              id: { required: true, message: '请选择热点图标', trigger: 'blur' },
            },
          },
        ],
        scene: [
          { type: 'object', required: true, message: '请选择链接场景', trigger: 'blur' },
        ],
      },
    }
  },

  methods: {
    switchStep(step) {
      this.$emit('switchStep', step)
    },

    submitForm(formName) {
      // eslint-disable-next-line
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
