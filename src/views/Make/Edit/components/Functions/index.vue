<template>
  <div class="edit-functions">
    <!--功能层-->
    <functions-logo></functions-logo>
    <functions-author></functions-author>
    <functions-setting></functions-setting>
    <functions-material></functions-material>
    <functions-group></functions-group>
    <functions-right-menu></functions-right-menu>
    <functions-bottom-menu></functions-bottom-menu>
    <functions-tour></functions-tour>
    <functions-hotspots></functions-hotspots>
    <functions-share></functions-share>
    <functions-scene></functions-scene>

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
import FunctionsRightMenu from './RightMenu'
import FunctionsBottomMenu from './BottomMenu'
import FunctionsTour from './Tour'
import FunctionsHotspots from './Hotspots'
import FunctionsShare from './Share'
import FunctionsScene from './Scene'


export default {
  name: 'edit',

  components: {
    FunctionsLogo,
    FunctionsAuthor,
    FunctionsSetting,
    FunctionsMaterial,
    FunctionsGroup,
    FunctionsRightMenu,
    FunctionsBottomMenu,
    FunctionsTour,
    FunctionsHotspots,
    FunctionsShare,
    FunctionsScene,

  },
}
</script>

<style lang="postcss">

</style>
