import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
import Vuex from 'vuex'
import VueAMap from 'vue-amap'
import './reset.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.prototype.$qs = qs
Vue.use(Vuex)
Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
  key: '94b0bf7714d8924ca720bbc81bcddf5b',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
