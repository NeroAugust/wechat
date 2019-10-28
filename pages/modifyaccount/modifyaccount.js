// pages/modifyaccount/modifyaccount.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_text: "修改账本",
    index: null,
    picker: ['请选择', '现金', '银行', '支付宝', '其他'],
    accountName:'',
    accountType:'',
    remark:'',
    initialBalance:''
  },
  //监听名称输入
  setAccountName(e) {
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
  //隐藏弹窗
  hideModal(e) {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url: '/pages/settings/settings',
    })
  }, 
  //获取token和accountId
  getToken() {
    this.data.token = wx.getStorageSync("token")
    console.log(this.data.token)
  },
  //获取ID
  getId(){
    this.data.accountId = wx.getStorageSync("accountId")
    console.log(this.data.accountId)
  },
  //返回按钮
  navBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  //提交修改
  modifyaccount(e) {
    var accountName = this.data.accountName
    var accountType = this.data.accountType
    var initialBalance = this.data.initialBalance
    var modalName = e.currentTarget.dataset.target
    // console.log(modalName)
    var modalContent
    var remark = this.data.remark
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    var accountId = this.data.accountId
    var that = this
    console.log(accountName, accountType, initialBalance, remark)
    wx.request({
      url: baseUrl + 'api/account/update?id=' + accountId+'&token='+token,
      // api/account/update?id=ID&token=TOKEN
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
      success(res) {
        // console.log(res)
        if (res.data.status) {
          modalContent = "修改账本成功"
        } else {
          modalContent = "修改账本失败"
        }
        that.setData({
          modalName: modalName,
          modalContent: modalContent
        })
      }
    })
  },
  //获取账户详情
  getAccountDetail(){
    var that = this
    var token = this.data.token
    var accountId = this.data.accountId
    var baseUrl = app.globalData.baseUrl
    wx.request({
      url: baseUrl + 'api/account/detail?id=' + accountId + '&token=' + token,
      method:'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res){
        console.log(res)
        if(res.data.status){
          // that.data.accountName = res.data.data.name
          // that.data.accountType = res.data.data.type
          // that.data.initialBalance = res.data.data.initial_balance
          // that.data.remark = res.data.data.remark
          that.setData({
            accountName : res.data.data.name,
            accountType : res.data.data.type,
            initialBalance : res.data.data.initial_balance,
            remark: res.data.data.remark
          })
        }
      }
    })
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
    that.getId()
    that.getAccountDetail()
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