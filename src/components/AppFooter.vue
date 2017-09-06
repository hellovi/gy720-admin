<template>
  <footer class="app-footer">
    <p>
      <a href="/">厦门光鱼信息科技有限公司</a>
      <a>2015 - 2017 © All Rights Reserved.</a>
      <a href="http://www.miitbeian.gov.cn" rel="nofollow" target="_blank">闽ICP备15020969号</a>
	    <a href="tel:0592-5995993">联系电话：0592-5995993</a>
	    <a href="https://jq.qq.com/?_wv=1027&k=41MWcRz" target="_blank">QQ群：494461194</a>
    </p>
    <p>
      <a href="http://www.hiavr.com" target="_blank">友情链接：VR网</a>
    </p>
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

    > a {
      margin-right: 10px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
