<template>
   <div class="edit-functions__material--data">
     <el-row :gutter="10">
        <el-col :span="4" v-for="(item, index) in activeItemData" :key="index">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.file_path" class="edit-functions__material__image"/>
            <div>
              <div class="bottom clearfix">
                <span>{{ item.title }}</span>
                <el-button type="text" class="button">选择</el-button>
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

  data() {
    return {

    }
  },

  computed: {
    ...mapState({
      activeItemData: state => state.edit.material.activeItemData,
    }),
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
  }

  &__image {
    max-height: 40px;
  }
}
</style>
