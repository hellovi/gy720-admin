<template>
  <div class="edit-functions">
    <!--功能层-->
    <logo></logo>
    <author></author>
    <setting></setting>
    <material v-if="active.material"></material>
    <group></group>
    <edit-menu></edit-menu>
    <tour></tour>
    <hotspots></hotspots>
    <share :data="pano"></share>
    <scene></scene>
    <snapshot></snapshot>
    <initialview></initialview>
    <!--限制视角-->
    <restrict-view v-if="active.restrictView"></restrict-view>

    <!--物品3D-->
    <rotate-manager></rotate-manager>
    <!--物品3D-预览-->
    <rotate-view></rotate-view>

    <edit-summary></edit-summary>
  </div>
</template>

<script>
/**
 * 高级编辑 - 功能
 * @version 2017-08-14
 */
import { mapState } from 'vuex'

import Logo from './Logo'
import Author from './Author'
import Setting from './Setting'
import Material from './Material'
import Group from './Group'
import EditMenu from './Menu'
import Tour from './Tour'
import Hotspots from './Hotspots'
import Share from './Share'
import Scene from './Scene'
import Snapshot from './Snapshot'
import Initialview from './Initialview'
import RestrictView from './RestrictView'
import RotateManager from './RotateManager'
import RotateView from './RotateManager/components/RotateView/'
import EditSummary from './Summary'

export default {
  name: 'edit',

  components: {
    Logo,
    Author,
    Setting,
    Material,
    Group,
    EditMenu,
    Tour,
    Hotspots,
    Share,
    Scene,
    Snapshot,
    Initialview,
    RestrictView,
    RotateManager,
    RotateView,
    EditSummary,
  },

  computed: {
    ...mapState({
      pano: state => state.edit.panoInfo,
      active: state => state.edit.active,
    }),
  },
}
</script>
