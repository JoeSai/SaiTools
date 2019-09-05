// pages/timer/timer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    progress_txt: '',
    count: 0, // 设置 计数器 初始为0
    countTimer: null, // 设置 定时器 初始为null
    canvas:null,

    multiArray: [[], [], []],
    multiIndex: [0, 0, 0],
    second:0
  },
 
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    var hms = this.data.multiIndex;
    var sumTime=hms[0]*3600+hms[1]*60+hms[2];//总秒数
    this.setData({
      second: sumTime
    })
    
  },
  // bindcolumnchange:function(event){
  //   console.log(event)
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var timeArray = [[], [], []];
    for (var i = 0; i <= 24; i++)
    {
      timeArray[0].push(i);
    }
    for (var i = 0; i <= 60; i++) {
      timeArray[1].push(i);
      timeArray[2].push(i);
    }
    this.setData({multiArray:timeArray});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.drawProgressbg(); 

    

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

  drawProgressbg: function () {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(4);// 设置圆环的宽度
    ctx.setStrokeStyle('#20183b'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.beginPath();//开始一个新的路径
    ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);
    //设置一个原点(110,110)，半径为100的圆的路径到当前路径   
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
  },
  drawCircle: function (step) {
    var context = wx.createCanvasContext('canvasProgress');
    this.setData({
      canvas:context
    });
    // 设置渐变
    var gradient = context.createLinearGradient(200, 100, 100, 200);      //----------------------------不理解
    gradient.addColorStop("0", "#ff4b1f");
    // gradient.addColorStop("0.5", "#a17fe0");
    gradient.addColorStop("1.0", "#1fddff");

    context.setLineWidth(10);
    context.setStrokeStyle(gradient);
    context.setLineCap('round')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(110, 110, 100, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
  },
  countInterval: function () {//1秒10次
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    var SunCount=this.data.second * 10;
    
    var Timer = setInterval(() => {
      if (this.data.count <= SunCount) {
        /* 绘制彩色圆环进度条  
        注意此处 传参 step 取值范围是0到2，
        所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
        */
        this.drawCircle(this.data.count / (SunCount / 2))  /*设置X秒 则 除数为（x*10/2） */
        this.data.count++;
      } else {
        this.setData({
          progress_txt: "Done"
        });
        clearInterval(Timer);
      }
    }, 100)
    this.setData({
      countTimer:Timer
    })
  },
  TimerStarOrStop:function(event){
    if(this.data.second!=0&&this.data.count==0)  //设置了时间 且未开始计时 点击开始才有效 防止生成多个计时器
    {
      this.countInterval();
    }
    else{
      
    }
  },
  TimerClear:function(){
    if(this.data.count>0){
      clearInterval(this.data.countTimer);  //可用于暂停
      this.setData({
        count:0,
        multiIndex: [0, 0, 0],
        second: 0,
        progress_txt:''
      });
      this.data.canvas.clearRect(0, 0, 220, 220);
      this.data.canvas.draw();
    }
    else {

    }
  }
  

//1000毫秒=1秒
})