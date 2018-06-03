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
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx2181bad5b514b8ea' + '&secret=c30d6d949c7bbb5259ad8c9251f62cc0' + '&js_code=' + res.code + '&grant_type=authorization_code',
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
              getToken(res.data)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    var that = this;
    console.log(that)

    //获取token
    function getToken(item) {
      return new Promise(function (resolve, reject) {
        console.log(that)
        var _that = that;
        if (item.openid) {
          // 获取用户信息
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    _that.globalData.userInfo = res.userInfo
                    console.log(_that.globalData.userInfo)
                    var nickName = res.userInfo.nickName;
                    var headUri = res.userInfo.avatarUrl;
                    var locationName = res.userInfo.city
                    wx.getLocation({
                      type: 'gcj02',
                      altitude: true,
                      success: res => {
                        var latitude = res.latitude
                        var longitude = res.longitude
                        wx.request({
                          url: 'https://vczyh.top/wxapp/v1.0/signin',
                          data: {
                            wxappOpenid: item.openid,
                            nickname: nickName,
                            headUri: headUri,
                            locationName: locationName,
                            locationLatitude: latitude,
                            locationLongitude: longitude
                          },
                          method: 'POST',
                          success: function (res) {
                            wx.setStorage({
                              key: "token",
                              data: res.data
                            })
                          }
                        })
                      },
                    })
                  }
                })
              }
            }
          })
        }

      })
    }

    // wx.showModal({
    //   title: '微信授权',
    //   content: '微信小程序申请获得以下权限：',
    //   confirmText: "允许",
    //   cancelText: "拒绝",
    //   success: function (res) {
    //     console.log(res);
    //     if (res.confirm) {
    //       console.log('用户点击主操作')
    //       // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     console.log(res)
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           console.log(res)
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
    //     } else {
    //       console.log('用户点击辅助操作')
    //     }
    //   }
    // });

  },
  globalData: {
    userInfo: null
  }
})