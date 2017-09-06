<template>
  <div class="edit-functions__scene-narrate">
    <section>
      <h3>
        <span>选择语音解说</span>
        <em class="narrate__note">（文件大小不超过15M，支持格式：MP3）</em>
      </h3>
      <el-button
        type="primary" size="small"
        @click="openMaterialAudio"
      >选择语音素材</el-button>
      <span
        class="narrate__sound-title"
      >
        {{data.commentate_sound_title}}
      </span>
    </section>

    <section>
      <h3>播放设置</h3>
      <el-form-item label="电脑版语音解说默认开启">
        <el-switch
          v-model="data.pc_commentate"
          on-text="开"
          :on-value="20"
          off-text="关"
          :off-value="10"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="手机版语音解说默认开启">
        <el-switch
          v-model="data.mobile_commentate"
          on-text="开"
          :on-value="20"
          off-text="关"
          :off-value="10"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="播放解说时打开背景音乐">
        <el-switch
          v-model="data.bg_music"
          on-text="是"
          :on-value="20"
          off-text="否"
          :off-value="10"
        >
        </el-switch>
      </el-form-item>
      <!-- 公共设置 -->
      <v-public-config
        v-model="public.narrate"
      ></v-public-config>
    </section>
  </div>
</template>

<script>
/**
 * 场景设置 - 功能微调
 *
 * @author luminghuai | huojinzhao
 */

import { EDIT } from '@/store/mutationTypes'
import vPublicConfig from './PublicConfig'

export default {
  name: 'edit-scene-setting-narrate',

  components: {
    vPublicConfig,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
    public: {
      type: Object,
      required: true,
    },
  },

  methods: {
    openMaterialAudio() {
      this.$store.dispatch(EDIT.MATERIAL.INVOKE, 'audio')
        .then(({ id, title }) => {
          this.data.commentate_sound = id
          this.data.commentate_sound_title = title
        })
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
