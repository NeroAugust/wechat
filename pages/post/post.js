// pages/post/post.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_text:"记一笔",
    imgList:[],
    keyList:[]
  },
  // 返回上一页
  navBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  goBack:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  tabSelect(e) {
    this.setData({
      //获取支出或者收入ID(TabCur)
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    console.log(e.currentTarget.dataset.id);
    this.getIncomeOrPayCategory()
    // console.log((e.currentTarget.dataset.id - 1) * 60)
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      categroyid:e.currentTarget.dataset.categroyid
    })
    //获取类别id(categroyid)
    console.log(this.data.categroyid)
    
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  //选择图片
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
  //上传图片
  UploadImg(e){
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    var photoUrl = this.data.imgList[0]
    wx.uploadFile({
      url: baseUrl + 'api/upload/image?token='+token,
      filePath: photoUrl,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: null,
      success(res){
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
  //删除图片
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        // console.log(e.currentTarget.dataset.index)
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.data.keyList.splice(e.currentTarget.dataset.index,1)
          this.setData({
            imgList: this.data.imgList,
            keyList:this.data.keyList
          })
          console.log(this.data.keyList)
        }
      }
    })
  },
  //获取ID
  getId() {
    this.data.accountId = wx.getStorageSync("accountId")
    console.log(this.data.accountId)
  },
  //获取日期
  gedate(){
    var date = new Date()
    date = date.toLocaleDateString()
    this.setData({
      date:date,
    })
  },
  //获取token
  getToken() {
    this.data.token = wx.getStorageSync('token')
    console.log(this.data.token)
  },
  //获取收入(支出)类别
  getIncomeOrPayCategory() {
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
      data: {
        type: type
      },
      success(res) {
        console.log(res)
        if (res.data.status) {
          that.setData({
            categroylist: res.data.data
          })
        }
      }
    })
  },
  //记账
  bookkeeping(){
    var that = this
    var baseUrl = app.globalData.baseUrl
    var token = this.data.token
    console.log("token===="+token)
    //类别id
    var categroyid = this.data.categroyid
    console.log("categroyid====" + categroyid)
    //账户id
    var accountId = this.data.accountId
    console.log("accountId====" + accountId)
    //交易对象
    var trader = this.data.trader
    console.log("trader====" + trader)
    //初始金额
    var total_money = this.data.total_money
    console.log("total_money====" + total_money)
    //金额
    var money = this.data.money
    console.log("money====" + money)
    //日期
    var date = this.data.date
    console.log("date====" + date)
    //备注
    var remark = this.data.remark
    console.log("remark====" + remark)
    //图片key
    var image_key = this.data.keyList
    console.log("image_key====" + image_key)
    wx.request({
      url: baseUrl +'api/record/create?token='+token,
      method:'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        total_money: total_money,
        money:money,
        account_id: accountId,
        category_id: categroyid,
        date:date,
        company_name: trader,
        remark:remark,
        image_keys: image_key
      },
      success(res){
        // console.log(res)
        if(res.data.status){
          wx.showToast({
            title: res.data.data,
            icon:'success',
            duration:2000
          })
        }else{
          wx.showToast({
            title:'操作失败',
            icon:'loading',
            duration:2000
          })
        }
        that.gedate()
        console.log(that.data.date)
        that.setData({
          total_money:'',
          money:'',
          date: that.data.date,
          trader:'',
          remark:'',
          keyList:[],
          imgList:[]
        })
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
      TabCur: 1
    })
    that.getToken()
    that.getIncomeOrPayCategory()
    that.gedate()
    that.getId()
  },
  //监听记账金额
  setTotalMoney(e){
    this.setData({
      total_money: e.detail.value.trim()
    })
  },
  //监听金额
  setMoney(e){
    this.setData({
      money: e.detail.value.trim()
    })
  },
  //监听日期
  DateChange(e) {
    this.setData({
      date: e.detail.value.trim()
    })
    console.log(this.data.date)
  },
  //监听交易对象
  setTrader(e){
    this.setData({
      trader: e.detail.value.trim()
    })
  },
  //监听备注
  setRemark(e){
    this.setData({
      remark: e.detail.value.trim()
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