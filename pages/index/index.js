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

    if (wx.getStorageSync('lv')) {
      console.log('进入到第一')
      var qDzDData = wx.getStorageSync('lv');
      var zd = qDzDData.endPoint;
      var qd = qDzDData.startPoint;
      wx.getStorage({
        key: 'token',
        success: res => {
          console.log(res.data)
          wx.request({
            url: 'https://vczyh.top/wxapp/v1.0/usermap/fetch/PresentCoord/' + res.data.result,
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
              var markers_new = [];
              wx.request({
                url: 'https://vczyh.top/wxapp/v1.0/all/users',
                method: 'POST',
                success: res => {
                  
                  for (var i = 0; i < res.data.result.length; i++) {
                    markers_new.push({
                      latitude: res.data.result[i].locationLatitude,
                      longitude: res.data.result[i].locationLongitude,
                      iconPath: "../../resources/img/mark.svg",
                      width: 40,
                      height: 40,
                      label: {
                        content: res.data.result[i].nickname,
                        color: "",
                        fontSize: 16,
                        textAlign: "center",
                        x: 0,
                        y: 0
                      },
                      callout: {
                        content: 'hello',
                        display: 'BYCLICK'
                      }
                    })
                  }

                  markers_new.push({
                    latitude: moveLatitude,
                    longitude: moveLongitude,
                    iconPath: "../../resources/img/fox.gif",
                    width: 160,
                    height: 160,
                    label: {
                      content: "距离终点仅仅" + needWordCount + "单词",
                      color: "",
                      fontSize: 16,
                      textAlign: "center",
                      x: 0,
                      y: 0
                    },
                    callout: {
                      content: 'hello',
                      display: 'ALWAYS'
                    }
                  }, {
                      latitude: zd.latitudeCustom,
                      longitude: zd.longitudeCustom,
                      iconPath: "../../resources/img/fox.gif",
                      width: 120,
                      height: 120,
                      label: {
                        content: "this is beiJing",
                        color: "",
                        fontSize: 16,
                        textAlign: "center",
                        x: 0,
                        y: 0
                      },
                      callout: {
                        content: 'hello',
                        display: 'ALWAYS'
                      }
                    })
                  this.setData({
                    markers: markers_new,
                    mylatitude: moveLatitude,
                    mylongitude: moveLongitude,
                    polyline: [{
                      points: [{
                        longitude: 114.477753,
                        latitude: 36.602614
                      }, {
                        longitude: moveLongitude,
                        latitude: moveLatitude
                      }],
                      color: "#FF0000DD",
                      width: 1,
                      dottedLine: true,
                      borderColor: "#BF0520DD",
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
    } else {
      console.log('进入到第二')
      var markers_two = [];
      wx.request({
        url: 'https://vczyh.top/wxapp/v1.0/all/users',
        method: 'POST',
        success: res => {
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
          console.log(res)
          // var mylatitude = res.data.result[1].locationLatitude,
          // var mylongitude = res.data.result[1].locationLongitude,
          for (var i = 0; i < res.data.result.length; i++) {
            markers_two.push({
              latitude: res.data.result[i].locationLatitude,
              longitude: res.data.result[i].locationLongitude,
              iconPath: "../../resources/img/mark.svg",
              width: 40,
              height: 40,
              label: {
                content: res.data.result[i].nickname,
                color: "",
                fontSize: 16,
                textAlign: "center",
                x: 0,
                y: 0
              },
              callout: {
                content: 'hello',
                display: 'BYCLICK'
              }
            })
          }

          this.setData({
            markers: markers_two,
          })
        }
      })
    }



    // wx.getStorage({
    //   key: 'token',
    //   success: res => {
    //     console.log(res.data)
    //     wx.request({
    //       url: 'https://vczyh.top/wxapp/v1.0/usermap/fetch/PresentCoord/' + res.data.result,
    //       method: 'POST',
    //       data: {
    //         startPointId: qd.id,
    //         endPointId: zd.id
    //       },
    //       success: res => {
    //         console.log(res.data.result)
    //         var needWordCount = res.data.result.needWordCount;
    //         var moveLatitude = res.data.result.latitude;
    //         var moveLongitude = res.data.result.longitude
    //         var markers_new = [];
    //         wx.request({
    //           url: 'https://vczyh.top/wxapp/v1.0/all/users',
    //           method: 'POST',
    //           success: res => {
    //             for (var i = 0; i < res.data.result.length; i++) {
    //               markers_new.push({
    //                 latitude: res.data.result[i].locationLatitude,
    //                 longitude: res.data.result[i].locationLongitude,
    //                 iconPath: "../../resources/img/mark.svg",
    //                 width: 40,
    //                 height: 40,
    //                 label: {
    //                   content: res.data.result[i].nickname,
    //                   color: "",
    //                   fontSize: 16,
    //                   textAlign: "center",
    //                   x: 0,
    //                   y: 0
    //                 },
    //                 callout: {
    //                   content: 'hello',
    //                   display: 'BYCLICK'
    //                 }
    //               })
    //             }

    //             markers_new.push({
    //               latitude: moveLatitude,
    //               longitude: moveLongitude,
    //               iconPath: "../../resources/img/fox.gif",
    //               width: 160,
    //               height: 160,
    //               label: {
    //                 content: "距离终点仅仅" + needWordCount + "单词",
    //                 color: "",
    //                 fontSize: 16,
    //                 textAlign: "center",
    //                 x: 0,
    //                 y: 0
    //               },
    //               callout: {
    //                 content: 'hello',
    //                 display: 'ALWAYS'
    //               }
    //             }, {
    //                 latitude: zd.latitudeCustom,
    //                 longitude: zd.longitudeCustom,
    //                 iconPath: "../../resources/img/fox.gif",
    //                 width: 160,
    //                 height: 160,
    //                 label: {
    //                   content: "this is beiJing",
    //                   color: "",
    //                   fontSize: 16,
    //                   textAlign: "center",
    //                   x: 0,
    //                   y: 0
    //                 },
    //                 callout: {
    //                   content: 'hello',
    //                   display: 'ALWAYS'
    //                 }
    //               })
    //             this.setData({
    //               markers: markers_new,
    //               mylatitude: moveLatitude,
    //               mylongitude: moveLongitude,
    //               polyline: [{
    //                 points: [{
    //                   longitude: 114.477753,
    //                   latitude: 36.602614
    //                 }, {
    //                   longitude: moveLongitude,
    //                   latitude: moveLatitude
    //                 }],
    //                 color: "#FF0000DD",
    //                 width: 1,
    //                 dottedLine: true,
    //                 borderColor: "#BF0520DD",
    //                 borderWidth: 2,
    //                 arrowLine: true,
    //               }],
    //             })
    //           }
    //         })

    //         console.log(markers_new.length)
    //         this.setData({
    //           // markers: markers_new,
    //           // mylatitude: res.data.result.latitude,
    //           // mylongitude: res.data.result.longitude,
    //           // markers: [{
    //           //   iconPath: "../../resources/img/mark.svg",
    //           //   id: 10,
    //           //   latitude: res.data.result.latitude,
    //           //   longitude: res.data.result.longitude,
    //           //   width: 40,
    //           //   height: 40,
    //           //   label: {
    //           //     content: "helloOne",
    //           //     color: "green",
    //           //     fontSize: 16,
    //           //     textAlign: "center",
    //           //     x: 0,
    //           //     y: 0
    //           //   },
    //           //   callout: {
    //           //     content: 'hello',
    //           //     display: 'ALWAYS',
    //           //     fontSize: 16,
    //           //   }
    //           // }],
    //           // polyline: [{
    //           //   points: [{
    //           //     longitude: 114.477753,
    //           //     latitude: 36.602614
    //           //   }, {
    //           //     longitude: res.data.result.longitude,
    //           //     latitude: res.data.result.latitude
    //           //   }],
    //           //   color: "#FF0000DD",
    //           //   width: 1,
    //           //   dottedLine: true,
    //           //   borderColor: "#BF0520DD",
    //           //   borderWidth: 2,
    //           //   arrowLine: true,
    //           // }],
    //         })
    //       }
    //     })
    //   }
    // })

    wx.request({
      url: 'https://vczyh.top/wxapp/v1.0/all/users',
      method: 'POST',
      success: res => {
        console.log(res.data.result)
        var markers_new = [];
        for (var i = 0; i < res.data.result.length; i++) {
          markers_new.push({
            latitude: res.data.result[i].locationLatitude,
            longitude: res.data.result[i].locationLongitude,
            iconPath: "../../resources/img/mark.svg",
            width: 40,
            height: 40,
            label: {
              content: res.data.result[i].nickname,
              color: "green",
              fontSize: 16,
              textAlign: "center",
              x: 0,
              y: 0
            },
            callout: {
              content: 'hello',
              display: 'BYCLICK'
            }
          })
        }
        console.log(markers_new)
        // this.setData({
        //   markers: markers_new,
        // })
      }
    })

    //动态设置map的宽和高
    wx.getSystemInfo({
      success: res => {
        console.log(res.windowWidth);
        this.setData({
          map_width: res.windowWidth,
          map_height: res.windowHeight,
          // controls: [{
          //   id: 1,
          //   iconPath: '../../resources/img/MarkerBlack.svg',
          //   position: {
          //     left: res.windowWidth / 2 - 8,
          //     top: res.windowWidth / 2 - 16,
          //     width: 30,
          //     height: 30
          //   },
          //   clickable: true
          // }]
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

