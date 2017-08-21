<template>
   <div class="edit-functions__material--data">
     <el-row :gutter="10">
        <el-col :span="4" v-for="(item, index) in dataList" :key="index">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.file_path" class="edit-functions__material__image"/>
            <div>
              <div class="bottom clearfix">
                <span>{{ item.title }}</span>
                <el-button
                  type="text" class="button"
                  v-show="selectStatus"
                  @click="selectMater(index, item.id, item.file_path)">
                  选择
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
     </el-row>
   </div>
</template>

<script>
/**
 * 高级编辑 - 图片素材
 * @version 2017-08-21
 */
import { mapState } from 'vuex'

export default {
  name: 'edit-functions__material--images',

  props: {
    type: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {

    }
  },

  computed: {
    ...mapState({
      selectStatus: state => state.edit.material.materialState.selectStatus,
    }),

    dataList() {
      return this.$store.state.edit.material.materialData[this.type]
    },
  },

  methods: {
    selectMater(index, id, url) {
      // 微信设置
      this.$store.dispatch('edit/material/select', { id, url })
      this.$store.dispatch('edit/material/destroy')
    },
  },
}
</script>

<style lang="postcss">
.edit-functions__material {

  &--data {
    .el-card {
      text-align: center;
      padding-top: 10px;
    }

    .bottom {
      & >span {
        font-size:12px;
      }
    }
  }

  &__image {
    max-height: 40px;
  }
}
</style>
