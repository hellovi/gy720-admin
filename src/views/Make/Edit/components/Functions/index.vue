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
    <!--vip信息-->
    <vip-info :data="pano"></vip-info>
    <!--限制视角-->
    <restrict-view v-if="active.restrictView"></restrict-view>

    <object-manager></object-manager>
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
import VipInfo from './VipInfo'
import RestrictView from './RestrictView'
import ObjectManager from './ObjectManager'


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
    VipInfo,
    RestrictView,
    ObjectManager,
  },

  computed: {
    ...mapState({
      pano: state => state.edit.panoInfo,
      active: state => state.edit.active,
    }),
  },
}
</script>
