import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'

export default {
  computed: {
    ...mapState({
      active: state => state.edit.active,
    }),
  },

  methods: {
    openModal(name) {
      this.$store.commit(EDIT.MODAL.OPEN, name)
    },

    closeModal(name) {
      this.$store.commit(EDIT.MODAL.CLOSE, name)
    },

    /**
     * 其他组件唤起素材弹框
     *
     * @param {String} type -素材的类型
     * @description type: 'panos','logos','tours','hotspots','icons'
     * @description type: 'ads','thumbs','infos','objects','audios','others'
     * @param {String} source - 素材来源
     * @description source: 'tour','wechat','menu','hotspot','hotspot3d'
     */
    openMaterModal({ type, source }) {
      this.$store.dispatch(EDIT.MATERIAL.TAB.SELECT, { type, source })
    },
  },
}
