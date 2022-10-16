import _wx from "../../build/convert/inner/_wx";
import { getApp } from "../../build/convert/inner/_app";

const {
  getAccountInfo,
  getPluginAppId
} = require("../../utils/util");

let app = getApp();
const accountInfo = getAccountInfo();
import { PAGE } from "../../pages/pages";
Component({
  data: {
    statusBarHeight: '',
    titleBarHeight: '',
    isShowBtn1: false,
    isShowBtn2: false
  },
  properties: {
    transparent: {
      type: Boolean,
      value: false
    },
    show: {
      type: Boolean,
      value: true
    },
    onGoBack: {
      type: Function,
      value: null
    },
    home: {
      type: String,
      value: PAGE.$
    },
    showBack: {
      type: Boolean,
      value: true
    },
    showHome: {
      type: Boolean,
      value: false
    },
    //属性值可以在组件使用时指定
    title: {
      type: String,
      value: 'AR旅游'
    }
  },
  observers: {
    show(show) {
      this.setAnimation(show);
    }

  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {
      this.pageContext = getCurrentPages();
      this.setData({
        isShowBtn2: this.data.showHome
      });
      this.pageContext.length > 1 ? this.setData({
        isShowBtn1: this.data.showBack
      }) : this.setData({
        isShowBtn1: false
      });
    }

  },

  attached() {
    app = getApp();
    new Promise(res => {
      this.animation = wx.createAnimation({
        duration: 300,
        timingFunction: "ease"
      });
      res();
    }).then(() => {
      const isIndexHome = '/' + this.pageContext[this.pageContext.length - 1].route == PAGE.$;
      if (isIndexHome) this.setAnimation(this.data.show); //observer比attach先触发的首页的预先消失处理
    });
    this.setData({
      statusBarHeight: app.globalData.statusBarHeight,
      titleBarHeight: app.globalData.titleBarHeight,
      menuHeight: _wx.getMenuButtonBoundingClientRect().height - 2.5,
      menuWidth: _wx.getMenuButtonBoundingClientRect().width - 2.5,
      menuLeft: _wx.getMenuButtonBoundingClientRect().left
    });
  },

  methods: {
    setAnimation(show) {
      if (this.animation) {
        this.animation.opacity(Number(show)).step();
        this.setData({
          tabBarAnimation: this.animation.export()
        });
      }
    },

    goBack() {
      if (this._backing) return;
      this._backing = true;

      if (typeof this.data.onGoBack === 'function') {
        let re = this.data.onGoBack();

        if (re instanceof Promise) {
          // 异步
          re.then(() => {
            wx.navigateBack();
            this._backing = false;
          }).catch(e => {
            this._backing = false;
          });
          return; // 异步返回后再恢复可点击
        } else if (typeof re === 'function') {
          if (re()) wx.navigateBack();
        } else if (re) {
          wx.navigateBack();
        } else {
          // ! re
          console.log('[navbar]: goBack事件被禁止');
        }
      } else {
        wx.navigateBack();
      }

      this._backing = false;
    },

    goHome() {
      // wx.showToast({ title: 'reLaunch' });
      let pageContext = getCurrentPages().filter(p => !!p); // 相机在reLaunch后会到这个页面会一定概率黑屏，采用返回的方式避免

      if (getPluginAppId() && pageContext[0].route.endsWith(getPluginAppId() + this.data.home) || "/" + pageContext[0].route === this.data.home) {
        return wx.navigateBack({
          delta: pageContext.length - 1
        });
      } else {
        wx.navigateBack({
          delta: pageContext.length - 1
        });
        setTimeout(() => {
          if (this.data.home === PAGE.$) _wx.switchTab({
            url: this.data.home
          });else _wx.redirectTo({
            url: this.data.home
          });
        }, 100);
      }
    },

    tap() {
      if (accountInfo.miniProgram.envVersion === "release") return;
      this.tapTime = this.tapTime || [];
      this.lastTime = this.lastTime || 0; // --...--... 咚咚哒哒哒咚咚哒哒哒，‘-’长间隔，‘.’短间隔

      const secret = [[500, 1000], [500, 1000], [0, 300], [0, 350], [500, 1000], [500, 1000], [500, 1000], [0, 350], [0, 350]];
      let curr = new Date().getTime();
      let newTime = curr - this.lastTime;
      this.lastTime = curr;
      this.tapTime.push(newTime);

      while (this.tapTime.length > secret.length) this.tapTime.shift();

      if (this.tapTime.length !== secret.length) return;
      let valid = this.tapTime.every((value, index) => secret[index][0] <= value && value <= secret[index][1]);
      console.log("valid:", valid, this.tapTime);

      if (valid) {
        wx.showToast({
          title: "成功！"
        }); //TODO 跳转到调试页面
      }
    }

  }
});