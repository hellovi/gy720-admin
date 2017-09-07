<template>
  <span
    role="button"
    class="btn-circle"
    :class="{'btn-circle--hidden': isHidden, [`icon-${icon}`]: true}"
    @click="$emit('click')"
  >
    {{ label }}
    <div class="ui-swither" @click.stop>
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
  cursor: pointer;

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
    margin-bottom: 3px;
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
  bottom: 100%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, 20%);
  padding: 2px 0;
  border-radius: 12px;
  margin-bottom: 10px;
  background-color: #fff;
  transition: 0.2s;

  :hover > & {
    visibility: visible;
    opacity: 1;
    transform: translate(-50%, 0);
  }

  .el-switch {
    transform: scale(0.8);
  }

  &::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 0%;
    width: 100%;
    height: 20px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    border-width: 8px 6px 0;
    border-color: #fff transparent transparent;
    border-style: solid;
    margin-left: -5px;
  }
}

.ui-hidden {
  opacity: 0.5;
}
</style>
