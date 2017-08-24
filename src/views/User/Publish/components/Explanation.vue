<template>
  <dl class="explanation-list">
    <dt>2比1全景图</dt>
    <dd>图片比例：宽:高=<em>2:1</em>，例如：<em>6000×3000</em> 像素</dd>
    <dd>图片格式：<em>JPG/JPEG</em> 格式</dd>
    <dd>图片尺寸：宽度大于<em>3000</em>像素</dd>
    <dd>图片大小：<em>50MB</em> 以下</dd>
    <dd>一次可以选择多张（<em>20</em>张以下）图片上传</dd>
    <dt>鱼眼图</dt>
    <dd>图片要求：一次需上传 <em>8mm</em> 鱼眼镜头拍摄的 <em>4</em> 张鱼眼图</dd>
    <dd>图片比例：<em>16:9</em> / <em>4:3</em> / <em>2:3</em> / <em>1:1</em></dd>
    <dd>图片尺寸：宽度大于<em>1500</em>像素</dd>
    <dd>图片大小：<em>50MB</em> 以下</dd>
  </dl>
</template>

<style lang="postcss">
@import "vars.css";

.explanation-list {
  margin: 0;

  & > dt {
    margin-bottom: 0.4em;
    font-weight: 600;
  }

  & > dd {
    margin-left: 2em;
    line-height: 1.5;

    & + dt {
      margin-top: 1em;
    }
  }

  em {
    font-style: normal;
    color: var(--color-info);
  }
}
</style>
