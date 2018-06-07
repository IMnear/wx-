// pages/learn/learn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accounts: [],
    accountIndex: 0,
    accountsto: [],
    accountIndexto: 1,
    cslist:[],
    ineeddc:0,
    alldc:0,
    jdt:0
  },
  // 进度条
  // 确认旅途方法
  qrlt:function(){
    var that = this;
    var qdid = this.data.accountIndex + 1;
    var zdid = this.data.accountIndexto + 1;
    console.log(qdid, zdid,'两个地点')
    wx.getStorage({
      //获取数据的key
      key: 'token',
      success: function (res) {
        console.log(res)
        var ineedtoken = res.data.result
        console.log(ineedtoken, "token变量")
        wx.request({
          url: "https://vczyh.top/wxapp/v1.0/usermap/set/startPointIdAndendPointId/" + ineedtoken,
          data: {
            // code: res.code
            "startPointId": qdid,
            "endPointId": zdid

          },
          method: 'POST',
          header: {
            // "Content-Type":"application/json"
          },
          success: function (res) {
            console.log(res.data, "返回结果")
            if (res.data.message === "success") {
              // 消息提示
              wx.showToast({ // 显示Toast

                title: '设置旅途成功',

                icon: 'success',

                duration: 1500

              })
              // 将返回信息保存到本地
              wx.setStorageSync('lv', res.data.result);
              
              
              // 获取当前用户剩余单词量
              wx.getStorage({
                //获取数据的key
                key: 'token',
                success: function (res) {
                  console.log(res)
                  var ineedtoken = res.data.result
                  if (wx.getStorageSync('lv')) {
                    var lv = wx.getStorageSync('lv');
                    var ineedstartPointId = lv.startPoint.id
                    var ineedendPointId = lv.endPoint.id
                    console.log('取出的储存-起点id-终点id', lv, ineedstartPointId, ineedendPointId)
                    console.log(ineedtoken, "token变量")
                    wx.request({
                      url: "https://vczyh.top/wxapp/v1.0/usermap/fetch/RemanentWordCount/" + ineedtoken,
                      data: {
                        // code: res.code
                        startPointId: ineedstartPointId,
                        endPointId: ineedendPointId,

                      },
                      method: 'POST',
                      header: {
                        // "Content-Type":"application/json"
                      },
                      success: function (res) {
                        console.log(res.data, "返回结果")
                        if (res.data.message === "success") {

                          that.setData({
                            ineeddc: res.data.result.remanentCount,
                            alldc: res.data.result.needRememberCount,
                            jdt: (res.data.result.needRememberCount - res.data.result.remanentCount) / res.data.result.needRememberCount * 100
                          })

                        }



                      },
                      fail: function (err) {
                        console.log(err)
                      }

                    })
                  } else {
                    wx.showToast({ // 显示Toast

                      title: '请先设置旅途',
                      image: '../../resources/img/map.png',

                      duration: 2500

                    })
                  }



                },
                /**
                 * 失败会调用
                 */
                fail: function (res) {
                  console.log(res)
                }
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
  // 下拉列表方法终点
  bindAccountChangeto: function (e) {
    console.log('picker accountto 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndexto: e.detail.value
    })
  },
  // 下拉列表方法起点
  bindAccountChange: function (e) {
    console.log('e', e);
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
  // 搜索单词按钮
  ssdanci:function(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  // 转发按钮
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '分享小程序',
      path: '/pages/learn/learn'
    }
  },
  // 跳转个人信息界面
  gotome: function () {
   console.log('a a a ')
    wx.navigateTo({
      url: '../me/me'
    })

  },
  // 跳转背单词页面
  godanci: function () {

    wx.navigateTo({
      url: '../danci/danci'
    })

  },
  // 跳转错题单词页面
  goctlist:function(){
    
      wx.navigateTo({
        url: '../ctlist/ctlist'
      })
   
  },
  // 跳转收藏单词页面
  gosclist: function () {

    wx.navigateTo({
      url: '../sclist/sclist'
    })

  },
  // 跳转掌握单词页面
  gozlist: function () {

    wx.navigateTo({
      url: '../zlist/zlist'
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
    // 获取全部的地址
    wx.request({
      url: "https://vczyh.top/wxapp/v1.0/point/all",
      // data: data,
      method: 'POST',
      header: {
        // "Content-Type":"application/json"
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.message === "success") {
          var qddm = [];
          var qdid = [];
          for (var i =0;i< res.data.result.length;i++){
            
            qddm[i] = res.data.result[i].nameCustom
            qdid[i] = res.data.result[i].id
          }
          console.log(qddm, qdid,'起点')
          var zddm = qddm
          var zdid = qdid
          console.log(zddm, zdid,'终点')
          that.setData({

            cslist: res.data.result,
            accounts: qddm,
           
            accountsto: zddm,
           
            

          })

        }


      },
      fail: function (err) {
        console.log(err)
      }

    })
    // 获取当前用户剩余单词量
    wx.getStorage({
      //获取数据的key
      key: 'token',
      success: function (res) {
        console.log(res)
        var ineedtoken = res.data.result
        if (wx.getStorageSync('lv')){
          var lv = wx.getStorageSync('lv');
          var ineedstartPointId = lv.startPoint.id
          var ineedendPointId = lv.endPoint.id
          console.log('取出的储存-起点id-终点id', lv, ineedstartPointId, ineedendPointId)
          console.log(ineedtoken, "token变量")
          wx.request({
            url: "https://vczyh.top/wxapp/v1.0/usermap/fetch/RemanentWordCount/" + ineedtoken,
            data: {
              // code: res.code
              startPointId: ineedstartPointId,
              endPointId: ineedendPointId,

            },
            method: 'POST',
            header: {
              // "Content-Type":"application/json"
            },
            success: function (res) {
              console.log(res.data, "返回结果")
              if (res.data.message === "success") {

                that.setData({
                  ineeddc: res.data.result.remanentCount,
                  alldc: res.data.result.needRememberCount,
                  jdt: (res.data.result.needRememberCount - res.data.result.remanentCount) / res.data.result.needRememberCount * 100
                })

              }



            },
            fail: function (err) {
              console.log(err)
            }

          })
        }else{
          wx.showToast({ // 显示Toast

            title: '请先设置旅途',
            image: '../../resources/img/map.png',

            duration: 2500

          })
        }
        


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
    var that = this;
    // 获取当前用户剩余单词量
    wx.getStorage({
      //获取数据的key
      key: 'token',
      success: function (res) {
        console.log(res)
        var ineedtoken = res.data.result
        if (wx.getStorageSync('lv')) {
          var lv = wx.getStorageSync('lv');
          var ineedstartPointId = lv.startPoint.id
          var ineedendPointId = lv.endPoint.id
          console.log('取出的储存-起点id-终点id', lv, ineedstartPointId, ineedendPointId)
          console.log(ineedtoken, "token变量")
          wx.request({
            url: "https://vczyh.top/wxapp/v1.0/usermap/fetch/RemanentWordCount/" + ineedtoken,
            data: {
              // code: res.code
              startPointId: ineedstartPointId,
              endPointId: ineedendPointId,

            },
            method: 'POST',
            header: {
              // "Content-Type":"application/json"
            },
            success: function (res) {
              console.log(res.data, "返回结果")
              if (res.data.message === "success") {

                that.setData({
                  ineeddc: res.data.result.remanentCount,
                  alldc: res.data.result.needRememberCount,
                  jdt: (res.data.result.needRememberCount - res.data.result.remanentCount) / res.data.result.needRememberCount * 100
                })

              }



            },
            fail: function (err) {
              console.log(err)
            }

          })
        } else {
          wx.showToast({ // 显示Toast

            title: '请先设置旅途',
            image: '../../resources/img/map.png',

            duration: 2500

          })
        }



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