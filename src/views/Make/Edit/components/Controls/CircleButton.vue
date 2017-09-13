<template>
  <span
    role="button"
    class="btn-circle"
    :class="{'btn-circle--pointer': pointer, 'btn-circle--hidden': isHidden, [`icon-${icon}`]: true}"
    @click="$emit('click')"
  >
    {{ label }}
    <div class="ui-swither ui-swither--top" @click.stop>
      <el-switch
        :value="value"
        on-text="显示"
        off-text="隐藏"
        :on-value="20"
        :off-value="10"
        @change="change"
      ></el-switch>
    </div>
  </span>
</template>

<script>
export default {
  name: 'circle-button',

  props: {
    value: {
      type: Number,
    },
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    pointer: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isHidden() {
      return this.value === 10
    },
  },

  methods: {
    change(val) {
      this.$emit('input', val)
      this.$emit('ui-switch', val)
    },
  },
}
</script>

<style lang="postcss">
.btn-circle {
  position: relative;
  display: inline-block;
  font-size: 11px;
  text-align: center;

  &--pointer {
    cursor: pointer;
  }

  &--hidden {
    &::before {
      opacity: 0.5;
    }
  }

  & + .btn-circle {
    margin-left: 12px;
  }

  &::before {
    display: block;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-bottom: 5px;
    background-color: #fff;
    color: #636363;
    font: 20px "iconfont";
    line-height: 38px;
  }
}

.ui-swither {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  z-index: 10;
  padding: 2px 0;
  border-radius: 12px;
  background-color: #fff;
  transition: 0.2s;

  :hover > & {
    visibility: visible;
    opacity: 1;
  }

  .el-switch {
    transform: scale(0.8);
  }

  &::before {
    content: "";
    position: absolute;
  }

  &::after {
    content: "";
    position: absolute;
    border-style: solid;
  }

  &--top {
    left: 50%;
    bottom: 100%;
    transform: translate(-50%, 20%);
    margin-bottom: 10px;

    &::before {
      top: 100%;
      left: 0%;
      width: 100%;
      height: 20px;
    }

    &::after {
      top: 100%;
      left: 50%;
      border-width: 8px 6px 0;
      border-color: #fff transparent transparent;
      margin-left: -6px;
    }
  }

  :hover > &--top {
    transform: translate(-50%, 0);
  }

  &--left {
    top: 50%;
    left: 0%;
    transform: translate(-80%, -50%);
    margin-left: -10px;

    &::before {
      top: 0%;
      left: 100%;
      width: 20px;
      height: 100%;
    }

    &::after {
      top: 50%;
      left: 100%;
      border-width: 6px 0 6px 8px;
      border-color: transparent transparent transparent #fff;
      margin-top: -6px;
      margin-left: -1px;
    }
  }

  :hover > &--left {
    transform: translate(-100%, -50%);
  }

  &--right {
    top: 50%;
    right: 0%;
    transform: translate(80%, -50%);
    margin-right: -10px;

    &::before {
      top: 0%;
      right: 100%;
      width: 20px;
      height: 100%;
    }

    &::after {
      top: 50%;
      right: 100%;
      border-width: 6px 8px 6px 0;
      border-color: transparent #fff transparent transparent;
      margin-top: -6px;
      margin-right: -1px;
    }
  }

  :hover > &--right {
    transform: translate(100%, -50%);
  }
}

.ui-hidden {
  opacity: 0.5;
}
</style>
