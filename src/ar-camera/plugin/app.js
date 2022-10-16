import { getApp } from "build/convert/inner/_app";
import _wx from "build/convert/inner/_wx";
//app.js
import { getAccountInfo, getSystemInfo, IS_DEVTOOLS, setInnerAudioOption } from "./utils/util";
const sysInfo = getSystemInfo();
console.log('------系统信息------');
console.log(sysInfo); // 初始化插件

console.log('------初始化插件完成------');
import App from "./build/convert/inner/_app";
export default new App({
  name: "",
  canvasWidth: sysInfo.windowWidth,
  canvasHeight: sysInfo.windowHeight,
  pixelRatio: sysInfo.pixelRatio,
  platform: sysInfo.platform,
  model: sysInfo.model,
  rpx2px: 750 / sysInfo.windowWidth,
  onLaunch: function () {
    // if(this.$convert){
    //   console.log('编译后，新增的环境变量', this.$convert);
    // }
    //检查新版本
    const updateManager = _wx.getUpdateManager();

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",

        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }

      });
    });
    setInnerAudioOption({
      obeyMuteSwitch: false
    });
    let appId = getAccountInfo().miniProgram.appId;

    const userInfoChangedList = [];

    this.globalData.onUserInfoChanged = (fn, imediate = true) => {
      imediate && fn && fn();
      userInfoChangedList.push(fn);
    };

    this.globalData.offUserInfoChanged = fn => {
      let idx = userInfoChangedList.indexOf(fn);
      idx >= 0 && userInfoChangedList.splice(idx, 1);
    };

    (() => {
      /**
       * 其他地方获取userinfo时应该从storage中获取
       * 赋值时，应该先将userinfo存到storage中再赋值给globalData
       */
      let _userInfo = this.globalData.userInfo;
      Object.defineProperty(this.globalData, "userInfo", {
        get() {
          return _userInfo;
        },

        set(v) {
          _userInfo = v;
          userInfoChangedList.forEach(fn => fn(v));
        }

      });
    })();

    try {
      const {
        scene
      } = _wx.getLaunchOptionsSync();

      DataStorage.getProjectData().then(res => {
        sendLog("app", "", `^${scene}^${new Date().getTime()}^`);
        sendLog("login", "", `^${scene}^${new Date().getTime()}^`, `${scene}`, undefined, undefined, undefined, res.data.clientIp);
      });
    } catch (error) {
      console.log(error);
    }

    this.initGlobalData();
    this.loadIconFace();
  },

  setActivityId(acId) {
    this.globalData.will2ActivityId = acId;
  },

  getActivityId() {
    return this.globalData.will2ActivityId;
  },

  navActivity(url, acId) {
    _wx.navigateTo({
      url
    });

    this.setActivityId(id);
  },

  initGlobalData() {
    wx.getStorage({
      key: 'phoneInfo',
      success: res => this.globalData.phoneInfo = res
    });
    this.globalData.userInfo = _wx.getStorageInfoSync("userinfo");
  },

  // 下载字体包
  loadIconFace() {},

  globalData: {
    userInfo: null,
    userInfoTriggers: [],
    statusBarHeight: sysInfo.statusBarHeight,
    titleBarHeight: // 标题栏状态 px
    _wx.getMenuButtonBoundingClientRect().height + (_wx.getMenuButtonBoundingClientRect().top - sysInfo.statusBarHeight) * 2,
    navBarHeight: // 标题栏 + 状态栏 px
    sysInfo.statusBarHeight + _wx.getMenuButtonBoundingClientRect().height + (_wx.getMenuButtonBoundingClientRect().top - sysInfo.statusBarHeight) * 2
  }
});