<template>
  <div class="edit-functions__camera">
    <div class="top-border"></div>
    <div class="tl-angle"></div>
    <div class="right-border"></div>
    <div class="tr-angle"></div>
    <div class="bottom-border"></div>
    <div class="br-angle"></div>
    <div class="left-border"></div>
    <div class="bl-angle"></div>
    <div class="camera__control">
      <el-button
        type="primary"
        @click.stop="confirm"
      >
        {{confirmButtonText}}
      </el-button>
      <el-button
        @click.stop="cancel"
      >
        取消
      </el-button>
    </div>
  </div>
</template>

<script>
/**
 * 高级编辑 - 相机视角
 *
 * @author hjz
 * @param {String} confirmButtonText - 确定操作的按钮名称
 */

export default {
  props: {
    confirmButtonText: {
      type: String,
      default: '确定',
    },
  },

  methods: {
    confirm() {
      this.$emit('confirm')
    },

    cancel() {
      this.$emit('cancel')
    },
  },
}
</script>

<style>
.edit-functions__camera {

  /* 定位 */
  &>div {
    position: fixed;
  }

  & > .top-border,
  & > .bottom-border,
  & > .left-border,
  & > .tl-angle,
  & > .bl-angle {
    left: 10vw;
  }

  & > .right-border,
  & > .tr-angle,
  & > .br-angle {
    right: 10vw;
  }

  & > .left-border,
  & > .right-border,
  & > .top-border,
  & > .tr-angle,
  & > .tl-angle {
    top: 8vh;
  }

  & > .bottom-border,
  & > .br-angle,
  & > .bl-angle {
    bottom: 16vh;
  }

  /* 边框显示 */
  & div:nth-child(odd) {
    background-color: #fff;
  }

  & > .top-border,
  & > .bottom-border {
    height: 1px;
    width: 80vw;
  }

  & > .left-border,
  & > .right-border {
    width: 1px;
    height: 76vh;
  }

  /* 角显示 */
  & div:nth-child(even) {
    box-sizing: border-box;
    height: 50px;
    width: 50px;
    border-width: 10px;
    border-color: rgb(162, 162, 162);
  }

  & > .tl-angle,
  & > .bl-angle {
    border-left-style: solid;
  }

  & > .tr-angle,
  & > .br-angle {
    border-right-style: solid;
  }

  & > .tl-angle,
  & > .tr-angle {
    border-top-style: solid;
  }

  & > .bl-angle,
  & > .br-angle {
    border-bottom-style: solid;
  }

  & > .camera__control {
    left: 0;
    bottom: 19vh;
    width: 100%;
    background-color: transparent !important;
    text-align: center;

    & > button {
      width: 90px;
      padding: 10px 0;
    }
  }
}
</style>
