import Vue from 'vue'
import router from './router'
import store from './store'
// 导入组件库
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element'
// 导入字体图表
import './assets/font/iconfont.css'
// 导入全局样式
import './assets/css/global.css'
import App from './App.vue'
// 百度地图
import BMap from 'BMap'
// 高德地图
import VueAMap from 'vue-amap'
// 导入axios
import axios from 'axios'

Vue.use(BMap, {
  ak: 'zSWXQE2ayAGYcC50PTAS77Tjpws8xPgu'
})
Vue.use(VueAMap)
Vue.prototype.$http = axios
// 配置请求根路径
axios.defaults.baseURL = 'https://zhongdianqiche.com:446/'
// axios.defaults.baseURL = 'http://192.168.0.120:8090/'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
