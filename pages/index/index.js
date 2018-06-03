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
    // },
    // {
    //   iconPath: "../../resources/img/mark.svg",
    //   id: 0,
    //   latitude: 37.922682623600004,
    //   longitude: 115.257505304,
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
    controls: [{
      id: 1,
      iconPath: '../../resources/img/plane.png',
      position: {
        left: 0,
        top: 450 - 50,
        width: 30,
        height: 30
      },
      clickable: true
    }]
  },
  onLoad: function () {
    console.log(app.onLaunch)
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }

    wx.getStorage({
      key: 'token',
      success: res => {
        console.log(res.data)
        wx.request({
          url: 'https://vczyh.top/wxapp/v1.0/usermap/fetch/PresentCoord/' + res.data.result,
          method: 'POST',
          data: {
            startPointId: 1,
            endPointId: 2
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
                    latitude: 39.902785559,
                    longitude: 116.42713376,
                    iconPath: "../../resources/img/fox.gif",
                    width: 160,
                    height: 160,
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

            console.log(markers_new.length)
            this.setData({
              // markers: markers_new,
              // mylatitude: res.data.result.latitude,
              // mylongitude: res.data.result.longitude,
              // markers: [{
              //   iconPath: "../../resources/img/mark.svg",
              //   id: 10,
              //   latitude: res.data.result.latitude,
              //   longitude: res.data.result.longitude,
              //   width: 40,
              //   height: 40,
              //   label: {
              //     content: "helloOne",
              //     color: "green",
              //     fontSize: 16,
              //     textAlign: "center",
              //     x: 0,
              //     y: 0
              //   },
              //   callout: {
              //     content: 'hello',
              //     display: 'ALWAYS',
              //     fontSize: 16,
              //   }
              // }],
              // polyline: [{
              //   points: [{
              //     longitude: 114.477753,
              //     latitude: 36.602614
              //   }, {
              //     longitude: res.data.result.longitude,
              //     latitude: res.data.result.latitude
              //   }],
              //   color: "#FF0000DD",
              //   width: 1,
              //   dottedLine: true,
              //   borderColor: "#BF0520DD",
              //   borderWidth: 2,
              //   arrowLine: true,
              // }],
            })
          }
        })
      }
    })

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


    wx.getLocation({
      type: 'gcj-02',
      altitude: true,
      success: res => {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        this.setData({
          // mylatitude: latitude,
          // mylongitude: longitude,
          // polyline: [{
          //   points: [{
          //     longitude: 114.477753,
          //     latitude: 36.602614
          //   }, {
          //     longitude: 116.42713376,
          //     latitude: 39.902785559
          //   }],
          //   color: "#FF0000DD",
          //   width: 2,
          //   dottedLine: true,
          //   borderColor: "#BF0520DD",
          //   borderWidth: 3,
          //   arrowLine: true,
          // }],
        })
      },
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
  }
})

//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }

//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
