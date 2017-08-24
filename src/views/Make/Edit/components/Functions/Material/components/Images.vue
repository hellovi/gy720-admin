<template>
   <div class="edit-functions__material__data">
     <el-row :gutter="10">
        <el-col :span="4" v-for="(item, index) in dataList" :key="index">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="$url.static(item.file_path)" class="edit-functions__material__image"/>
            <div>
              <div class="bottom clearfix">
                 <h6>{{ item.title }}</h6>
                <el-button
                  type="text" class="button"
                  v-show="selectStatus"
                  @click="selectMater(item.id, item.file_path)">
                  选择
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
     </el-row>
     <section class="edit-functions__material__upload">
      <app-file-upload
        v-model="src"
        ref="fileUpload"
        accept="jpg,jpeg,png"
        size="1mb"
      >
          <el-button type="primary" size="small">上传新素材</el-button>
       </app-file-upload>
       <span>支持的文件格式：jpg,jpeg,png,gif,mp3 文件大小：15M以内</span>
     </section>
   </div>
</template>

<script>
/**
 * 高级编辑 - 图片素材
 * @version 2017-08-21
 */
import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import AppFileUpload from './AppFileUpload'

export default {
  name: 'edit-functions__material--images',

  components: { AppFileUpload },

  props: {
    currentId: {
      type: Number,
      default: 1,
    },
    normalMaterial: {
      type: Array,
    },
  },

  data() {
    return {
      src: '',
    }
  },

  computed: {
    ...mapState({
      type: state => state.edit.material.type,
      selectStatus: state => state.edit.material.selectStatus,
    }),

    dataList() {
      return this.$store.state.edit.material.materialData[this.type].data
    },

    params() {
      return `?tag_id=${this.currentId}`
    },
  },

  watch: {
    src(val) {
      // 添加素材,要改成监听process触发
      this.addMaterial(val)
    },
  },

  methods: {
    selectMater(id, url) {
      // 微信设置以及导览图
      this.$store.commit(EDIT.MATERIAL.SELECT, { id, url })
    },

    addMaterial(qiniu_key) {
      const data = {
        title: '文件名',
        tag_id: this.currentId,
        qiniu_key,
        file_size: 1000,
      }
      this.$store.dispatch(EDIT.MATERIAL.ADD, data)
    },

    initMaterial(page) {
      const params = page ? `${this.params}&page=${page}` : this.params
      this.$store.dispatch(EDIT.MATERIAL.INIT.NORMALS, params)
    },
  },

  created() {
    this.initMaterial(1)
  },

}
</script>

<style lang="postcss">
@import "vars.css";
.edit-functions__material {
  &__data {
    .el-card {
      text-align: center;
      padding-top: 10px;
    }

    .bottom {
      position: relative;

      & > h6 {
        font-size: 12px;
        margin: 10px auto 10px;
      }
    }
  }

  &__image {
    max-height: 40px;
  }

  &__upload {
    margin-top: 20px;

    .el-button {
      margin-right: 10px;
    }

    & > span {
      color: var(--gray);
    }
  }
}
</style>
