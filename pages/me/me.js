// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wwdc:false,
    wwdclist:[],
    scdc: false,
    scdclist: [],
    zdc: false,
    zdclist: [],
    cwdc: false,
    cwdclist: [],
    yzcd: '',
    sccd: '',
    cwcd: '',
    pm:'',
    //用户个人信息  
    userInfo: {
      avatarUrl: "",//用户头像  
      nickName: "",//用户昵称  
    }  
  },
  // 跳转到已掌握列表
  gotoz: function () {
    wx.navigateTo({
      url: '../zlist/zlist'
    })
  },
  // 跳转到收藏列表
  gotosc: function () {
    wx.navigateTo({
      url: '../sclist/sclist'
    })
  },
  // 跳转到错题本
  gotoct:function(){
    wx.navigateTo({
      url: '../ctlist/ctlist'
    })  
  },
  // 展示错误单词列表
  showcwdc: function (options) {
    // 获取单词同时控制显示
    // 把本地存储的token拿出来
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'token',
      success: function (res) {
        console.log(res)

        wx.request({
          url: "https://vczyh.top/wxapp/v1.0/user/words/appear/list/DESC/" + res.data.result,
          // data: data,
          method: 'POST',
          header: {
            // "Content-Type":"application/json"
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.message === "success") {
              wx.showToast({ // 显示Toast

                title: '获取错误单词成功',

                icon: 'success',

                duration: 1500

              })
              that.setData({

                cwdclist: res.data.result,
                cwdc: true,

              })

            }


          },
          fail: function (err) {
            console.log(err)
          }

        })


      },
      /**
       * 失败会调用
       */
      fail: function (res) {
        console.log(res)
      }
    })

  },
  // 展示已掌握单词
  showzdc: function (options) {
    // 获取单词同时控制显示
    // 把本地存储的token拿出来
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'token',
      success: function (res) {
        console.log(res)

        wx.request({
          url: "https://vczyh.top/wxapp/v1.0/user/words/remember/list/" + res.data.result,
          // data: data,
          method: 'POST',
          header: {
            // "Content-Type":"application/json"
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.message === "success") {
              wx.showToast({ // 显示Toast

                title: '获取已掌握单词成功',

                icon: 'success',

                duration: 1500

              })
              that.setData({

                zdclist: res.data.result,
                zcd: true,

              })

            }


          },
          fail: function (err) {
            console.log(err)
          }

        })


      },
      /**
       * 失败会调用
       */
      fail: function (res) {
        console.log(res)
      }
    })

  },
  // 展示未掌握单词
  showwwdc: function (options) {
    // 获取单词同时控制显示
    // 把本地存储的token拿出来
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'token',
      success: function (res) {
        console.log(res)

        wx.request({
          url: "https://vczyh.top/wxapp/v1.0/user/words/connect/list/" + res.data.result,
          // data: data,
          method: 'POST',
          header: {
            // "Content-Type":"application/json"
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.message ==="success"){
              wx.showToast({ // 显示Toast

                title: '获取未掌握单词成功',

                icon: 'success',

                duration: 1500

              })
              that.setData({

                wwdclist: res.data.result,
                wwdc: true,

              })

            }
            

          },
          fail: function (err) {
            console.log(err)
          }

        })


      },
      /**
       * 失败会调用
       */
      fail: function (res) {
        console.log(res)
      }
    })

  },
  // 展示收藏单词
  showscdc: function (options) {
    // 获取单词同时控制显示
    // 把本地存储的token拿出来
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'token',
      success: function (res) {
        console.log(res)

        wx.request({
          url: "https://vczyh.top/wxapp/v1.0/user/words/collect/list/" + res.data.result,
          // data: data,
          method: 'POST',
          header: {
            // "Content-Type":"application/json"
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.message === "success") {
              wx.showToast({ // 显示Toast

                title: '获取收藏单词列表成功',

                icon: 'success',

                duration: 1500

              })
              that.setData({

                scdclist: res.data.result,
                scdc: true,

              })

            }


          },
          fail: function (err) {
            console.log(err)
          }

        })


      },
      /**
       * 失败会调用
       */
      fail: function (res) {
        console.log(res)
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /**  
     * 获取用户信息  
     */
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    })
      // 开始获取初始数据
    
    wx.getStorage({
      //获取数据的key
      key: 'token',
      success: function (res) {
        console.log(res)
        // 获取错误单词数量
        wx.request({
          url: "https://vczyh.top/wxapp/v1.0/user/words/appear/list/DESC/" + res.data.result,
          // data: data,
          method: 'POST',
          header: {
            // "Content-Type":"application/json"
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.message === "success") {
              that.setData({

               
                cwcd: res.data.result.length,

              })

            }


          },
          fail: function (err) {
            console.log(err)
          }

        })
        // 获取掌握单词数量
        wx.request({
          url: "https://vczyh.top/wxapp/v1.0/user/words/remember/count/" + res.data.result,
          // data: data,
          method: 'POST',
          header: {
            // "Content-Type":"application/json"
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.message === "success") {
              that.setData({

                yzcd: res.data.result,
                

              })

            }


          },
          fail: function (err) {
            console.log(err)
          }

        })
        // 获取收藏单词数量
        wx.request({
          url: "https://vczyh.top/wxapp/v1.0/user/words/collect/list/" + res.data.result,
          // data: data,
          method: 'POST',
          header: {
            // "Content-Type":"application/json"
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.message === "success") {
              that.setData({

               
                sccd: res.data.result.length,

              })

            }


          },
          fail: function (err) {
            console.log(err)
          }

        })
      },
      /**
       * 失败会调用
       */
      fail: function (res) {
        console.log(res)
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