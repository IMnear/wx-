// pages/paiming/paiming.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    first: '第一名'

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

    //随机背景图片
    wx.getStorage({
      key: 'backimage',
      success: res => {
        this.setData({
          backimage: res.data
        })
      },
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

    //获取当前登陆用户排名
    wx.getStorage({
      key: 'token',
      success: res => {
        console.log(res.data)
        wx.request({
          url: 'https://vczyh.top/wxapp/v1.0/user/ranking/' + res.data.result,
          method: 'POST',
          success: res => {
            console.log(res.data)

            this.setData({
              myMingci: res.data.result,
            })
          }
        })
      }
    })

    //获取当前登陆用户个人信息
    wx.getStorage({
      key: 'token',
      success: res => {
        console.log(res.data)
        wx.request({
          url: 'https://vczyh.top/wxapp/v1.0/userinfo/' + res.data.result,
          method: 'POST',
          success: res => {
            console.log(res.data)
            this.setData({
              myNickname: res.data.result.nickname,
              myHeadUri: res.data.result.headUri
            })
          }
        })
      }
    })

    //获取当前登陆用户斩的单词数
    wx.getStorage({
      key: 'token',
      success: res => {
        console.log(res.data)
        wx.request({
          url: 'https://vczyh.top/wxapp/v1.0/user/words/remember/count/' + res.data.result,
          method: 'POST',
          success: res => {
            console.log(res.data)
            this.setData({
              myRememberCount: res.data.result,
            })
          }
        })
      }
    })

    wx.request({
      url: 'https://vczyh.top/wxapp/v1.0/all/users/words/remember/count',
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