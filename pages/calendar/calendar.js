// pages/calendar/calendar.js
import initCalendar, {
  setTodoLabels,
  setSelectedDays,
  getSelectedDay,
  clearTodoLabels
} from '../../component/calendar/main.js';
var mock = require('../../date/mock.js')
var allEHB = new Map()
mock.skinList.forEach(v => {
  allEHB.set(v.id, v)
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tmpEHB: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var that = this
    that.setData({ tmpEHB: [] })
    var travel = new Map()

    initCalendar({
      // 日期多选
      multi: false,
      noDefault: true,
      afterTapDay: (currentSelect, allSelectedDays) => {
        var ehb = []
        if (currentSelect.hasTodo && currentSelect.todoText != null) {
          currentSelect.todoText.split(',').forEach((s => {
            ehb.push(allEHB.get(s))
          }))
        }
        that.setData({ tmpEHB: ehb })
      },
      afterCalendarRender(ctx) {
        const data = [];
      },
    })
    reflushTodoLabel()


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

  chooseSkin: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../expo/expo?id=' + id,
    })
  },
})

export function reflushTodoLabel() {
  var travel = new Map()

  wx.getStorage({
    key: 'travel',
    success: function (res) {
      var traMap = new Map(JSON.parse(res.data))
      traMap.forEach((v, k) => {
        if (travel.has(v)) {
          travel.set(v, travel.get(v) + "," + k)
        } else {
          travel.set(v, k)
        }
      })
      var traData = []
      travel.forEach((v, k) => {
        var tmpDate = new Date(k)
        traData.push({ year: tmpDate.getFullYear(), month: tmpDate.getMonth() + 1, day: tmpDate.getDate(), todoText: v })
      })
      clearTodoLabels()
      setTodoLabels({
        pos: 'bottom',
        dotColor: '#40',
        days: traData,
      });
    }
  })
}