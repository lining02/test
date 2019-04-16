//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo:  wx.getStorageSync('userInfo') || {}, // 用户信息
    goodName: '', // 新增的商品的名称
    uploadSrc: '' // 上传的图片的链接
  },
  
  // 求和
  sum: function(e) {
    console.log(e, wx, wx.cloud)
    wx.cloud.callFunction({
      name: 'sum',
      data: {
        a: 1,
        b: 2,
      },
      success(res) {
        console.log(res.result.sum) // 3
      },
      fail: console.error
    })
  },

  // 登陆，获取用户信息
  getUserInfo: function(e) {
    const { userInfo } = e.detail
    const self = this
    console.log(e, wx, wx.cloud)
    wx.cloud.callFunction({
      name: 'login',
      success(res) {
        const { openid, appid } = res.result
        Object.assign(userInfo, { openid, appid })
        self.setData({
          userInfo
        })
        wx.setStorageSync('userInfo', userInfo)
      },
      fail(err) {
        console.log(err)
      }
    })
  },

  // 新增商品的商品名称
  setName(e) {
    this.goodName = e.detail.value
  },
  // 新增的商品，上传至数据库
  addGood() {
    const db = wx.cloud.database()
    db.collection('goods').add({
      data: {
        name: this.goodName,
        id: Math.ceil(Math.random() * 100)
      },
      success(res) {
        console.log(res)
      }
    })
  },

  // 上传图片
  upload() {
    wx.chooseImage({
      success: chooseResult => {
        wx.showLoading({ title: '上传中'})
        wx.cloud.uploadFile({
          cloudPath: 'logo.jpg', // 上传的图片的名称
          filePath: chooseResult.tempFilePaths[0], // 上传的文件列表的第一张图
          success: res => {
            this.setData({
              uploadSrc: res.fileID
            })
            console.log('上传成功', res)
          },
          complete: res => {
            wx.hideLoading()
          }
        })
      },
    })
  }
})
