import Vue from 'vue'
import Router from 'vue-router'
import History from '@/assets/history.js'


Vue.use(Router)
Vue.use(History)

Router.prototype.goBack = function () {
  this.isBack = true
  this.back()
}
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/home.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./views/cart.vue')
    },
    {
      path: '/vip',
      name: 'vip',
      component: () => import('./views/vip.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/about.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },
  ]
})

router.afterEach((to, from) => {
  if (router.isBack) {
    router.isBack = false
    History.pop()
  } else {
    History.push(to.name)
  }
})
export default router