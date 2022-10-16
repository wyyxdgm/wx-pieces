// plugin/pages/camera.js
import _wx from "../build/convert/inner/_wx";
import { getApp } from "../build/convert/inner/_app";
let wxapp = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    navBarTitle: "测试相机",
    navBarHeight: wxapp.globalData.navBarHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wxapp = getApp();
    this.setData({
      //导航栏高度，用于页面位置控制
      navBarHeight: wxapp.globalData.navBarHeight
    });
    this.setData({
      beforeGoBack: () => {
        // console.log('before goback');
        return new Promise((resolve, reject) => {
          this.setData({
            beforeUnloadCamera: true
          });
          this.setData({
            unloadCamera: true
          }); // 内部会触发cameraUnload，然后执行navBack
          setTimeout(reject, 1000); // 相机卸载会有个500+500延迟
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
});
