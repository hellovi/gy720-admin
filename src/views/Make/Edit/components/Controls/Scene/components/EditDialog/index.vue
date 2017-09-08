<template>
  <el-dialog
    :visible="visible"
    title="场景设置"
    size="large"
    :before-close="close"
  >
    <!-- 标签切换 -->
    <nav class="edit-setting__nav">
      <ul class="list clearfix">
        <li
          :class="{ active: activeTabIndex === index}"
          v-for="(tab, index) in tabs" :key="tab"
          @click="activeTabIndex = index"
        >{{ tab }}</li>
      </ul>
    </nav>

    <!-- 表单主体 -->
    <el-form class="edit-setting__form">
      <app-form-alert :contents="errors"></app-form-alert>

      <v-basic
        v-show="activeTabIndex === 0"
        :form="form"
      ></v-basic>
      <v-special-effect
        v-show="activeTabIndex === 1"
        :form="form"
      ></v-special-effect>
      <v-supplement
        v-show="activeTabIndex === 2"
        :form="form"
      ></v-supplement>
      <v-narrate
        v-show="activeTabIndex === 3"
        :form="form"
      ></v-narrate>
    </el-form>

    <div slot="footer" class="edit-setting__footer">
      <el-button type="primary" :loading="loading" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
/**
 * 高级编辑 - 场景编辑
 * @author huojinzhao | luminghuai
 * @version 2017-09-08
 */

import { mapGetters } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import modal from '../../../../../mixins/modal'
import vBasic from './Basic'
import vSpecialEffect from './SpecialEffect'
import vSupplement from './Supplement'
import vNarrate from './Narrate'

export default {
  mixins: [modal],

  components: {
    vBasic,
    vSpecialEffect,
    vSupplement,
    vNarrate,
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    scene: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      tabs: ['基本信息', '场景特效', '补天补地', '语音解说'],
      activeTabIndex: 0,

      form: {
        ...this.scene,
      },
      loading: false,

      errors: {},
    }
  },

  computed: {
    ...mapGetters(['applyToAll']),
  },

  watch: {
    visible(val) {
      if (!val) {
        this.activeTabIndex = 0
      }
    },

    scene(val) {
      this.form = {
        ...this.form,
        ...val,
      }
    },
    applyToAll(val) {
      this.form = {
        ...this.form,
        ...val,
      }
    },
  },

  methods: {
    /**
     * 关闭对话框
     */
    close() {
      this.$emit('update:visible', false)
    },

    /**
     * 提交表单
     * 提交成功后，重新请求场景列表数据
     */
    submit() {
      this.loading = true
      this.errors = {}

      const { pano_id } = this.$route.query
      this.$http.put(`/user/scene/${this.form.id}?pano_id=${pano_id}`, this.form)
        .then(() => {
          this.$store.dispatch(EDIT.SCENE.INIT, pano_id)

          this.close()
          this.$message.success('操作成功')
        })
        .catch((errors) => {
          this.errors = errors
        })
        .then(() => {
          this.loading = false
        })
    },
  },
}
</script>
