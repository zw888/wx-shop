// pages/shopping/shopping.js
import ajax, { getProdListUrl, getProdFirstUrl } from '../../utils/api.js'
import { addProductToCart} from '../../utils/cart.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'curentPrice', value: '价格', checked: false },
      { name: 'salesValue', value: '销量', checked: false},
    ],
    isLoading: false,
    classTypes: [
    ],
    productList: [
      
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
      data=>{
        if(data.code === '0') {
          this.setData({
            classTypes: data.content.typeList
          })
        }
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
     ajax(getProdListUrl, params, 'GET').then(
      data=>{
        console.log('getProductList', data)
        if(data.code === '0') {
          this.setData({
            productList: data.content
          })
        }
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
    this.getProductClassType()
    this.getProductList()
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
    if (this.data.params.typeCode === key) return
    console.log('切换后的key', key)
    this.setData({
      params: { 
        ...this.data.params, 
        typeCode: key
      } 
    }, ()=>{
      this.getProductList()
    });
  },
  addProductToCart(e) {
    const {item} = e.currentTarget.dataset 
    console.log(1111, item)
    if (item) {
      addProductToCart(item)
    }
  }
})