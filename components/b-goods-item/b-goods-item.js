// components/b-goods-item/b-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick() {
      // 点击商品跳转到详情页
      // 1.获取商品的iid
      const iid = this.data.item.iid;
      // 2.跳转页面
      wx.navigateTo({
        url: '/pages/detail/detail?iid=' + iid,
      })
    }
  }
})
