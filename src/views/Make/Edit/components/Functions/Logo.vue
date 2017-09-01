<template>
  <el-dialog
    title="Logo编辑"
    :visible.sync="active.logo"
    size="small"
    @close="closeChangLogo"
  >
    <app-form-alert
      :contents="msgAlert"
      label-width="120px"
    ></app-form-alert>
    <el-form
      :model="logoInfo"
      :rules="rules"
      ref="logoForm"
      label-width="120px"
    >
      <el-form-item label="Logo图片" prop="logo">
        <div class="change-logo">
          <img
            v-if="!logoInfo.logo"
            :src="require('@/assets/logo-edit.png')"
            alt="logo"
          >
          <img
            v-else
            :src="$url.static(logoInfo.logo)"
            alt="logo"
          >
          <div class="change-logo__shade" @click="changLogo">
            <span class="txt">
              <i class="icon el-icon-picture"></i> <br>
              选择图片
            </span>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="Logo链接" prop="logo_url">
        <el-input placeholder="Http://点击Logo后打开的链接" v-model="logoInfo.logo_url"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeModal('logo')">取 消</el-button>
      <el-button type="primary" :loading="formLoading" @click="subLogo">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
/**
 * 高级编辑 - logo
 * @author  chenliangshan
 * @version 2017-08-31
 */

import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import modal from '../../mixins/modal'

export default {
  name: 'edit-functions-logo',

  mixins: [modal],

  data() {
    return {
      logoInfo: {
        logo: null,
        logo_url: null,
        pano_id: null,
      },
      formLoading: false,
      msgAlert: {},
      rules: {
        logo: [
          { required: true, message: 'Logo不能为空' },
          { type: 'string', message: 'Logo格式有误' },
        ],
        logo_url: [
          { type: 'string', max: 300, message: '链接长度不能超过300个字符' },
          { type: 'url', message: '链接格式有误' },
        ],
      },
    }
  },

  computed: {
    ...mapState({
      // material: state => state.edit.material.materialExport.logos,
      panoInfo: state => state.edit.panoInfo,
    }),
  },

  watch: {
    // 监听选择情况
    // material: {
    //   handler(val) {
    //     this.setLogo(val)
    //   },
    //   deep: true,
    // },
    // 监听作品信息变化情况
    panoInfo: {
      handler() {
        this.setLogo()
      },
      deep: true,
    },
  },

  methods: {
    // 选择LOGO图片
    changLogo() {
      this.$store.dispatch(EDIT.MATERIAL.INVOKE, 'logo')
        .then(item => this.setLogo(item))
    },

    setLogo({ file_path } = {}) {
      if (file_path) {
        this.logoInfo.logo = file_path
        this.$nextTick(() => {
          // 校验LOGO字段
          this.$refs.logoForm.validateField('logo')
        })
      } else {
        const { logo, logo_url, hash_pano_id } = this.panoInfo
        this.logoInfo = {
          pano_id: hash_pano_id,
          logo,
          logo_url,
        }
      }
    },

    closeChangLogo() {
      this.msgAlert = {}
    },

    // 提交更换LOGO
    subLogo() {
      this.$refs.logoForm.validate((valid) => {
        if (valid) {
          this.msgAlert = {}
          this.$http.post('/user/pubset/logo', { ...this.logoInfo })
            .then(() => {
              const { logo, logo_url, pano_id } = this.logoInfo
              this.$message.success('Logo更换成功!')

              // 更新store panoInfo
              this.$store.commit(EDIT.GET_PANOINFO, {
                ...this.panoInfo,
                logo,
                logo_url,
                hash_pano_id: pano_id,
              })

              this.closeModal('logo')
            })
            .catch((errors) => {
              this.msgAlert = errors
            })
        }
      })
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
