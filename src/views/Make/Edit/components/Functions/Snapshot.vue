<template>
  <div class="edit-functions__snapshot">
    <v-camera
      v-if="active.snapshot"
      confirmButtonText="拍照"
      @cancel="onCloseCamera"
      @confirm="onConfirmSnapshot"
    >
    </v-camera>

    <el-dialog
      class="snapshot-result"
      title="虚拟拍照"
      size="small"
      :visible="snapshotResultModal.tag"
      :before-close="closeSnapshotResultModal"
    >
      <div class="snapshot-result__display">
        <img
          class="snapshot-result__display-img"
          :src="snapshotResultURL"
          alt="虚拟拍照结果的照片">
      </div>
      <el-button
        slot="footer"
        type="primary"
        @click="onSaveSnapshotResult"
      >保存到本地</el-button>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 高级编辑 - 虚拟拍照
 *
 * @author huojinzhao
 */

import vCamera from './components/Camera'
import modal from '../../mixins/modal'

export default {
  name: 'edit-functions__snapshot',

  mixins: [modal],

  components: {
    vCamera,
  },

  data: () => ({
    snapshotResultModal: {
      tag: false,
      confirmLoading: false,
    },
    snapshotResultURL: '',
  }),

  methods: {
    onCloseCamera() {
      this.closeModal('snapshot')
    },

    openSnapshotResultModal() {
      this.snapshotResultModal.confirmLoading = false
      this.snapshotResultModal.tag = true
    },

    closeSnapshotResultModal() {
      this.snapshotResultModal.confirmLoading = false
      this.snapshotResultModal.tag = false
    },

    onConfirmSnapshot() {
      // eslint-disable-next-line
      const canvas = window._krpano.querySelector('canvas')
      this.snapshotResultURL = canvas.toDataURL('image/jpeg')
      this.onCloseCamera()
      this.openSnapshotResultModal()
    },

    // 虚拟拍照后端交互未定
    onSaveSnapshotResult() {

    },
  },
}
</script>

<style>
.edit-functions__snapshot {

  & .snapshot-result {

    &__display-img {
      width: 100%;
    }

    & .el-dialog__footer {
      text-align: center;
    }
  }
}
</style>
