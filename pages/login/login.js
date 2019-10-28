// pages/login/login.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_index: "登录",
    modalName: "",
  },
  //事件处理函数
  // 返回上一页
  navBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //监听手机号输入
  setPhoneNum(e){
    this.setData({
      phoneNum:e.detail.value.trim()
    })
  },
  
  //监听密码输入
  setPwd(e){
    this.setData({
      password:e.detail.value.trim()
    })
    // console.log(password)
  },
  //监听验证码输入
  setcaptcha_code(e){
    this.setData({
      captcha_code:e.detail.value.trim()
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  //隐藏弹窗
  hideModal(e) {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url: '/pages/my/my',
    })
  }, 
  //隐藏底部弹框
  hideBottomModal(e) {
    this.setData({
      modalName: null
    })
  },
  //获取图片验证码
  getCaptcha(){
    var that =this
    var baseUrl = app.globalData.baseUrl
    wx.request({
      url: baseUrl + 'api/captcha',
      data: {},
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        // console.log(res.data.data)
        that.setData({
          imgUrl: res.data.data.url,
          captcha_key: res.data.data.key
        })
      }
    })
  },
  //登录
  
login(e){
  var that = this
  var baseUrl = app.globalData.baseUrl
  var modalName = e.currentTarget.dataset.target
  // console.log(modalName)
  var modalContent
  var phoneNum = this.data.phoneNum
  var password = this.data.password
  var captcha_code = this.data.captcha_code
  var captcha_key = this.data.captcha_key
  // console.log(captcha_code,captcha_key)
  wx.request({
    url: baseUrl +'api/user/token/mobile',
    method: "POST",
    data:{
      mobile:phoneNum,
      password:password,
      captcha_code:captcha_code,
      captcha_key: captcha_key
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success(res) {
      // console.log(res)
      if (res.data.status) {
        modalContent = "登录成功"
        var token1 = res.data.data.token
        // wx.setStorageSync("token", token)
        console.log(res.data.data.token)
        wx.setStorage({
          key: 'token',
          data: token1,
          success:function(){
            console.log("数据缓存保存成功")
          }
        })
      } else {
        modalContent = res.data.data
        that.setData({
          captcha_code: ""
        })
        that.getCaptcha()
      }
      that.setData({
        modalName: modalName,
        modalContent: modalContent
      })
    }
  })
},


  /**
   * 生命周期函数--监听页面加载
   */
  //监听加载
  onLoad: function () {
    // swiper设置高度
    var that = this;
    that.setData({
      navH: app.globalData.navHeight
    })
    console.log(app.globalData.navHeight);
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