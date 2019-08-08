// pages/shopping/shopping.js
import ajax, { getProdListUrl, getProdFirstUrl } from '../../utils/api.js'
import { addProductToCart} from '../../utils/cart.js'
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
    items: [
      { name: 'curentPrice', value: '价格', checked: false },
      { name: 'salesValue', value: '销量', checked: false},
    ],
    isLoading: false,
    classTypes: [
    ],
    productList: [
      
    ],
    productClassType: [],
    config: {
      windowHeight: wx.getSystemInfoSync().windowHeight - (230/wx.getSystemInfoSync().pixelRatio),
    },
    params: {
      typeCode: '',
      orderByFile: '',
      pageNum: 1,
      pageSize: 10,
    },
    listState: {
      loading: false,
      noData: false,
      loadFail: false,
      noMoreData: false
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(9999, getApp())
  },
  getProductClassType() {
    this.updateListState('loading', true)
    const params = {
      pageNum: 1,
      pageSize: 10,
      orderByFile: ''
    }
    ajax(getProdFirstUrl, params).then(
      data=>{
        if(data.code === '0') {
          if (data.content.productList.length) {
            if (data.content.productList.length < params.pageSize) {
              this.updateListState('noMoreData', true)
            } else {
              this.updateListState('loading', false)
            }
            this.setData({
              productList: data.content.productList
            })
          } else {
            this.updateListState('noData', true)
          }
          this.setData({
            classTypes: data.content.typeList,
          })
        }
      }
    ).catch(err => {
      this.updateListState('loadFail', true)
    })
  },

  getProductList() {
    const {
      params
    } = this.data
    this.updateListState('loading', true)
    ajax(getProdListUrl, params).then(
      data => {
        if (data.code === '0') {
          if (data.content.length) {
            if (data.content.length < params.pageSize) {
              this.updateListState('noMoreData', true)
            } else {
              this.updateListState('loading', false)
            }

            this.setData({
              productList: data.content
            })

          } else {
            this.updateListState('noData', true)
          }
        }
      }).catch(err => {
        this.updateListState('loadFail', true)
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
    const { listState } = this.data
    for (let val in listState) {
      if (listState[val]) {
        return false
      }
    }
    return true
  },
  // 加载更多
  loadMoreProductList() {
    if (!this.isCanLoadByState()) return
    const {
      params
    } = this.data
    const loadMoreParams = {
      ...params,
      pageNum: params.pageNum + 1
    }
    this.setData({
      params: loadMoreParams
    }, () => {
      const {
        params
      } = this.data
      this.updateListState('loading', true)
      ajax(getProdListUrl, params).then(
        data => {
          if (data.code === '0') {
            if (data.content.length) {
              if (data.content.length < params.limit) {
                this.updateListState('noMoreData', true)
              } else {
                this.updateListState('loading', false)
              }
              this.setData({
                productList: [...this.data.addressList, ...data.content]
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
  toOtherPage(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/product/product?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getProductClassType(
    )
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
    this.loadMoreProductList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  checkboxChange: function (e) {
    const { value} = e.detail
    console.log('checkbox发生change事件，携带value值为：', value)
    if (value) {
      const orderByFile = value.join(',')
      console.log(orderByFile)
      this.setData({
        params: {
          ...this.data.params,
          orderByFile
        }
      })
    }
  },
  switchClassType(e) {
    const {key} = e.target.dataset 
    if (this.data.params.typeCode === key) return
    console.log('切换后的key', key)
    this.setData({
      params: { 
        ...this.data.params, 
        typeCode: key
      } 
    }, ()=>{
      this.getProductList()
    });
  },
  addProductToCart(e) {
    const {item} = e.currentTarget.dataset 
    console.log(1111, item)
    if (item) {
      addProductToCart(item)
    }
  }
})