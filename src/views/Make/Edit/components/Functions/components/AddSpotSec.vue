<template>
  <div class="edit-functions__addspotsec">

    <el-form ref="form" :model="form" label-width="80px">
      <!--名称图标固定显示-->
      <el-form-item label="热点名称">
        <el-input v-model="form.name" placeholder="请输入热点名称"></el-input>
      </el-form-item>

      <el-form-item label="热点图标">
        <el-button type="primary" size="small">选择</el-button>
      </el-form-item>

      <el-form-item label="链接场景" v-if="type === 1">
        <el-button type="primary" size="small">选择</el-button>
        <!--下面区域-->
      </el-form-item>

      <el-form-item label="链接地址" v-if="type === 3">
        <el-input v-model="form.name" placeholder="http://"></el-input>
      </el-form-item>

      <el-form-item  :label="label[type]" v-if="[6, 5, 8].indexOf(type) >= 0">
        <el-button type="primary" size="small">选择</el-button>
      </el-form-item>

      <el-form-item>
        <el-button  @click="switchStep(2)">上一步</el-button>
        <el-button type="primary">确定</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
/**
 * 高级编辑 - hotspots
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
      },
    }
  },

  methods: {
    switchStep(step) {
      this.$emit('switchStep', step)
    },
  },
}
</script>
