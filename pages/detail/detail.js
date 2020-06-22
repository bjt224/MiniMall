// pages/detail/detail.js
import {
  getDetail,
  getRecommends,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo
} from '../../service/detail.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid: '',
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: {},
    showBottomBar: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      iid: options.iid
    })

    // 获取商品详情信息
    this._getDetailData()

    // 获取推荐商品的信息
    this._getRecommendsData()
  },

  onPageScroll(options) {
    // console.log(options)

    const scrollTop = options.scrollTop;   
    const flag = scrollTop < 14580
    if(flag != this.data.showBottomBar) {
      this.setData({
        showBottomBar: flag
      })
    }
  },


  // -----------网络请求函数---------------
  _getDetailData() {
    getDetail(this.data.iid).then(res => {
      const data = res.data.result;
      // console.log(data)

      // 1.获取顶部轮播图的数据
      const topImages = data.itemInfo.topImages;

      // 2.创建BaseInfo对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo,data.columns,data.shopInfo.services);

      // 3.创建ShopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo);

      // 4.获取detailInfo信息
      const detailInfo = data.detailInfo;

      // 5.创建ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info,data.itemParams.rule);

      // 6.获取评论信息
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }

      this.setData({
        topImages,
        baseInfo,
        shopInfo,
        detailInfo,
        paramInfo,
        commentInfo,
      })
    })
  },

  _getRecommendsData() {
    getRecommends().then(res => {
      // console.log(res)
      this.setData({
        recommends: res.data.data.list
      })
    })
  },


  // --------------监听事件函数--------------
  onAddCart() {
    // 1.获取商品对象
    const obj = {}
    obj.iid = this.data.iid
    obj.imageURL = this.data.topImages[0]
    obj.title = this.data.baseInfo.title
    obj.desc = this.data.baseInfo.desc
    obj.price = this.data.baseInfo.realPrice

    // 2.加入购物车列表
    app.addToCart(obj)

    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  } 
})