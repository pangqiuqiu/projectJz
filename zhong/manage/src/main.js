import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 全局样式
import './assets/css/global.css'
// 导入base64加密
import Base64 from './assets/js/base64.js'
// 请求
import axios from 'axios'
// 推拽上传
import VueDND from 'awe-dnd'
// 百度地图
import BMap from 'vue-baidu-map'
Vue.use(BMap, {
  ak: 'CAZMw4MUG2cz0r8XMNyDGsGWNbHDIvEP'
})
// es6
require('es6-promise').polyfill()
require('es6-promise/auto')
// 配置请求的跟路径
//axios.defaults.baseURL = 'https://zhongdianqiche.com:447/'
//axios.defaults.baseURL = 'https://zhongdianqiche.com:440/'
axios.defaults.baseURL = 'http://localhost:8091/'
//axios.defaults.baseURL = 'http://192.168.0.120:8091/'
// 请求拦截器
axios.interceptors.request.use(config => {
  if(window.sessionStorage.getItem('simulationToken')) {
    config.headers.token = window.sessionStorage.getItem('simulationToken')
  } else {
    config.headers.token = window.sessionStorage.getItem('token')
  }
  return config
})
// 响应拦截器
axios.interceptors.response.use(config => {
  if (config.status === 250) {
    window.location.href = '/login'
    alert('登录信息已过期')
    window.localStorage.clear()
    window.sessionStorage.clear()
    return Promise.reject(config.data)
  } else if (config.status === 260) {
    alert('权限不足')
    return config
  } else {
    return config
  }
})
Vue.prototype.$http = axios
Vue.prototype.$Base64 = Base64
Vue.use(ElementUI)
Vue.use(VueDND)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    store.commit('addMenu', router)
  }
}).$mount('#app')
