// pages/learn/learn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: null,
    searchHistoryList: [],
    showlist: [],
    showxx: false,
    showssjg: false,
    showjb: true,
    showts: false,
    storageContent: '',
  },
  // 展示搜索单词详细信息
  gotoitem: function (options) {
    console.log('传参', options)

    this.setData({
      showxx: true,
      showjb: false,
      storageContent: options.currentTarget.dataset.word
    })
  },
  // 切换单词和搜索
  gotojb: function () {
    this.setData({
      showjb: true,
      showxx: false
    });
  },
  //  搜索值
  setSearchInfo(e) {
    this.setData({
      searchValue: e.detail.value
    });
  },
  // 点击单词历史进行给与赋值进行搜索
  ssls: function (event) {
    console.log(event.target.dataset.ss, '传递的单词信息')
    this.setData({
      searchValue: event.target.dataset.ss
    });
  },
  // 回车确认搜索事件
  searchInfo(e) {
    const value = this.data.searchValue;
    const cssz = wx.getStorageSync('searchHistory');
    if (cssz.length===0){
      const sz=[]
      wx.setStorageSync('searchHistory', sz);
    }
    var that = this;
    wx.request({
      url: "https://vczyh.top/wxapp/v1.0/word/fuzzyQuery",
      data: {
        pageNum: 1,
        pageSize: 5,
        wordStr: value
      },
      method: 'POST',
      header: {
        // "Content-Type":"application/json"
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.message === "success") {
//        wx.showToast({ // 显示Toast
//
//          title: '搜索单词列表成功',
//
//          icon: 'success',
//
//          duration: 1500
//
//        })
          // 增加搜索历史
          const lssz = wx.getStorageSync('searchHistory');
          lssz.push(value);
          wx.setStorageSync('searchHistory', lssz);
          const searchHistoryList = wx.getStorageSync('searchHistory');
          that.setData({
            searchHistoryList: searchHistoryList
          });
          // 返回结果为空显示提示语句
          if (res.data.result.list.length === 0) {
            that.setData({


              showts: true,

            })
          }else{
            that.setData({

              showlist: res.data.result.list,
              showssjg: true,
              showts: false,

            })
          }
          

        }


      },
      fail: function (err) {
        console.log(err)
      }

    })

  },
  // 清除搜索
  cancelSearch() {
    this.setData({
      searchValue: null,
      showssjg: false,
      showts: false,

    })
  },
  // 清除历史记录
  clearSearchHistory() {
    this.setData({
      searchHistoryList: []
    });
    // wx.removeStorageSync('searchHistory');
    wx.setStorageSync('searchHistory', this.searchHistoryList);
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    // 取出本地储存的历史记录
    const searchHistoryList = wx.getStorageSync('searchHistory');
    this.setData({
      searchHistoryList: searchHistoryList
    });

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