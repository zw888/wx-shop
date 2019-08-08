// pages/setAddress/setAddress.js
import ajax, {
  modifyAddressUrl
} from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressText: '',
    activeAddress: {
      enabled: false, // 是否默认
      province: '', // 省
      city: '', // 市
      county: '', // 区
      detail: '', // 详细信息
      phone: '', // 手机
      customerName: '', // 用姓名
      customerId: wx.getStorageSync('userInfo').customerId
    },
    isCanSave: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(111, getApp())
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

    this.updateActiveAddress()
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

  },
  updateActiveAddress() {
    // 地址重置
    this.setData({
      activeAddress: {
        ...this.data.activeAddress,
        province: '',
        city: '',
        county: ''
      },
      addressText: ''
    })
    // 选中修改的地址
    const addressObj = wx.getStorageSync('editAddressItem') || {}
    const selectedAddress = wx.getStorageSync('mySelectedAddressArr')
    console.log('selectedAddress', selectedAddress)
    if (selectedAddress) {
      if (selectedAddress[0]) {
        this.setData({
          activeAddress: { ...this.data.activeAddress,
            province: selectedAddress[0],
          }
        })
      }
      if (selectedAddress[1]) {
        this.setData({
          activeAddress: { ...this.data.activeAddress,
            city: selectedAddress[1],
          }
        })
      }
      if (selectedAddress[2]) {
        this.setData({
          activeAddress: { ...this.data.activeAddress,
            county: selectedAddress[2],
          }
        })
      }
      this.setData({
        addressText: selectedAddress.join('\\')
      })
    } else if (addressObj.id) {
      const { id, province, city, county, detail, phone, customerName, customerId } = addressObj
      this.setData({
        activeAddress: { ...this.data.activeAddress,
          id, province, city, county, detail, phone, customerName, customerId
        }
      }, ()=>{
        const {province, city, county} = this.data.activeAddress
        const arr = [province, city, county].join('\\')
        console.log(888, arr, province, city, county)
        this.setData({
          addressText: arr
        })
      })
    }
  },
  toSelectAddress() {
    wx.navigateTo({
      url: '/pages/address/shenList/shenList',
    })
  },
  // 保存添加地址
  handleAddAddressClick() {
    wx.showLoading({
      title: '正在保存地址...',
    })
    const {
      activeAddress
    } = this.data
    ajax(modifyAddressUrl, activeAddress, 'POST').then(
      data => {
        console.log(data)
        if (data.code === '0') {
          wx.showToast({
            title: data.msg,
            icon: 'success',
            complete: ()=>{
              setTimeout(()=>{
                wx.navigateBack({
                })
              }, 1000)
            }
          })
        }
      }
    ).catch(res => {
      console.log(res)
    })
  },
  updateInputValue(e) {
    const {type} = e.currentTarget.dataset
    const {value} = e.detail
    this.setData({
      activeAddress: {
        ...this.data.activeAddress, [type]: value
      }
    })
  }
})