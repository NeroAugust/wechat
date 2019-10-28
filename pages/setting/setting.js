// pages/setting/setting.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_text: "个人账本-类别设置",
    TabCur: 0,
    scrollLeft: 0,
    list:[
      {type:"工资"},
      {type:"理财"},
      {type:"兼职"},
      {type:"礼金"},
      {type:"其他"}
    ],
    list1: [
      { type: "餐饮" },
      { type: "日用" },
      { type: "交通" },
      { type: "购物" },
      { type: "水果" },
      { type: "蔬菜" },
      { type: "零食" },
      { type: "运动" },
      { type: "娱乐" },
      { type: "通讯" },
      { type: "社交" },
      { type: "服饰" },
      { type: "餐饮" },
      { type: "日用" },
      { type: "交通" },
      { type: "购物" },
      { type: "水果" },
      { type: "蔬菜" },
      { type: "零食" },
      { type: "运动" },
      { type: "娱乐" },
      { type: "通讯" },
      { type: "社交" },
      { type: "服饰" },

    ]
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      isflag: e.currentTarget.dataset.flag,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    console.log(e.currentTarget.dataset.id);
    console.log(e.currentTarget.dataset.flag)
    // console.log((e.currentTarget.dataset.id - 1) * 60)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // swiper设置高度
    var that = this;
    that.setData({
      navH: app.globalData.navHeight,
      isflag:"ispay"
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

  }
})