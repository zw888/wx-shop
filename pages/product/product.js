// pages/product/product.js
import ajax, { getProdDetailUrl } from '../../utils/api.js'
import { addProductToCart, getCartProductList } from '../../utils/cart.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情
    productInfo: {
    },
    // 规格
    productClassInfo: [
    ],
    // banner图片
    bannerImgUrls: [],
    // 详情图片
    detailsImgUrls: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    cartProductTotal: 0,
    // 商品存入购物车的一些信息
    productCartData: {
      id: '',
      imageUrl: '../../images/product1.jpg',
      name: '即时燕窝',
      tag: '新鲜.可口.舒适',
      oldPrice: '323.89',
      vipPrice: '480.00'
    },
    product: {
      price: '189.00',
      vipPirce: '160.00',
      name: '即时燕窝',
      size: ['10g', '50g', '100g'],
    },
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
      productCartData: {...this.data.productCartData, id}
    })
    this.getProductDetails(id)
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
          const { productInfo } = this.data
          const bannerImgUrls = productInfo.prodPic.split(',')
          const detailsImgUrls = productInfo.prodDetail.split(',')
          this.setData({
            bannerImgUrls,
            detailsImgUrls
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
  switchActiveClassIndex (e) {
    const {index} = e.currentTarget.dataset
    if(index !== this.data.activeClassIndex)
    this.setData({
      activeClassIndex: index
    })
  },
  // 添加购物车
  addProductToCart (e) {
    console.log(999, this.data.productCartData)
    addProductToCart(this.data.productCartData)
    this.setCartProductLength()
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  goToCartPage() {
    console.log(3333)
    wx.navigateTo({
      url: '/pages/cart/cart',
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