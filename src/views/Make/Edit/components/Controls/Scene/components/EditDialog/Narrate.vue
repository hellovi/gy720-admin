<template>
  <div class="edit-functions__scene-narrate">
    <el-form-item class="edit-setting-music" label="解说音频文件" label-width="7em">
      <el-input v-model="form.commentate_sound_title" readonly placeholder="未选择"></el-input>
      <el-button type="danger" @click="removeMusic" v-show="form.commentate_sound">删除</el-button>
      <el-button type="primary" @click="openMaterialAudio">{{ form.commentate_sound ? '更换' : '选择素材' }}</el-button>
    </el-form-item>

    <div class="clearfix">
      <el-form-item class="float-left" label="电脑版播放解说" label-width="8em">
        <el-switch
          v-model="form.pc_commentate"
          on-text="开启"
          :on-value="20"
          off-text="关闭"
          :off-value="10"
        >
        </el-switch>
      </el-form-item>

      <el-form-item class="float-left" label="手机版播放解说" label-width="10em">
        <el-switch
          v-model="form.mobile_commentate"
          on-text="开启"
          :on-value="20"
          off-text="关闭"
          :off-value="10"
        >
        </el-switch>
      </el-form-item>

      <el-form-item class="float-left" label="播放解说时同时播放背景音乐" label-width="16em">
        <el-switch
          v-model="form.bg_music"
          on-text="开启"
          :on-value="20"
          off-text="关闭"
          :off-value="10"
        >
        </el-switch>
      </el-form-item>
    </div>

    <apply-options v-model="form.narrate"></apply-options>
  </div>
</template>

<script>
/**
 * 场景设置 - 功能微调
 *
 * @author luminghuai | huojinzhao
 * @version 2017-09-08
 */

import { EDIT } from '@/store/mutationTypes'
import ApplyOptions from './ApplyOptions'

export default {
  name: 'edit-scene-setting-narrate',

  components: {
    ApplyOptions,
  },

  props: {
    form: {
      type: Object,
      required: true,
    },
  },

  methods: {
    openMaterialAudio() {
      this.$store.dispatch(EDIT.MATERIAL.INVOKE, 'audio')
        .then(({ id, title }) => {
          this.form.commentate_sound = id
          this.form.commentate_sound_title = title
        })
    },

    removeMusic() {
      this.form.commentate_sound = null
      this.form.commentate_sound_title = null
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.edit-functions__scene-narrate {

  & .narrate {

    &__note {
      font-size: 12px;
      font-weight: normal;
      color: var(--gray);
    }

    &__sound {

      &-title {
        margin-left: 30px;
      }
    }
  }
}
</style>
