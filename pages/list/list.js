// pages/list/list.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_text: "影响力",
    TabCur: 0,
    scrollLeft: 0,
    list:[
      {name:"vfdvsv",num:"111"},
      {name:"hcbds",num:"78"},
      { name: "vfdvsv", num: "111" },
      { name: "hcbds", num: "78" },
      { name: "vfdvsv", num: "111" },
      { name: "hcbds", num: "78" },
      { name: "vfdvsv", num: "111" },
      { name: "hcbds", num: "78" },
      { name: "vfdvsv", num: "111" },
      { name: "hcbds", num: "78" },
      { name: "vfdvsv", num: "111" },
      { name: "hcbds", num: "78" },
      { name: "vfdvsv", num: "111" },
      { name: "hcbds", num: "78" },
      { name: "vfdvsv", num: "111" },
      { name: "hcbds", num: "78" },
      { name: "vfdvsv", num: "111" },
      { name: "hcbds", num: "78" },
      { name: "vfdvsv", num: "111" },
      { name: "hcbds", num: "78" },
      { name: "vfdvsv", num: "111" },
      { name: "hcbds", num: "78" },
      { name: "vfdvsv", num: "111" },
      { name: "hcbds", num: "78" },
    ],
    list1: [
      { name: "vfdvsv", num: "1111" },
      { name: "hcbds", num: "781" },
      { name: "vfdvsv", num: "1111" },
      { name: "hcbds", num: "781" },
      { name: "vfdvsv", num: "1111" },
      { name: "hcbds", num: "781" }
    ],
    list2: [
      { name: "vfdvsv", num: "11111" },
      { name: "hcbds", num: "7811" },
      { name: "vfdvsv", num: "11111" },
      { name: "hcbds", num: "7811" },
      { name: "vfdvsv", num: "11111" },
      { name: "hcbds", num: "7811" }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // swiper设置高度
    var that = this;
    that.setData({
      navH: app.globalData.navHeight,
      isflag: "isday"
    })
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