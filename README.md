# gy720.vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 风格指北

大多数代码风格上的约定与彩虹狗项目保持一致，请参阅彩虹狗项目的README文档

- 全局性图片资源防止在`src/assets`中，其余图片资源可视情况放置在`src/assets`的子目录下，或与相关组件放置在同一目录

- Http请求方法的调用已更换到彩虹狗项目的方式，组件内使用`this.$http`调用

- CSS中的颜色请尽可能使用全局定义好的变量。其中灰色使用本项目自定义的值，其余颜色使用element-ui预设的值。个别组件有特殊的颜色的，如果该颜色不具有全局性，可单独在该组件内定义。若认为有需要设置为全局色的，请与其他人员协商、确定

- element-ui没有线框型按钮，若需要此类按钮，请使用`btn-primary`格式的类

- 快捷改变文本颜色可使用`text-primary`格式的类，若需要悬浮变色效果，可使用`hover-primary`格式的类

- 清除浮动使用`clearfix`类；文本截断使用`ellipsis`类；重置列表元素默认样式使用`list`类（请尽可能把`@apply`规则替换为`list`类，`@apply`规则已确定不会进入CSS标准）

- 请尽可能为<img>元素添加`alt`属性。例如的用户头像，可使用用户名作为其`alt`属性。这个属性对图片的可用性至关重要。

- 在存在文本截断的地方，允许的情况下，请尽可能为元素添加`title`属性，使用完整的文本作为其值

## 备注
若需要同时打开新旧项目，可使用以下命令行启动服务器

```bash
# Window环境
set PORT=8090 & npm run dev

# Unix环境
PORT=8090 npm run dev
```
