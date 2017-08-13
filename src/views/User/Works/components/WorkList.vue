<template>
  <div class="works-worklist">
    <!-- 顶部选择栏 -->
    <div class="works-worklist__header">
      <el-checkbox
        :value="allWorksChecked"
        @click.native.prevent="onAllWorksCheck"
      >
        全选
      </el-checkbox>
      <el-button
        class="works-worklist__transfer"
        type="text"
        v-if="checkedWordsId.length > 0"
        @click="onWorkTransfer"
      >
        移动到其他分类
      </el-button>
    </div>

    <!-- 作品列表 -->
    <div class="works-worklist__content">
      <v-work-item
        class="works-worklist__item"
        v-for="work in worklist" :key="work.id"
        :item="work"  ref="worklist"
        @change="onWorkCheck"
      ></v-work-item>
    </div>

    <!-- 移动分类的弹窗 -->
    <el-dialog
      class="works-worklist__transfer"
      :visible.sync="worksTransferModal.tag"
      @close="closeWorksTransferModal"
      size="tiny" title="移动作品到其他分类"
    >
      <!-- 表单输入 -->
      <el-form
        label-width="95px"
        :model="worksTransferInfo"
        ref="worksTransferInfo"
        :rules="worksTransferRules"
      >
        <el-form-item
          prop="cateId"
          label="选择到分类"
        >
          <el-select
            v-model="worksTransferInfo.cateId"
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
          :loading="worksTransferModal.confirmLoading"
          @click="confirmWorksTransfer()"
        >提交</el-button>
        <el-button
          @click="closeWorksTransferModal()"
        >取消</el-button>
      </div>
    </el-dialog>

    <!-- <v-modal v-if="modal.cateTransfer" @close="modal.cateTransfer = false" title="移动作品到其他分类" width="350">
      <div class="modal__transferCate">
        <div class="modal__transferCate__containerUp">
          <span class="modal__transferCate__tag">选择分类</span>
          <select v-model="toCateId" class="modal__transferCate__select">
            <option v-for="item in catelist" :value="item.id" :key="item.id">{{item.cate_name}}</option>
          </select>
        </div>
        <div class="modal__transferCate__containerBelow">
          <a class="modal__transferCate__submit" @click="cateTransfer">提交</a>
        </div>
      </div>
    </v-modal> -->
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
      type: Array,
      required: true,
    },
  },

  data: () => ({
    allWorksChecked: false,
    checkedWordsId: [],
    worksTransferModal: {
      tag: false,
      confirmLoading: false,
    },
    worksTransferInfo: {
      cateId: null,
    },
    worksTransferRules: {
      cateId: [
        { required: true, message: '请选择要移动到的分类' },
      ],
    },
  }),

  watch: {
    checkedWordsId(nv) {
      if (nv.length === this.worklist.length) {
        this.allWorksChecked = true
      } else {
        this.allWorksChecked = false
      }
    },
  },

  methods: {
    onAllWorksCheck() {
      const nextStatus = !this.allWorksChecked
      // 作品单选联动
      this.$refs.worklist.forEach((work) => {
        // eslint-disable-next-line
        work.checked = nextStatus
      })
      // 选中作品处理
      if (nextStatus) {
        this.checkedWordsId = this.worklist.map(work => work.id)
      } else {
        this.checkedWordsId = []
      }
    },
    onWorkCheck(workId) {
      const idArr = this.checkedWordsId
      const workChecked = idArr.includes(workId)
      if (!workChecked) {
        this.checkedWordsId.push(workId)
      } else {
        this.checkedWordsId = idArr.filter(id => id !== workId)
      }
    },
    onWorkTransfer() {
      this.worksTransferModal.tag = true
    },
    closeWorksTransferModal() {
      this.worksTransferModal.tag = false
      this.$refs.worksTransferInfo.resetFields()
    },
    confirmWorksTransfer() {
      this.$refs.worksTransferInfo.validate((valid) => {
        if (valid) {
          this.worksTransferModal.confirmLoading = true
          this.submitWorksTransfer()
        }
      })
    },
    submitWorksTransfer() {
      this.$http.post(WORKS_TRANSER_API, {
        cate_id: this.worksTransferInfo.cateId,
        pano_ids: this.checkedWordsId,
      })
        .then(() => this.$store.dispatch(WORKS.WORKLIST.INITIALIZE))
        .then(() => {
          this.closeWorksTransferModal()
          // 不放closeWoksTransferModal
          // 防止第一次提交在第二次操作时返回造成操作困惑
          this.worksTransferModal.comfirmLoading = false
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
