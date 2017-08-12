<template>
  <div
    :class="itemClass"
    @click.stop="onChooseCate(item.id)"
  >
    <i class="iconfont works-cateitem__tag--choose">
      &#xe60c;
    </i>
    <!-- id为1是默认分类，不提供（不允许）删除 -->
    <i class="iconfont works-cateitem__tag--delete"
      v-if="item.id !== 1"
      @click.stop="onDeleteCate(item.id)"
    >
      &#xe615;
    </i>
    {{item.cate_name}}
  </div>
</template>

<script>
/**
 * 个人作品 - 作品分类项目
 *
 * @author hjz
 */
export default {
  name: 'works-cate-item',

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
        'works-cateitem',
        {
          'works-cateitem--active': this.active,
        },
      ]
    },
  },

  methods: {
    onChooseCate(cateid) {
      this.$emit('onChooseCate', cateid)
    },
    onDeleteCate(cateid) {
      this.$emit('onDeleteCate', cateid)
    },
  },
}
</script>

<style>
@import 'vars.css';

.works-cateitem {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:not(&--active):hover {
    & .works-cateitem__tag--delete {
      display: block;
    }
  }

  &--active {
    & .works-cateitem__tag--choose {
      display: block;
    }
  }

  &__tag--choose {
    position: absolute;
    left: 0;
    display: none;
    color: var(--primary-color);
  }

  &__tag--delete {
    position: absolute;
    left: 0;
    display: none;
    z-index: 1;
    color: var(--warning-color);
  }
}
</style>

