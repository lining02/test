import { observable, computed, autorun } from "mobx";
import Taro from "@tarojs/taro";

const cartStore = observable({
  list: Taro.getStorageSync('cartData') || [],
  addCart(item) {
    let idx = this.list.findIndex(o => {
      return o.id === item.id
    })
    console.log(idx)
    idx > -1 ? this.list[idx].count++ : this.list.push({...item, count: 1})
    Taro.showToast({
      title:'添加成功',
      duration:2000
    })
  },
  subCart(item) {
    let idx = this.list.findIndex(o => {
      return o.id === item.id
    })
    if(idx < 0) return
    const count = this.list[idx].count
    if(count < 2) return
    this.list[idx].count--
  }
});
const totalCount = computed(()=>cartStore.list.reduce((sum,a)=>sum+a.count,0))
const totalPrice = computed(()=>cartStore.list.reduce((sum,a)=>sum+a.count*a.price,0))
autorun(()=>{
  Taro.setTabBarBadge({
      index: 1,
      text: totalCount.get()+''
    })
    Taro.setStorageSync('cartData',cartStore.list.toJS())
    cartStore.totalPrice = totalPrice.get()
})
export default cartStore;
