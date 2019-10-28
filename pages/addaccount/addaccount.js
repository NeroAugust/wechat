// pages/addaccount/addaccount.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_text: "添加账本",
    index: null,
    picker: ['请选择','现金','银行','支付宝','其他'],
    accountType:''
  },
  //监听名称输入
  setAccountName(e){
    this.setData({
      accountName: e.detail.value.trim()
    })
    // console.log(this.data.accountName)
  },
  //监听初始余额
  setInitialBalance(e) {
    this.setData({
      initialBalance: e.detail.value.trim()
    })
  },
  //监听备注
  setRemark(e) {
    this.setData({
      remark: e.detail.value.trim()
    })
  },
  //监听类型选择
  PickerChange(e) {
    // console.log(e);
    this.setData({
      accountType: e.detail.value
    })
    console.log(this.data.accountType)
  },
  //返回按钮
  navBack(){
    wx.navigateBack({
      delta: 1
    })
  },
  //隐藏弹窗
  hideModal(e) {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url: '/pages/settings/settings',
    })
  }, 
  //提交添加
  addaccount(e){
    var accountName = this.data.accountName
    var accountType = this.data.accountType
    var initialBalance = this.data.initialBalance
    var modalName = e.currentTarget.dataset.target
    // console.log(modalName)
    var modalContent
    var remark = this.data.remark
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    var that = this
    console.log(accountName, accountType, initialBalance, remark)
    wx.request({
      url: baseUrl +'api/account/create?token='+token,
      method: "POST",
      data: {
        name: accountName,
        type: accountType,
        remark: remark,
        initial_balance: initialBalance
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res){
        // console.log(res)
        if(res.data.status){
          modalContent = "添加账户成功"
        }else{
          modalContent = "添加账户失败"
        }
        that.setData({
          modalName: modalName,
          modalContent: modalContent
        })
      }
    })
  },
  //获取token
  getToken(){
    this.data.token = wx.getStorageSync("token")
    console.log(this.data.token)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // swiper设置高度
    var that = this;
    that.setData({
      navH: app.globalData.navHeight,
    })
    that.getToken()
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