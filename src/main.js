import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false
import BaiduMap from 'vue-baidu-map'
// 按需引入vant
import './utils/vant'
// 引入公共样式
import './assets/common.css';
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'qkbK7mOzwHOzc2ku9m42FMMyrPzhD68x'
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
