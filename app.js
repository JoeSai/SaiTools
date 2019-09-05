//app.js
var md5 = require('/utils/md5.js')
App({
  onLaunch: function () {

    //------------------更新--------------------------

    if (wx.canIUse("getUpdateManager")) {
      let updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
        // 请求完新版本信息的回调
        // console.log(res.hasUpdate);
      })
      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: (res) => {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            } else if (res.cancel) {
              return false;
            }
          }
        })
      })
      updateManager.onUpdateFailed(() => {
        // 新的版本下载失败
        wx.hideLoading();
        wx.showModal({
          title: '升级失败',
          content: '新版本下载失败，请检查网络！',
          showCancel: false
        });
      });
    }
    

//-----------------------------------------------------------------
  

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

//星座运势查询功能
  getStarInfo:function(st,cb){
    wx.request({
      url: 'https://route.showapi.com/872-1?showapi_appid=88318&showapi_sign=7c3e8cc39f8c4b7cb5245a0a26ade6e5', // 仅为示例，并非真实的接口地址
      data: {
        star: st
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data)
        cb(res.data)
      }
    })
  },
//英文励志语录
  getEnglishInfo: function (cb) {
    wx.request({
      url: 'https://route.showapi.com/1211-1?showapi_appid=88318&showapi_sign=7c3e8cc39f8c4b7cb5245a0a26ade6e5', // 仅为示例，并非真实的接口地址
      data: {
        count: 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data)
        cb(res.data.showapi_res_body.data[0])
      }
    })
  },
// 百度翻译
  // getTranslateInfo:function(){
  //   wx.request({
  //     url: 'https://fanyi-api.baidu.com/api/trans/vip/translate?q=pig&from=en&to=zh&appid=20190414000287751&salt=123&sign=51b053e1780179003c4e838b01ca2b0e', // 仅为示例，并非真实的接口地址
  //     data: {
  //       q: 'pig',
  //       fro: 'auto',
  //       to:'zh',
  //       appid: 20190414000287751,
  //       salt:123,
  //       sign: md5.hexMD5('20190414000287751pig123VpUyPUlLjLYnLiIOBnil')
  //     },
  //     method:'POST',
  //     success(res) {
  //       console.log(res.data)
  //       console.log(md5.hexMD5('20190414000287751pig123VpUyPUlLjLYnLiIOBnil'))
  //     }
     
  //   })
  // },



  globalData: {
    userInfo: null
  }
})