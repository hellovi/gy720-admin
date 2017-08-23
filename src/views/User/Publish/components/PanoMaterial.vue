<template>
  <div>
    <el-row class="pano-material">
      <el-col class="pano-material__left" :span="3">
        <dl class="pano-material__menu">
          <dt>全景相册</dt>
          <dd
            v-for="cate in cates"
            :key="cate.id"
            :class="{active: cate.id === currentId}"
            @click="selectCate(cate.id)"
          >{{ cate.name }}</dd>
        </dl>
      </el-col>

      <el-col class="pano-material__right" :span="21" v-loading="loading">
        <el-row class="pano-material__header">
          <el-col :span="4">
            <el-checkbox :value="allChecked" @change="handleCheckAll">全选</el-checkbox>
          </el-col>
          <el-col class="text-right" :span="14">
            <div class="pano-material__header__count">
              已选择<span class="text-primary">{{ checked.length }}</span>个场景
            </div>
          </el-col>
          <el-col :span="6">
            <el-input size="small" placeholder="请输入场景名称" icon="search" v-model="keyword"></el-input>
          </el-col>
        </el-row>

        <div class="pano-material__content">
          <el-row :gutter="20">
            <el-col v-for="pano in list.data" :key="pano.id" class="pano-material__item" :span="6">
              <el-checkbox :value="checked.includes(pano.id)" @change="val => handleCheck(val, pano.id)"></el-checkbox>
              <img :src="$url.host(pano.preview_image)" :alt="pano.name">
              <h4>{{ pano.name }}</h4>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-pagination
      v-if="list.last_page > 1"
      :page-size="list.per_page"
      :total="list.total"
      :current-page="list.current_page"
      @current-change="pageChange"
      layout="prev, pager, next"
    ></el-pagination>

    <div class="material-panos__submit" v-if="next">
      <el-button type="primary" @click="nextStep">下一步</el-button>
    </div>
  </div>
</template>

<script>
/**
 * 场景素材列表
 * @author luminghuai
 * @version 2017-08-23
 * @description 分类目前是错的，还没有文档
 */

import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'

export default {
  name: 'pano-material',

  props: {
    cates: {
      type: Array,
      required: true,
    },
    next: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      currentId: 1,
      checked: [], // 存放选中项的id
      keyword: '',
      loading: false,
    }
  },

  computed: {
    ...mapState({
      list: state => state.edit.material.materialData.panos,
    }),

    // 计算是否全选
    allChecked() {
      return this.checked.length && this.checked.length === this.list.data.length
    },

    // 计算选中的场景素材
    checkedPanos() {
      return this.list.data.filter(item => this.checked.includes(item.id))
    },

    params() {
      return `?source_scene_category_id=${this.currentId}`
    },
  },

  methods: {
    getPanos(page) {
      this.loading = true
      const params = page ? `${this.params}&page=${page}` : this.params
      this.$store.dispatch(EDIT.MATERIAL.INIT.PANOS, params)
        .then(() => {
          this.loading = false
        })
    },

    /**
     * 选择不同的分类后，重新获取列表并清空选中项
     */
    selectCate(id) {
      this.currentId = id
      this.getPanos()
      this.checked = []
    },

    pageChange(page) {
      this.getPanos(page)
    },

    handleCheck(event, id) {
      if (event.target.checked) {
        this.checked.push(id)
      } else {
        this.checked = this.checked.filter(item => item !== id)
      }
    },

    handleCheckAll() {
      if (this.allChecked) {
        this.checked = []
      } else {
        this.checked = this.list.data.map(item => item.id)
      }
    },

    nextStep() {
      this.$emit('select-panos', this.checkedPanos)
      this.checked = []
    },
  },

  created() {
    this.getPanos()
  },
}
</script>


<style lang="postcss">
@import "vars.css";

:root {
  --border: 1px solid var(--gray-extra-light);
}

.pano-material {
  border-bottom: var(--border);

  &__right {
    padding: 0 20px;
    border-left: var(--border);
  }

  &__header {
    padding: 8px 0;
    border-bottom: var(--border);
    line-height: 30px;

    &__count {
      margin-right: 1em;
    }
  }

  &__content {
    min-height: 600px;
    padding: 20px 0;
  }
}

.pano-material__menu {
  margin: 0;
  text-align: right;

  & > dt,
  & > dd {
    padding-right: 14px;
  }

  & > dt {
    border-bottom: var(--border);
    margin: 5px 0;
    font-size: 16px;
    font-weight: 700;
    line-height: 40px;
  }

  & > dd {
    position: relative;
    border-bottom: var(--border);
    margin: 0;
    line-height: 40px;
    cursor: pointer;

    &.active::before {
      content: "";
      position: absolute;
      left: 5px;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--color-primary);
    }
  }
}

.pano-material__item {
  position: relative;
  height: 120px;

  .el-checkbox {
    position: absolute;
    top: 5px;
    left: 15px;
  }

  & > img {
    width: 100%;
    height: 100%;
  }

  & > h4 {
    position: absolute;
    bottom: 0;
    left: 10px;
    width: calc(100% - 20px);
    padding-left: 0.6em;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-weight: normal;
    line-height: 22px;
  }
}
</style>
