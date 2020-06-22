//app.js
App({
  globalData: {
    cartList: []
  },

  addToCart(obj) {
    // console.log(obj)
    // 判断该商品是否加入过购物车，加入过则数量+1，没有则创建对象加入
    const oldInfo = this.globalData.cartList.find((item) => item.iid === obj.iid) 
    if(oldInfo) {
      oldInfo.count += 1;
    } else {
      obj.count = 1
      obj.checked = true
      this.globalData.cartList.push(obj)
    }

    // 购物车回调
    if (this.addCartCallBack) {
      this.addCartCallBack()
    }
  }
})