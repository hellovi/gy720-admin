<template>
  <div class="edit-control__top-left">
    <!--作品LOGO-->
    <div class="edit-logo" :class="{'edit-logo__add': !true}">
      <!--TODO Logo显示判断-->
      <template v-if="true">
        <!--更换Logo-->
        <img class="edit-logo__image" :src="require('@/assets/logo-edit.png')" alt="logo">
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
        @onEdit="editLogo"
        @onDelete="removeLogo"
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
        <!--TODO 作者名称及显示判断-->
        <span v-if="true">某某某</span>
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
      pano: state => state.edit.panoinfo,
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
          // TODO 删除LOGO
          this.$message({
            type: 'success',
            message: '删除成功',
          })
        })
      }
    },

    // 显示隐藏作者名称
    editAuthor() {
      if (this.editAutho()) {
        // TODO 显示隐藏作者名称状态
      }
    },

    // 控制操作权限
    editAutho() {
      // TODO 单个作品vip条件判断
      if (!this.userInfo.is_vip) {
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
    height: 30px;
  }
}

.edit-author {
  margin-top: 10px;
  font-size: 14px;
  line-height: 26px;
  cursor: pointer;
}

.el-tooltip__popper.edit-tip {
  background-color: rgba(51, 51, 51, .95);
  .vip {
    color:#ffc000;
  }
}
</style>
