// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '../../service/category.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    categoryData: {},
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取分类页面的所有数据
    this._getData();
  },


  // -------------监听事件函数---------------
  menuClick(event) {
    // console.log(event)

    // 1.获取点击的index
    const index = event.detail.index
    this.setData({
      currentIndex: index
    })

    // 2.请求点击分类的细分类别数据
    this._getSubcategory(index)

    // 5.请求点击分类的商品数据
    this._getCategoryDetail(index)
  },

  
  // ------------网络请求函数----------------
  _getData() {
    // 请求分类数据
    this._getCategory()
  },

  // 获取分类页面的分类类别及各个分类对应的数据
  _getCategory() {
    getCategory().then(res => {
      // console.log(res)

      // 1.获取categories: 所有类别
      const categories = res.data.data.category.list;

      // 2.初始化每个类别的子数据
      const categoryData = {}
      for(let i = 0;i < categories.length;i++) {
        categoryData[i] = {
          subcategories: [],
          categoryDetail: []
        }
      }

      // 3.将数据存入data中
      this.setData({
        categories,
        categoryData
      })

      // 4.请求第一个类别的细分类别数据
      this._getSubcategory(0)

      // 5.请求第一个类别的商品数据
      this._getCategoryDetail(0)
    })
  },

  // 获取对应分类的细分类别
  _getSubcategory(currentIndex) {
    // 1.获取对应分类的maitKey
    const maitKey = this.data.categories[currentIndex].maitKey

    // 2.请求数据
    getSubcategory(maitKey).then(res => {
      // console.log(res)

      // 修改categoryData里的subcategories
      const tempCategory = this.data.categoryData
      tempCategory[currentIndex].subcategories = res.data.data.list
      this.setData({
        categoryData: tempCategory
      })
    })
  },

  // 获取各个分类的推荐商品数据
  _getCategoryDetail(currentIndex) {
    // 1.获取对应的miniWallkey
    const miniWallKey = this.data.categories[currentIndex].miniWallkey

    // 2.请求对应类别的商品数据
    this._getRealCategoryDetail(currentIndex,miniWallKey,'pop')
  },

  // 获取各个分类的推荐商品数据
  _getRealCategoryDetail(index,miniWallKey,type) {
    getCategoryDetail(miniWallKey,type).then(res => {
      // console.log(res)

      // 1.获取categoryData
      const categoryData = this.data.categoryData

      // 2.修改categoryData里的categoryDetai
      categoryData[index].categoryDetail = res.data

      this.setData({
        categoryData
      })
    })
  }
})