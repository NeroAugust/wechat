// pages/settings/settings.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_text: "账本设置",
  },
  //隐藏弹窗
  hideModal(e) {
    this.setData({
      modalName: null
    })
    // wx.navigateTo({
    //   url: '/pages/settings/settings',
    // })
    this.onLoad()
  }, 
  // 返回上一页
  navBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },
  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },
  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
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
    that.getAccountList()
  },
  //获取token
  getToken() {
    this.data.token = wx.getStorageSync('token')
    console.log(this.data.token)
  },
  //获取账户信息
  getAccountList() {
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    wx.request({
      url: baseUrl + 'api/account?token=' + token,
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        // console.log(res)
        console.log(res.data.data)
        that.setData({
          accountlist: res.data.data
        })
        // console.log(that.data.accountlist)
      }
    })
  },
  //删除账户（根据id和token）
  deleteAccount(e){
    var that = this
    this.data.accountId = e.currentTarget.dataset.id
    var accountId = this.data.accountId
    var token = this.data.token
    var modalName = e.currentTarget.dataset.target
    console.log(accountId)
    console.log(modalName)
    var modalContent
    var baseUrl = app.globalData.baseUrl
    wx.request({
      url: baseUrl + 'api/account/delete?id=' + accountId + '&token=' + token,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res){
        console.log(res)
        if (res.data.status) {
          modalContent = "删除账本成功"
        } else {
          modalContent = res.data.data
        }
        that.setData({
          modalName: modalName,
          modalContent: modalContent
        })
      }
    })
    
  },
  //去添加账本页面
  goAddAccount(){
    wx.navigateTo({
      url: '/pages/addaccount/addaccount',
    })
  },
  //去修改账本页面
  toModifyAccount(e){
    this.data.accountId = e.currentTarget.dataset.id
    // console.log(this.data.accountId)
    var accountId = this.data.accountId
    wx.setStorage({
      key: 'accountId',
      data: accountId,
      success: function () {
        console.log("账本id缓存保存成功")
      }
    })
    wx.navigateTo({
      url: '/pages/modifyaccount/modifyaccount',
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