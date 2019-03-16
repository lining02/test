import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/element.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

axios.defaults.withCredentials = true // 允许携带cookie
axios.interceptors.request.use(function (config) {
  console.log(config);
  const token = sessionStorage.getItem('token')
  config.headers.common["Authorization"] = "Bearer " + token;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});