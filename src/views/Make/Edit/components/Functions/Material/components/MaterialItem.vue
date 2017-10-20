<template>
  <figure
    class="material-item"
    :class="{selectable: invoked}"
  >
    <!-- 非物品3D时才显示工具按钮 -->
    <div class="material-item__tools" v-if="!isRotate">
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

    <div v-if="isAudio" class="material-item__play" @click="!invoked && $emit('play', item)"></div>
    <img v-else-if="isRotate" class="material-item__img" :src="item.thumb ? $url.static(item.thumb) : `${rotateDefault}`" alt="item.title">
    <img v-else
         :class="{
           'material-item__other': ['logo', 'map', 'other'].includes(material.type),
           'material-item__img': ['hotspot', 'wxicon', 'sky', 'thumb'].includes(material.type),
         }"
         :src="$url.static(item.file_path)"
         :alt="item.title" />

    <figcaption class="ellipsis" :title="item.title">
      <span v-if="isRotate">
        <el-button type="text" size="small" style="padding: 0;" @click="object3dDialog(item)">预览</el-button>
      </span>
      <span v-else>{{ item.title }}</span>
    </figcaption>
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
import rotateDefault from '@/assets/default-rotate.jpg'
import modal from '../../../../mixins/modal'

export default {
  name: 'edit-material-item',

  mixins: [modal],

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      rotateDefault,
    }
  },

  computed: {
    ...mapState({
      invoked: state => state.edit.material.invoked,
      material: state => state.edit.material,
    }),

    isAudio() {
      return this.item.file_ext === 'mp3'
    },

    isRotate() {
      return this.item.source_rotate_category_id != null
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
    /**
     * 物品3D-预览
     */
    object3dDialog({ id, title }) {
      this.openModal('object3dView')
      this.$store.commit(EDIT.MATERIAL.SELECT_OBJECT3D, { id, title })
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
  border: 2px solid var(--gray-extra-light);
  background-color: var(--gray-extra-light);
  margin: 0;

  &.selectable {
    cursor: pointer;

    &:hover {
      border-color: var(--color-primary);
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
    line-height: 18px;
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

  &__other {
    height: 70px;
    object-fit: contain;
  }

  &__img {
    height: 140px;
    object-fit: cover;
  }


  &__name {
    font-size: 12px;
    text-align: center;
  }
}
</style>
