var util=require('../../utils/util.js')


var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
   /* 时间 年月日*/
    date:null,

   /* 英语语录 中文翻译*/
    eQuotation:null,
    cQuotation:null,

    imgUrls: [
      'http://1.saier.sc2yun.com/BG/006yt1Omgy1g19kk16vuqj31hc11q1ky.jpg',
      'http://1.saier.sc2yun.com/BG/006yt1Omgy1g19kcoqcfaj316o0sgx6p.jpg',
      'http://1.saier.sc2yun.com/BG/006yt1Omgy1g19kchnu0pj31gs0tm1dr.jpg'
    ],
    toolbtn: [
      [
        { id: 0, imgUrl: '../assets/img/Cal.png', url: '../tools/cal/cal', name: '计算器' },
        { id: 1, imgUrl: '../assets/img/Can.png', url: '../tools/can/can', name: '画板' },
        { id: 2, imgUrl: '../assets/img/Star.png', url: '../tools/star/star', name: '星座运势' },
        { id: 3, imgUrl: '../assets/img/Timer.png', url: '../tools/timer/timer', name: '定时器' },
      ],
      [
        { id: 4, imgUrl: '../assets/img/Led.png', url: '../tools/led/led', name: '手持弹幕' },
      ]

    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0
  },
  navigator(e) {
    console.log(e.currentTarget.dataset.itemid);
    var itemId = e.currentTarget.dataset.itemid;
    var itemPage = parseInt(itemId/4);
    var absoluteId = itemId%4;
    console.log(absoluteId);
    var nexturl = this.data.toolbtn[itemPage][absoluteId].url;
    console.log(nexturl);
    wx.navigateTo({
      url: nexturl
    })

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    var DATE = util.formatDate(new Date());

    this.setData({

      date: DATE,

    });
    
    var thispage = this;
    app.getEnglishInfo(function(data){
      console.log(data);
    
      thispage.setData({
        eQuotation:data.english,
        cQuotation:data.chinese
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})