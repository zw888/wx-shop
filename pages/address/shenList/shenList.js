// pages/shenList/shenList.js
import ajax, { getShenListUrl } from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shenList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShenList() 
  },

  getShenList () {
    ajax(getShenListUrl, {},'GET').then(data=>{
      console.log('getShenListUrl', data)
      this.setData({
        shenList: data.rows
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  toShiList(e) {
    const {adcode, name} = e.currentTarget.dataset
    wx.setStorageSync('mySelectedAddressArr', [])
    const addressArr = [name]
    wx.setStorageSync('mySelectedAddressArr', addressArr)
    wx.redirectTo({
      url: '/pages/address/shiList/shiList?adcode=' + adcode
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