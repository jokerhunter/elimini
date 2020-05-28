import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入axios
import axios from 'axios'
import { getData, setData, removeData, clearData } from './utils/storage'
import { kilochange, exchangeTime } from './utils/filters'

import './assets/css/style.css'
import './assets/css/night-mode.css'
import './assets/css/framework.css'
import './assets/css/icons.css'
import './assets/js/framework'

import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8081'
axios.defaults.withCredentials = true
Vue.config.productionTip = false
// axios.interceptors.request.use(
//   config => {
//     if (config.url.indexOf('login') < 0 && config.url.indexOf('register')) {
//       const token = getData('token')
//       if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
//         // config.headers.Authorization = `token ${getData('accessToken')}`
//         config.headers.token = token
//       } else {
//         // router.push('/login')
//         // throw SyntaxError('未登录，请重新登录')
//       }
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   }
// )

Vue.prototype.$tokenStorage = { getData, setData, removeData, clearData }
Vue.prototype.$filterMethods = { kilochange, exchangeTime }

Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
