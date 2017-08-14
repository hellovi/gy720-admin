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
    </div>

    <!-- 作品列表 -->
    <div class="works-worklist__content">
      <v-work-item
        class="works-worklist__item"
        v-for="work in worklist.data" :key="work.id"
        :item="work"  ref="list"
        @change="onCheckWork"
      ></v-work-item>
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
              :value="cate.id" :label="cate.cate_name"
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
  </div>
</template>

<script>
/**
 * 个人作品 - 作品列表组件
 *
 * @author hjz
 */
import { WORKS } from '@/store/mutationTypes'
import vWorkItem from './WorkItem'

const WORKS_TRANSER_API = '/make/pano/changepanocate'

export default {
  name: 'works-work-list',

  components: { vWorkItem },

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
  }),

  watch: {
    checkedWordsId(nv) {
      if (nv.length === this.worklist.data.length) {
        this.allWorksChecked = true
      } else {
        this.allWorksChecked = false
      }
    },
  },

  methods: {
    onCheckAllWorks() {
      const nextStatus = !this.allWorksChecked
      // 作品单选联动
      this.$refs.list.forEach((work) => {
        // eslint-disable-next-line
        work.checked = nextStatus
      })
      // 选中作品处理
      if (nextStatus) {
        this.checkedWordsId = this.worklist.data.map(work => work.id)
      } else {
        this.checkedWordsId = []
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

    onTransferWorks() {
      this.transferWorksModal.tag = true
    },

    onCloseTransferWorksModal() {
      this.transferWorksModal.tag = false
      if (!this.transferWorksModal.comfirmLoading) {
        this.$refs.transferWorksInfo.resetFields()
      }
    },

    onTransferWorksConfirm() {
      this.$refs.transferWorksInfo.validate((valid) => {
        if (valid) {
          this.transferWorksModal.confirmLoading = true
          this.submitWorksTransfer()
        }
      })
    },

    submitWorksTransfer() {
      this.$http.post(WORKS_TRANSER_API, {
        cate_id: this.transferWorksInfo.cateId,
        pano_ids: this.checkedWordsId,
      })
        .then(() => this.$store.dispatch(WORKS.WORKLIST.INITIALIZE))
        .then(() => {
          this.$emit('deleteWorks', this.checkedWordsId)
          this.transferWorksModal.comfirmLoading = false
          this.onCloseTransferWorksModal()
        })
    },
  },
}
</script>

<style>
@import 'vars.css';
@import '../style/vars.css';

:root {
  --border-split: 1px solid var(--border-color-split);
}

.works-worklist {
  height: 100%;
  padding-top: 7px;
  padding-left: 40px;
  border-left: var(--border-split);

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

    & .el-dialog--tiny {
      width: 20%;
    }

    & .el-select {
      display: block;
    }
  }

  &__item {
    border-bottom: var(--border-split);
  }
}
</style>
