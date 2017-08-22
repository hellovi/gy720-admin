<template>
  <div>
    <el-form class="publish-form" label-width="5em">
      <el-row>
        <el-col :span="7">
          <el-form-item label="作品名称">
            <el-input placeholder="请输入作品名称" v-model="form.pano_name"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="7" :offset="1">
          <el-form-item label="作品分类">
            <el-select v-model="form.cate_id" style="width: 100%;">
              <el-option value="">默认分类</el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="1">
          <el-form-item label="作品标签">
            <el-input placeholder="最多可选择3个标签"></el-input>
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
            <el-button class="btn-warning" @click="showDialog">从素材库选择全景图</el-button>
          </el-col>

          <el-col class="publish-panos__tip" :span="12">
            <a href="#"><i class="el-icon-information"></i>没有全景图？点我下载全景图、鱼眼图测试素材</a>
            <a href="#"><i class="el-icon-information"></i>全景图、鱼眼图尺寸及格式要求说明</a>
          </el-col>
        </el-row>

        <el-row class="publish-panos__content" :gutter="10">
          <el-col v-for="file in files" :key="file.id" :span="6">
            <div class="publish-panos__item" :class="{uploading: file.percent < 100 }">
              <img v-if="file.preview" :src="file.preview" :alt="file.name">
              <el-progress :text-inside="true" :stroke-width="14" :percentage="file.percent" v-if="file.percent < 100"></el-progress>
              <div class="publish-panos__item__footer">
                {{ file.name }}
                <i v-if="file.percent === 100" role="button" class="iconfont">&#xe615;</i>
              </div>
            </div>
          </el-col>
        </el-row>
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
import upload from './upload'

export default {
  mixins: [upload],

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
      timer: null,
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
    padding: 10px 0;
  }

  &__item {
    position: relative;
    margin-top: 10px;
    background-color: #bfbfbf;
    background-origin: content-box;
    overflow: hidden;

    &::before {
      content: "";
      float: left;
      margin-bottom: 50%;
    }

    &.uploading::after {
      content: "";
      position: absolute;
      top: 0;
      z-index: 1;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }

    & > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & > .el-progress {
      position: absolute;
      top: 50%;
      left: 0;
      z-index: 2;
      width: 100%;
      transform: translateY(-50%);

      .el-progress-bar__innerText {
        margin-top: -8px;
      }
    }

    &__footer {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 24px;
      padding: 0 0.2em;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 12px;
      line-height: 24px;

      & > .iconfont {
        float: right;
        cursor: pointer;
      }
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
