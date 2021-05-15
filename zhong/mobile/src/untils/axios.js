import axios from 'axios'
import { Toast } from 'antd-mobile'

// axios.defaults.baseURL = 'http://192.168.0.110:8099/'
axios.defaults.baseURL = 'https://zhongdianqiche.com:448/'

// http request 请求拦截器
axios.interceptors.request.use(config => {
  Toast.loading('拼命加载中...', 0, null, true)
  return config
})
// http response 响应拦截器
axios.interceptors.response.use(response => {
  Toast.hide()
  return response
})

export default axios
