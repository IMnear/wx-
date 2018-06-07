//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    // markers: [{
    //   iconPath: "../../resources/img/mark.svg",
    //   id: 0,
    //   latitude: 37.2626483118,
    //   longitude: 114.867629152,
    //   width: 40,
    //   height: 40
    // }],
    // polyline: [{
    //   points: [{
    //     longitude: 114.477753,
    //     latitude: 36.602614
    //   }, {
    //       longitude: 114.867629152,
    //     latitude: 37.2626483118
    //     }],
    //   color: "#FF0000DD",
    //   width: 2,
    //   dottedLine: true
    // }],

  },

  //选择城市
  xzCity: function () {
    wx.chooseLocation({
      success: res => {
        console.log(res)
        //把res存到语亨的借口里就行
      }
    })
  },

  onLoad: function () {

    //获取当前登陆用户个人信息
    wx.getStorage({
      key: 'token',
      success: res => {
        console.log(res.data)

      }
    })
    if (wx.getStorageSync('lv')) {
      console.log('进入到第一')
      var qDzDData = wx.getStorageSync('lv');
      console.log(qDzDData)
      var zd = qDzDData.endPoint;
      var qd = qDzDData.startPoint;
      var zdname = qDzDData.endPoint.nameCustom

      wx.getStorage({
        key: 'token',
        success: res => {
          console.log(res.data)
          var token = res.data.result
          wx.request({
            url: 'https://vczyh.top/wxapp/v1.0/usermap/fetch/PresentCoord/' + token,
            method: 'POST',
            data: {
              startPointId: qd.id,
              endPointId: zd.id
            },
            success: res => {
              console.log(res.data.result)
              var needWordCount = res.data.result.needWordCount;
              var moveLatitude = res.data.result.latitude;
              var moveLongitude = res.data.result.longitude
              wx.request({
                url: 'https://vczyh.top/wxapp/v1.0/userinfo/' + token,
                method: 'POST',
                success: res => {
                  console.log(res.data)

                  var moveHeadUri = res.data.result.headUri;
                  var movename = res.data.result.nickname;
                  var markers_new = [];

                  wx.request({
                    url: 'https://vczyh.top/wxapp/v1.0/all/users',
                    method: 'POST',
                    success: res => {

                      console.log(res.data.result)
                      for (var i = 0; i < res.data.result.length; i++) {
                        markers_new.push({
                          latitude: res.data.result[i].locationLatitude,
                          longitude: res.data.result[i].locationLongitude,
                          iconPath: "../../resources/img/near.jpg",
                          width: 30,
                          height: 30,
                          // label: {
                          //   content: res.data.result[i].nickname,
                          //   color: "",
                          //   fontSize: 12,
                          //   textAlign: "center",
                          //   x: 0,
                          //   y: 0
                          // },
                          callout: {
                            content: res.data.result[i].nickname,
                            display: 'ALWAYS',
                            bgColor: '	#000000',
                            fontSize: 12,
                            borderRadius: '',
                            textAlign: 'center'
                          }
                        })
                      }

                      markers_new.push({
                        latitude: moveLatitude,
                        longitude: moveLongitude,
                        iconPath: "../../resources/img/head.jpg",
                        width: 30,
                        height: 30,
                        //  label: {
                        //    content: "距离终点仅仅" + needWordCount + "单词",
                        //    color: "",
                        //    fontSize: 12,
                        //    textAlign: "center",
                        //    x: 0,
                        //    y: 0
                        //  },
                        callout: {
                          content: movename,
                          display: 'ALWAYS'
                        }
                      }, {
                          latitude: zd.latitudeCustom,
                          longitude: zd.longitudeCustom,
                          iconPath: "../../resources/img/flag.jpg",
                          width: 40,
                          height: 40,
                          //  label: {
                          //    content: zdname,
                          //    color: "",
                          //    fontSize: 16,
                          //    textAlign: "center",
                          //    x: 0,
                          //    y: 0
                          //  },
                          callout: {
                            content: zdname + ',You need ' + needWordCount + ' word',
                            display: 'ALWAYS'
                          }
                        })
                      this.setData({
                        markers: markers_new,
                        mylatitude: moveLatitude,
                        mylongitude: moveLongitude,
                        polyline: [{
                          points: [
                            //   {
                            //   longitude: 114.477753,
                            //   latitude: 36.602614
                            // },
                            {
                              longitude: moveLongitude,
                              latitude: moveLatitude
                            }, {
                              longitude: zd.longitudeCustom,
                              latitude: zd.latitudeCustom
                            }],
                          color: "#FF0000DD",
                          width: 1,
                          dottedLine: true,
                          borderColor: "	#F08080",
                          borderWidth: 2,
                          arrowLine: true,
                        }],
                      })
                    }
                  })

                }
              })
            }
          })
        }
      })
    } else {
      console.log('进入到第二')
      var markers_two = [];
      wx.request({
        url: 'https://vczyh.top/wxapp/v1.0/all/users',
        method: 'POST',
        success: res => {
          console.log(res)
          wx.getLocation({
            type: 'gcj-02',
            altitude: true,
            success: res => {
              console.log(res)
              var latitude = res.latitude
              var longitude = res.longitude
              this.setData({
                mylatitude: latitude,
                mylongitude: longitude
              })
            },
          })
          
          for (var i = 0; i < res.data.result.length; i++) {
            markers_two.push({
              latitude: res.data.result[i].locationLatitude,
              longitude: res.data.result[i].locationLongitude,
              iconPath: "../../resources/img/near.jpg",
              width: 30,
              height: 30,
              // label: {
              //   content: res.data.result[i].nickname,
              //   color: "",
              //   fontSize: 16,
              //   textAlign: "center",
              //   x: 0,
              //   y: 0
              // },
              callout: {
                content: res.data.result[i].nickname,
                display: 'ALWAYS'
              }
            })
          }
          // markers_two.push({

          //   latitude: moveLatitude,
          //   longitude: moveLongitude,
          //   iconPath: "../../resources/img/head.jpg",
          //   width: 30,
          //   height: 30,
          //   callout: {
          //     content: movename,
          //     display: 'ALWAYS'
          //   }
          // })
          this.setData({
            markers: markers_two,
          })
        }
      })
    }



    wx.getStorage({
      key: 'token',
      success: res => {
        console.log(res.data)
      }
    })

    //动态设置map的宽和高
    wx.getSystemInfo({
      success: res => {
        console.log(res.windowWidth);
        this.setData({
          map_width: res.windowWidth,
          map_height: res.windowHeight,
        })
      }
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    // var markers_new = [];
    console.log(e)

    if (e.timeStamp % 2 == 0) {
      this.setData({
        mylongitude: 116.42713376,
        mylatitude: 39.902785559,
      })
    } else {
      this.setData({
        mylongitude: 114.867629152,
        mylatitude: 37.2626483118
      });
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },

