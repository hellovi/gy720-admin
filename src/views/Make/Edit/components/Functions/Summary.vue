<template>
  <el-dialog
    title="设置（作品简介）"
    :visible="active.summary"
    :before-close="close"
  >
    <el-form class="edit-setting__form">
      <el-form-item>
        <el-input
          v-model="form.pano_remark"
          type="textarea"
          :rows="6"
          :maxlength="1000"
          placeholder="请输入作品简介（1000个字符内）"
        ></el-input>
      </el-form-item>

      <el-form-item label="是否显示简介按钮">
        <el-switch
          v-model="form.show_remark"
          on-text="显示" off-text="隐藏"
          :on-value="20" :off-value="10"
        ></el-switch>
      </el-form-item>
    </el-form>

    <div slot="footer" class="edit-setting__footer">
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import modal from '../../mixins/modal'

export default {
  name: 'edit-functions-summary',

  mixins: [modal],

  data() {
    return {
      form: {
        pano_remark: '',
        show_remark: 10,
      },
    }
  },

  computed: {
    ...mapState({
      panoInfo: state => state.edit.panoInfo,
    }),
  },

  watch: {
    panoInfo(val) {
      const { pano_remark, show_remark } = val
      this.form = { pano_remark, show_remark }
    },
  },

  methods: {
    close() {
      this.closeModal('summary')
    },

    submit() {
      const id = this.panoInfo.hash_pano_id
      this.$http.post(`/user/pubset/update?pano_id=${id}`, this.form)
        .then(() => {
          this.$message.success('操作成功')
          this.$store.commit(EDIT.PANO.UPDATE, { show_remark: this.form.show_remark })
          this.close()
        })
    },
  },
}
</script>
