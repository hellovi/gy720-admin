/**
 * @author luminghuai | chenliangshan
 * @version 2017-11-06
 */

/* eslint-disable no-underscore-dangle */

import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import './initKrpanoHotspot'

export default {

  computed: {
    ...mapState({
      sceneList: state => state.edit.scene.list,
    }),
  },

  methods: {
    /**
     * 编辑热点
     */
    krpanoEditHotspot(id) {
      this.title = '编辑'
      this.editInfo = this.spotsList.find(spot => spot.id === +id)
      const info = this.editInfo
      // 热点图标赋值 ???? // 这里还是得区分有无c-
      const activeIcon = { icon_id: info.icon_id,
        thumb: info.icon_id === '0' ? info.diy_src : info.icon_thumb,
        y: info.y,
        data_thumb: info.type_id === 1 ? this.sceneList.find(list => list.id === +info.data_id).thumb : '',
      }
      this.$store.commit(EDIT.HOTSPOTS.SELECT.ICON, activeIcon)
      this.openModal('hotspots')
      this.switchStep(2, info.type_id)
    },

    /**
     * 删除热点
     */
    krpanoDeleteHotspot(id, scene_id, pano_id) {
      this.$store.dispatch(EDIT.HOTSPOTS.REMOVE, { id, scene_id, pano_id })
        .then(() => {
          window.__krpano.removehotspot(`hotspot_${id}`)
          window.__krpano.removelayer(`hotspot_txt_${id}`)
          window.__krpano.hotspots[id] = null
          this.$message.success('删除成功')
        })
    },

    /**
     * 移动热点
     */
    moveHotspot(hotid, ath, atv) {
      const hotspot = window.__krpano.hotspots[hotid]
      hotspot.ath = ath
      hotspot.atv = atv
      this.$store.dispatch(EDIT.HOTSPOTS.UPDATE, { id: hotid, data: hotspot })
        .then(() => {
          this.$message.success('移动成功')
        })
        //  if (Math.floor(ath) != Math.floor(hotspot.ath) ||
        // Math.floor(atv) != Math.floor(hotspot.atv)) {
        //      hotspot.ath = ath;
        //      hotspot.atv = atv;
        //      hotspot.pano_id = vueData.pano_id;
        //  }
    },
  },

  mounted() {
    window.krpanoEditHotspot = this.krpanoEditHotspot
    window.krpanoDeleteHotspot = this.krpanoDeleteHotspot
    window.moveHotspot = this.moveHotspot
  },
}
