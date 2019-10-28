// pages/booksetting/booksetting.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_text: "账簿设置",
  },
  //获取token
  getToken() {
    this.data.token = wx.getStorageSync('token')
    console.log(this.data.token)
  },
  //有权访问的所有帐簿
  getAllBookList() {
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    wx.request({
      url: baseUrl + 'api/book?token=' + token,
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        // console.log(res.data.data)
        if (res.data.status) {
          var allBookList = res.data.data
          that.setData({
            allBookList: allBookList
          })
        }
      }
    })
  },
  //返回按钮
  navBack() {
    wx.navigateBack({
      delta: 1
    })
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
  //监听bookname
  setBookName(e){
    this.setData({
      bookName: e.detail.value.trim()
    })
  },
  //添加账簿
  addBook(){
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    wx.request({
      url: baseUrl +'api/book/create?token='+token,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        name: that.data.bookName
      },
      success(res){
        console.log(res)
        if(res.data.status){
         wx.showModal({
           title: '操作提示',
           content: '添加账簿成功,id为'+res.data.data.id,
         })
        }else{
          wx.showModal({
            title: '操作提示',
            content: '添加账簿失败/最多只能有两个账簿',
          })
        }
        that.hideModal()
        that.onLoad()
      }
    })
  },
  //删除账簿
  deleteBook(e){
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    var bookid = e.currentTarget.dataset.bookid
    that.setData({
      bookid:bookid
    })
    console.log(that.data.bookid)
    wx.request({
      url: baseUrl +'api/book/delete?token='+token,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        book_id: that.data.bookid
      },
      success(res){
        // console.log(res)
        if(res.data.status){
          wx.showModal({
            title: '操作提示',
            content: '删除成功',
          })
        }else{
          wx.showModal({
            title: '操作提示',
            content: '删除失败',
          })
        }
        that.onLoad()
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
    this.getToken()
    this.getAllBookList()
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