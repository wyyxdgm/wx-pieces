Page({
  toDemo(evt) {
    wx.navigateTo({
      url: `/index${evt.target.dataset.index}/index`,
    })
  },
})