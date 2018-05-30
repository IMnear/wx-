// pages/mapOne/mapOne.js
Page({
  onLoad(){
    wx.getLocation({
      type: 'gcj-02',
      altitude: true,
      success: res => {
        var latitude = res.latitude
        var longitude = res.longitude
        this.setData({
          mylatitude: latitude,
          mylongitude: longitude
        })
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(latitude, longitude)

        //打开地图选择位置
        wx.chooseLocation({
          success:function(res){
            console.log(res)
          }
        })

        //使用微信内置地图查看位置
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
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
  data: {
    // markers: [{
    //   iconPath:  ,
    //   id: 0,
    //   latitude: 36.6,
    //   longitude: 114.47,
    //   width: 40,
    //   height: 40
    // }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
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
      iconPath: '../../resources/img/control_point.svg',
      position: {
        left: 0,
        top: 350 - 50,
        width: 40,
        height: 40
      },
      clickable: true
    }],
  },
  onReady: function(){
  
  },
  getPersonLocation:function(){
    var _this2 = this;
    wx.getLocation({
      type: 'gcj-02',
  
      altitude: true,
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        _this2.setData({
          markers: [{
            iconPath: "../../resources/img/mark.svg",
            id: 0,
            latitude: latitude,
            longitude: longitude,
            width: 40,
            height: 40,
            callout:{
              content:"hahaha"
            },
            label:{
              content:"djsdfods"
            }
          }],
        })
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(latitude, longitude)
      },
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
    console.log(this)
    var that = this;

  },
  controltap(e) {
    console.log(e.controlId)
    console.log(111)
  },
  
})