<template>
  <div class="material-image-text">
    <el-table
      :data="listData"
      style="width:100%"
    >
      <el-table-column
        prop="title"
        label="标题"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="created_at"
        label="添加日期"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        label="操作"
        width="250"
        align="center"
      >
        <template scope="scope">
          <el-button
            size="small"
            type="warning"
            @click="selectMater(listData[0].id, listData[0].title)"
          >选择</el-button>
          <el-button
            size="small"
            type="info"
          >预览</el-button>
          <el-button
            size="small"
            type="success"
          >修改</el-button>
          <el-button
            size="small"
            type="danger"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="material-image-text__tools">
      <el-button type="primary" @click="addImageText">添加图文信息</el-button>
    </el-row>
    <image-text-dialog
      :visible.sync="visible"
    ></image-text-dialog>
  </div>
</template>

<script>
  /**
   * 素材库-图文信息
   * @author  chenliangshan
   * @version 2017/08/25
   */
  import { EDIT } from '@/store/mutationTypes'

  const ImageTextDialog = () => import('./ImageTextDialog')

  export default {
    name: 'image-text',

    components: { ImageTextDialog },

    data: () => ({
      listData: [
        {
          id: 1,
          title: 'test',
          created_at: '2017-08-25 16:39:05',
        },
      ],
      visible: false,
    }),

    methods: {
      addImageText() {
        this.visible = true
      },
      selectMater(id, title) {
        this.$store.commit(EDIT.MATERIAL.SELECT, { id, title })
      },
    },

    mounted() {

    },
  }
</script>

<style lang="postcss">
  .material-image-text{
    min-height: 400px;
    max-height: 500px;
    position: relative;
    .el-table {
      min-height: 350px;
    }
    &__tools {
      position: absolute;
      bottom: 0;
    }
  }
</style>
