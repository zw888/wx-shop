// pages/shopping/shopping.js
import ajax, { getProductDataUrl, getProdFirstUrl } from '../../utils/api.js'
import { addProductToCart} from '../../utils/cart.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'curentPrice', value: '价格', checked: false },
      { name: 'salesValue', value: '销量', checked: false },
    ],
    isLoading: false,
    classTypes: [
      { id: 1, className: '燕窝类' },
      { id: 2, className: '虫草类' },
      { id: 3, className: '海参类' },
      { id: 4, className: '鱼胶类' },
      { id: 5, className: '九宫格' },
      { id: 6, className: '节月礼盒类' },
      { id: 7, className: '促销类' },
      { id: 8, className: '儿童类' },
      { id: 9, className: '衣饰类' },
      { id: 10, className: '玩具类' }
    ],
    productList: [
      { id: '1', imageUrl: '../../images/product1.jpg', name: '蓝草精华', tag: '新品.限时.定制', oldPrice:"425.00", vipPrice: '425.00'},
      { id: '2', imageUrl: '../../images/product1.jpg', name: '牛精食品', tag: '力道.限时.定制', oldPrice: "425.00", vipPrice: '425.00' },
      { id: '3', imageUrl: '../../images/product1.jpg', name: '蛋偶脆皮', tag: '新鲜.美食.口味', oldPrice: "425.00", vipPrice: '425.00' }
    ],
    productClassType: [],
    params: {
      typeCode: '',
      orderByFile: '',
      pageNum: 1,
      pageSize: 10,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductClassType()
    this.getProductList()
  },
  getProductClassType() {
    const params = {
      pageNum: 1,
      pageSize: 5,
      orderByFile: 'curentPrice'
    }
    ajax(getProdFirstUrl, params).then(
      res=>{
        console.log(res)
      }
    ).catch(err => {
      console.log(err)
    })
  },
   getProductList() {
     this.setData({
       isLoading: true
     })
     wx.showToast({
       title: '加载中',
       icon: 'loading'
     })
    const {params} = this.data
    ajax(getProductDataUrl, params, 'GET').then(
      res=>{
        console.log('getProductList', res)


        this.setData({
          isLoading: false
        })
        wx.hideToast();
      }
    ).catch(
      err=>{
        console.log(err)
        this.setData({
          isLoading: false
        })
        wx.hideToast();
      }
    )
  },
  toOtherPage(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/product/product?id=' + id,
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
    console.log('onReachBottom')
    if(this.data.isLoading) return
    const { params } = this.data
    this.setData({
      params: { ...params, pageNum: params.pageNum +1}
    }, ()=>{
      this.getProductList()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  checkboxChange: function (e) {
    const { value} = e.detail
    console.log('checkbox发生change事件，携带value值为：', value)
    if (value.length) {
      const orderByFile = value.join(',')
      this.setData({
        params: {
          ...this.data.params,
          orderByFile
        }
      })
    }
  },
  switchClassType(e) {
    const {key} = e.target.dataset 
    if (this.data.params.orderByFile === key) return
    console.log('切换后的key', key)
    this.setData({
      params: { 
        ...this.data.params, 
        orderByFile: key
      } 
    });
  },
  addProductToCart(e) {
    const {item} = e.currentTarget.dataset 
    if (item) {
      addProductToCart(item)
    }
  }
})