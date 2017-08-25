<template>
  <el-dialog
    class="edit-functions__menu"
    title="菜单编辑"
    :visible.sync="active.menu"
    size="small"
    :before-close="closeMenu"
  >
    <!-- 选择信息类型 -->
    <ul class="options clearfix">
      <li class="options__item-container"
        v-for="option in optionlist" :key="option.title"
        @click.stop="onChooseOption(option)"
      >
        <i class="options__item-icon iconfont"
          :class="{
             active: option.type_id === choosedOption.type_id
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
      <!-- 菜单名称 -->
      <el-form-item
        label="菜单名称"
        prop="menu_name"
      >
        <el-input
          placeholder="请填写菜单名称（4个字符以内）"
          v-model="menuInfo.menu_name"
        ></el-input>
      </el-form-item>
      <!-- 网址链接 -->
      <el-form-item
        v-if="choosedOption.type_id === 1"
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
        v-if="choosedOption.type_id === 2"
        label="图文信息"
        prop="data"
      >
        <el-input
          class="info__imagetext"
          placeholder="点击此处，从素材库中选择图文信息"
          v-model="menuInfo.data"
          :disabled="true"
          @click.native="openImagetext"
        ></el-input>
      </el-form-item>
      <!-- 图文信息：未读提示 -->
      <el-form-item
        v-show="choosedOption.type_id === 2"
        label="未读提示"
        prop="is_tips"
      >
        <el-switch
          on-text="开" off-text="关"
          v-model="menuInfo.is_tips" :disabled="false"
        ></el-switch>
        <span class="info__tip-doc">
          （菜单未阅读，显示高亮红点提示）
          <em>VIP</em>
        </span>
      </el-form-item>
      <!-- 地图导航 -->
      <el-form-item
        v-show="choosedOption.type_id === 3"
        label="地图导航"
        prop="data"
      >
        <el-input
          class="info__gps"
          placeholder="点击此处，打开地图导航，创建导航信息"
          v-model="menuInfo.data"
          :disabled="true"
          @click.native="openGps"
        ></el-input>
      </el-form-item>
      <!-- 电话拨号 -->
      <el-form-item
        v-show="choosedOption.type_id === 4"
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
        @choose="onChooseGps"
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
import modal from '@/views/Make/Edit/mixins/modal'
import vMenuGps from './MenuGps'

export default {
  name: 'edit-functions__menu',

  mixins: [modal],

  components: {
    vMenuGps,
  },

  data: () => ({
    issuetxt: '',
    subscribetxt: '',

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

    choosedOption: {
      type_id: 1,
    },

    menuInfo: {
      menu_name: '',
      data: null,
      is_tips: 0,
    },

    menuInfoRule: {
      menu_name: [
        { required: true, message: '请输入菜单名称', trigger: 'blur' },
        { pattern: /^\S{1,4}$/, message: '长度应在4个字符以内', trigger: 'blur' },
      ],
      data: [
        { required: true, message: '菜单内容不能为空', trigger: 'blur' },
      ],
    },

    gpsModal: {
      tag: false,
    },
  }),

  watch: {
    // 图文信息store，赋值给data,
    // this.$children.map.data，赋值给data
  },

  methods: {

    /* 切换菜单选项 */

    onChooseOption(option) {
      const name = this.menuInfo.menu_name
      this.choosedOption = { ...option }
      this.$refs.menuForm.resetFields()
      if (name) this.menuInfo.menu_name = name
    },

    /* 图文信息 */

    openImagetext() {
      // console.log('打开图文信息')
      // this.openMaterialModal(type: imagetext)
    },

    /* 地址导航 */

    openGps() {
      this.gpsModal.tag = true
    },

    closeGps() {
      //
    },

    onChooseGps(data) {
      this.menuInfo.data = data
      this.closeGps()
    },

    /* menu组件逻辑 */

    onSubmitMenuInfo() {
      this.$refs.menuForm.validate((valid) => {
        if (valid) this.submitMenuInfo()
      })
    },

    submitMenuInfo() {
      // console.log('sucess')
      // then: 成功回显; catch: 错误回显; finally: 关闭弹窗;
    },

    closeMenu() {
      this.$refs.menuForm.resetFields()
      this.closeModal('menu')
    },
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

    &__tip {

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
