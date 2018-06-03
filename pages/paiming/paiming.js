// pages/paiming/paiming.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  
  },
  // 转发按钮
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '分享我的背词排名',
      path: '/pages/learn/learn'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     // 播放音乐
    // const innerAudioContext = wx.createInnerAudioContext()
    // innerAudioContext.autoplay = true
    // innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    // innerAudioContext.onPlay(() => {
    //   console.log('开始播放')
    // })
    // innerAudioContext.onError((res) => {
    //   console.log(res.errMsg)
    //   console.log(res.errCode)
    // })
    wx.getLocation({
      type: 'gcj-02',
      altitude: true,
      success: res => {
        var latitude = res.latitude
        var longitude = res.longitude
        this.setData({
          mylatitude: latitude,
          mylongitude: longitude
        })
        console.log(this)
      },
    })
  
    console.log(this)
    wx.getStorage({
      key: 'token',
      success: res => {
        console.log(this)
        console.log(res.data)
        wx.request({
          url: 'https://vczyh.top/wxapp/v1.0/all/users/words/remember/count' ,
          method: 'POST',
          success: res => {
            console.log(res.data.result)
            this.setData({
              firstHeadUri: res.data.result[0].user.headUri,
              firstNickname: res.data.result[0].user.nickname
            })
            this.setData({
              items: res.data.result
            })
          }
        })
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