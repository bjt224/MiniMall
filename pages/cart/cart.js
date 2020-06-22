// pages/cart/cart.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    isSelectAll: true,
    totalPrice: 0,
    totalCounter: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.第一次加载数据
    this.setData({
      cartList: app.globalData.cartList
    })

    // 2.设置回调
    app.addCartCallBack = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
    }

    // 3.设置修改某个商品的回调函数
    app.changeGoodsState = (index,goods) => {
      // 修改某一项的选中状态
      this.setData({
        [`cartList[${index}]`]: goods
      })

      // 2.修改全部选中的状态
      const selectAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll: selectAll
      })

      this.changeData()
    }
  },

  onShow() {
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    })

    this.changeData()
  },

  onSelectAll() {
    // 1.判断是否全部选中
    if(this.data.isSelectAll) { // 目前全部选中
      this.data.cartList.forEach(item => {
        item.checked = false
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      })
    } else { // 某些没选中
      this.data.cartList.forEach(item => {
        item.checked = true
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: true
      })
    } 

    this.changeData()
  },

  changeData() {
    // 1.获取所有选中的数据
    let totalPrice = 0;
    let counter = 0;

    // 如果商品被选中，则数量增加，且价格随之变化
    for(let item of this.data.cartList) {
      if(item.checked) {
        counter++
        totalPrice += item.price * item.count
      }
    }

    // console.log(counter,totalPrice)

    // 2.修改data里的数据
    this.setData({
      totalPrice,
      totalCounter: counter
    })
  }

})