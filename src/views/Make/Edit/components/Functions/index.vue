<template>
  <div class="edit-functions">
    <!--功能层-->
    <functions-logo></functions-logo>
    <functions-author></functions-author>
    <functions-setting></functions-setting>
    <functions-material></functions-material>
    <functions-group></functions-group>
    <functions-menu></functions-menu>
    <functions-tour></functions-tour>
    <functions-hotspots></functions-hotspots>
    <functions-share></functions-share>
    <functions-scene></functions-scene>
    <functions-snapshot></functions-snapshot>
  </div>
</template>

<script>
/**
 * 高级编辑 - 功能
 * @version 2017-08-14
 */
import FunctionsLogo from './Logo'
import FunctionsAuthor from './Author'
import FunctionsSetting from './Setting'
import FunctionsMaterial from './Material'
import FunctionsGroup from './Group'
import FunctionsMenu from './Menu'
import FunctionsTour from './Tour'
import FunctionsHotspots from './Hotspots'
import FunctionsShare from './Share'
import FunctionsScene from './Scene'
import FunctionsSnapshot from './Snapshot'


export default {
  name: 'edit',

  components: {
    FunctionsLogo,
    FunctionsAuthor,
    FunctionsSetting,
    FunctionsMaterial,
    FunctionsGroup,
    FunctionsMenu,
    FunctionsTour,
    FunctionsHotspots,
    FunctionsShare,
    FunctionsScene,
    FunctionsSnapshot,
  },
}
</script>

<style lang="postcss">

</style>
