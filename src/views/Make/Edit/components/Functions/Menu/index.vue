<template>
  <el-dialog
    class="edit-functions__menu"
    title="菜单编辑"
    :visible="active.menu"
    size="small"
    :before-close="closeMenu"
  >
    <!-- 选择信息类型 -->
    <ul class="options clearfix">
      <li class="options__item-container"
        v-for="option in optionlist" :key="option.title"
        @click.stop="onChooseOption(option.type_id)"
      >
        <i class="options__item-icon iconfont"
          :class="{
             active: option.type_id === menuInfo.type_id
          }"
          v-html="option.iconfont"
        ></i>
        <span class="options__item-title">{{option.title}}</span>
      </li>
    </ul>

    <!-- 填写表单 -->
    <el-form class="info"
      label-width= "80px"
      :model="menuInfo"
      :rules="menuInfoRule"
      ref="menuForm"
    >

      <!-- 错误信息回显 -->
      <app-form-alert :contents="errorReasons"></app-form-alert>

      <!-- 菜单名称 -->
      <el-form-item
        label="菜单名称"
        prop="title"
      >
        <el-input
          placeholder="请填写菜单名称（4个字符以内）"
          v-model="menuInfo.title"
        ></el-input>
      </el-form-item>
      <!-- 网址链接 -->
      <el-form-item
        v-if="menuInfo.type_id === 1"
        label="网址链接"
        prop="data"
      >
        <el-input
          placeholder="http://"
          v-model="menuInfo.data"
        >
        </el-input>
      </el-form-item>
      <!-- 图文信息 -->
      <el-form-item
        v-if="menuInfo.type_id === 2"
        label="图文信息"
        prop="data"
      >
        <el-input
          class="info__imagetext"
          placeholder="点击此处，从素材库中选择图文信息"
          :value="menuInfo.data | adjustDataDisplay"
          :disabled="true"
          @click.native="openImagetext"
        ></el-input>
      </el-form-item>
      <!-- 图文信息：未读提示 -->
      <el-form-item
        v-show="menuInfo.type_id === 2"
        label="未读提示"
        prop="is_tips"
      >
        <el-switch
          class="info__tips-switch"
          on-text="开" off-text="关"
          :on-value="1" :off-value="0"
          v-model="menuInfo.is_tips" :disabled="!hasTipsPrivilege"
          @click.native="openTipsPrivilege"
        ></el-switch>
        <span class="info__tips-doc">
          （菜单未阅读，显示高亮红点提示）
          <em>VIP</em>
        </span>
      </el-form-item>
      <!-- 地图导航 -->
      <el-form-item
        v-show="menuInfo.type_id === 3"
        label="地图导航"
        prop="data"
      >
        <el-input
          class="info__gps"
          placeholder="点击此处，打开地图导航，创建导航信息"
          :value="menuInfo.data | adjustDataDisplay"
          :disabled="true"
          @click.native="openGps"
        ></el-input>
      </el-form-item>
      <!-- 电话拨号 -->
      <el-form-item
        v-show="menuInfo.type_id === 4"
        label="电话号码"
        prop="data"
      >
        <el-input
          placeholder="请填写电话号码"
          v-model="menuInfo.data"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- 底部控制按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button
        @click="closeMenu"
      >取 消</el-button>
      <el-button type="primary"
        :loading="confirmLoading"
        @click="onSubmitMenuInfo"
      >确 定</el-button>
    </div>

    <!-- 地图导航组件 -->
    <el-dialog
      class="menu__gps"
      title="地址导航" size="large"
      :modal="false"
      :visible.sync="gpsModal.tag"
    >
      <v-menu-gps
        :visible="gpsModal.tag"
        @submit="onChooseGps"
      ></v-menu-gps>
    </el-dialog>
  </el-dialog>
</template>

<script>
/**
 * 高级编辑 - 菜单编辑
 *
 * @author huojinzhao
 */

import { mapState } from 'vuex'
import modal from '@/views/Make/Edit/mixins/modal'
import { EDIT } from '@/store/mutationTypes'
import vMenuGps from './MenuGps'

const { MENU } = EDIT

