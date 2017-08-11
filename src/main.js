import Vue from 'vue'
import ElementUI from 'element-ui'
import 'normalize.css'
import 'element-ui/lib/theme-default/index.css'
import 'intersection-observer'
import App from './App'
import router from './router'
import store from './store'
import { Http, Url } from './utils'
import * as components from './components'

Vue.config.productionTip = false

Vue
  .use(Http)
  .use(Url)
  .use(ElementUI)

Vue.component(components.AppTab.name, components.AppTab)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
