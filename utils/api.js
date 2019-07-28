const isProd = false
const baseUrl = 'http://47.103.195.33:8091/mall'

export const getSessionUrl = baseUrl + '/wechatLogin'
export const phoneLoginUrl = baseUrl + '/plogin'
export const getPhoneNumberUrl = baseUrl + '/decryptWechat'
export default function ajax(url, data = {}, method = 'GET') {
  if(!url) {
    wx.showModal({
      title: '接口路径不正确',
      content: '',
    })
    return
  }
  return new Promise((resolve, reject)=>{
    wx.request({
      url,
      data,
      method,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (data) => {
        resolve(data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
  
}