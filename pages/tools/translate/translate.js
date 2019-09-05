// pages/tools/translate/translate.js
var md5 = require('../../../utils/md5.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //选中的翻译语言id
    choose: 1,
    //译文语言
    langueArray: [
      { id: 0, value: '中文', to: 'zh' },
      { id: 1, value: '英文', to: 'en', checked: 'true' },
      { id: 2, value: '日语', to: 'jp' },
      { id: 3, value: '韩语', to: 'kor' },
      { id: 4, value: '法语', to: 'fra' },
      { id: 5, value: '德语', to: 'de' },
      { id: 6, value: '文言文', to: 'wyw' },
      { id: 7, value: '粤语', to: 'yue' },
    ],
    hidden: false, //默认隐藏 译文语言选择块 
    ifUp: false,

    /**---需要POST的数据--- */

    query: null,//翻译问题 原句
    from: 'auto', //翻译源语言
    to: 'en',  //译文语言
    appid: null,  //！！！----------number太长存在 精度问题-------------！！！
    salt: 123,  //随机数
    sign: null,  //签名 appid+q+salt+密钥 的MD5值
    cipher: 'VpUyPUlLjLYnLiIOBnil',//密钥
    sign2: null,
    transResult:null,
  },
  //选择块下降
  chooseBlockDown() {
    console.log("down")
    this.setData({
      ifUp: false
    })
    console.log("down")
  },
  //选择块上升
  chooseBlockUp() {
    this.setData({
      ifUp: true
    })
  },
  //选择块改变
  radioChange(e) {  //选择块改变
    console.log('radio发生change事件，携带value值为：', e.detail.value); //译文语言id
    this.setData({
      choose: e.detail.value
    })

    var toLanguage = this.data.langueArray[this.data.choose].to  //译文语言简写 
    this.setData({
      to: toLanguage
    })
    // console.log(toLanguage)
  },

  //输入框改变
  input(e) {
    // console.log(e.detail)

    this.setData({
      query: e.detail.value,

      // sign2: md5.hexMD5('20190414000287751' + this.data.query + this.data.salt + this.data.cipher),  //生成签名
      // sign2:md5.hexMD5('20190414000287751pig123VpUyPUlLjLYnLiIOBnil')    

      /**!!!!!!!!!这里的 this.data.query为上面query赋值之前的状态 延后！！  ！！要用两次setDate*/
    })
    console.log("str1:", '20190414000287751' + this.data.query + this.data.salt + this.data.cipher)
    this.setData({
      sign: md5.MD5('20190414000287751' + this.data.query+ this.data.salt + this.data.cipher)  
      // sign: '259b1bce3699ff5a8af86ce66787afaf' 
    })
  

  },
  utf8(query){
    var utf8_q = encodeURIComponent(query);
    return utf8_q;
  },

  //全部翻译
  translate() {
    var utf8_q = encodeURIComponent(this.data.query);
    console.log(utf8_q);
    console.log("this.data.query:", this.data.query)  
    /*
    注意在生成签名拼接 appid+q+salt+密钥 字符串时，q不需要做URL encode.
    在生成签名之后，发送HTTP请求之前才需要对要发送的待翻译文本字段q做URL encode。
    */
    this.getTranslateInfo(utf8_q, this.data.from, this.data.to, this.data.salt, this.data.sign)
  },

  // 百度翻译
  getTranslateInfo: function (query, from, to, salt, sign) {
    var that = this;
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate?q=' + query + '&from=' + 'auto' + '&to=' + to + '&appid=20190414000287751' + '&salt=' + salt + '&sign=' + sign,
      data: {

      },
      method: 'POST',
      success(res) {
        // wx.showToast({
        //   title: '成功',
        //   icon: 'loading',
        //   duration: 1000,
        //   mask: true
        // })

        console.log(res.data)
        if (!res.data.error_code)
        {
          
          that.setData({
            transResult: res.data.trans_result[0].dst
            // transResult: "asdddddddddd"
            // sign: '259b1bce3699ff5a8af86ce66787afaf' 
          })
        }
        else{
            wx.showToast({
            title: '稍等片刻',
            icon: 'loading',
            duration: 1000,
            mask: true
        })
        }
        // console.log(md5.hexMD5('20190414000287751我123VpUyPUlLjLYnLiIOBnil'))
      },
      fail(res){
        that.setData({
          transResult: "翻译异常"
        })
      }

    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var randomNumber = Math.round(Math.random() * 1000);    //随机数
    this.setData({
      salt: randomNumber
    });
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

  
})