<template>
  <footer class="app-footer">
    <p>厦门光鱼信息科技有限公司 2015 - 2016 © All Rights Reserved. 闽ICP备15020969号</p>
    <p>友情链接：VR网</p>
  </footer>
</template>

<script>
export default {
  name: 'app-footer',
}
</script>

<style lang="postcss">
@import "vars.css";

.app-footer {
  height: var(--footer-height);
  padding: 20px 0;
  background-color: #e0dfdf;
  color: #9c9c9c;
  font-size: 12px;
  text-align: center;

  & > p {
    margin: 0;
    line-height: 25px;
  }
}
</style>
