var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('key') || []).map(function (log) {
        // return util.formatTime(new Date(log))
        return log
      })
    })
  }
})
