// pages/sclist/sclist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cwdclist: [],
    storageContent: '',
    showjb: true,
    showxx: false
  },
  // 获取单词的列表
  hqlist: function (options) {
    console.log('a a a a a')
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
//            wx.showToast({ // 显示Toast
//
//              title: '获取错误单词成功',
//
//              icon: 'success',
//
//              duration: 1500
//
//            })
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

  // 掌握单词（掌握单词并返回列表）
  zwgolist: function (options) {
    var that = this;
    // 你居然连取值和赋值概念都不清晰
    var killdancimuqian = this.data.storageContent
    console.log("点击掌握的单词信息wordId", killdancimuqian.wordId)
    // 把本地存储的token拿出来

    wx.getStorage({
      //获取数据的key
      key: 'token',
      success: function (res) {
        console.log(res)
        var ineedtoken = res.data.result
        console.log(ineedtoken, "token变量")
        var lv = wx.getStorageSync('lv');
        var ineedstartPointId = lv.startPoint.id
        var ineedendPointId = lv.endPoint.id
        console.log('取出的储存-起点id-终点id', lv, ineedstartPointId, ineedendPointId)
        wx.request({
          url: "https://vczyh.top/wxapp/v1.0/user/word/remember/map/" + ineedtoken,
          data: {
            // code: res.code
            wordId: killdancimuqian.wordId,
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
              // 掌握词消息提示
//            wx.showToast({ // 显示Toast
//
//              title: '掌握词成功',
//
//              icon: 'success',
//
//              duration: 1500
//
//            })
              // 调用获取错误单词接口实现数据刷新
              wx.request({
                url: "https://vczyh.top/wxapp/v1.0/user/words/collect/list/" + ineedtoken,
                // data: data,
                method: 'POST',
                header: {
                  // "Content-Type":"application/json"
                },
                success: function (res) {
                  console.log(res.data)

                  that.setData({
                    cwdclist: res.data.result,
                    showxx: false,
                    showjb: true,
                  })



                },
                fail: function (err) {
                  console.log(err)
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
  // 切换错误单词详细信息
  gotojb: function (options) {


    this.setData({
      showxx: false,
      showjb: true,
    })
  },
  // 展示错误单词详细信息
  gotoitem: function (options) {
    console.log('传参', options)

    this.setData({
      showxx: true,
      showjb: false,
      storageContent: options.currentTarget.dataset.word
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('a a a a a')
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
//            wx.showToast({ // 显示Toast
//
//              title: '获取收藏单词成功',
//
//              icon: 'success',
//
//              duration: 1500
//
//            })
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