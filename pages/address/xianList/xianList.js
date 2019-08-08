// pages/XianList/XianList.js
import ajax, { getXianListUrl } from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xianList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.adcode)
    this.getXianList(options.adcode)
  },
  getXianList(adcode) {
    ajax(getXianListUrl + `${adcode}_district.json`, {}, 'GET').then(data => {
      const shenArr = wx.getStorageSync('mySelectedAddressArr')
      const xianList = data.rows.filter((item) => { return item.parent === shenArr[1]})
      this.setData({
        xianList
      })
    }).catch(err => {
      console.log(err)
    })
  },
  toSetAddressPage(e) {
    const { name } = e.currentTarget.dataset
    const shenArr = wx.getStorageSync('mySelectedAddressArr')
    const addressArr = [...shenArr, name]
    wx.setStorageSync('mySelectedAddressArr', addressArr)
    wx.navigateBack()
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