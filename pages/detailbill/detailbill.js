// pages/detailbill/detailbill.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_text: "账单详情"
  },
  // 返回上一页
  navBack: function () {
    console.log('-----------')
    wx.setStorageSync('total_money', this.data.total_money)
    wx.setStorageSync('company_name', this.data.company_name)
    console.log('============')
    wx.navigateBack({
      delta: 1
    })
  },
  //获取账单id
  getZid(){
    var zid = wx.getStorageSync('zid')
    this.setData({
      zid:zid
    })
    console.log('zid='+this.data.zid)
  },
  //获取token
  getToken(){
    var token = wx.getStorageSync('token')
    this.setData({
      token:token
    })
    console.log('token=' + this.data.token)
  },
  //获取账单详情
  getDetailBill(){
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    var zid = this.data.zid
    wx.request({
      url: baseUrl +'api/record/detail?id='+zid+'&token='+token,
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res.data)
       if(res.data.status){
         console.log(res.data.data)
         var obj =res.data.data
         var items =res.data.data.items[0]
         var thumbnail = []
         var original = []
         // 图片有几张
         var img_len = items.images.length
         for (var i = 0; i < img_len; i++) {
           thumbnail.push(items.images[i].thumbnail)
           original.push(items.images[i].original)
         }
        console.log(thumbnail);
         that.setData({
            zid:obj.id,
            book_id: obj.book_id,
            user_id: obj.user_id,
            user_nickname: obj.user_nickname,
            category_id: obj.category_id,
            category_name: obj.category_name,
            account_id: items.account_id,
            account_name: items.account_name,
            date:obj.date,
            company_name: obj.company_name,
            total_money: obj.total_money,
            paid_money: obj.paid_money,
            type_string: obj.type_string,
            type:obj.type,
            remark: obj.remark,
            thumbnail: thumbnail,
            original: original
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
      TabCur: 1
    })
    that.getZid()
    that.getToken()
    that.getDetailBill()
  },
  //放大图片
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.thumbnail,
      current: e.currentTarget.dataset.url
    });
  },
  //监听金额
  setMoney(e) {
    this.setData({
      total_money: e.detail.value.trim()
    })
  },
  //监听交易对象
  setCompanyName(e) {
    this.setData({
      company_name: e.detail.value.trim()
    })
  },
  //监听备注
  setRemark(e) {
    this.setData({
      remark: e.detail.value.trim()
    })
  },
  modifyBill(){
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    var zid = this.data.zid
    var total_money = this.data.total_money
    var remark = this.data.remark
    var company_name = this.data.company_name
    console.log(total_money, remark, company_name)
    wx.request({
      url: baseUrl +'api/record/update?id='+zid+'&token='+token,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        total_money: total_money,
        company_name: company_name,
        remark: remark
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
            title: '操作提示',
            content: res.data.data,
          })
        }
      }
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