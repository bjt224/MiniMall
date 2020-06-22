// pages/home/home.js
import {
  getMultiData,
  getGoodsData
} from "../../service/home.js"

const types = ['pop','new','sell']
const TOP_DISTANCE = 1000

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行','新款','精选'],
    goods: {
      pop : {page: 0,list: []},
      new : {page: 0,list: []},
      sell : {page: 0,list: []}
    },
    currentType: 'pop',
    showBackTop: false,
    isTabFixed: false,
    tabScrollTop: 0,
    // topPosition: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发送网络请求
    // 1.请求轮播图以及推荐数据
    this._getMultiData()
    
    // 2.请求商品信息
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },

  // --------网络请求的函数------------
  // 下划线开头表示私有函数
  _getMultiData() {
    // 1.请求轮播图以及推荐数据
    getMultiData().then(res => {
      // 取出轮播图和推荐的数据
      const banners = res.data.data.banner.list.map(item => {
        return item.image
      });
      const recommends = res.data.data.recommend.list;

      // 将banners和recommends放在data中
      this.setData({
        banners,
        recommends
      })
    })
  },

  _getGoodsData(type) {
    // 1.获取页码
    const page = this.data.goods[type].page + 1;

    // 2.发送网络请求
    getGoodsData(type,page).then(res => {
      // 2.1.取出数据
      const list = res.data.data.list;

      // 2.2.将数据设置到对应type的list里
      // for (let item of list) {
      //   this.data.goods[type].list.push(item)
      // }
      // ... : 会自动遍历list
      const oldList = this.data.goods[type].list;
      oldList.push(...list)
      
      // 2.3.将数据设置到data的goods中
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    })
  },

  // ----------事件监听函数--------------
  handleTabClick(event) {
    // 取出index
    const index = event.detail.index;

    // 设置currentType
    const type = types[index]
    this.setData({
      currentType: type
    })
  },

  handleImageLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      // console.log(rect)
      this.data.tabScrollTop = rect.top
    }).exec()
  },

  // scrollPosition(e) {
  //   // 1.获取滚动的距离（距离顶部）
  //   const position = e.detail.scrollTop

  //   console.log(position)

  //   // 2.设置是否显示showBackTop
  //   this.setData({
  //     showBackTop: position >= TOP_DISTANCE
  //   })

  // },

  onBackTop() {
    // this.setData({
    //   showBackTop: false,
    //   topPosition: 0,
    // })
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },




  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 上拉加载更多 -> 请求新的数据
    this._getGoodsData(this.data.currentType)
  },

  // 监听页面滚动
  onPageScroll(options) {
    // 1.取出scrollTop
    const scrollTop = options.scrollTop;

    // 2.修改showBackTop
    // 官方提醒：不要在滚动函数的回调中频繁的调用this.setData
    const flag1 = scrollTop >= TOP_DISTANCE;
    if (flag1 !== this.data.showBackTop) {
      this.setData({
        showBackTop: flag1
      })
    }

    // 3.修改isTabFixed
    const flag2 = scrollTop >= this.data.tabScrollTop;
    if(flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2
      })
    }
  }

  // onShow:页面显示出来的时候回调的函数
  // 页面显示不意味着所有的图片加载完成
  // onShow() {
  //   setTimeout(() => {
  //     wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
  //       console.log(rect)
  //     }).exec()
  //   },1000)
  // }
  
})