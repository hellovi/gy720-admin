<template>
  <div class="works-worklist">
    <!-- 顶部选择栏 -->
    <div class="works-worklist__header">
      <el-checkbox
        :value="allWorksChecked"
        @click.native.prevent="onAllWorksCheck"
      >全选</el-checkbox>
      <a
        class="works-worklist__transfer link"
        v-if="selectedlist.length > 0"
        @click="modalOpen('cateTransfer')">~
        移动到其他分类
      </a>
    </div>

    <!-- 作品列表 -->
    <div class="works-worklist__content">
      <v-work-item
        v-for="work in worklist" :key="work.id"
        :item="work"  ref="worklist"
        @change="onWorkCheck"
      ></v-work-item>
    </div>

    <!-- 移动分类的弹窗 -->
    <!-- <v-modal v-if="modal.cateTransfer" @close="modal.cateTransfer = false" title="移动作品到其他分类" width="350">
      <div class="modal__transferCate">
        <div class="modal__transferCate__containerUp">
          <span class="modal__transferCate__tag">选择分类</span>
          <select v-model="toCateId" class="modal__transferCate__select">
            <option v-for="item in catelist" :value="item.id" :key="item.id">{{item.cate_name}}</option>
          </select>
        </div>
        <div class="modal__transferCate__containerBelow">
          <a class="modal__transferCate__submit" @click="cateTransfer">提交</a>
        </div>
      </div>
    </v-modal> -->
  </div>
</template>

<script>
/**
 * 个人作品 - 作品列表组件
 *
 * @author hjz
 */
import { mapState } from 'vuex'
import { WORKS } from '@/store/mutationTypes'
import vWorkItem from './WorkItem'

const { WORKLIST } = WORKS

export default {
  name: 'works-work-list',

  components: { vWorkItem },

  data: () => ({
    allWorksChecked: false,
    checkedWordsId: [],
    modal: { cateTransfer: false },
    toCateId: -1,
  }),

  computed: mapState({
    catelist: state => state.works.catelist,
    worklist: state => state.works.worklist,
    selectedlist: state => state.works.selectedlist,
  }),

  watch: {
    checkedWordsId(nv) {
      if (nv.length === this.worklist.length) {
        this.allWorksChecked = true
      } else {
        this.allWorksChecked = false
      }
    },
  },

  methods: {
    onAllWorksCheck() {
      this.allWorksChecked = !this.allWorksChecked
      // 作品单选联动
      this.$refs.worklist.forEach((work) => {
        // eslint-disable-next-line
        work.checked = this.allWorksChecked
      })
      // 选中作品处理
      if (this.allWorksChecked) {
        this.checkedWordsId = this.worklist.map(work => work.id)
      } else {
        this.checkedWordsId = []
      }
    },
    onWorkCheck(workId) {
      const idArr = this.checkedWordsId
      const workChecked = idArr.includes(workId)
      if (!workChecked) {
        this.checkedWordsId.push(workId)
      } else {
        this.checkedWordsId = idArr.filter(id => id !== workId)
      }
    },
    modalOpen(prop) {
      if (typeof prop === 'string') this.modal[prop] = true
    },
    cateTransfer() {
      this.$store.dispatch(WORKLIST.UPDATE, this.toCateId)
        .then(() => { this.modal.cateTransfer = false })
    },
  },

  updated() {
    const clen = this.worklist.length
    const slen = this.selectedlist.length
    if (clen > 0 && clen === slen) this.chooseAll = true
    else this.chooseAll = false
  },
}
</script>

<style>
@import 'vars.css';

:root {
  --border-split: 1px solid var(--border-color-split);
}

.works-worklist {
  height: 100%;
  padding-left: 40px;
  border-left: var(--border-split);

  &__choose {
    margin-top: 10px;
    border-bottom: var(--border-split);
    line-height: 36px;
    font-size: 0;

    &All {
      margin: 0;
      margin-left: 15px;
      vertical-align: middle;
      font-size: 14px;
      font-weight: normal;
    }
  }

  &__transfer {
    margin: 0;
    margin-left: 15px;
    vertical-align: middle;
    font-size: 14px;
    font-weight: normal;
    cursor: pointer;
  }
}

#chooseAll {
  margin: 0;
  vertical-align: middle;
}

.modal {
  &__transferCate {
    width: 100%;
    height: 100px;
    padding: 20px 40px;

    &__containerUp {
      display: block;
    }
    &__tag {
      width: 70px;
      margin-right: 10px;
    }

    &__select {
      /*display: inline-block;*/
      padding-left: 5px;
      width: 97px;
      height: 27px;
    }
    &__submit {
      display: inline-block;
      margin: 10px 0 0 70px;
      width: 60px;
      line-height: 26px;
      text-align: center;
      background-color: #3b9ff3;
      color: #fff;
      border-radius: 5px;
      border-width: 0;
      outline: none;
      cursor: pointer;

      &:hover {
        background-color: #1f78c3;
        color: #fff;
      }
    }
    &__containerBelow {
      padding: 8px 0;
    }
  }
}
</style>
