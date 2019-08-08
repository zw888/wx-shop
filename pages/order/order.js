// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderProductList: [],
    selectedCartProductAllNum: 0,
    cartProductAllPrice:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getorderProductList()
  },

  // 得到订单列表
  getorderProductList() {
    const orderProductList = wx.getStorageSync('orderProductList')
    console.log('orderProductList', orderProductList)
    this.setData({
      orderProductList
    }, () => {
      this.setCartProductAllPrice()
      this.setSelectedCartProductAllNum()
    })
  },
  // 设置选中总数量
  setSelectedCartProductAllNum() {
    const {
      orderProductList
    } = this.data
    let sum = 0
    orderProductList.forEach((item) => {
      sum += item.num
    })
    this.setData({
      selectedCartProductAllNum: sum
    })
  },
  // 设置产口的价格
  setCartProductAllPrice() {
    const {
      orderProductList
    } = this.data
    let sum = 0.00
    orderProductList.forEach((item) => {
      sum += item.curentPrice * item.num
    })
    console.log(sum)
    this.setData({
      cartProductAllPrice: Number(sum).toFixed(2)
    })
  },
  // 用户留言焦点丢失的触发事件
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  },
  // 去我的地址页面
  goToAddressPage () {
    wx.navigateTo({
      url: '/pages/address/address',
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