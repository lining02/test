import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import { Provider } from '@tarojs/mobx'

import './app.scss'


import counterStore from './store/counter'
import cartStore from './store/cart'

const store = {
  counterStore, cartStore
}
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

global.env = process.env.TARO_ENV
global.getData = url => {
  Taro.request({
    url 
  }).then(response => {
    return response.data
  })
}

class App extends Component {

  config = {
    pages: [
      // 20190405练习的购物车页面
      'pages/home/index', // 首页
      'pages/mine/index', // 我的
      'pages/cart/cart', // 购物车
      'pages/index/index', // 20190402 练习的页面 state管理数据
      'pages/about/about', // 20190402 练习的页面 mobx管理数据
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#000',
      selectedColor: '#f00',
      backgroundColor: '#fff',
      borderStyle: 'black',
      list: [{
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: "./assets/home.png",
        selectedIconPath: "./assets/home-active.png",
      }, {
        pagePath: 'pages/cart/cart',
        text: '购物车',
        iconPath: "./assets/cart.png",
        selectedIconPath: "./assets/cart-active.png",
      }, {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: "./assets/user.png",
        selectedIconPath: "./assets/user-active.png",
      }]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
