export function getCartProductList() {
  return wx.getStorageSync('cartProductList') || []
}

// 添加到购物车
export function addProductToCart(item) {
  const cartProductList = getCartProductList()
  cartProductList.unshift(item)
  console.log("cartProductList", cartProductList)

  const newCartProductList = cartProductList.filter(
    (item, index, arr) => {
      const findIndex = arr.findIndex(item1 => item1.id === item.id) // 判断index 是否有相等的
      return findIndex === index
    })
   wx.setStorageSync('cartProductList', newCartProductList)
   wx.showToast({
     title: '加入购物车成功',
     icon: 'success'
   })
}