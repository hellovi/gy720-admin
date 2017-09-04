<template>
  <div class="edit-functions__snapshot">
    <transition name="edit-function-fade">
      <v-camera
        v-if="active.snapshot"
        confirmButtonText="拍照"
        @cancel="close"
        @confirm="onConfirmSnapshot"
      ></v-camera>
    </transition>

    <el-dialog
      class="snapshot-result"
      title="虚拟拍照"
      size="large"
      :visible="snapshotResultModal.tag"
      :before-close="closeSnapshotResultModal"
    >
      <div class="snapshot-result__display">
        <img
          class="snapshot-result__display-img"
          :src="snapshotResultURL"
          alt="虚拟拍照结果的照片">
      </div>
      <a class="el-button el-button--primary"
        :href="snapshotDownloadURL"
        slot="footer"
      >保存到本地</a>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 高级编辑 - 虚拟拍照
 *
 * @author huojinzhao
 */
import { mapState } from 'vuex'
import vCamera from './components/Camera'
import modal from '../../mixins/modal'
import esc from '../../mixins/esc'

const CREATE_SNAPSHOT_API = '/user/pubset/virtualphoto'
const DOWNLOAD_SNAPSHOT_API = '/user/pubset/downvirtual'

export default {
  name: 'edit-functions-snapshot',

  mixins: [modal, esc],

  components: {
    vCamera,
  },

  data: () => ({
    snapshotResultModal: {
      tag: false,
      confirmLoading: false,
    },
    snapshotResultURL: '',
    snapshotDownloadURL: '',
  }),

  computed: {
    ...mapState({
      pano: state => state.edit.panoInfo,
    }),
  },

  methods: {
    close() {
      this.closeModal('snapshot')
      this.openModal('control')
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
      this.$http.post(CREATE_SNAPSHOT_API, {
        pano_id: this.pano.hash_pano_id,
        data: this.snapshotResultURL,
      })
        .then((res) => {
          /* eslint-disable prefer-template */
          const url = DOWNLOAD_SNAPSHOT_API
            + `?img_path=${res.result.img_path}`
          /* eslint-enable */
          this.snapshotDownloadURL = url
          this.$nextTick(() => {
            this.close()
            this.openSnapshotResultModal()
          })
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '拍照出现错误',
          })
        })
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

    & .el-dialog__body {
      padding: 20px 20px 10px 20px;
    }

    & .el-dialog__footer {
      text-align: center;
    }
  }
}
</style>
