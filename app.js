//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://vczyh.top/wx/sns/jscode2session?appid=wx2181bad5b514b8ea' + '&secret=c30d6d949c7bbb5259ad8c9251f62cc0' + '&js_code=' + res.code + '&grant_type=authorization_code',
            data: {
              // code: res.code
              appid: 'wx2181bad5b514b8ea',
              secret: 'c30d6d949c7bbb5259ad8c9251f62cc0',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            method: 'GET',
            success: function (res) {
              console.log(res.data)
              wx.setStorage({
                key: "appid",
                data: res.data
              })

            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },


  globalData: {
    userInfo: null
  }
})