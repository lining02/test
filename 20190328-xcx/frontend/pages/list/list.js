//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    goods: [] // 商品列表
  },
  onLoad: function () {
    console.log('生命周期回调—监听页面加载 ...')
    this.getList()
  },
  // 获取数据库列表
  getList() {
    const db = wx.cloud.database()
    const self = this
    db.collection('goods').get({
      success(res) {
        console.log(res.data, this)
        self.setData({goods: res.data})
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  onPullDownRefresh() {
    console.log('下拉刷新....')
  },
  onReachBottom() {
    console.log('触底刷新....')
  },
  onReady() {
    console.log('生命周期回调—监听页面初次渲染完成...')
  },
  onShow() {
    console.log('生命周期回调—监听页面显示...')
  },
  onHide() {
    console.log('生命周期回调—监听页面隐藏...');
  },
  onUnload() {
    console.log('生命周期回调—监听页面卸载....')
  },
  
  onShareAppMessage() {
    console.log('用户点击右上角转发...')
  },
  onPageScroll() {
    console.log('页面滚动触发事件的处理函数...')
  },
  onResize() {
   console.log('页面尺寸改变时触发，详见 响应显示区域变化...')
  },
  onTabItemTap(item) {
    console.log('当前是 tab 页时，点击 tab 时触发...')
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  customData: {
    hi: 'MINA'
  }
})
