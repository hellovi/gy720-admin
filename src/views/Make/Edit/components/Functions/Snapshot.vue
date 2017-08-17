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
      <a class="el-button el-button--primary"
        :href="snapshotDownloadURL"
        slot="footer"
        :download="`虚拟拍照 - ${Date.now()}`"
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

const CREATE_SNAPSHOT_API = '/make/pubset/photograph'
// const GET_SNANPSHOT_API = '/make/pubset/downphotograph'

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
    snapshotDownloadURL: '',
  }),

  computed: {
    ...mapState({
      pano: state => state.edit.panoinfo,
    }),
  },

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
      this.$http.post(CREATE_SNAPSHOT_API, {
        pano_id: this.pano.id,
        data: this.snapshotResultURL,
      })
        .then((res) => {
          this.snapshotDownloadURL = res.result.src
          this.$nextTick(() => {
            this.onCloseCamera()
            this.openSnapshotResultModal()
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
