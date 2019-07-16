// components/LoginModal/LoginModal.js
import { getCode } from '../../utils/util.js'
import ajax, { getSessionUrl, phoneLoginUrl } from '../../utils/api.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isDisabled: true,
    loginParams: {
      phone: '',
      regNum: ''
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 登录按钮
    getUserInfo: function (e) {
      const { isDisabled } = this.data
      if (isDisabled) return

      const { userInfo } = e.detail
      getCode().then(code => {
        console.log(code)
        const data = {
          code,
          nikeName: userInfo.nickName,
          sex: String(userInfo.gender),
          birthday: ''
        }
        console.log(data, userInfo, getSessionUrl)
        ajax(getSessionUrl, data, 'POST').then(
          res => {
            const { openid } = res.data.content
            if (openid) {
              ajax(phoneLoginUrl, { phone: this.data.loginParams.phone, openId: openid }, 'POST').then(res => {
                console.log('phoneLogin', res)
                if (res.data.code === 200) {
                  wx.showToast({
                    title: res.data.msg,
                    complete: () => {
                     setTimeout(()=>{
                       wx.navigateTo({
                         url: '/pages/index/index',
                       })
                     }, 1000)
                    }
                  })
                }
              }).catch(err => {
                throw new Error(err)
              })
            }

          }
        ).catch(res => {
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
    mesLogin() {
      console.log('登录')
      const { isDisabled } = this.data
      if (isDisabled) return
      wx.showLoading({
        title: '加载中',
      })
    },
    closeModal() {
      this.triggerEvent('closeModal')
    },

    // input手机号监听
    getPhone(e) {
      console.log(e)
      const { detail: { value } } = e
      if (value.length === 11) {
        console.log('手机号正确')
        this.setData({
          loginParams: { ...this.data.loginParams, phone: value }
        }, () => {
          this.inputValueIsEmpty()
        })
      } else {
        console.log('手机号位数不正确')
      }
    },

    // input验证码监听
    getRegNum(e) {
      console.log(e)
      const { detail: { value } } = e
      if (value.length === 6) {
        console.log('验证码正确')
        this.setData({
          loginParams: { ...this.data.loginParams, regNum: value }
        }, () => {
          this.inputValueIsEmpty()
        })
      } else {
        console.log('验证码位数不正确')
      }
    },

    // 验证手机号与验证码是否都输入了
    inputValueIsEmpty(value) {
      const { phone, regNum } = this.data.loginParams
      if (phone && regNum) {
        this.setData({
          isDisabled: false
        })
      }
    }
  }
})
