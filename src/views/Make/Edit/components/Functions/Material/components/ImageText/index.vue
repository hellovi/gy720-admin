<template>
  <div class="material-image-text">
    <el-table
      :data="listData.data"
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
            type="info"
            v-if="selectStatus"
            @click="selectMater(scope.row.id, scope.row.title)"
          >选择</el-button>
          <el-button
            size="small"
            type="success"
            @click="openPreView(scope.row)"
          >预览</el-button>
          <el-button
            size="small"
            type="warning"
            @click="editInfo(scope)"
          >修改</el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteData(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="perPage"
      :total="listData.total"
      v-if="listData.total"
    >
    </el-pagination>
    <el-row class="material-image-text__tools">
      <el-button type="primary" @click="addImageText">添加图文信息</el-button>
    </el-row>
    <!--添加|修改窗口-->
    <el-dialog
      :visible.sync="visible"
      :modal="false"
      top="2%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      >
      <image-text-dialog
        :visible="visible"
        :id="currentEditId"
        :type="dialogType"
        @close="dialogClose"
        @update="dataUpdate"
        v-if="addRendered"
      ></image-text-dialog>
    </el-dialog>

    <!--预览窗口-->
    <el-dialog
      :visible.sync="preShow"
      :modal="false"
      top="2%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <image-text-preview
        :visible="preShow"
        :id="preViewId"
        v-if="preViewRendered"
      ></image-text-preview>
    </el-dialog>
  </div>
</template>

<script>
  /**
   * 素材库-图文信息
   * @author  chenliangshan
   * @version 2017/08/25
   */

  import { EDIT } from '@/store/mutationTypes'

  export default {
    name: 'image-text',

    components: {
      ImageTextDialog: () => import('./ImageTextDialog'),
      ImageTextPreview: () => import('./ImageTextPreview'),
    },

    data: () => ({
      listData: {},
      currentEditId: null,
      visible: false,
      dialogType: null,
      perPage: 8,
      preViewId: null,
      preShow: false,
      addRendered: false,
      preViewRendered: false,
    }),

    computed: {
      selectStatus() {
        return this.$store.state.edit.material.selectStatus
      },
    },

    watch: {
      // 监听添加窗口打开时渲染内容
      visible(val) {
        if (val) {
          this.addRendered = true
        }
      },
      // 监听预览窗口打开时渲染内容
      preShow(val) {
        if (val) {
          this.preViewRendered = true
        }
      },
    },

    methods: {
      // 获取列表数据
      getListData(page = 1) {
        this.$http.get(`/user/sourcearticle?page=${page}&per_page=${this.perPage}`)
          .then((res) => {
            this.listData = res.result
          })
      },

      // 添加列表数据
      addImageText() {
        this.openDialog('add')
      },

      // 编辑列表数据
      editInfo(data) {
        this.currentEditId = data.row.id
        this.openDialog('edit')
      },

      // 选择数据
      selectMater(id, title) {
        this.$store.commit(EDIT.MATERIAL.SELECT, { id, title })
      },

      // 打开新增|修改窗口
      openDialog(type = 'add') {
        this.visible = true
        this.dialogType = type
      },

      // 关闭修改窗口回调
      dialogClose() {
        this.currentEditId = null
      },

      // 修改列表回调
      dataUpdate() {
        this.getListData()
      },

      // 删除数据
      deleteData(item) {
        this.$confirm('确认删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$http.delete(`/user/sourcearticle/${item.id}`)
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!',
                onClose: () => {
                  this.getListData()
                },
              })
            })
            .catch((errors) => {
              this.$notify.error({
                title: '删除出错!',
                message: errors.status.reason,
              })
            })
        })
      },

      // 打开预览窗口
      openPreView(item) {
        this.preShow = true
        this.preViewId = item.id
      },

    },

    created() {
      this.getListData()
    },
  }
</script>

<style lang="postcss">
  .material-image-text{
    min-height: 400px;
    max-height: 500px;
    padding-bottom: 36px;
    position: relative;
    .el-table {
      min-height: 350px;
    }
    .el-pagination {
      margin-top: 10px;
    }
    &__tools {
      position: absolute;
      bottom: 0;
    }
  }
</style>
