const isProd = false
const baseUrl = 'http://10.10.13.211:8091/mall'

export const getSessionUrl = baseUrl + '/wechatLogin'

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
      success: (data) => {
        resolve(data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
  
}