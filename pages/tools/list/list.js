const res = wx.getSystemInfoSync()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logs:[],
    x: 0,
    y: 0,
    scale: 2,
    winWidth:null,
    winHeight:null 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取可使用窗口宽度、高度
    this.setData({ winWidth: res.windowWidth, winHeight: res.windowHeight});
    
    //读取计算历史缓存
    var logs =wx.getStorageSync('callogs');
    this.setData({logs:logs});
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
    
  },
  DelInfo:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '要清除历史记录吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')

          if (that.data.logs.length > 0) {
            wx.showLoading({
              'title': 'Deleting'
            })
      //清除计算历史缓存
            wx.removeStorage({
              key: 'callogs',
              success(res) {
                wx.hideLoading()
                wx.showToast({
                  'title': 'Deleting success'
                })
                that.onLoad() //页面重新加载刷新
              },
              fail(res){
                wx.hideLoading()
                wx.showToast({
                  'title': 'Deleting failed'
                })
              }
            })
          }
          else{
            wx.showToast({
              'title': 'No Storage'
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    
    
  }
})