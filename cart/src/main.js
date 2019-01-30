import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

// cube-ui的createAPI的使用
import { createAPI } from 'cube-ui'
import Notice from '@/components/common/notice.vue'
createAPI(Vue, Notice, true)

// 自己写的CreteNotice
import notice from '@/servers/notice.js'
Vue.prototype.$notice = notice

// 公共组件
import KHeader from '@/components/common/header.vue'
Vue.component('KHeader', KHeader)

Vue.config.productionTip = false

// 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = `${store.state.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.dispatch('setToken', '')
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.fullPath }
          })
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
