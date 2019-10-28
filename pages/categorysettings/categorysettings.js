// pages/categorysettings/categorysettings.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_text: "类别设置",
    categroylist:'',
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {},
  },
  //返回按钮
  navBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  //获取收入(支出)类别
  getIncomeOrPayCategory(){
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    var type = this.data.TabCur
    wx.request({
      url: baseUrl + 'api/category?token=' + token,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        type:type
      },
      success(res) {
        // console.log(res)
        if(res.data.status){
        that.setData({
          categroylist: res.data.data
        })
        }
      }
    })
  },
  //监听输入类别框
  setCategroy(e){
    this.setData({
      categroyName: e.detail.value.trim()
    })
  },
  //新增收入(支出)类别
  addCategroy(){
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    var type = this.data.TabCur
    var categroyName = this.data.categroyName
    wx.request({
      url: baseUrl +'api/category/create?token='+token,
      method: "POST",
      data: {
        parent_id: 0,
        type: type,
        name: categroyName,
        sort: 1
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res){
        // console.log(res)
        if(res.data.status){
          that.setData({
            categroyid :res.data.data.id
          })
          that.setData({
            categroyName:""
          })
          wx.showToast({
            title: '添加类别成功',
            icon: 'success',
            duration: 1000//持续的时间
          })
          that.hideModal()
          // console.log(res.data.data.id)
          // wx.setStorage({
          //   key: 'categroyId',
          //   data: that.data.categroyId,
          //   success:function(){
          //     console.log("类别id缓存保存成功")
          //   }
          // })
          that.getIncomeOrPayCategory()
        }else{
          wx.showToast({
            title: '添加类别失败',
            icon: 'loading',
            duration: 2000//持续的时间
          })
        }
      }
    })
  },
  //删除收入(支出)类别, 如果该分类下有子分类,将一并删除
  deleteCategroy(e){
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    this.data.categroyid = e.currentTarget.dataset.categroyid
    // console.log(this.data.categroyid)
    var id = this.data.categroyid
    wx.request({
      url: baseUrl + 'api/category/delete?id=' + id +'&token='+token,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res){
        // console.log(res)
        that.getIncomeOrPayCategory()
        wx.showToast({
          title: res.data.data,
          icon:'success',
          duration:1000
        })
      }
    })
  },
  //跳出修改收入(支出)类别
  modifyCategroy(e){
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    this.data.categroyid = e.currentTarget.dataset.categroyid
    var id = this.data.categroyid
    var categroyName = this.data.categroyName
    wx.request({
      url: baseUrl + 'api/category/update?id=' + id + '&token=' + token,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        name: categroyName
      },
      success(res) {
        console.log(res)
        that.hideModal()
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
      TabCur:1
    })
    that.getToken()
    that.getIncomeOrPayCategory()
  },
  //获取token
  getToken() {
    this.data.token = wx.getStorageSync('token')
    console.log(this.data.token)
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    console.log(e.currentTarget.dataset.id);
    this.getIncomeOrPayCategory()
    // console.log((e.currentTarget.dataset.id - 1) * 60)
  },
  //返回按钮
  navBack() {
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

  },
  // 显示遮罩层
  showModal: function () {
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 600,//动画的持续时间 默认600ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn();//调用显示动画
    }, 200)
  },

  // 隐藏遮罩层
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800,//动画的持续时间 默认800ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function () {
      that.setData({
        hideModal: true
      })
    }, 720)//先执行下滑动画，再隐藏模块

  },

  //动画集
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
})