export default {
  name: 'edit-functions-menu',

  mixins: [modal],

  components: {
    vMenuGps,
  },

  data: () => ({
    confirmLoading: false,

    // 提交表单失败，服务端reason数据
    errorReasons: {},

    optionlist: [
      {
        type_id: 1,
        title: '网址链接',
        iconfont: '&#xe630;',
      },
      {
        type_id: 2,
        title: '图文信息',
        iconfont: '&#xe62a;',
      },
      {
        type_id: 3,
        title: '地图导航',
        iconfont: '&#xe624;',
      },
      {
        type_id: 4,
        title: '电话拨号',
        iconfont: '&#xe62e;',
      },
    ],

    menuInfo: {
      title: '',
      data: '',
      type_id: 1,
      is_tips: 0,
      pano_id: null,
      position: '',
    },

    menuBakInfo: {},

    menuInfoRule: {
      title: [
        {
          required: true,
          message: '请输入菜单名称',
          trigger: 'blur',
        },
        {
          pattern: /^\S{1,4}$/,
          message: '长度应在4个字符以内',
          trigger: 'blur',
        },
      ],
      data: [
        {
          required: true,
          message: '菜单内容不能为空',
          trigger: 'blur',
        },
      ],
    },

    gpsModal: {
      tag: false,
    },
  }),

  computed: {
    ...mapState({
      editionType: state => state.edit.menu.editionType,
      editionInfo: state => state.edit.menu.editionInfo,
      position: state => state.edit.menu.position,
      // 图文数据
      imageText: state => state.edit.material.materialExport.menu,
    }),

    hasTipsPrivilege() {
      return this.$store.getters.isVip
    },
  },

  watch: {
    'active.menu': 'initMenuInfo',

    'imageText.title': 'checkImageText',
  },

  filters: {
    adjustDataDisplay(val) {
      if (typeof val === 'string') {
        const index = val.indexOf('|')
        const result = index === -1
          ? ''
          : val.slice(index + 1)
        return result
      }
      return ''
    },
  },

  methods: {

    /* 切换菜单选项 */

    onChooseOption(type_id) {
      const { pano_id, id, title, is_tip, position } = this.menuInfo
      this.$refs.menuForm.resetFields()
      this.menuInfo = {
        ...this.menuBakInfo,
        ...{ type_id, title, id, is_tip, pano_id, position },
      }
    },

    /* 图文信息 */

    // 打开图文信息
    openImagetext() {
      this.openMaterModal({ type: 'infos', source: 'menu' })
    },

    // 确认图文信息
    checkImageText(value) {
      if (value.length) {
        const data = this.imageText
        this.menuInfo.data = `${data.id}|${data.title}`
        this.resetMaterExport('menu')
      }
    },

    // 购买tips服务
    openTipsPrivilege() {
      if (this.hasTipsPrivilege) return
      this.openModal('vipInfo')
    },

    /* 地址导航 */

    openGps() {
      this.gpsModal.tag = true
    },

    closeGps() {
      this.gpsModal.tag = false
    },

    onChooseGps(data) {
      this.menuInfo.data = `${data.curPoi}|${data.curAddress}`
      this.closeGps()
    },

    /* menu组件逻辑 */

    onSubmitMenuInfo() {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          this.submitMenuInfo()
            .then(() => {
              this.closeMenu()
            })
            .catch((error) => {
              this.errorReasons = error
              this.confirmLoading = false
            })
        }
      })
    },

    submitMenuInfo() {
      this.confirmLoading = true
      // then: 成功回显; catch: 错误回显; finally: 关闭弹窗;
      if (this.editionType === 'create') {
        return this.$store.dispatch(MENU.CREATE, { ...this.menuInfo })
      }
      return this.$store.dispatch(MENU.PATCH_INFO, { ...this.menuInfo })
    },

    closeMenu() {
      this.$refs.menuForm.resetFields()
      this.errorReasons = {}
      this.confirmLoading = false
      this.closeModal('menu')
    },

    initMenuInfo(value) {
      if (value) {
        const pano_id = this.$route.query.pano_id
        const position = this.position
        this.menuInfo = {
          ...this.menuInfo,
          ...this.editionInfo,
          ...{ pano_id, position },
        }
      } else {
        this.recoverMenuInfo()
      }
    },

    backupInitialMenu() {
      this.menuBakInfo = { ...this.menuInfo }
    },

    recoverMenuInfo() {
      this.menuInfo = { ...this.menuBakInfo }
    },
  },

  created() {
    this.backupInitialMenu()
  },
}
</script>

<style lang="postcss">
@import "vars.css";

:root {
  --option-color-cancel: rgb(238, 238, 238);
  --option-color-active: rgb(67, 159, 250);
  --option-title-color: rgb(150, 150, 150);
}

.edit-functions__menu {

  overflow: auto;

  /* elementUI 样式重置 */
  & .el-dialog__body {
    padding-bottom: 0;
  }

  /* 选择栏样式 */

  & .options {
    margin-bottom: 30px;
    padding-left: 0;
    text-align: center;

    &__item {

      &-container {
        display: inline-block;
        margin: 0 20px;
        cursor: pointer;
        list-style: none;
      }

      &-icon {
        display: block;
        margin-bottom: 10px;
        border: none;
        border-radius: 8px;
        padding: 10px 15px;
        background-color: var(--option-color-cancel);
        color: #fff;
        font-size: 38px;

        &.active {
          background-color: var(--option-color-active);
          transition: background-color 1s;
        }
      }

      &-title {
        display: block;
        text-align: center;
        color: var(--option-title-color);
      }
    }
  }

  /* 表单栏样式 */
  & .info {
    padding: 0px 73px 0 62px;

    &__imagetext,
    &__gps {

      & > input {
        border: none;
        cursor: pointer !important;

        &:hover {
          background-color: var(--color-primary);

          &::placeholder { color: #fff; }
        }

        &:active {
          background-color: color(var(--color-primary) tint(20%));
        }
      }
    }

    &__tips {

      &-switch {

        & .el-switch__label {
          cursor: pointer;
        }
      }

      &-doc {
        color: var(--gray);

        & em {
          color: var(--color-warning);
        }
      }
    }
  }

  /* 地图导航弹窗 */
  .menu__gps {
    position: static !important;
    animation: none;

    .el-dialog--large {
      width: 940px;
    }
  }
}
</style>
