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
import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import AppUploadProgress from '@/components/AppUploadProgress'
import MaterialItem from './MaterialItem'

const AppFileUpload = () => import('@/components/AppFileUpload')

export default {
  name: 'edit-material-list',

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
      dialog: {
        edit: false,
        play: false,
      },

      options: [
        { id: 1, name: 'LOGO' },
        { id: 2, name: '平面地图' },
        { id: 7, name: '热点图标' },
        { id: 3, name: '朋友圈小图标' },
        { id: 4, name: '天空/地面广告' },
      ],

      item: {}, // 当前活动item（被编辑、被试听）

      form: {
        title: '',
        tag_id: 1,
      },
      rules: {
        title: [
          { required: true, trigger: 'blur', message: '素材名称不能为空' },
        ],
      },
    }
  },

  computed: {
    ...mapState({
      invoked: state => state.edit.material.invoked,
    }),

    list() {
      return this.$store.state.edit.material.materialData[this.activeType]
    },

    isEmpty() {
      return !this.loading && (!this.list.data || !this.list.data.length)
    },

    // 判断被编辑的素材能够移动到其它类型，只有this.options中的类型才可以互相移动
    canMove() {
      return this.options.some(option => option.id === this.form.tag_id)
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

      const url = this.activeType === 'objects'
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

    editItem(item) {
      this.item = item
      this.form = {
        title: item.title,
        tag_id: item.tag_id,
      }
      this.dialog.edit = true
    },

    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$store.dispatch(EDIT.MATERIAL.UPDATE, {
            id: this.item.id,
            data: this.form,
            isMove: this.item.tag_id !== this.form.tag_id,
          })
            .then(() => {
              this.dialog.edit = false
              this.$message.success('操作成功')
            })
        }
      })
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
