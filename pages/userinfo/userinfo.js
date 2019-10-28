// pages/usrinfo/userinfo.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_index: "个人信息",
    keyList: []
  },
  // 返回上一页
  navBack: function () {
    wx.setStorageSync('nickname', this.data.nickname)
    wx.setStorageSync('imgList', this.data.imgList)
    wx.navigateBack({
      delta: 1
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
    that.getToken()
    that.getPersonalInfo()
  },
  //获取token
  getToken() {
    this.data.token = wx.getStorageSync('token')
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
        console.log(this.data.imgList)
        this.UploadImg()
      }
    });
  },
  //获取个人信息
  getPersonalInfo() {
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    var imgList=[]
    wx.request({
      url: baseUrl + 'api/user/profile?token=' + token,
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
        if (res.data.status) {
          imgList.push(res.data.data.avatar_url)
          that.setData({
            nickname: res.data.data.nickname,
            imgList: imgList,
            mobile: res.data.data.mobile
          })
        } else {
          that.setData({
            nickname: "未登录",
          })
        }
      }
    })
  },
  //修改个人信息(头像和昵称)
  modifyuserinfo(){
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    var nickname = that.data.nickname
    var avatar = that.data.keyList[0]
    console.log(avatar)
    wx.request({
      url: baseUrl +'api/user/profile/update?token='+token,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        nickname:nickname,
        avatar:avatar
      },
      success(res){
        console.log(res)
        if(res.data.status){
          wx.showModal({
            title: '操作提示',
            content: res.data.data,
          })
        }else{
          wx.showModal({
            title: '操作失败',
            content: res.data.data,
          })
        }
        that.onLoad()
      }
    })
  },
  //获取图片验证码
  getCaptcha() {
    var that = this
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
        console.log(that.data.captcha_key)
      }
    })
  },
  //获取短信验证码
  getPhoneCaptcha(e) {
    var that = this
    var baseUrl = app.globalData.baseUrl
    var mobile = this.data.newMobile
    var captcha_key = this.data.captcha_key
    var captcha_code = this.data.captcha_code
    var url = baseUrl + 'api/sms/verify'
    // console.log(mobile, captcha_key,captcha_code,url)
    wx.request({
      url: url,
      method: "POST",
      data: {
        mobile: mobile,
        captcha_key: captcha_key,
        captcha_code: captcha_code
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
        if (res.data.status) {
          wx.showModal({
            title: '操作提示',
            content: res.data.data.substr(10, 4),
          })         
        } else {
          wx.showModal({
            title: '操作提示',
            content: '获取短信验证码失败',
          })   
          that.setData({
            phoneCaptcha: "",
            captcha_code: ""
          })
          that.getCaptcha()
        }
      }
    })
  }, 
  //确认修改
  confirm(){
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    var newMobile = this.data.newMobile
    var password = this.data.password
    var verify = this.data.phoneCaptcha
    console.log(newMobile,password,verify)
    wx.request({
      url: baseUrl +'api/user/mobile?token='+token,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        mobile: newMobile,
        password: password,
        verify: verify
      },
      success(res){
        console.log(res)
        wx.showModal({
          title: '操作提示',
          content: res.data.data,
        })
        that.setData({
          newMobile : "",
          password : "",
          captcha_code : "",
          phoneCaptcha : ""
        })
        that.close()
      }
    })
  },
  //关闭弹窗
  close(){
    this.setData({
      target:"11111"
    })
    // this.data.target="11111"
    console.log(this.data.target)
  },
  //打开隐藏的弹框
  modifymobile(e){
   var target = e.currentTarget.dataset.target
   this.setData({
     target:target
   })
   console.log(this.data.target)
  },
  
  //上传图片
  UploadImg(e) {
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    var photoUrl = this.data.imgList[0]
    wx.uploadFile({
      url: baseUrl + 'api/upload/image?token=' + token,
      filePath: photoUrl,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: null,
      success(res) {
        // console.log(JSON.parse(res.data))
        var key = JSON.parse(res.data).data.file.fileKey
        var keyList = that.data.keyList
        keyList.push(key)
        console.log(keyList)
        that.setData({
          keyList: keyList
        })
      }
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  //监听setNickname
  setNickname(e){
    this.setData({
      nickname: e.detail.value.trim()
    })
  },
  //监听手机号码
  setNewMobile(e){
    this.setData({
      newMobile: e.detail.value.trim()
    })
  },
  //监听密码
  setPwd(e){
    this.setData({
      password: e.detail.value.trim()
    })
  },
  //监听验证码输入
  setcaptcha_code(e) {
    this.setData({
      captcha_code: e.detail.value.trim()
    })
  },
  //监听短信验证码
  setPhoneCaptcha(e) {
    this.setData({
      phoneCaptcha: e.detail.value.trim()
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