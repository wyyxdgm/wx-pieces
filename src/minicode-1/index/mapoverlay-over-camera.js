// index/mapoverlay-over-camera.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 121.49162292480469,
    latitude: 31.226307285576873,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const mapCtx = wx.createMapContext('map', this);
    let { addGroundOverlay, removeGroundOverlay, updateGroundOverlay } = mapCtx;
    const image = {
      "url": "https://sightp-tour-cdn.sightp.com/wxapp/remote/images/map/mapoverlay2-800.png",
      "east": 121.49368286132812,
      "north": 31.228068791512126,
      "west": 121.48956298828125,
      "south": 31.22454577964162
    };
    addGroundOverlay({
      id: 1,
      src: image.url,
      bounds: {
        northeast: {
          longitude: image.east,
          latitude: image.north
        },
        southwest: {
          longitude: image.west,
          latitude: image.south,
        },
      },
    })

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

  }
})