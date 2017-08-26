<template>
  <transition name="edit-function-fade">
    <v-camera
      v-if="active.initialview"
      confirmButtonText="设置画面"
      @confirm="onConfirmInitialView"
      @cancel="close">
    </v-camera>
  </transition>
</template>

<script>
/**
 * 高级编辑 - 设置初始画面
 * @author huojinzhao
 */

import { mapState } from 'vuex'
import vCamera from './components/Camera'
import modal from '../../mixins/modal'
import esc from '../../mixins/esc'

export default {
  name: 'edit-functions__initialview',

  mixins: [modal, esc],

  components: {
    vCamera,
  },

  computed: {
    ...mapState({
      pano: state => state.edit.panoinfo,
      scene: state => state.edit.scene,
    }),
  },

  methods: {
    onConfirmInitialView() {
      /* eslint-disable no-underscore-dangle */
      const fov = window.__krpano.get('view.fov')
      const vlookat = window.__krpano.get('view.vlookat')
      const hlookat = window.__krpano.get('view.hlookat')
      const scene_id = this.scene.scene_id
      const pano_id = this.pano.id
      this.$http.post(
        '/make/scene/defaultangle',
        {
          fov,
          vlookat,
          hlookat,
          pano_id,
          scene_id,
        })
        .then(() => {
          this.closeModal('intialview')
          this.$message({
            type: 'success',
            message: '初始画面设置成功',
          })
        })
        .catch(() => {
          this.closeModal('initialview')
          this.$message({
            type: 'error',
            message: '初始画面设置失败',
          })
        })
    },

    close() {
      this.closeModal('initialview')
      this.openModal('control')
    },
  },
}
</script>

<style>

</style>
