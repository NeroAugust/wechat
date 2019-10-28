// pages/table/table.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_index: "支出/收入",
    idx:0,
    TabCur: 0,
    scrollLeft: 0,
    year:"",
    month:"",
    mydate:"",
    list:[
      {tu:"圆饼图"},
      {tu:"折线图"},
      {tu:"柱状图"}
      ]
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  goIndex(e) {
    let index = e.currentTarget.dataset.index;
    console.log('每个index',index);
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    console.log(e.currentTarget.dataset.id,);
    // console.log((e.currentTarget.dataset.id - 1) * 60)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // swiper设置高度
    var that = this;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var mydate = date.getDate();
    that.setData({
      navH: app.globalData.navHeight,
      year: year,
      month: month,
      mydate: mydate
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