// pages/cart/cart.js
import {
  getCartProductList
} from '../../utils/cart.js'
Page({
  data: {
    isAllSelected: false,
    cartProductList: [],
    // 选中产品的总价格
    cartProductAllPrice: 0,
    // 选中产品的总数量
    selectedCartProductAllNum: 0
  },

  onShow() {
    wx.removeStorageSync('orderProductList')
    this.getCartProductList()
  },
  getCartProductList() {
    const list = getCartProductList()
    const cartProductList = list.map((item) => {
      if ('selected' in item) {
        return item
      } else {
        return {
          ...item,
          selected: false,
          num: 1,
        }
      }
    })
    this.setData({
      cartProductList
    }, () => {
      this.updateIsAllSelected()
      this.setCartProductAllPrice()
      this.setSelectedCartProductAllNum()
    })
  },
  // 切换选中状态
  switchIsSelectd(e) {
    const {
      index
    } = e.currentTarget.dataset
    const {
      cartProductList
    } = this.data
    cartProductList[index].selected = !cartProductList[index].selected
    this.setData({
      cartProductList
    }, () => {
      this.updateIsAllSelected()
      this.setCartProductAllPrice()
      this.setSelectedCartProductAllNum()
    })
  },
  // 检查是否全选中
  updateIsAllSelected() {
    const {
      cartProductList
    } = this.data
    const isAllSelected = !(cartProductList.some((item) => item.selected === false))
    console.log(111, isAllSelected)
    this.setData({
      isAllSelected
    })
  },
  // 设置所有的选中
  setAllSelectd() {
    const {
      cartProductList,
      isAllSelected
    } = this.data
    cartProductList.forEach((item) => {
      item.selected = !isAllSelected
    })
    console.log('cartProductList', cartProductList)
    this.setData({
      cartProductList,
      isAllSelected: !isAllSelected
    }, () => {
      this.setCartProductAllPrice()
      this.setSelectedCartProductAllNum()
    })
  },
  // 删除某个index的商品
  removeProductByIndex(index) {
    const {
      cartProductList
    } = this.data
    cartProductList.splice(index, 1)
    this.setData({
      cartProductList
    })
  },
  // 操作购物车数据的数量
  updateCartProductNum(e) {
    const {
      index,
      type
    } = e.currentTarget.dataset
    const {
      cartProductList
    } = this.data
    if (type === 'add') {
      cartProductList[index].num = cartProductList[index].num + 1
    } else {
      const activeNum = cartProductList[index].num - 1
      if (cartProductList[index].num - 1 === 0) {
        wx.showModal({
          title: '提示',
          content: '是否将该商品从购物车中移除',
          success: (res) => {
            if (res.confirm) {
              cartProductList[index].num = 0
              this.setData({
                cartProductList
              }, () => {
                this.setCartProductAllPrice()
                this.setSelectedCartProductAllNum()
              })
              this.removeProductByIndex(index)
            } else if (res.cancel) {

            }
          }
        })
      } else {
        cartProductList[index].num = cartProductList[index].num - 1
      }
    }
    this.setData({
      cartProductList
    }, () => {
      this.setCartProductAllPrice()
      this.setSelectedCartProductAllNum()
    })
  },
  // 更新产口数量
  setSelectedCartProductAllNum() {
    const {
      cartProductList
    } = this.data
    const selectedCartProductList = cartProductList.filter((item) => item.selected)
    let sum = 0
    selectedCartProductList.forEach((item) => {
      sum += item.num
    })
    this.setData({
      selectedCartProductAllNum: sum
    })
  },
  // 更新新产品价格
  setCartProductAllPrice() {
    const {
      cartProductList
    } = this.data
    const selectedCartProductList = cartProductList.filter((item) => item.selected)
    let sum = 0.00
    selectedCartProductList.forEach((item) => {
      sum += item.curentPrice * item.num
    })
    console.log(sum)
    this.setData({
      cartProductAllPrice: Number(sum).toFixed(2)
    })
  },
  // 删除选中产品
  delSelectedCartList() {
    wx.showModal({
      title: '提示',
      content: '是否将选中商品从购物车中移除',
      success: (res) => {
        if (res.confirm) {
          const {
            cartProductList
          } = this.data
          const noSelectedCartProductList = cartProductList.filter((item) => !item.selected)
          this.setData({
            cartProductList: noSelectedCartProductList
          }, () => {
            this.setCartProductAllPrice()
            this.setSelectedCartProductAllNum()
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  toOrderPage() {
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },
  onHide() {
    wx.setStorageSync('cartProductList', this.data.cartProductList)
    const orderProductList = this.data.cartProductList.filter((item) => item.selected)
    wx.setStorageSync('orderProductList', orderProductList)
  },
  // onUnload() {
  //   wx.setStorageSync('cartProductList', this.data.cartProductList)
  // },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})