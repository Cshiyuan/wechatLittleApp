//index.js
//获取应用实例
var common = require('../../utils/common.js');
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },

  onLoad: function(options) {
     console.log('page onLoad');
  },
  onReady: function() {
    console.log("page onReady");
  },
  onShow: function() {
    console.log("page onShow");
  },
  onHide: function() {
    console.log("page onHide");
  },
  onUnLoad:function() {
    console.log("page onUnLoad");
  },
  onPullDownRefresh: function() {
    console.log("page onPullDownRefresh");
  },
  onReachBottom: function() {
    console.log("page onReachBottom");
  },
  onShareAppMessage : function() {
    console.log("page onShareAppMessage");

    return {
      title: '分享记录',
      path: 'pages/index'
    }
  },


  

  //事件处理函数
  bindViewTap: function() {
    common.sayHello('asd');
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
 //自定义事件处理函数
  tagMyView : function() {
    wx.navigateTo({
     url: '../demo1/demo1'
    })
  },

  tagMyView2 : function() {
    wx.request({
      url: 'https://vendor.chenshyiuan.me/LibraryAPI/Public/libraryapi/?service=User.LoginUser&email=admin@qq.com&password=12345', //仅为示例，并非真实的接口地址
      data: {
      x: '' ,
      y: ''
    },
    header: {
        'content-type': 'application/json'
    },
    success: function(res) {
    console.log(res.data)
  }
})
  
  },

  tagMyView3 : function() {
     wx.navigateTo({
     url: '../locationLog/locationLog'
    })
  
  },

  tagMyView4: function () {
    wx.navigateTo({
      url: '../maps/maps'
    })

  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
