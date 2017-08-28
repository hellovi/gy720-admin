<template>
  <div
    :class="itemClass"
    @click.stop="onChooseCate"
  >
    <i class="iconfont manage3d-cateitem__tag--choose">&#xe60c;</i>
     <i class="iconfont manage3d-cateitem__tag--delete"
      v-if="item.id !== 1"
      @click.stop="onDeleteCate"
    >
      &#xe615;
    </i>
    {{item.name}}
  </div>
</template>

<script>
/**
 * 物品3D-分类
 *
 * @author yj
 */

export default {
  name: 'manage3d-cate-item',

  props: {
    item: {
      type: Object,
      required: true,
    },

    active: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    itemClass() {
      return [
        'manage3d-cateitem',
        {
          'manage3d-cateitem--active': this.active,
        },
      ]
    },
  },

  methods: {
    onChooseCate() {
      this.$emit('chooseCate', this.item.id)
    },

    onDeleteCate() {
      this.$emit('deleteCate', this.item.id)
    },
  },
}
</script>
<style>
@import 'vars.css';

.manage3d-cateitem {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    & .manage3d-cateitem__tag--delete {
      display: block;
    }
  }

  &--active:hover {
    & .manage3d-cateitem__tag--delete {
      display: none;
    }
  }

  &--active {
    & .manage3d-cateitem__tag--choose {
      display: block;
    }
  }

  &__tag--choose {
    position: absolute;
    left: 0;
    display: none;
    color: var(--color-primary);
  }

  &__tag--delete {
    position: absolute;
    left: 0;
    display: none;
    z-index: 1;
    color: var(--color-warning);
  }
}
</style>

