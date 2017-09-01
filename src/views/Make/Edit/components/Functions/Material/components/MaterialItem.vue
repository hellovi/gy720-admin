<template>
  <figure
    class="material-item"
    :class="{selectable: invoked}"
  >
    <div class="material-item__tools">
      <i
        role="button"
        class="iconfont hover-warning"
        @click="$emit('edit-item', item)"
      >&#xe608;</i>
      <i
        role="button"
        class="iconfont hover-warning"
        @click="removeItem(item.id)"
      >&#xe615;</i>
    </div>

    <div v-if="isAudio" class="material-item__play" @click="$emit('play', item)"></div>
    <img v-else :src="$url.static(item.file_path)" :alt="item.title" />

    <figcaption class="ellipsis" :title="item.title">{{ item.title }}</figcaption>
  </figure>
</template>

<script>
/**
 * 素材项
 * @author luminghuai
 * @version 2017-09-01
 */

import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'

export default {
  name: 'edit-material-item',

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState({
      invoked: state => state.edit.material.invoked,
    }),

    isAudio() {
      return this.item.file_ext === 'mp3'
    },
  },

  methods: {
    removeItem(id) {
      this.$confirm('确定要删除该项目么？删除后不可以恢复。', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$store.dispatch(EDIT.MATERIAL.REMOVE, id)
            .then(() => this.$message.success('操作成功'))
        })
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.material-item {
  position: relative;
  padding: 6px;
  border-radius: 2px;
  background-color: var(--gray-extra-light);
  margin: 0;

  &.selectable {
    cursor: pointer;

    &:hover {
      outline: 2px solid var(--color-primary);
    }
  }

  &:not(.selectable) {
    &:hover {
      .material-item__tools {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  &__tools {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    text-align: right;
    transition: 0.3s;

    & > .iconfont {
      font-size: 14px;
      cursor: pointer;
      margin-left: 3px;
    }
  }

  & > img {
    width: 100%;
  }

  & > figcaption {
    margin-top: 4px;
    text-align: center;
    font-size: 12px;
  }

  &__play {
    position: relative;
    width: 32px;
    height: 32px;
    border: 1px solid var(--color-primary);
    border-radius: 50%;
    margin: 8px auto 15px;
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      border-width: 7px 0 7px 12px;
      border-style: solid;
      border-color: transparent transparent transparent var(--color-primary);
      margin-top: -7px;
      margin-left: -5px;
    }
  }


  &__name {
    font-size: 12px;
    text-align: center;
  }
}
</style>
