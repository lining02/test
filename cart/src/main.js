import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import notice from '@/assets/notice.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import KHeader from '@/components/common/header.vue'
import KNotice from '@/components/common/notice.vue'
import { createAPI } from 'cube-ui'

createAPI(Vue, KNotice, true) // cube-ui自带的creteAPI
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.component('KHeader', KHeader)
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

// http response 拦截器
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
