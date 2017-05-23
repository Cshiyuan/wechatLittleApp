// map.js
var util = require('../../utils/util.js')
var common = require('../../utils/common.js')
var datas = require('../../utils/data.js')
Page({
  data: {
    // array: ["中国", "美国", "巴西", "日本"],
    index: 0,
    routes: datas.routes, //线路数组
    pickerArray: [], //选择器的选择项
    includePoints: [], //地图包含的点
    polyline: [{ //线路规划
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229,
      }, {
        longitude: 113.324520,
        latitude: 23.21229,
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    latitude: 22.543099,
    longitude: 114.057868
  },

  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },

  onLoad: function() {
    console.log('onLoad')
    console.log(datas.routes);
    this.setData({
      pickerArray: common.getRoutesDescriptionArray(datas.routes),
    })


    var mapPage = this

    wx.getLocation({
      type: 'gcj02', // wgs84
      success: function(res) {
        var speed = res.speed
        var accuracy = res.accuracy
        var latitude = res.latitude //经纬度
        var longitude = res.longitude
        console.log(latitude, longitude)
          //  wx.openLocation({
          //    latitude: latitude,
          //    longitude: longitude,
          //  })
          // mapPage.setData({
          //    latitude: latitude,
          //    longitude: longitude,
          // })
      },
      complete: function() {

      },
      fail: function() {
        console.log("定位失败")
      }
    })
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.configRoute();
  },

  onReady: function(e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('map')
    this.mapCtx.moveToLocation()
    this.configRoute();

  },

  configRoute: function() {

    var mapPage = this

    common.getMarkerArray(datas.routes[this.data.index].route, function(markerArray) {

      mapPage.setData({
        markers: markerArray,
      })
      var routesArray = common.getPolylineArray(markerArray);
      mapPage.setData({
        polyline: [{ //线路规划
          points: routesArray,
          color: "#FF0000DD",
          width: 2,
          dottedLine: true
        }],
        includePoints: routesArray,
        // markers: markersArray,
        // routeArray:
      })
      console.log(routesArray);
    });

  },

})