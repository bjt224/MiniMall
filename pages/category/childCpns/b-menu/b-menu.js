// pages/category/childCpns/b-menu/b-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(event) {
      // console.log(event)

      //  获取点击的item的index
      const index = event.currentTarget.dataset.index
      
      // 让currentIndex等于index
      this.setData({
        currentIndex: index
      })

      this.triggerEvent('menuClick',{index},{})
    }
  }
})
