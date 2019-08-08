// pages/product/product.js
import ajax, { getProdDetailUrl } from '../../utils/api.js'
import { addProductToCart, getCartProductList } from '../../utils/cart.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeId: '',
    // 商品详情
    productInfo: {
    },
    // 规格
    productClassInfo: [
    ],
    // 商品存入购物车的一些信息
    productCartData: {
    },
    // banner图片
    bannerImgUrls: [],
    // 详情图片
    detailsImgUrls: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    // 购物车数量
    cartProductTotal: 0,
    // 当前规格的index
    activeClassIndex: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    this.setCartProductLength()
  },
  onLoad: function (options) {
   
    // 获取购物车数量
    this.setCartProductLength()

    const {id} = options
    this.setData({
      productInfo: { ...this.data.productInfo, id},
      activeId: id
    }, ()=>{
      this.getProductDetails(this.data.activeId)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  setCartProductLength() {
    // 获取购物车数量
    const cartProductTotal = getCartProductList().length;
    this.setData({ cartProductTotal })
  },
  getProductDetails(id) {
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading'
    })
    const params = {
      id
    }
    ajax(getProdDetailUrl, params, 'GET').then(
      data=>{
        wx.hideToast()
        console.log('productDetails', data)
        this.setData({
          productInfo: data.content.productDetail,
          productClassInfo: data.content.specsList
        }, ()=>{
          const { productInfo, activeClassIndex, productClassInfo } = this.data
          const bannerImgUrls = productInfo.prodPic.split(',')
          const detailsImgUrls = productInfo.prodDetail.split(',')
          this.setData({
            bannerImgUrls,
            detailsImgUrls,
            productCartData: { ...productInfo, ...productClassInfo[activeClassIndex]}
          }, ()=>{
          })
        })
      }
    ).catch(err=>{
      wx.hideToast()
      console.log(err)
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  switchActiveClassIndex :function (e) {
    const {index} = e.currentTarget.dataset
    if(index !== this.data.activeClassIndex)
    this.setData({
      activeClassIndex: index,
      productCartData: { ...this.data.productInfo, ...this.data.productClassInfo[index] } 
    })
  },
  // 添加购物车
  addProductToCart (e) {
    addProductToCart(this.data.productCartData)
    this.setCartProductLength()
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  goToCartPage() {
    wx.navigateTo({
      url: '/pages/cart/cart',
    })
  },
  orderOneProduct() {
    const orderProductItem = this.data.productCartData
    orderProductItem.selected = true
    orderProductItem.num = 1
    wx.setStorageSync('orderProductList', [orderProductItem])
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },
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