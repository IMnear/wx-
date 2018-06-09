// pages/first/frist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUri: '',
    storageContent: ""
  },
  go: function () {
    console.log('gogo')
    // 获取用户信息&&token
    wx.getSetting({
      success: res => {
        console.log(res)
        wx.getUserInfo({
          success: res => {
            console.log(res)
            var nickName = res.userInfo.nickName;
            var headUri = res.userInfo.avatarUrl;
            var locationName = res.userInfo.city
            wx.getStorage({
              key: 'appid',
              success: res => {
                var openid = res.data.openid;

                wx.getLocation({
                  type: 'gcj02',
                  success: function (res) {
                    var latitude = res.latitude
                    var longitude = res.longitude
                    wx.request({
                      url: 'https://vczyh.top/wxapp/v1.0/signin',
                      data: {
                        wxappOpenid: openid,
                        nickname: nickName,
                        headUri: headUri,
                        locationName: locationName,
                        locationLatitude: latitude,
                        locationLongitude: longitude
                      },
                      method: 'POST',
                      success: function (res) {
                        console.log('1111')
                        wx.setStorage({
                          key: "token",
                          data: res.data
                        })
                        setTimeout(function () {
                          wx.switchTab({
                            url: '../learn/learn'
                          })
                        }, 1);

                      },
                      fail: function (err) {
                        console.log(err)
                      }
                    })
                  }
                })

              }
            })

            // 可以将 res 发送给后台解码出 unionId
            //  this.globalData.userInfo = res.userInfo
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })

      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 取出token看看是否登录
    wx.getStorage({
      //获取数据的key
      key: 'token',
      success: function (res) {
        // 有token直接到首页
        console.log('goto首页')
        wx.switchTab({
          url: '../learn/learn'
        })

      },
      /**
       * 失败会调用
       */
      fail: function (res) {
        console.log(res)
      }
    })
    var that = this;
    // 随机获得单词和背景图
    wx.request({
      url: "https://vczyh.top/wxapp/v1.0/wordAndImage",
      data: {
        // code: res.code
      },
      method: 'GET',
      header: {
        // "Content-Type":"application/json"
      },
      success: function (res) {
        wx.setStorage({
          key: 'backimage',
          data: res.data.result.image.imageUri,
        })
        console.log(res.data, "返回结果")
        if (res.data.message === "success") {
          that.setData({
            imageUri: res.data.result.image.imageUri,
            storageContent: res.data.result.word
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }

    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})