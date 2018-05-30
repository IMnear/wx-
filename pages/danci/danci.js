// pages/danci/danci.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showdanci: [],
    storageContent: '',
    showjb: true,
    showxx: false
  },
  // 收藏单词的方法
  scdanci:function(){
    var that = this;
    // 你居然连取值和赋值概念都不清晰
    var killdancimuqian = this.data.storageContent
    console.log("点击收藏的单词信息wordId", killdancimuqian.wordId)
    // 把本地存储的token拿出来

    wx.getStorage({
      //获取数据的key
      key: 'token',
      success: function (res) {
        console.log(res)
        var ineedtoken = res.data.result
        console.log(ineedtoken, "token变量")
        wx.request({
          url: "http://vczyh.top/wxapp/v1.0/user/word/collect/" + ineedtoken,
          data: {
            // code: res.code
            wordId: killdancimuqian.wordId,

          },
          method: 'POST',
          header: {
            // "Content-Type":"application/json"
          },
          success: function (res) {
            console.log(res.data, "返回结果")
            if (res.data.message === "success") {
              // 斩词消息提示
              wx.showToast({ // 显示Toast

                title: '收藏单词成功',

                icon: 'success',

                duration: 1500

              })
              // 调用获取单词接口实现数据刷新
              wx.request({
                url: "http://vczyh.top/wxapp/v1.0/user/word/" + ineedtoken,
                // data: data,
                method: 'POST',
                header: {
                  // "Content-Type":"application/json"
                },
                success: function (res) {
                  console.log(res.data)

                  that.setData({

                    storageContent: res.data.result
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
  // 提示里面的下一步
  nextgo: function () {
    // 获取单词同时控制显示
    // 把本地存储的token拿出来
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'token',
      success: function (res) {
        console.log(res)

        wx.request({
          url: "http://vczyh.top/wxapp/v1.0/user/word/" + res.data.result,
          // data: data,
          method: 'POST',
          header: {
            // "Content-Type":"application/json"
          },
          success: function (res) {
            console.log(res.data)

            that.setData({

              storageContent: res.data.result,
              showjb: true,
              showxx: false
            })


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
  // 详细信息里的斩
  killdancixx: function () {
    var that = this;
    // 你居然连取值和赋值概念都不清晰
    var killdancimuqian = this.data.storageContent
    console.log("点击斩的单词信息wordId", killdancimuqian.wordId)
    // 把本地存储的token拿出来

    wx.getStorage({
      //获取数据的key
      key: 'token',
      success: function (res) {
        console.log(res)
        var ineedtoken = res.data.result
        console.log(ineedtoken, "token变量")
        wx.request({
          url: "http://vczyh.top/wxapp/v1.0/user/word/remember/" + ineedtoken,
          data: {
            // code: res.code
            wordId: killdancimuqian.wordId,

          },
          method: 'POST',
          header: {
            // "Content-Type":"application/json"
          },
          success: function (res) {
            console.log(res.data, "返回结果")
            if (res.data.message === "success") {
              // 斩词消息提示
              wx.showToast({ // 显示Toast

                title: '斩词成功',

                icon: 'success',

                duration: 1500

              })
              // 调用获取单词接口实现数据刷新
              wx.request({
                url: "http://vczyh.top/wxapp/v1.0/user/word/" + ineedtoken,
                // data: data,
                method: 'POST',
                header: {
                  // "Content-Type":"application/json"
                },
                success: function (res) {
                  console.log(res.data)
                  // 重新赋值同时控制显示
                  that.setData({

                    storageContent: res.data.result,
                    showjb: true,
                    showxx: false
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
  // 斩词按钮点击事件
  killdanci: function (options) {
    var that = this;
    // 你居然连取值和赋值概念都不清晰
    var killdancimuqian = this.data.storageContent
    console.log("点击斩的单词信息wordId", killdancimuqian.wordId)
    // 把本地存储的token拿出来

    wx.getStorage({
      //获取数据的key
      key: 'token',
      success: function (res) {
        console.log(res)
        var ineedtoken = res.data.result
        console.log(ineedtoken, "token变量")
        wx.request({
          url: "http://vczyh.top/wxapp/v1.0/user/word/remember/" + ineedtoken,
          data: {
            // code: res.code
            wordId: killdancimuqian.wordId,

          },
          method: 'POST',
          header: {
            // "Content-Type":"application/json"
          },
          success: function (res) {
            console.log(res.data, "返回结果")
            if (res.data.message === "success") {
              // 斩词消息提示
              wx.showToast({ // 显示Toast

                title: '斩词成功',

                icon: 'success',

                duration: 1500

              })
              // 调用获取单词接口实现数据刷新
              wx.request({
                url: "http://vczyh.top/wxapp/v1.0/user/word/" + ineedtoken,
                // data: data,
                method: 'POST',
                header: {
                  // "Content-Type":"application/json"
                },
                success: function (res) {
                  console.log(res.data)

                  that.setData({

                    storageContent: res.data.result
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
  // 点击提示事件
  tishianniu: function () {
    // 调用接口--告诉后台该单词用户不会
    var that = this;

    var killdancimuqian = this.data.storageContent
    console.log("点击斩的单词信息wordId", killdancimuqian.wordId)
    // 把本地存储的token拿出来
    wx.getStorage({
      //获取数据的key
      key: 'token',
      success: function (res) {
        console.log(res)

        wx.request({
          url: "http://vczyh.top/wxapp/v1.0/user/word/appear/" + res.data.result,
          // data: data,
          method: 'POST',
          data: {

            wordId: killdancimuqian.wordId,

          },
          header: {
            // "Content-Type":"application/json"
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.message === "success") {
              // 成功提示开始控制显示
              that.setData({

                showjb: false,
                showxx: true
              })

            } else {
              console.log("请求提示错误")
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
    // 把本地存储的token拿出来
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'token',
      success: function (res) {
        console.log(res)

        wx.request({
          url: "http://vczyh.top/wxapp/v1.0/user/word/" + res.data.result,
          // data: data,
          method: 'POST',
          header: {
            // "Content-Type":"application/json"
          },
          success: function (res) {
            console.log(res.data)

            that.setData({

              storageContent: res.data.result
            })


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

  },



})