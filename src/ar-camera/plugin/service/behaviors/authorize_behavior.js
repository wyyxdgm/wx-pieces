const { isBoolean } = require("../../utils/utils/typeTest")

module.exports = Behavior({
  methods: {
    // 参数见 https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html#scope-%E5%88%97%E8%A1%A8
    auth_get_promise(scope_attr) {  // get 权限
      return new Promise((y,n) => {
        wx.getSetting({
          success(res) {
            y(res.authSetting[`scope.${scope_attr}`])
          },
          fail(err) {
            n(err)  
          }
        })
      })
    },
    auth_promise(scope_attr) {    //set 权限
      return new Promise((Y,N) => {
        wx.authorize({
          scope: `scope.${scope_attr}`,
          success (res) {
            Y(res.errMsg.indexOf('ok') !== -1)
          },
          fail(err) {
            Y(false)
          }
        })
      })
    },
    auth_open_setting(scope_attr) {   // 权限设置页
      return new Promise((Y,N) => {
        wx.openSetting({
          withSubscriptions: true,
          complete(res) {
            if(res.authSetting[scope_attr]) {
              Y()
            }
            else {
              N()
            }
          }
        })
      })
    },
    waitforUserTap(scope_attr) {
        return new Promise((Y,N) => {
            setInterval(async() => {
                const res = await this.auth_get_promise(scope_attr)
                const choosen = isBoolean(res)
                choosen && Y(choosen)
            },1000)
        })
    }
  }
})