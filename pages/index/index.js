//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    markers: [{
      iconPath: "../../resources/img/mark.svg",
      id: 0,
      latitude: 36.60229,
      longitude: 114.483760,
      width: 50,
      height: 50
    },
    {
      iconPath: "../../resources/img/mark.svg",
      id: 0,
      latitude: 36.62229,
      longitude: 114.483760,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 25.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '../../resources/img/mark.svg',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  onLoad: function () {
    console.log(111)
    wx.request({
      url: 'http://vczyh.top/wxapp/v1.0/all/users',
      method: 'POST',
      success: res =>{
        console.log(res.data.result)
        var markers_new=[];
        for (var i = 0; i < res.data.result.length; i ++){

          markers_new.push(
            {
              latitude: res.data.result[i].locationLatitude,
              longitude: res.data.result[i].locationLongitude,
              iconPath: "../../resources/img/mark.svg",
              width: 40,
              height: 40,
              callout: {
                content: "12185641556"
              },
              label: {
                content: "123456"
              }
            }
          )
          
        }
        console.log(markers_new)
        this.setData({
          markers: markers_new,
        })
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
          mylatitude: latitude,
          mylongitude: longitude,
          // markers: [{
          //   iconPath: "../../resources/img/mark.svg",
          //   id: 0,
          //   latitude: latitude,
          //   longitude: longitude,
          //   width: 40,
          //   height: 40,
          //   callout: {
          //     content: "hahaha"
          //   },
          //   label: {
          //     content: "djsdfods"
          //   }
          // }],
        })

        wx.getStorage({
          key: 'token',
          success: function (res) {
            console.log(res.data)
          }
        })
      },

    })
    },
      regionchange(e) {
        console.log(e.type)
      },
      markertap(e) {
        console.log(e.markerId)
      },
      controltap(e) {
        console.log(e.controlId)
      }
})

// Page({
//   data: {
//     motto: 'v.打败，战胜 n.击败',
//     // userInfo: {},
//     hasUserInfo: false,
//     // canIUse: wx.canIUse('button.open-type.getUserInfo'),
//     grids: [0, 1, 2, 3, 4, 5, 6, 7, 8],
//     // markers:[
//     //   {
//     //     iconPath: "../../resources/img/home.png",
//     //     id: 0,
//     //     latitude: 36.6,
//     //     longitude: 114.47,
//     //     width: 40,
//     //     height: 40,
//     //     callout: {
//     //       content: "123456"
//     //     },
//     //     label: {
//     //       content: "123456"
//     //     }
//     //   },
//     //   {
//     //     iconPath: "../../resources/img/mark.svg",
//     //     // id: 0,
//     //     latitude: 36.8,
//     //     longitude: 114.77,
//     //     width: 40,
//     //     height: 40,
//     //     callout: {
//     //       content: "123456"
//     //     },
//     //     label: {
//     //       content: "123456"
//     //     }
//     //   }
//     // ],
//     map: false

//   },
//   controls: [{
//     id: 1,
//     iconPath: '../../resources/img/control_point.svg',
//     position: {
//       left: 0,
//       top: 300 - 50,
//       width: 40,
//       height: 40
//     },
//     clickable: true
//   }],
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
//     wx.request({
//       url: 'http://vczyh.top/wxapp/v1.0/all/users',
//       method: 'POST',
//       success: res =>{
//         console.log(res.data.result)
//         var markers_new=[];
//         var location = [];
//         for (var i = 0; i < res.data.result.length; i ++){

//            markers_new.push = {
//              latitude: res.data.result[i].locationLatitude,
//              longitude: res.data.result[i].locationLongitude,
//             //  iconPath: "../../resources/img/ddd.png",
//              width: 40,
//              height: 40,
//              callout: {
//                content: "123456"
//              },
//              label: {
//                content: "123456"
//              }
//            }
//            console.log(markers_new)
//         }

//         this.setData({
//           markers: markers_new,
//           map: true
//         })

//         console.log(this.markers)


//       } 
//     })



//     wx.getLocation({
//       type: 'gcj-02',
//       altitude: true,
//       success: res => {
//         var latitude = res.latitude
//         var longitude = res.longitude
//         this.setData({
//           mylatitude: latitude,
//           mylongitude: longitude,
//           markers: [{
//             iconPath: "../../resources/img/mark.svg",
//             id: 0,
//             latitude: latitude,
//             longitude: longitude,
//             width: 40,
//             height: 40,
//             callout: {
//               content: "hahaha"
//             },
//             label: {
//               content: "djsdfods"
//             }
//           }],
//         })

//         wx.getStorage({
//           key: 'token',
//           success: function (res) {
//             console.log(res.data)
//           }
//         })
//       },

//     })
//   },

//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }

// })
