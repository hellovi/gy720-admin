<template>
  <div>
    <el-form class="publish-form" label-width="5em">
      <el-row>
        <el-col span="7">
          <el-form-item label="作品名称">
            <el-input placeholder="请输入作品名称" v-model="form.pano_name"></el-input>
          </el-form-item>
        </el-col>

        <el-col span="7" :offset="1">
          <el-form-item label="作品分类">
            <el-select v-model="form.cate_id" style="width: 100%;">
              <el-option value="">默认分类</el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col span="8" :offset="1">
          <el-form-item label="作品标签">
            <el-input placeholder="最多可选择3个标签"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="publish-panos">
        <el-row class="publish-panos__header">
          <el-col class="publish-panos__upload" :span="8">
            <span class="text-primary">本地上传</span>
            <el-button class="btn-primary">上传2:1全景图</el-button>
            <el-button class="btn-primary">上传4张鱼眼图</el-button>
          </el-col>
          <el-col class="publish-panos__select" :span="4">
            <el-button class="btn-warning" @click="showDialog">从素材库选择全景图</el-button>
          </el-col>

          <el-col class="publish-panos__tip" :span="12">
            <a href="#"><i class="el-icon-information"></i>没有全景图？点我下载全景图、鱼眼图测试素材</a>
            <a href="#"><i class="el-icon-information"></i>全景图、鱼眼图尺寸及格式要求说明</a>
          </el-col>
        </el-row>

        <div class="publish-panos__content"></div>
      </div>

      <el-form-item class="publish-form__submit">
        <el-button type="primary">发布</el-button>
      </el-form-item>
    </el-form>

    <!-- 素材库弹出  -->
    <el-dialog title="素材库" :visible.sync="dialog" custom-class="material-panos">
      <pano-material></pano-material>
      <div class="material-panos__submit">
        <el-button type="primary">下一步</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PanoMaterial from './components/PanoMaterial'

export default {
  components: {
    PanoMaterial,
  },

  data() {
    return {
      form: {
        pano_name: '',
        cate_id: '',
      },
      dialog: false,
    }
  },

  methods: {
    showDialog() {
      this.dialog = true
    },
  },
}
</script>


<style lang="postcss">
@import "vars.css";

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
    min-height: 580px;
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
