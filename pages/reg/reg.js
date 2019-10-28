// pages/reg/reg.js
//获取应用实例
const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    title_index: "注册",
    modalName:"",
    showlogin:false
  },
  //事件处理函数
  //监听昵称输入
  setName(e){
    this.setData({
      name:e.detail.value.trim()
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
  },
  //监听图片验证码
  setCaptcha(e){
    this.setData({
      captcha_code:e.detail.value.trim()
    })
  },
  //监听短信验证码
  setPhoneCaptcha(e){
    this.setData({
      phoneCaptcha: e.detail.value.trim()
    })
  },

  //获取图片验证码
  getCaptcha(){
    var that =this
    var baseUrl = app.globalData.baseUrl
    wx.request({
      url: baseUrl+'api/captcha',
      data:{},
      header:{
        "content-type":"application/x-www-form-urlencoded"
      },
      success(res){
        console.log(res.data.data)
        that.setData({
          imgUrl:res.data.data.url,
          captcha_key:res.data.data.key
        })
      }
    })
  }, 
  //获取短信验证码
  getPhoneCaptcha(e){
    var that = this
    var baseUrl = app.globalData.baseUrl
    var mobile = this.data.phoneNum
    var captcha_key = this.data.captcha_key
    var captcha_code = this.data.captcha_code
    var modalContent
    var modalName = e.currentTarget.dataset.target
    console.log(modalName)
    var url = baseUrl +'api/sms/verify'
    // console.log(mobile, captcha_key,captcha_code,url)
    wx.request({
      url: url,
      method:"POST",
      data:{
        mobile: mobile,
        captcha_key: captcha_key,
        captcha_code: captcha_code
      },
      header:{
        "Content-Type":"application/x-www-form-urlencoded"
      },
      success(res){
        console.log(res)
        if(res.data.status){
          modalContent = res.data.data.substr(10, 4)
          // modalName = modalName
          console.log(modalContent)
        }else{
          modalContent = res.data.data
          that.setData({
            phoneCaptcha:"",
            captcha_code:""
          })
          that.getCaptcha()
        }
        that.setData({
          modalName:modalName,
          modalContent:modalContent
        })
        // that.getPhoneCaptcha(modalName)
      }
    })
  }, 
  //隐藏弹窗
  hideModal(e) {
    this.setData({
      modalName: null
    })
  }, 
  //注册
  reg(e){
    var that = this
    var baseUrl = app.globalData.baseUrl
    console.log(e)
    var modalName = e.currentTarget.dataset.target
    var modalContent
    var mobile = this.data.phoneNum
    var nickname = this.data.name
    var password = this.data.password
    var verify = this.data.modalContent
    console.log(modalName,mobile,nickname,password,verify)
    wx.request({
      url: baseUrl +'api/user/register',
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        nickname:nickname,
        password:password,
        verify:verify,
        mobile:mobile
      },
      success(res){
        console.log(res)
        if(res.data.status){
          modalContent="注册成功"
          that.setData({
            showlogin: true
          })

        }else{
          modalContent = res.data.data
          that.setData({
            phoneCaptcha: "",
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

  // 返回上一页
  navBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  navHome: function () {
    wx.reLaunch({
      url: '../index/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // swiper设置高度
    var that = this;
    that.setData({
      navH: app.globalData.navHeight
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