<template>
  <div v-loading="loading">
    <ul class="material-list clearfix list" v-if="!isEmpty">
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

    <app-empty-body v-else>
      还没有上传素材哦……
    </app-empty-body>

    <el-pagination
      :small="isSmallScreen"
      v-if="list.last_page > 1"
      :page-size="list.per_page"
      :total="list.total"
      :current-page="list.current_page"
      @current-change="pageChange"
      layout="prev, pager, next"
      class="material-page"
    ></el-pagination>

    <!-- 编辑素材弹框 -->
    <el-dialog
      title="编辑素材"
      :visible.sync="dialog.edit"
      size="tiny"
      v-append-to-body
    >
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
      top="25%"
      custom-class="material-play"
      v-append-to-body
    >
      <audio ref="audio" preload="none" :src="$url.static(item.file_path)" autoplay controls></audio>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 高级编辑 - 素材列表
 * @author luminghuai | chenliangshan
 * @version 2017-09-01
 */

import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import AppUploadProgress from '@/components/AppUploadProgress'
import MaterialItem from './MaterialItem'
import material from '../mixins/material'
import uploadLimits from './uploadLimits'

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
      isRender: {
        play: false,
      },
    }
  },

  computed: {
    ...mapState({
      isSmallScreen: state => state.edit.material.isSmallScreen,
    }),

    limit() {
      return uploadLimits[this.activeType]
    },
  },

  watch: {
    'dialog.play': function dialogPlay(val) {
      this.$nextTick(() => {
        this.$refs.audio.pause()
        if (val) {
          if (!this.isRender.play) {
            this.isRender.play = true
          }
          setTimeout(() => {
            this.$refs.audio.play()
          }, 1000)
        } else {
          this.$refs.audio.currentTime = 0
        }
      })
    },
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
      const params = `?tag_id=${this.activeId}&page=${page}&per_page=${this.limit.perPage}`

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
  height: calc(100% - 20px);
  overflow-y: auto;

  &__item {
    float: left;
    width: calc((100% - var(--total-gut-width)) / var(--row-count));
    margin-bottom: var(--gut-width);

    &:not(:nth-child(6n + 1)) {
      margin-left: var(--gut-width);
    }
  }
}

.material-content .material-page {
  width: 100%;
  margin: 0;
  position: absolute;
  bottom: 10px;
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

@media screen and (max-height: 760px) {
  .material-content .material-page {
    bottom: 6px;
  }
}
</style>
