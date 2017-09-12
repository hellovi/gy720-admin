<template>
  <div>
    <div class="rotate-images-tip clearfix">
      <span class="float-left">操作帮助：</span>
      <ul>
        <li>拖动图片可以快速排序</li>
        <li>点击文件名称可以进行修改</li>
        <li>
          如果物品3D预览时物体的方向是反的，点击
          <el-button type="primary" size="small" @click="reverse">图片反转</el-button>
          进行重新排序
        </li>
      </ul>
    </div>
    <draggable :list="(images)" @sort="onSort" v-loading="loading">
      <transition-group tag="ul" class="list clearfix rotate-image-list">
        <li class="float-left rotate-image-item" v-for="image in images" :key="image.id">
          <i class="iconfont" @click="update(image)">&#xe608;</i>
          <i class="iconfont" @click="remove(image.id)">&#xe615;</i>
          <img :src="$url.static(image.small_img)" :alt="image.title">
          <span class="ellipsis" :title="image.title">{{ image.title }}</span>
        </li>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import Vue from 'vue'
import Draggable from 'vuedraggable'

export default {
  name: 'rotate-images',

  components: {
    Draggable,
  },

  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      images: [],
      loading: false,
    }
  },

  methods: {
    onSort() {
      const sort = this.images
        .map(({ id }, i) => ({ id, list_order: i + 1 }))
      this.$http.post(`/user/sourcerotateimage/sort?source_rotate_id=${this.id}`, { sort })
    },

    reverse() {
      this.images.reverse()
      this.onSort()
    },

    update({ title, id }) {
      this.$prompt('图片名称', '修改图片名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: title,
        inputPattern: /\S+/,
        inputErrorMessage: '图片名称不能为空',
      })
        .then(({ value }) => {
          this.$http.put(`/user/sourcerotateimage/${id}`, {
            source_rotate_id: this.id,
            title: value,
          })
            .then(() => {
              const target = this.images.find(image => image.id === id)
              Vue.set(target, 'title', value)
              this.$message.success('操作成功')
            })
        })
    },

    remove(id) {
      this.$confirm('确定要删除该图片么？删除后不可以恢复。', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => this.$http.delete(`/user/sourcerotateimage/${id}`))
        .then(() => {
          this.images = this.images.filter(image => image.id !== id)
          this.$message.success('操作成功')
        })
    },
  },

  created() {
    this.loading = true
    this.$http.get(`/user/sourcerotateimage?source_rotate_id=${this.id}`)
      .then(({ result }) => {
        this.images = result
        this.loading = false
      })
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.rotate-image-dialog {
  width: 1100px;
  margin-left: -550px;
  transform: none;
}

.rotate-images-tip {
  margin-top: -15px;
  margin-bottom: 15px;
  color: var(--gray);
  line-height: 30px;

  & > ul {
    float: left;
    padding: 0;
    margin: 0;

    & > li {
      float: left;
      margin-left: 1.5em;
    }
  }
}

.rotate-image-list {
  min-height: 140px;
}

.rotate-image-item {
  position: relative;
  padding: 5px 10px;
  margin: 0 6px 6px;
  background-color: var(--gray-extra-light);
  text-align: center;
  transition: 0.3s;

  & > .iconfont {
    display: none;
    position: absolute;
    right: 5px;
    top: 5px;
    color: var(--color-warning);
    cursor: pointer;
  }

  &:hover {
    & > .iconfont {
      display: block;

      &:first-child {
        margin-right: 1.5em;
      }
    }
  }

  & > img {
    display: block;
    width: 100px;
    height: 100px;
    overflow: hidden;
  }

  & > span {
    display: block;
    width: 100px;
    padding: 2px;
    margin-top: 5px;
    background-color: #fff;
    font-size: 12px;
  }
}
</style>

