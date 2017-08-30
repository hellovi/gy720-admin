<template>
  <el-dialog
    title="Logo编辑"
    :visible.sync="active.logo"
    size="small"
    @close="closeChangLogo"
  >
      <el-form label-width="120px">
        <el-form-item label="Logo图片">
          <div class="change-logo">
            <!--TODO 判断原本图片-->
            <img v-if="!formLogo.url" :src="require('@/assets/logo-edit.png')" alt="logo">
            <img v-else :src="$url.static(formLogo.url)" alt="logo">
            <div class="change-logo__shade" @click="changLogo">
              <span class="txt">
                <i class="icon el-icon-picture"></i> <br>
                选择图片
              </span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="Logo链接">
          <el-input placeholder="Http://" v-model="logoUrl"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModal('logo')">取 消</el-button>
        <el-button type="primary" @click="subLogo">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
/**
 * 高级编辑 - logo
 * @author  chenliangshan
 * @version 2017-08-21
 */

import { mapState } from 'vuex'
import modal from '../../mixins/modal'

export default {
  name: 'edit-functions__logo',

  mixins: [modal],

  data: () => ({
    logoUrl: null,
  }),

  computed: {
    ...mapState({
      formLogo: state => state.edit.material.materialExport.logos,
    }),
  },

  methods: {
    // 选择LOGO图片
    changLogo() {
      this.openMaterModal({
        type: 'logos',
        source: 'logos',
      })
    },

    closeChangLogo() {
      this.resetFormLogo()
    },

    resetFormLogo() {
      this.resetMaterExport('logos')
    },

    // 提交更换LOGO
    subLogo() {
      // TODO 更新作品logo信息
      // this.closeModal('logo')
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";
.change-logo {
  position: relative;
  height: 60px;
  img {
    background: rgba(150, 150, 150, 0.5);
    width: 235px;
    height: 60px;
    overflow: hidden;
  }
  &__shade {
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 235px;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    border: 1px dashed #f0f0f0;
    &:hover {
      border-color: #ccc;
      background-color: rgba(0, 0, 0, 0.6);
      .txt {
        color: var(--color-primary);
      }
    }
    .txt {
      display: inline-block;
      padding: 8px 0;
      color: #fff;
      font-size: 12px;
      line-height: 18px;
      .icon {
        font-size: 30px;
      }
    }
  }
}
</style>
