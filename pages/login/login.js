// pages/login/login.js
import {
  getCode
} from '../../utils/util.js'
import ajax, {
  getSessionUrl,
  getPhoneNumberUrl,
  phoneLoginUrl
} from '../../utils/api.js'
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
  onLoad: function() {
    console.log(3333, getApp())
  },
  handleShowModal: function() {
    this.setData({
      showModal: !this.data.showModal
    })
  },
  getPhoneNumber: function(e) {
    console.log('手机号码', e)
    const {
      encryptedData,
      iv
    } = e.detail
    getCode().then(code => {
      const data = {
        code,
        nikeName: getApp().globalData.userInfo.nickName,
        sex: String(getApp().globalData.userInfo.gender),
        birthday: ''
      }
      ajax(getSessionUrl, data, 'POST').then(
        res => {
          
          const openid = res.content.openid
          const phoneParams = {
            encryptedData,
            openId: openid,
            iv
          }
          ajax(getPhoneNumberUrl, phoneParams, 'POST').then(
            data => {
             
              if (data.code === '0') {
                const {
                  phoneNumber
                } = data.content
                const phoneObj = JSON.stringify(data.content)
                wx.setStorageSync('phoneNumber', data.content.phoneNumber)

                if (openid) {
                  ajax(phoneLoginUrl, {
                    phone: phoneNumber,
                    openId: openid
                  }, 'POST').then(data => {
                    if (data.code === 200) {
                      wx.showToast({
                        title: data.msg,
                        complete: () => {
                          setTimeout(() => {
                            wx.switchTab({
                              url: '/pages/shopping/shopping'
                            })
                          })
                        }
                      })
                    }
                  }).catch(err => {
                    console.log(err)
                    throw new Error(err)
                  })
                }

              }
            }
          ).catch(
            err => {
              console.log(err)
            }
          )
        }
      ).catch(err => {
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})