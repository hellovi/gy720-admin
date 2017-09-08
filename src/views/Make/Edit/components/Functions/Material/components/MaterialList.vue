<template>
  <div v-loading="loading">
    <ul class="material-list clearfix list">
      <li
        v-for="item in list.data"
        :key="item.id"
        class="material-list__item"
        @click="selectItem(item)"
      >
        <material-item
          :item="item"
          :selectable="invoked"
          @edit-item="editItem"
          @play="play(item)"
        ></material-item>
      </li>
    </ul>

    <div v-if="isEmpty" class="empty">
      <div>还没有上传素材哦……</div>
    </div>

    <el-pagination
      v-if="list.last_page > 1"
      :page-size="list.per_page"
      :total="list.total"
      :current-page="list.current_page"
      @current-change="pageChange"
      layout="prev, pager, next"
    ></el-pagination>

    <!-- 编辑素材弹框 -->
    <el-dialog title="编辑素材" :visible.sync="dialog.edit" :modal="false" size="tiny">
      <el-form :model="form" :rules="rules" label-width="6em" ref="form">
        <el-form-item label="素材名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="素材类型" v-if="canMove">
          <el-select v-model="form.tag_id">
            <el-option
              v-for="option in options"
              :key="option.id"
              :label="option.name"
              :value="option.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 音频试听弹窗 -->
    <el-dialog
      :title="`[试听]${item.title}`"
      :visible.sync="dialog.play"
      :modal="false"
      top="25%"
      custom-class="material-play"
    >
      <audio :src="$url.host(item.file_path)" controls></audio>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 高级编辑 - 素材列表
 * @author luminghuai
 * @version 2017-09-01
 */

import { EDIT } from '@/store/mutationTypes'
import AppUploadProgress from '@/components/AppUploadProgress'
import MaterialItem from './MaterialItem'
import material from '../mixins/material'

const AppFileUpload = () => import('@/components/AppFileUpload')

export default {
  name: 'edit-material-list',

  mixins: [material],

  components: {
    AppFileUpload,
    AppUploadProgress,
    MaterialItem,
  },

  props: {
    activeId: {
      type: Number,
      required: true,
    },
    activeType: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
    }
  },

  methods: {
    /**
     * 获取列表数据
     * 物品3D与其它类型接口不一样，需要做判断
     * @param {number} page
     */
    getMaterials(page = 1) {
      this.loading = true

      const url = this.activeType === 'rotate'
        ? '/user/sourcerotate'
        : '/user/source'
      const params = `?tag_id=${this.activeId}&page=${page}`

      // 这里需要做接口错误处理
      this.$store.dispatch(EDIT.MATERIAL.INIT, { url, params })
        .then(() => {
          this.loading = false
        })
    },

    pageChange(page) {
      this.getMaterials(page)
    },

    /**
     * 选中某个素材
     * 只有在素材框被其它模块调用时，才触发这个事件
     */
    selectItem(item) {
      if (this.invoked) {
        this.$store.commit(EDIT.MATERIAL.SELECT, item)
      }
    },

    play(item) {
      this.item = item
      this.dialog.play = true
    },
  },

  created() {
    this.getMaterials()
  },

}
</script>

<style lang="postcss">
@import "vars.css";

:root {
  --row-count: 6;
  --gut-count: calc(var(--row-count) - 1);
  --gut-width: 10px;
  --total-gut-width: var(--gut-count) * var(--gut-width);
}

.material-list {
  padding-bottom: 20px;

  &__item {
    float: left;
    width: calc((100% - var(--total-gut-width)) / var(--row-count));
    margin-bottom: var(--gut-width);

    &:not(:nth-child(6n + 1)) {
      margin-left: var(--gut-width);
    }
  }
}

.material-play {
  width: 350px;
  text-align: center;

  .el-dialog__header {
    padding-top: 10px;
  }

  .el-dialog__title {
    font-weight: normal;
    font-size: 14px;
  }

  .el-dialog__body {
    padding: 15px 0;
  }
}
</style>
