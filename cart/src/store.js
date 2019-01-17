import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cart: [],
    token: ''
  },
  mutations: {
    increment({ cart }, payload) {
      if (cart.length === 0) {
        cart.push(Object.assign({}, payload, { c: 1 }))
      }
      let flag = false, item = {}
      cart.forEach(o => {
        if (o.id == payload.id) {
          item = o
          flag = true
        }
      })
      if (flag) {
        item.c++;
      } else {
        cart.push(Object.assign({}, payload, { c: 1 }))
      }
    },
    decrease({ cart }, payload) {
      let item = {}
      cart.forEach(o => {
        if (o.id == payload.id) {
          item = o
        }
      })
      if (item.c > 1) {
        item.c--
      }
    }
  },
  getters: {
    count: state => {
      return state.cart.reduce((sum, o) => sum + o.c, 0)
    }
  },
  actions: {
    increment({ commit }, payload) {
      commit('increment', payload)
    },
    decrease({ commit }, payload) {
      commit('decrease', payload)
    }
  },
})
try {
  let cart = JSON.parse(localStorage.getItem('cart'))
  store.state.cart = cart
} catch (error) {
  throw error
}
store.subscribe((mutation, state) => {
  window.localStorage.setItem('cart', JSON.stringify(state.cart))
})
export default store