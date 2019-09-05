// pages/note/note.js
var app=getApp()
const star = ['baiyang', 'jinniu', 'shuangzi', 'juxie', 'shizi', 'chunv', 'tiancheng','tianxie','sheshou','mojie','shuiping','shuangyu']
const stars = ['白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars:stars,
    mystar:'sheshou', //需要查询的星座
    value: [8],
    starInfo:null,
    condition:false //是否点击查询->显示view
  },
  bindChange(e) {
    const val = e.detail.value
    this.setData({
       mystar: star[val[0]]
    })
    //console.log(this.data.mystar)
  },
  btnClick:function(){
    var thispage=this
    app.getStarInfo(this.data.mystar,function(data){
      console.log(data);
      thispage.setData({starInfo:data});
    });
    thispage.setData({condition: 'true' })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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