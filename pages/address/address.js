// pages/address/address.js
import ajax, {
  addressListUrl, defautlAddressUrl
} from '../../utils/api.js'

const initState = {
  loading: false,
  noData: false,
  loadFail: false,
  noMoreData: false
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    listState: {
      loading: false,
      noData: false,
      loadFail: false,
      noMoreData: false
    },
    params: {
      limit: 10,
      offset: 1,
      customerId: wx.getStorageSync('userInfo').customerId
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    wx.removeStorageSync('editAddressItem')
    wx.removeStorageSync('mySelectedAddressArr')
    this.initAddressList()
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
  // 切换当前地址
  switchActiveAddress(e) {
    const {
      id
    } = e.currentTarget.dataset
    this.setDefautlAddress(id)
    // this.setData({
    //   addressList
    // })
  },
  // 修改当前地址
  editActiveAddress(e) {
    const {
      address
    } = e.currentTarget.dataset
    console.log('address', address)
    wx.setStorageSync('editAddressItem', address)
    wx.navigateTo({
      url: '/pages/address/setAddress/setAddress',
    })
  },
  // 更新状态
  updateListState(type, value) {
    this.setData({
      listState: {
        ...initState,
        [type]: value,
      }
    })
  },
  // 判断是否可执行状态
  isCanLoadByState() {
    const {listState} = this.data
    for (let val in listState) {
      if (listState[val]) {
        return false
      }
    }
    return true
  },
  // 初始化地址列表
  initAddressList() {
    const {
      params
    } = this.data
    const initParams = {
      ...params, offset: 1
    }
    this.updateListState('loading', true)
    ajax(addressListUrl, initParams).then(
      data => {
        if (data.code === '0') {
          if (data.content.length) {
            if (data.content.length < params.limit) {
              this.updateListState('noMoreData', true)
            } else {
              this.updateListState('loading', false)
            }

            this.setData({
              addressList: data.content
            })

          } else {
            this.updateListState('noData', true)
          }
        }
      }).catch(err => {
      this.updateListState('loadFail', true)
    })
  },
  // 加载更多记录
  loadMoreAddressList() {

    if (!this.isCanLoadByState()) return
    
    const {
      params
    } = this.data
    const loadMoreParams = { ...params,
      offset: params.offset + 1
    }
    this.setData({
      params: loadMoreParams
    }, () => {
      const {
        params
      } = this.data
      this.updateListState('loading', true)
      ajax(addressListUrl, params).then(
        data => {
          if (data.code === '0') {
            if (data.content.length) {
              if (data.content.length < params.limit) {
                this.updateListState('noMoreData', true)
              } else {
                this.updateListState('loading', false)
              }
              this.setData({
                addressList: [...this.data.addressList, ...data.content]
              })
            } else {
              this.updateListState('noData', true)
            }
          }
        }).catch(err => {
        this.updateListState('loadFail', true)
      })
    })
  },
  // 设置默认地址
  setDefautlAddress(id) {
    ajax(defautlAddressUrl, {id, enabled: true}).then(data=>{
      if(data.code === '0') {
        wx.showToast({
          title: data.msg,
          icon: 'success'
        })
        this.initAddressList()
      }
    }).catch(err=>{
      console.log(err)
    })
  },

  addNewAddress() {
    wx.navigateTo({
      url: '/pages/address/setAddress/setAddress',
    })
  },
  onReachBottom() {
    this.loadMoreAddressList()
  }
})