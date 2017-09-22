<template>
  <div class="works-worklist">
    <!-- 顶部选择栏 -->
    <div class="works-worklist__header">
      <el-checkbox
        :value="allWorksChecked"
        @click.native.prevent="onCheckAllWorks"
      >
        全选
      </el-checkbox>
      <el-button
        class="works-worklist__transfer"
        type="text"
        v-if="checkedWordsId.length > 0"
        @click="onTransferWorks"
      >
        移动到其他分类
      </el-button>
      <span
        class="works-worklist__offline-doc"
        @click.stop="openOfflineDoc"
      >
        离线下载说明
      </span>
    </div>

    <!-- 作品列表 -->
    <div class="works-worklist__content">
      <v-work-item
        class="works-worklist__item"
        v-for="work in worklist.data" :key="work.id"
        :item="work" ref="list"
        @change="onCheckWork"
        @delete="onDeleteWork"
        @share="onShareWork"
        @upgrade="onUpgradeWork"
        @chart="onChart"
        v-if="worklist.data.length"
      ></v-work-item>
      <app-empty-body v-if="worklist.data.length === 0">
        当前分类暂无作品
      </app-empty-body>
    </div>

    <!-- 移动分类的弹窗 -->
    <el-dialog
      class="works-worklist__transfer"
      :visible.sync="transferWorksModal.tag"
      @close="onCloseTransferWorksModal"
      size="tiny" title="移动作品到其他分类"
    >
      <!-- 表单输入 -->
      <el-form
        label-width="95px"
        :model="transferWorksInfo"
        ref="transferWorksInfo"
        :rules="transferWorksRules"
      >
        <el-form-item
          prop="cateId"
          label="选择到分类"
        >
          <el-select
            v-model="transferWorksInfo.cateId"
            placeholder="请选择作品分类"
          >
            <el-option
              v-for="cate in catelist" :key="cate.id"
              v-if="cate.id !== currentCateId"
              :value="cate.id" :label="cate.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 控制按钮 -->
      <div slot="footer">
        <el-button type="primary"
          :loading="transferWorksModal.confirmLoading"
          @click="onTransferWorksConfirm()"
        >提交</el-button>
        <el-button
          @click="onCloseTransferWorksModal()"
        >取消</el-button>
      </div>
    </el-dialog>

    <!-- 离线下载说明 -->
    <el-dialog
      :visible.sync="offlineDocTag"
      title="离线下载说明" size="large"
    >
      <v-offline-doc></v-offline-doc>
    </el-dialog>

    <!-- 分享弹窗 -->

    <el-dialog
      title="分享"
      :visible.sync="sharedVisible"
      size="small"
    >
      <app-share :data="sharedWork"></app-share>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      v-if="worklist.last_page > 1"
      :page-size="worklist.per_page"
      :total="worklist.total"
      :current-page="worklist.current_page"
      @current-change="onChangePagination"
      layout="prev, pager, next"
    ></el-pagination>

    <!--管理说-说-->
    <el-dialog
      :title="`管理说一说(${chartItem.name})`"
      :visible.sync="chartVisible"
      size="large"
    >
      <message-say :pano-id="chartItem.hash_pano_id"></message-say>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 个人作品 - 作品列表组件
 *
 * @author huojinzhao | chenliangshan
 * @version 2017/09/18
 */

import AppShare from '@/components/AppShare'
import { deleteItem, serviceModal } from '@/mixins'
import messageSay from '@/views/User/Message/Say'
import { SERVICE } from '@/store/mutationTypes'
import Ajax from '../module/ajax'
import vWorkItem from './WorkItem'
import vOfflineDoc from './OfflineDoc'

