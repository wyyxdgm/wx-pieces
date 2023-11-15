// packageDemos/pages/map-groundoverlay/groundoverlay.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    longitude: 121.598192,
    latitude: 31.208433,
    maxScale: 20,
    minScale: 3,
    scale: 16
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log("onLoad");
    const map = wx.createMapContext("map");
    map.addGroundOverlay({
      opacity: 1,
      id: 11,
      // "src": "https://mp.easyar.cn/artravel/branch/yuyuan/mapoverlay2.png",
      src: "./map_shapes.png",
      bounds: {
        northeast: { longitude: 121.6021728515625, latitude: 31.210452419007577 },
        southwest: { longitude: 121.59942626953125, latitude: 31.20103321325247 }
      },
      success(res) {
        console.log(`addGroundOverlay success`, res);
      },
      fail(err) {
        console.log(`addGroundOverlay err`, err);
      }
    });
    console.log(`addGroundOverlay done!`);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});
