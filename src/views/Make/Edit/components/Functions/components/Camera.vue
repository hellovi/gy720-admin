<template>
  <div class="edit-functions__camera">
    <div class="camera__control">
      <el-button
        type="primary"
        @click.stop="confirm"
      >{{confirmButtonText}}</el-button>
      <el-button @click.stop="cancel">取消</el-button>
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

<style lang="postcss">
.edit-functions__camera {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80vw;
  height: 80vh;
  margin-left: -40vw;
  margin-top: -40vh;
  border: 1px solid #fff;
  pointer-events: none;

  &::before,
  &::after,
  .camera__control::before,
  .camera__control::after {
    content: "";
    position: absolute;
    width: 50px;
    height: 50px;
    border-style: solid;
    border-color: rgb(162, 162, 162);

  }

  &::before {
    top: 0;
    left: 0;
    border-width: 8px 0 0 8px;
  }

  &::after {
    top: 0;
    right: 0;
    border-width: 8px 8px 0 0;
  }

  & > .camera__control {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 5vh;
    text-align: center;

    &::before {
      bottom: 0;
      left: 0;
      border-width: 0 0 8px 8px;
    }

    &::after {
      bottom: 0;
      right: 0;
      border-width: 0 8px 8px 0;
    }

    & > .el-button {
      width: 7em;
      pointer-events: auto;
    }
  }
}
</style>
