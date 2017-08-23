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

## 功能分块

- 首页
- 720全景
  - 作品列表 (周，静态已完成，有旧模板，新模板未套)
  - 作品详情 (周，指的是预览吗？)
- 摄影师
  - 摄影师列表 (周，静态已完成，有旧模板，新模板未套)
  - 摄影师主页 (周，静态已完成，有旧模板，新模板未套，缺少关注和取消关注功能)
    - 联系摄影师  (周，需求未知)
- 话题
  - 普通话题 (周，静态已完成，有旧模板，新模板未套)
  - 需求话题 (周，静态已完成，有旧模板，新模板未套，新需求未改)
  - 我的收藏 (周，静态已完成，有旧模板，新模板未套)
  - 我的评论 (周，静态已完成，有旧模板，新模板未套)
- 搜索
- 服务
- 个人中心
  - 认证（周，静态完成）
  - 积分体系（卢，静态完成）
  - 购买流程（周，静态完成）
  - 最新发布的作品 (霍，已完成，缺收藏接口)
  - 我的收藏（霍，已完成，缺收藏接口）
  - 我的关注（霍，可测试，已完成）
  - 我的粉丝（霍，可测试，已完成）
  - 我的消息（卢，静态完成）
  - 数据统计（霍，静态完成）
  - 我的作品（霍，基本完成，等到复用我的消息“说一说”组件）
  - - 离线下载（霍，静态完成，缺接口）
  - 账号管理（陈，静态完成）
- 高级编辑
  - 发布流程（卢，静态完成）
  - logo更换
  - 隐藏作者
  - 限制视角
  - 初始画面（霍，已完成）
  - 分享（霍，已完成）
  - 场景分组(杨，计划8.25)
  - 作品设置
  - 素材库(杨，计划8.23)
  - 视角
  - 皮肤
  - 分享二维码隐藏
  - 右侧/底部菜单
  - 导览图（霍，静态完成）
  - 热点添加(杨，计划8.23)
  - 场景的添加(杨，计划8.23)
  - 场景的编辑(杨，计划8.24)
    - 基本信息(杨，计划8.24)
    - 场景特效(杨，新增，涉及krpano，计划8.28)
    - 补天补地(杨，新增，涉及krpano，计划8.29)
    - 语音解说(杨，新增，涉及krpano，计划8.31)
  - 虚拟拍照（霍，已完成）

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


## 代码逻辑约定

### 列表mixin
需要翻页的地方，可以使用`list`这个公共mixin，此mixin要求引用它的组件遵守以下几个约定：

- 必须具有一个叫做`getData`的方法用来获取列表数据，此方法将拿到一个`route`对象作为参数，此方法必须返回`promise`对象，mixin只帮你调用此方法，不帮你处理具体的接口请求
- 无论接口请求到的数据存不存放于`store`中，最终在此组件里必须能使用`this.list`获取到这些数据
- 遵守约定的情况下，对于翻页组件可以直接复制以下代码

```html
  <el-pagination
    v-if="list.last_page > 1"
    :page-size="list.per_page"
    :total="list.total"
    :current-page="list.current_page"
    @current-change="pageChange"
    layout="prev, pager, next"
  ></el-pagination>
```

- 若需要显示无数据时的提示，mixin提供了`this.isEmpty`来判断是否显示这个提示，如

```html
  <div v-if="isEmpty" class="empty">
    <div>您暂时还没有任何积分变动哦……</div>
  </div>
```

## 备注

若需要同时打开新旧项目，可使用以下命令行启动服务器

```bash
# Window环境
set PORT=8090 & npm run dev

# Unix环境
PORT=8090 npm run dev
```
