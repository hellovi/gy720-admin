<template>
  <div class="publish-wrapper">
    <el-form
      :model="form"
      :rules="rules"
      class="publish-form"
      label-width="6em"
      ref="form"
      @submit.native.prevent="publish"
    >
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

      <div class="publish-panos">
        <el-row class="publish-panos__header">
          <el-col class="publish-panos__upload" :span="8">
            <span class="text-primary">本地上传</span>
            <div class="el-button btn-primary" id="normal">上传2:1全景图</div>
            <div class="el-button btn-primary" id="fisheye">上传4张鱼眼图</div>
          </el-col>
          <el-col class="publish-panos__select" :span="4">
            <el-button class="btn-warning" @click="openMaterial">从素材库选择全景图</el-button>
          </el-col>

          <el-col class="publish-panos__tip" :span="12">
            <a href="http://www-statics.gy720.com/data/%E5%85%89%E9%B1%BC%E5%85%A8%E6%99%AF%E6%B5%8B%E8%AF%95%E7%B4%A0%E6%9D%90.zip">
              <i class="el-icon-information"></i>没有全景图？点我下载全景图、鱼眼图测试素材
            </a>
            <a href="#" @click.prevent="active.explanation = true"><i class="el-icon-information"></i>全景图、鱼眼图尺寸及格式要求说明</a>
          </el-col>
        </el-row>

        <el-row class="publish-panos__content" :gutter="10">
          <el-col v-for="file in files" :key="file.id" :span="6">
            <publish-item :file="file" @remove-pano="removePano"></publish-item>
          </el-col>
          <div v-if="!files.length" class="publish-panos__content__tip">请上传或从素材库中选择场景图...</div>
        </el-row>
      </div>

      <el-form-item class="publish-form__submit">
        <el-button type="primary" native-type="submit">发布</el-button>
      </el-form-item>
    </el-form>

    <!-- 要求说明 -->
    <el-dialog title="全景图、鱼眼图尺寸及格式要求说明" :visible.sync="active.explanation">
      <explanation></explanation>
    </el-dialog>

    <!-- 创建分类弹出 -->
    <el-dialog title="创建作品分类" :visible.sync="active.newCate" size="tiny">
      <el-form :model="cateForm" :rules="cateRules" label-width="6em" ref="cateForm" @submit.native.prevent="createNewCate">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="cateForm.name" placeholder="请填写分类名称(6个字符以内)" :maxlength="6"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;">
          <el-button type="primary" native-type="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 素材库弹出  -->
    <el-dialog title="素材库" :visible.sync="active.material" custom-class="material-panos">
      <pano-material :next="true" @select-panos="selectPanos"></pano-material>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 发布作品
 * @author luminghuai
 * @version 2017-08-22
 * @description 缩略图还未指定为小尺寸
 */

import { mapState } from 'vuex'
import { WORK } from '@/store/mutationTypes'
import Explanation from './components/Explanation'
import PanoMaterial from './components/PanoMaterial'
import PublishItem from './components/PublishItem'
import upload from './mixins/upload'

export default {
  mixins: [upload],

  components: {
    Explanation,
    PanoMaterial,
    PublishItem,
  },

  data() {
    return {
      // 发布表单
      form: {
        name: '',
        pano_category_id: '',
        tag_ids: [],
      },
      rules: {
        name: [
          { required: true, message: '作品名称不能为空', trigger: 'blur' },
        ],
        pano_category_id: [
          { type: 'number', required: true, message: '作品分类不能为空', trigger: 'blur' },
        ],
        tag_ids: [
          { type: 'array', required: true, message: '作品标签不能为空', trigger: 'blur' },
        ],
      },

      // 创建分类表单
      cateForm: {
        name: '',
      },
      cateRules: {
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

      timer: null, // 存放检查切图进度的定时器
      active: {
        explanation: false,
        newCate: false,
        material: false,
      },
    }
  },

  computed: {
    ...mapState({
      cates: state => state.work.cates,
      tags: state => state.work.tags,
    }),
  },

  watch: {
    'form.pano_category_id': function formCateId(val) {
      if (val === '+') {
        this.active.newCate = true
        this.form = { ...this.form, pano_category_id: '' }
      }
    },

    'active.newCate': function activeNewCate(val) {
      if (!val) {
        this.$refs.cateForm.resetFields()
      }
    },
  },

  methods: {
    createNewCate() {
      this.$refs.cateForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(WORK.CATE.ADD, this.cateForm)
            .then((cate_id) => {
              this.form = { ...this.form, cate_id }
              this.active.newCate = false
            })
            .catch(error => this.$message.error(error.message))
        }
      })
    },

    // 从素材库选中场景
    selectPanos(panos) {
      this.active.material = false
      const files = panos
        // 过滤掉已选中过的，避免场景重复
        .filter(pano => !this.files.some(file => file.id === pano.id))
        .map(pano => ({
          ...pano,
          source_scene_id: pano.id,
          preview: this.$url.host(pano.preview_image),
          vtour: true,
        }))
      this.files = [...this.files, ...files]
    },

    // 删除已添加的场景素材
    removePano(id) {
      this.files = this.files.filter(file => file.id !== id)
    },

    publish() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.files.length < 1) {
            this.$message.error('请选择场景素材')
          } else {
            const data = {
              ...this.form,
              thumb: this.files[0].preview,
              scenes: this.files.map(({ source_scene_id, name }) => ({ source_scene_id, name })),
            }
            this.$http.post('/user/pano', data)
              .then(({ result }) => {
                this.$router.push(`/make-client/edit?pano_id=${result.hash_pano_id}`)
              })
              .catch(error => this.$message.error(error.message))
          }
        }
      })
    },

    openMaterial() {
      this.active.material = true
    },
  },

  created() {
    this.$store.dispatch(WORK.CATE.INIT)
    this.$store.dispatch(WORK.TAG.INIT)
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.publish-wrapper {
  margin-top: 30px;
}

.publish-form {
  width: 1170px;
  padding: 30px 35px;
  margin: auto;
  background-color: #fff;

  &__submit {
    margin-top: 30px;
    margin-bottom: 0;
    text-align: center;

    .el-button {
      width: 8em;
    }
  }
}

.publish-panos {
  padding: 12px;
  border: var(--border);

  &__header {
    padding-bottom: 12px;
    border-bottom: 1px dashed var(--border-color);
  }

  &__upload {
    & > .text-primary {
      margin-right: 0.4em;
    }
  }

  &__tip {
    margin-top: 9px;
    text-align: right;

    & > a {
      font-size: 12px;
      color: var(--gray-light);
      margin-left: 1em;

      &:hover {
        color: var(--color-primary);

        & > .el-icon-information {
          color: var(--color-primary);
        }
      }

      & > .el-icon-information {
        margin-right: 0.5em;
        color: var(--gray);
        font-size: 14px;
      }
    }
  }

  &__content {
    position: relative;
    min-height: 580px;
    padding: 10px 0;

    &__tip {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--gray);
    }
  }
}

.material-panos {
  width: 1190px;

  .material-panos__submit {
    margin-top: 30px;
    text-align: center;

    .el-button {
      width: 8em;
    }
  }
}
</style>
