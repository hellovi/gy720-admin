<template>
  <el-row>
    <el-col :span="7">
      <el-form-item label="作品名称" prop="name">
        <el-input placeholder="请输入作品名称" v-model="form.name"></el-input>
      </el-form-item>
    </el-col>

    <el-col :span="7" :offset="1">
      <el-form-item label="作品分类" prop="pano_category_id">
        <el-select v-model="form.pano_category_id" style="width: 100%;">
          <el-option v-for="cate in cates" :key="cate.id" :value="cate.id" :label="cate.name"></el-option>
          <el-option value="+" label="+创建分类"></el-option>
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="8" :offset="1">
      <el-form-item label="作品标签" prop="tag_ids">
        <el-select v-model="form.tag_ids" placeholder="最多可选择3个标签" multiple :multiple-limit="3" style="width: 100%;">
          <el-option v-for="tag in tags" :key="tag.id" :value="tag.id" :label="tag.name"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState({
      cates: state => state.work.cates,
      tags: state => state.work.tags,
    }),
  },
}
</script>
