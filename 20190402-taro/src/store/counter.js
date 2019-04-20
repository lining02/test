import { observable } from 'mobx'
import Taro from '@tarojs/taro'

const counterStore = observable({
  list: ['吃饭', '睡觉', '打豆豆'],
  counterStore(item) {
    this.list.push(item)
  },
  addItem(item) {
    console.log(this)
    this.list.push(item)
  },
  deleteItem(idx) {
    this.list.splice(idx, 1)
  },
  addItemAsync(item) {
    Taro.showLoading({
        title: 'loading'
    })
    setTimeout(() => {
        console.log(this)
        this.list.push(item)
        Taro.hideLoading()
    }, 1000)
  },
  deleteItemAsync(idx) {
    Taro.showLoading({
        title: 'loading'
    })
    setTimeout(() => {
        this.list.splice(idx, 1)
        Taro.hideLoading()
    }, 1000)
  }
})

export default counterStore