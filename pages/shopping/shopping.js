// pages/shopping/shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'price', value: '价格', checked: 'true' },
      { name: 'volumn', value: '销量' },
    ],

    classTypes:[
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
    activeClassType: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toOtherPage(e) {
    const {id} = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/product/product?id='+ id,
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

  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  switchClassType(e) {
    this.setData({
      activeClassType: e.target.dataset.key
    });
  }
})