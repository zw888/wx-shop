const isProd = false
const baseUrl = 'http://47.103.195.33:8091'

export const getSessionUrl = baseUrl + '/mall/wechatLogin'

export const phoneLoginUrl = baseUrl + '/mall/plogin'

export const getPhoneNumberUrl = baseUrl + '/mall/decryptWechat'

// 获取首页产品列表
export const getProdListUrl = baseUrl + '/product/getProdList'
export const getProdFirstUrl = baseUrl + '/product/getProdFirst'
export const getProdDetailUrl = baseUrl + '/product/getProdDetail'


export const getProductDataUrl =  baseUrl + '/productList'
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
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: wx.getStorageSync('Authorization')
      },
      success: (data) => {
        console.log(111, data)
        resolve(data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
  
}