export default {
  name: 'works-work-list',

  mixins: [deleteItem, serviceModal],

  components: {
    vWorkItem,
    vOfflineDoc,
    AppShare,
    messageSay,
  },

  props: {
    catelist: {
      type: Array,
      required: true,
    },

    worklist: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    allWorksChecked: false,

    checkedWordsId: [],

    transferWorksModal: {
      tag: false,
      confirmLoading: false,
    },

    transferWorksInfo: {
      cateId: null,
    },

    transferWorksRules: {
      cateId: [
        { required: true, message: '请选择要移动到的分类' },
      ],
    },

    offlineDocTag: false,

    sharedWork: {},

    sharedVisible: false,

    chartItem: {},

    chartVisible: false,
  }),

  computed: {
    currentCateId() {
      const cate_id = this.$route.query.cate_id
      if (cate_id) {
        return parseInt(cate_id, 10)
      }
      return Ajax.defaultCateId
    },
  },

  watch: {
    checkedWordsId(nv) {
      const length = this.worklist.data.length
      if (length && nv.length === length) {
        this.allWorksChecked = true
      } else {
        this.allWorksChecked = false
      }
    },

    '$route.query': 'initializeCheckedWorks',
  },

  methods: {
    /* 单作品购买成功回调方法 */
    panoBuySuccess(id) {
      const target = this.worklist.data
        .find(work => work.hash_pano_id === id)
      if (target) target.is_vip = true
    },

    /* 所有单作品状态控制 */
    initializeCheckedWorks() {
      this.checkedWordsId = []
    },

    checkAllWorks(status) {
      this.$refs.list.forEach((work) => {
        // eslint-disable-next-line
        work.checked = status
      })
    },

    /* 选择作品的逻辑 */

    onCheckAllWorks() {
      const nextStatus = !this.allWorksChecked
      this.checkAllWorks(nextStatus)
      // 选中作品处理
      if (nextStatus) {
        this.checkedWordsId = this.worklist.data.map(work => work.id)
      } else {
        this.initializeCheckedWorks()
      }
    },

    onCheckWork(workId) {
      const idArr = this.checkedWordsId
      const workChecked = idArr.includes(workId)
      if (!workChecked) {
        this.checkedWordsId.push(workId)
      } else {
        this.checkedWordsId = idArr.filter(id => id !== workId)
      }
    },

    /* 移动作品们分类的逻辑 */

    onTransferWorks() {
      this.transferWorksModal.tag = true
    },

    onCloseTransferWorksModal() {
      this.transferWorksModal.tag = false
      if (!this.transferWorksModal.confirmLoading) {
        this.$refs.transferWorksInfo.resetFields()
      }
    },

    resetTransferWorksModal() {
      this.transferWorksModal.confirmLoading = false
      this.onCloseTransferWorksModal()
    },

    onTransferWorksConfirm() {
      this.$refs.transferWorksInfo.validate((valid) => {
        if (valid) {
          this.transferWorksModal.confirmLoading = true
          this.submitWorksTransfer()
        }
      })
    },

    onChart(item) {
      this.chartItem = item
      this.chartVisible = true
    },

    submitWorksTransfer() {
      Ajax.updateWorksCate(
        this.transferWorksInfo.cateId,
        this.checkedWordsId,
      )
        .then(() => {
          this.$emit('deleteWorks', this.checkedWordsId)
          this.$message({
            type: 'success',
            message: '作品移动分类成功',
          })
        })
        .catch((err) => {
          const reason = err.status.reason
          const message = typeof reason === 'string'
            && reason.length > 0
            ? reason
            : '操作失败'

          this.$message({ type: 'error', message })
        })
        .finally(() => {
          this.resetTransferWorksModal()
          this.initializeCheckedWorks()
          this.checkAllWorks(false)
        })
    },

    /* change pagination event */

    onChangePagination(page) {
      this.$router.push({
        query: { ...this.$route.query, ...{ page } },
      })
    },

    /* WorkItem event's handler */

    onDeleteWork(workId) {
      this.onDeleteItem({
        title: '删除作品',
        message: '此操作将永久删除该作品，是否继续？',
        itemId: workId,
        ajax: Ajax.deleteWork,
        success: () => {
          this.$emit('deleteWorks', [workId])
        },
      })
    },

    openOfflineDoc() {
      this.offlineDocTag = true
    },

    onShareWork(work) {
      this.sharedWork = work
      this.sharedVisible = true
    },

    onUpgradeWork(work) {
      this.$store.dispatch(SERVICE.MODAL.CALLBACK, work)
        .then(({ hash_pano_id }) => {
          this.panoBuySuccess(hash_pano_id)
        })
      this.openServiceModal('buyInfo')
    },
  },
}
</script>

<style>
@import 'vars.css';
@import '../style/vars.css';

:root {
  --border-split: 1px solid var(--border-color-split);
  --button-color-disabled: #aaa;
}

.works-worklist {
  min-height: calc(100vh - 370px);
  padding-top: 7px;
  padding-left: 40px;

  &__header {
    border-bottom: var(--border-split);

    & .el-checkbox {
      margin: 7px 0 6px;
    }
  }

  &__transfer {
    margin-left: 15px;

  /* elementUI样式重置 */
    & .el-dialog__body {
      padding-bottom: 0;
    }

    & .el-select {
      display: block;
    }
  }

  &__item {
    border-bottom: var(--border-split);
  }

  &__offline-doc {
    float: right;
    margin-top: 8px;
    font-size: 14px;
    color: var(--button-color-disabled);
    cursor: pointer;

    &::before {
      content: "\e621";
      display: inline-block;
      font-family: "iconfont";
    }

    &:hover {
      color: color(var(--button-color-disabled) tint(20%));
    }

    &:active {
      color: color(var(--button-color-disabled) shade(10%));
    }
  }
}
</style>
