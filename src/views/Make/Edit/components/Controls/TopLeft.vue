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
    <div class="edit-author">
      <span :class="{opacity: panoInfo.show_nickname === 10}">
        作者：<span>{{ panoInfo.nickname }}</span>
      </span>
      <div class="ui-swither ui-swither--right" @click.stop>
        <el-switch
          v-model="panoInfo.show_nickname"
          on-text="显示" off-text="隐藏"
          :on-value="20" :off-value="10"
          @change="editAuthor"
        ></el-switch>
        <em class="vip">VIP</em>
      </div>
    </div>
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
              this.$store.commit(EDIT.PANO.UPDATE, { logo: null })

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
        const show_nickname = this.panoInfo.show_nickname
        this.$http.post('/user/pubset/author', {
          show_nickname,
          pano_id: this.panoInfo.hash_pano_id,
        })
          .then(() => {
            this.$message.success('设置成功')
            // 更新store panoInfo
            this.$store.commit(EDIT.PANO.UPDATE, { show_nickname })
          })
          .catch((res) => {
            this.$notify.error(res.status.reason)
          })
      } else {
        this.panoInfo.show_nickname = 20
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
    max-width: 200px;
  }
}

.edit-author {
  margin-top: 10px;
  font-size: 14px;
  line-height: 26px;
  cursor: pointer;
  position: relative;
  z-index: 6;
  .ui-swither {
    line-height: normal;
  }
  .opacity {
    opacity: .5;
  }
  .vip {
    font-size: 12px;
    color:#ffc000;
    padding-right: 8px;
    margin-left: -4px;
  }
}

.el-tooltip__popper.edit-tip {
  background-color: rgba(51, 51, 51, .95);
  cursor: pointer;
  .vip {
    color:#ffc000;
  }
}
</style>
