// pages/paiming/paiming.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
          url: 'http://vczyh.top/wxapp/v1.0/all/users/words/remember/count' ,
          method: 'POST',
          success: res => {
            console.log(res.data.result)
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