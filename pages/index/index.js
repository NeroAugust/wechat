//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    year:"",
    month:"",
    navH:"",
    title_index:"一起来记账",
    income:'',
    income1:'',
    pay:'',
    pay1:''
  },
  
  //获取账户信息
  getAccountList(){
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    console.log(token)
    wx.request({
      url: baseUrl +'api/account?token='+token,
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res){
        console.log(res)
        console.log(res.data.data)
        that.setData({
          accountlist:res.data.data
        })

      }
    })
  },
  //首页数据接口
  getIndexData(){
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    wx.request({
      url: baseUrl +'api/view/home?token='+token,
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res){

        console.log(res.data)
        if(res.data.status){
          // var year = res.data.data.account.month.split("-")[0]
          // var month = res.data.data.account.month.split("-")[1]
          var income = res.data.data.account.in.split(".")[0]
          var income1 = res.data.data.account.in.split(".")[1]
          var pay = res.data.data.account.out.split(".")[0]
          var pay1 = res.data.data.account.out.split(".")[1]
        }else if(res.data!=1){
          income:0
          income1:'00'
          pay:0
          pay1:'00'
        }
        that.setData({
          // month: month,
          // year: year,
          income: income,
          income1: income1,
          pay: pay,
          pay1: pay1,
        });
        console.log(that.data.income,that.data.income1,that.data.pay,that.data.pay1)
      }
    })
  },
  //监听加载
  onLoad: function () {
    // swiper设置高度
    var that = this;
    // let date = new Date();
    // let year = date.getFullYear();
    // let month = date.getMonth() + 1
    that.getToken()
    that.getDate()
    that.setData({
      navH: app.globalData.navHeight
    })
    that.getBookDetailList()
    that.getIndexData()
    that.getAllBookList()
  },
  //返回后刷新
  onShow:function(){
    var total_money = wx.getStorageSync('total_money')
    var company_name = wx.getStorageSync('company_name')
    this.setData({
      company_name: company_name,
      total_money:company_name
    })
    console.log('+++++++++')
    this.onLoad()
  },
  //获取token
  getToken() {

    this.data.token = wx.getStorageSync('token')
    console.log(this.data.token)
  },
  //获取日期
  getDate() {
    var that = this
    var date = new Date()
    that.setData({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.toLocaleDateString(),
      day:date.getDay()
    })
  },
  /*
    账簿
  */
  //有权访问的所有帐簿
  getAllBookList(){
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token 
    wx.request({
      url: baseUrl +'api/book?token='+token,
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res){
        console.log(res.data.data)
        if(res.data.status){
          var allBookList = res.data.data
          that.setData({
            allBookList:allBookList
          })
        }
      }
    })
  },
  //切换账簿
  chooseBook(e){
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    var bookid = e.currentTarget.dataset.bookid
    this.setData({
      bookid:bookid
    })
    console.log(this.data.bookid)
    wx.request({
      url: baseUrl +'api/book/set-default?token='+token,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        book_id:that.data.bookid
      },
      success(res){
        // console.log(res)
        if(res.data.status){
          wx.showModal({
            title: '操作提示',
            content: res.data.data,
          })
        }
        that.onLoad()
      },
      
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
  //事件处理函数
  // 返回上一页
  navBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //页面跳转账本类别设置
  goCategroySettings(){
    wx.navigateTo({
      url: '/pages/categorysettings/categorysettings',
    })
  },
  //页面跳转账本设置
  toBookSetting(){
    wx.navigateTo({
      url: '/pages/booksetting/booksetting',
    })
  },
  //记帐明细列表(帐面)
  getBookDetailList(){
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    var year = this.data.year
    var month = this.data.month
    var date = this.data.date
    var begin_date = `${year}-${month}-1`
    var end_date = `${year}-${month}-31`
    console.log(begin_date,end_date)
    wx.request({
      url: baseUrl + 'api/record/account?token=' + token,
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        begin_date: begin_date,
        end_date: end_date
      },
      success(res){
        console.log(res.data.data.list)
        if(res.data.status){
          that.setData({
            bookDetailList:res.data.data.list
          })
        }
      }
    })
  },
  
  //记帐单条详情
  getBookDetail(){
    var that = this
    var baseUrl = app.globalData.baseUrl
  },
  toDetailBill(e){
    this.data.id = e.currentTarget.dataset.id
    console.log(this.data.id)
    wx.setStorage({
      key: 'zid',
      data: this.data.id,
      success:function(){
        console.log('账单id缓存成功')
      }
    })
    wx.navigateTo({
      url: '/pages/detailbill/detailbill',
    })
  },
  deleteBill(e){
    var that = this
    var id = e.currentTarget.dataset.id
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    wx.request({
      url: baseUrl +'api/record/delete?id='+id+'&token='+token,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res){
       wx.showModal({
         title: '操作提示',
         content: res.data.data,
       })
       that.onLoad()
      }
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
    this.getAccountList()
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  navHome: function () {
    wx.reLaunch({
      url: '../index/index'
    })
  },
  tologin:function(){
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  //日期处理函数
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let year=e.detail.value.split("-")[0]
    let month=e.detail.value.split("-")[1]
    this.setData({
      year:year,
      month:month
    })
    this.getBookDetailList()
    // this.getIndexData()
  },
})
