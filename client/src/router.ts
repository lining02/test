import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: {name: 'home'}
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/home/index.vue'),
      children: [{
        path: 'home1',
        name: 'home1', 
        component: () => import('./views/home/home1.vue')
      }, {
        path: 'home2',
        name: 'home2', 
        component: () => import('./views/home/home2.vue')
      }, {
        path: 'home3',
        name: 'home3', 
        component: () => import('./views/home/home3.vue')
      }]
    },
    {
      path: '/f',
      name: 'f',
      component: () => import('./views/f.vue')
    },
    {
      path: '/about/:id',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/about.vue')
    }
  ]
})


export default router;
