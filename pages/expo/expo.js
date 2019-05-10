// pages/expo/expo.js
var mock = require('../../date/mock.js')
import { reflushTodoLabel } from '../calendar/calendar.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    expoInfo:{},
    inTravel: false,
    travelDate: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      id:options.id
    })
    //判断是否已经加入行程
    wx.getStorage({
      key: 'travel',
      success: function(res) {
        var traMap = new Map(JSON.parse(res.data))
        if(traMap.get(options.id)) {
          that.setData({
            inTravel: true
          })
        }
      },
    })
    mock.skinList.forEach(v => {
      if (v.id==options.id) {
        this.setData({
          expoInfo: v,
          travelDate: v.startTime
        })
      }
    })
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

  },

  setTravel: function (e) {
    var that = this
    wx.getStorage({
      key: 'travel',
      success: function(res) {
        var traMap = new Map(JSON.parse(res.data))
        var selectDate = new Date(e.detail.value)
        traMap.set(that.data.id, selectDate)
        wx.setStorage({
          key: 'travel',
          data: JSON.stringify([...traMap]),
        })
        that.setData({
          inTravel: true
        })
        reflushTodoLabel()
      },
      fail: function() {
        var traMap = new Map
        traMap.set(that.data.id, new Date(e.detail.value))
        wx.setStorage({
          key: 'travel',
          data: JSON.stringify([...traMap]),
        })
        that.setData({
          inTravel: true
        })
      }
    })
  },

  cancelTravel: function() {
    var that = this
    wx.getStorage({
      key: 'travel',
      success: function (res) {
        var traMap = new Map(JSON.parse(res.data))
        traMap.delete(that.data.id)
        wx.setStorage({
          key: 'travel',
          data: JSON.stringify([...traMap]),
        })
        that.setData({
          inTravel: false
        })
        reflushTodoLabel()

      },
    })
  }
})