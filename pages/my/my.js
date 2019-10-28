// pages/my/my.js
//获取应用实例
const app = getApp()
Page({
  options: {
    addGlobalClass: true,
  },

  /**
   * 页面的初始数据
   */
  data: {
    visitTotal:0,
    starCount:0,
    forksCount:0,
    token:'',
    nickname:''
  },
  //隐藏弹窗
  hideModal(e) {
    this.setData({
      modalName: null
    })
  }, 
  //监听加载
  onLoad: function () {
    
    this.getToken()
    this.getPersonalInfo()
  },
  //返回后刷新页面
  onShow(){
    var nickname = wx.getStorageSync('nickname')
    var imgList = wx.getStorageSync('imgList')
    this.setData({
      nickname: nickname,
      imgUrl: imgList[0]
    })
    console.log(this.data.nickname, this.data.imgUrl)
    this.onLoad()
  },
  //获取token
  getToken(){
    this.data.token = wx.getStorageSync('token')
  },
  //获取个人信息
  getPersonalInfo(){
    var that = this
    var baseUrl = app.globalData.baseUrl 
    var token = this.data.token
    wx.request({
      url: baseUrl + 'api/user/profile?token='+token,
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res){
        console.log(res)
        if (res.data.status) {
          that.setData({
            nickname:res.data.data.nickname,
            imgUrl:res.data.data.avatar_url,
            mobile:res.data.data.mobile
          })
        } else{
          that.setData({
            nickname: "未登录",
          })
        }
      }
    })
  },
  attached() {
    console.log("success")
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();
    function numDH() {
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            starCount: i,
            forksCount: i,
            visitTotal: i
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          starCount: that.coutNum(3000),
          forksCount: that.coutNum(484),
          visitTotal: that.coutNum(24000)
        })
      }
    }
    wx.hideLoading()
  },
  //登出
  outlogin(e){
    var that = this
    var baseUrl = app.globalData.baseUrl
    var modalName = e.currentTarget.dataset.target
    console.log(modalName)
    var modalContent
    wx.request({
      url: baseUrl + 'api/user/logout' + '?token=' + this.data.token,
      method:"GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res){
        if(res.data.status){
          modalContent = "退出登录成功"
          that.setData({
            nickname: "未登录",
            imgUrl:null
          })
        }else{
          modalContent = "已经登出"
        }
        that.setData({
          modalName: modalName,
          modalContent: modalContent,
        })
        
      }
    })
  },
  //去注册页面
  toreg() {
    wx.navigateTo({
      url: '/pages/reg/reg',
    })
  },
  //去登录页面
  tologin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  //页面跳转账本设置
  tosettings() {
    wx.navigateTo({
      url: '/pages/settings/settings',
    })
  },
  //去账号和安全页面
  toUserInfo(){
    wx.navigateTo({
      url: '/pages/userinfo/userinfo',
    })
  },
  methods: {
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },
    
    showQrcode() {
      wx.previewImage({
        urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
        current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
      })
    },
  }
})