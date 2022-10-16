// components/ar-carema/ar-camera.js
import { IS_DEVTOOLS, SUPPORTED, isVersionAtleast } from '../../utils/util';
import authBehavior from '../../service/behaviors/authorize_behavior';
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  behaviors: [authBehavior],

  /**
   * 组件的属性列表
   */
  properties: {
    showCamera: {
      type: Boolean,
      value: false
    },
    unload: {
      type: Boolean,
      value: false
    },
    // 卸载时一次性执行，只执行一次
    delay: {
      type: Number,
      value: 1000
    },
    title: {
      type: String,
      value: '相机开启中…'
    },
    unloadTitle: {
      type: String,
      value: '相机关闭中…'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loading: true
  },
  observers: {
    'showCamera,unload': function (showCamera, unload) {
      if (unload) return this.hide(true, true);
      if (this._preShow === showCamera) return;
      this._preShow = showCamera;

      if (showCamera) {
        this.show();
      } else {
        this.hide();
      }
    }
  },
  lifetimes: {
    attached() {},

    detached: function (e) {// console.log('--------------------detached', e)
    }
  },
  pageLifetimes: {
    show() {
      // console.log('ar-camera onPageShow', this.data.showCamera);
      setTimeout(() => {
        if (this.data.showCamera) this.show();else this.hide();
      }, 500);
    },

    hide() {
      // console.log('ar-camera onPageHide', this.data.showCamera);
      this.hide(this.data.showCamera, this.data.unload);
    }

  },

  /**
   * 组件的方法列表
   */
  methods: {
    show() {
      if (this._show) return;
      this._show = true;
      console.log('ar-camera.onPageShow', this);
      this.setData({
        loading: true
      });

      let trigger = () => {
        return (IS_DEVTOOLS || !SUPPORTED.CAMERA.INITDONE) && this.onCameraInit();
      };

      this.setData({
        show: true
      }, trigger);
      if (!SUPPORTED.PAGE.SETDATA) trigger();
    },

    /**
     * 
     * @param {*} keepLoading 是否显示loading
     * @param {*} unload 是否显示卸载
     * @returns 
     */
    hide(keepLoading = false, unload = false) {
      this.setData({
        show: false,
        loading: keepLoading
      }, () => {
        if (unload) this.triggerEvent('unload');
      });
      this._show = undefined;
    },

    onCameraInit(e) {
      //兼容devtools不能像手机一样自动弹出授权弹窗的事件
      if (IS_DEVTOOLS) {
        this.auth_get_promise('scope.camera').then(res => {
          this.handleOnCameraInit(e);
        }).catch(err => {
          if (!err?.miniprogramAuthSetting['scope.camera']) {
            this.auth_promise('scope.camera').then(res => {
              this.handleOnCameraInit(e);
            }).catch(msg => {
              this.onCameraError();
            });
          }
        });
      } else {
        this.handleOnCameraInit(e);
      }
    },

    handleOnCameraInit(e) {
      this.setData({
        showTips: false,
        loading: false
      });
      this.triggerEvent('initdone', e);
    },

    onCameraError(e) {
      conosole.error('onCameraError', e);
      this.setData({
        showTips: true,
        loading: false,
        show: false
      });
      this.triggerEvent("error", e);
    },

    openAuthSetting() {
      if (this.data.show) {
        this.setData({
          show: false
        });
      }

      this.auth_open_setting('scope.camera').then(_ => {
        this.handleOnCameraInit();
      }).catch(_ => {
        this.onCameraError();
      });
    }

  }
});