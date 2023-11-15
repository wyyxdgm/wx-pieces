const app = getApp()

Page({
  data: {
    longitude: 114.5172,
    latitude: 30.4153,
  },
  onLoad() {
    let _mapContext = wx.createMapContext('myMap')
    _mapContext.addGroundOverlay({
      id: 9999,
      src: './map_shapes.png',
      bounds: {
        northeast: {
          longitude: 114.65617,
          latitude: 30.593229
        },
        southwest: {
          longitude: 114.355843,
          latitude: 30.26009
        }
      },
      opacity: 0.5
    })
  },
})
