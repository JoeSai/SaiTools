// pages/tools/led/led.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer:null,
    pageH: 0,
    pageW: 0,
    x:0,
    inputHidden:false,
    setHidden:true,
    words:'Hello World!',
    wordsSize:50,
    speed:0.3,
    color:'white',
    colorGrounp:[
      { name: '白色', value: 'white', checked: 'true'  },
      { name: '红色', value: 'red', checked: 'false'},
      { name: '绿色', value: 'green', checked: 'false' },
      { name: '蓝色', value: 'blue', checked: 'false'},
      { name: '紫色', value: 'purple', checked: 'false'},
      { name: '青绿', value: '#00ff00', checked: 'false'},
    ]
  },
 //点击画布 显示和隐藏设置菜单
  clickCanvas:function(){
    if(this.data.inputHidden==false){
      this.setData({
        inputHidden:true,
        setHidden: true
      })
    }
    else{
      this.setData({
        inputHidden: false
      })
    }
  },
  //点击设置字体 显示和隐藏详细设置菜单 文字大小 字体颜色 滚动速度
  clickSet:function(){
    if (this.data.setHidden == false) {
      this.setData({
        setHidden: true
      })
    }
    else {
      this.setData({
        setHidden: false
      })
    }
  },
  //详细菜单滑块方法 字号  50~350
  SizeSliderChange:function(e){
    console.log(e.detail.value);
    this.setData({
      wordsSize:e.detail.value*3+50
    })
  },
  //速度 -（1~11）
  SpeedSliderChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      speed: 0.3*(e.detail.value+1)
    })
  },
  ChooseColor:function(e){
    // console.log(e.currentTarget.dataset.color);
    this.setData({
      color: e.currentTarget.dataset.color
    })
  },

  //画图
  canvaDraw:function(){
    
    const context = wx.createCanvasContext('wordCanvas');
    // context.translate(parseInt(that.data.pageW * 0.6), 0);
    //关于rotate 顺时针方向旋转为正方向
    context.rotate(0.5 * Math.PI);

    context.font = this.data.wordsSize+"px Georgia";
    context.fillStyle = this.data.color;
    //this.data.x--会改变data的值      
    //根据文字大小 确定文字写在屏幕中间  坐标似乎为文字底部 所以要考虑字体大小
    context.fillText(this.data.words, this.data.x=this.data.x-this.data.speed, -this.data.pageW / 2 + 0.4*this.data.wordsSize);  
    

    //获取输入的文字长度！！！！！！！！
    var txtLength = context.measureText(this.data.words).width;
    
    if (this.data.x < -txtLength)  
    {
      this.data.x = this.data.pageH;
    }
    context.draw();
  },

  //输入完成
  inputComplete:function(e){
    // console.log(e.detail.value);
    this.setData({
      words:e.detail.value
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

    var thispage=this;
    wx.getSystemInfo({
      success: function (res) {
        thispage.setData({
          pageH: res.windowHeight,
          pageW: res.windowWidth,
          x: res.windowHeight
        })
      }
    });
    
    this.setData({
      timer: setInterval(this.canvaDraw, 10)
    })
  
    // var timer = setInterval(this.canvaDraw,10);
    
    //var timer = setInterval(this.canvaDraw(),100);  this.canvaDraw()不是方法 是返回的值!  
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
    clearInterval(this.data.timer);

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