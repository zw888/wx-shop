// pages/login/login.js
import {getCode} from '../../utils/util.js'
import ajax, {getSessionUrl} from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    showModal: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  },
  handleShowModal: function() {
    console.log(111)
    this.setData({
      showModal: !this.data.showModal
    })
  },
  getUserInfo: function (e) {
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    const { userInfo } = e.detail
    getCode().then(code=>{
      console.log(code)
      const data = {
        Authorization: '',
        code,
        nikeName: userInfo.nickName,
        sex: userInfo.gender,
        birthday: ''
      }
      console.log(data, userInfo, getSessionUrl)
      ajax(getSessionUrl, data, 'POST').then(
        res=>{
          console.log(res)
        }
      ).catch(res=>{
        console.log(err)
      })
    }).catch(
      err => {
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    )
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