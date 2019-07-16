// components/LoginModal/LoginModal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            this.setData({
              noUserInfoScope: false
            })
          } else {
            this.setData({
              noUserInfoScope: true
            })
          }
        }
      })
     },
    moved: function () { },
    detached: function () { 
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    noUserInfoScope: false,
    loginParams: {
      phone: '',
      regNum: ''
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo: function (e) {
      getApp().globalData = e.detail.userInfo
      this.setData({
        noUserInfoScope: false
      })
    }
  }
})
