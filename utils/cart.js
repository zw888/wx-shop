export function getCartProductList() {
  return wx.getStorageSync('cartProductList') || []
}

// 添加到购物车
export function addProductToCart(item) {
  item.selected = true;
  const cartProductList = getCartProductList()

  const isHasProduct = cartProductList.find((item1) => item.id === item1.id)
  if (isHasProduct) {
    item.num = isHasProduct.num + 1
  } else {
    item.num = 1
  }
  console.log()
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