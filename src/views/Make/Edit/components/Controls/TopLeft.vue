<template>
  <div class="edit-control__top-left">
    <!--作品LOGO-->
    <div class="edit-logo" :class="{'edit-logo__add': !panoInfo.logo}">
      <template v-if="panoInfo.logo">
        <!--更换Logo-->
        <img class="edit-logo__image" :src="$url.static(panoInfo.logo)" alt="logo">
      </template>
      <template v-else>
        <!--添加Logo-->
        <el-tooltip popper-class="edit-tip" placement="right-end">
          <div role="button" class="btn-add dash-box" @click="editLogo">+</div>
          <!--提示语-->
          <span slot="content" @click="editLogo">
            添加Logo <em class="vip">VIP</em>
          </span>
        </el-tooltip>
      </template>
      <edit-tools
        dir="right"
        @edit="editLogo"
        @delete="removeLogo"
      ></edit-tools>
    </div>
    <!--作品作者-->
    <el-tooltip
      popper-class="edit-tip"
      placement="right-end"
    >
      <!--作者名称内容-->
      <div class="edit-author" @click="editAuthor">
        作者：
        <span v-if="panoInfo.show_nickname === 20 || !panoInfo.show_nickname">{{ panoInfo.nickname }}</span>
        <span v-else>（昵称已隐藏）</span>
      </div>
      <!--提示语-->
      <span slot="content" @click="editAuthor">
        隐藏作者 <em class="vip">VIP</em>
      </span>
    </el-tooltip>
  </div>
</template>

<script>

/**
 * 高级编辑 - Logo/作者
 * @author luminghuai | chenliangshan
 * @version 2017-08-11
 */

import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import modal from '../../mixins/modal'
import EditTools from './EditTools'

export default {
  name: 'edit-top-left',

  mixins: [modal],

  components: {
    EditTools,
  },

  computed: {
    ...mapState({
      panoInfo: state => state.edit.panoInfo,
      userInfo: state => state.userInfo,
    }),
  },

  methods: {
    // 编辑LOGO
    editLogo() {
      if (this.editAutho()) {
        this.openModal('logo')
      }
    },

    // 删除LOGO
    removeLogo() {
      if (this.editAutho()) {
        this.$confirm('删除Logo, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$http.post('/user/pubset/logo', {
            logo: null,
            pano_id: this.panoInfo.hash_pano_id,
          })
            .then(() => {
              this.$message.success('Logo删除成功!')

              // 更新store panoInfo
              this.updatePanoInfo({ logo: null })

              this.closeModal('logo')
            })
            .catch((res) => {
              this.$notify.error(res.status.reason)
            })
        })
      }
    },

    // 显示隐藏作者名称
    editAuthor() {
      if (this.editAutho()) {
        const show_nickname = this.panoInfo.show_nickname === 10 ? 20 : 10
        this.$http.post('/user/pubset/author', {
          show_nickname,
          pano_id: this.panoInfo.hash_pano_id,
        })
          .then(() => {
            this.$message.success('设置成功')
            // 更新store panoInfo
            this.updatePanoInfo({ show_nickname })
          })
          .catch((res) => {
            this.$notify.error(res.status.reason)
          })
      }
    },

    // 控制操作权限
    editAutho() {
      if (!this.userInfo.is_vip && !this.panoInfo.is_vip) {
        this.openModal('vipInfo')
        return false
      }
      return true
    },

    // 更新store panoInfo
    updatePanoInfo(updateInfo = {}) {
      this.$store.commit(EDIT.GET_PANOINFO, {
        ...this.panoInfo,
        ...updateInfo,
      })
    },
  },
}
</script>

<style lang="postcss">
.edit-control__top-left {
  position: absolute;
  top: 10px;
  left: 10px;
}

.edit-logo {
  cursor: pointer;

  .btn-add {
    position: relative;
    z-index: 6;
  }

  &:hover > .edit-tools {
    visibility: visible;
  }

  &__add {
    .edit-tools {
      display: none;
    }
  }

  &__image {
    display: block;
    height: 30px;
  }
}

.edit-author {
  margin-top: 10px;
  font-size: 14px;
  line-height: 26px;
  cursor: pointer;
  position: relative;
  z-index: 6;
}

.el-tooltip__popper.edit-tip {
  background-color: rgba(51, 51, 51, .95);
  cursor: pointer;
  .vip {
    color:#ffc000;
  }
}
</style>
