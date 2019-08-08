const isProd = false
const baseUrl = 'http://61.160.211.212:8091'

// 登录
// 微信登录
export const getSessionUrl = baseUrl + '/mall/wechatLogin'
// 登录
export const phoneLoginUrl = baseUrl + '/mall/plogin'
// 解密获得手机号
export const getPhoneNumberUrl = baseUrl + '/mall/decryptWechat'


// 产品
// 产品列表
export const getProdListUrl = baseUrl + '/product/getProdList'
// 产品类型
export const getProdFirstUrl = baseUrl + '/product/getProdFirst'
// 产品详情
export const getProdDetailUrl = baseUrl + '/product/getProdDetail'


// 地址管理
export const delAddressUrl = baseUrl + '/mall/addressDelete'
export const addressListUrl = baseUrl + '/mall/addressList'
export const modifyAddressUrl = baseUrl + '/mall/addressModify'
export const defautlAddressUrl = baseUrl + '/mall/updateDefault'
// 获取省市县
export const getShenListUrl = 'https://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/100000_province.json'
export const getShiListUrl = 'https://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/'
export const getXianListUrl = 'https://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/'

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
      success: (res) => {
        console.log('res', res)
        if (res.header.Authorization) {
          wx.setStorageSync('Authorization', res.header.Authorization)
        } 
        if (res.data.code === -1) {
          const pages = getCurrentPages()
          if (pages[pages.length-1].route !== 'pages/login/login') {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
          return
        }
        if(res.statusCode === 200) {
          resolve(res.data)
        } else {
          wx.showToast({
            title: '接口故障，请重试',
          })
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
  
}