// polyfills
import 'core-js/es6/promise'
import 'core-js/es7/promise'
import 'core-js/fn/typed'
import 'core-js/es6/array'
import 'core-js/es7/array'
import 'core-js/es6/string'
import 'core-js/es7/string'
import 'core-js/fn/number/is-nan'
import '@/utils/base64'
import '@/utils/placeholders'

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
Vue.component(components.AppFormAlert.name, components.AppFormAlert)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
