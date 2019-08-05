// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [
      {
        id: 1,
        isSelected: false,
        detailAddress: '123弄89号23室',
        address: '上海市黄浦区',
        username: '小邓子',
        phoneNumber: '18745430932'
      },
      {
        id: 2,
        isSelected: true,
        detailAddress: '169弄78号23室',
        address: '上海市嘉峪关',
        username: '小邓子',
        phoneNumber: '18745430932'
      },
      {
        id: 3,
        detailAddress: '154弄51号18室',
        isSelected: false,
        address: '北京市嘉定区',
        username: '小邓子',
        phoneNumber: '18745430932'
      },
      {
        id: 4,
        isSelected: false,
        detailAddress: '198弄32号28室',
        address: '深圳市大江区',
        username: '小邓子',
        phoneNumber: '18745430932'
      }
    ],
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  // 切换当前地址
  switchActiveAddress(e) {
    const {id} = e.currentTarget.dataset
    const { addressList} = this.data
    const activeIndex = addressList.findIndex(item=>item.id === id)
    addressList.forEach((item, index)=>{
      if (activeIndex === index) {
        item.isSelected = true
      } else {
        item.isSelected = false
      }
    })
    this.setData({
      addressList
    })
  },
  // 修改当前地址
  editActiveAddress (e) {
    const { address} = e.currentTarget.dataset
    console.log('address' , address)
    wx.setStorageSync('editAddressItem', address)
    wx.navigateTo({
      url: '/pages/setAddress/setAddress',
    })
  }
})