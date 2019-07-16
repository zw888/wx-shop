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
    openId: '',
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
        code,
        nikeName: userInfo.nickName,
        sex: String(userInfo.gender),
        birthday: ''
      }
      console.log(data, userInfo, getSessionUrl)
      ajax(getSessionUrl, data, 'POST').then(
        res=>{
          console.log(3333, res.data.content.openid)
          wx.showToast({
            title: '微信登录成功',
            complete:()=>{
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/index/index',
                })
              }, 1000)
            }
          })
          
        }
      ).catch(res=>{
        console.log(err)
      })
    }).catch(
      err => {
        console.log(err)
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