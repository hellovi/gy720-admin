<template>
  <div class="edit-functions__material__manage">
    <el-dialog
      title="管理3D物品"
      :visible.sync="active"
      top = "5%"
    >
      <div>物品3DS</div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 高级编辑 - 素材库管理3D物品
 * @version 2017-08-25
 */
import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
// import { materialImages, materialImageText, materialObject3D } from './components'

export default {
  name: 'edit-functions__material--manage3d',

  components: {},

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {}
  },

  computed: {
    ...mapState({
      type: state => state.edit.material.type,
    }),

    active: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },

  methods: {
    changeType(type) {
      this.$store.commit(EDIT.MATERIAL.TAB.SELECT, { type })
    },
  },

}
</script>

<style lang="postcss">
@import "vars.css";

.edit-functions__material {
  &__manage {
    .el-dialog {
      width: 80%;
      height: 90%;
    }
  }
}
</style>
