// pages/order/order.js
import {
  getCartProductList
} from '../../utils/cart.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartProductList: [],
    selectedCartProductAllNum: 0,
    cartProductAllPrice:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCartProductList()
  },

  // 得到订单列表
  getCartProductList() {
    const list = getCartProductList()
    console.log('orderList', list)
    const cartProductList = list.filter((item) => item.selected)
    this.setData({
      cartProductList
    }, () => {
      this.setCartProductAllPrice()
      this.setSelectedCartProductAllNum()
    })
  },
  // 设置选中总数量
  setSelectedCartProductAllNum() {
    const {
      cartProductList
    } = this.data
    let sum = 0
    cartProductList.forEach((item) => {
      sum += item.num
    })
    this.setData({
      selectedCartProductAllNum: sum
    })
  },
  // 设置产口的价格
  setCartProductAllPrice() {
    const {
      cartProductList
    } = this.data
    let sum = 0.00
    cartProductList.forEach((item) => {
      sum += item.vipPrice * item.num
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